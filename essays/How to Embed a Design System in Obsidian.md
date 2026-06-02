---
authors:
  - Alessandro Farace
tags:
  - software
  - design-systems
  - obsidian
title: How to Embed a Design System in Obsidian
description: A practical guide to reusing a Tailwind and ShadCN design system inside an Obsidian plugin without losing theme compatibility or CSS cascade control.
slug: how-to-embed-design-system-obsidian
publish_date: 2026-06-01
draft: false
---

Over the last 2 months, I've been building my own experimental agent SDK. To get immediate feedback on how the agents were behaving, I built a set of React UI components in Electron and embedded them in their own chat app. I wasn't trying to build another chat app though; I was trying to create a Cursor experience within my favorite note-taking app, Obsidian. 

So when the MVP of the SDK was finished, it came to the task of building out the Obsidian plugin to house these agents. I obviously didn't want to rewrite from scratch the UI I had built. But I also couldn't just naively import it. Unlike my Electron app, I don't have complete ownership over the styling. My plugin just gets to **contribute UI** into an application developed by one group of developers, with user-installed themes developed by another group. And that means the final computed style for components depends on more than just my code.

That led me to the topic of this post:

> How can you reuse styled UI components from an application you own in a plugin for an application you don't own.

I'm going to focus on integrating specifically a ShadCN + Tailwind design system into Obsidian, although the principles may be extrapolated for other class-based design systems too.

That means the rendered components look something like this:
```html
<button class="... bg-primary/10 text-primary ring-primary/35 hover:bg-primary/15 hover:text-primary" type="button"...
```
### The Easy Part: Token Mapping
When we ask for `bg-primary`, Tailwind is already aware of `primary` as a color in our design-system's swatch because I have introduced it through the Tailwind theming mechanism. Instead of directly defining the values, we use **CSS variables** to allow us to defer making a decision on what the colours actually are.

```css
@theme inline {
	--color-background: var(--background);
	--color-foreground: var(--foreground);
	--color-primary: var(--primary);
	--color-primary-foreground: var(--primary-foreground);
	--color-border: var(--border);
	--color-ring: var(--ring);
}
```

That means each host application only needs to define `--primary`, `--background`, `--border`, etc. The shared component code can stay the same.

In the Electron app, I can then use Franklin's own theme values:

```css
:root {
	--background: oklch(0.96 0.012 88);
	--foreground: oklch(0.21 0.04 302);
	--primary: oklch(0.21 0.04 302);
	--primary-foreground: oklch(0.92 0.035 88);
...
}
```

But in Obsidian, I don't want Franklin's colour palette to be the source of truth. Obsidian already exposes a large set of theme-aware CSS variables, and those variables are what community themes customize. So the Obsidian plugin defines the same Franklin tokens by **bridging** them to [Obsidian's CSS variables](https://docs.obsidian.md/Reference/CSS+variables/CSS+variables):

```css
.franklin {
	--background: var(--background-primary);
	--foreground: var(--text-normal);
	--primary: var(--interactive-accent);
	--primary-foreground: var(--text-on-accent);
...
}
```

> [!INSIGHT]
> The important direction of dependency is: **components depend on design system; design system depends on the host application's theme variables**. The application owns theming, not the reusable components.

So at this point, the design-system tokens are wired into Obsidian. But token mapping alone does not guarantee that the resulting declarations will actually win in the browser.

### The Hard Part: Winning the Cascade
> If you are a pro at CSS already, or want to skip to the solution (which is to use a prefix PostCSS plugin + root element), go [[#^solution|here]]

![[buttons-without-prefix.png]]
![[computed-style.png]]
![[agent-sees-2-files.png]]

![[annotated styles.png]]

Now we have `primary` mapping to the same colour as the theme's. But when I went to run it, my buttons with the `bg-primary/10` class did not seem to take on the primary color, and instead was using a neutral tone.

> [!NOTE]
>  `bg-primary/10` is Tailwind for having a primary background with 10% opacity

Examining what the Chromium dev-tools were computing, it seems like my `bg-primary/10` was being subordinated by the rule with selector `button:not(.clickable-icon)` coming from Obsidian's style sheet `app.css`. 

That means we need to **carefully consider the implications this Obsidian setup has on the [[CSS Cascade Algorithm|CSS cascade]]**. The Cascade Algorithm determines **which style properties apply to an element, in the presence of multiple candidate rules**. Conceptually, for a given **property** (like `color`) it is a multi-pass filter on all available CSS rules where at each pass we sort the remaining candidates and filter those not in the top bucket. By the end, we are left with at most one winning declaration.

Let's now examine what happens to the two `background-color` declarations at each pass of the algorithm:

##### Pass 1: **Relevance**:
We discard all rules whose selector does not match the element. What we are seeing in the dev-tools is exactly the list of declarations whose rule passed this phase.

##### Pass 2: **Origin & Importance**
- We may associate with a stylesheet (and therefore its ruleset and declaration) an **origin**. There are three:
	- `user-agent` origin (i.e. browser-provided)
	- `user` (i.e. user customized)
	- `author` (i.e. application-defined). 
- A declaration may also be marked as `!important` (and if not marked, is then considered *normal*)
- We bucket declarations by BOTH origin and importance. We then order buckets so that:
	- Important buckets are **higher priority** than normal buckets (naturally)
	- For normal declarations, `author` comes first, then `user`, then `user-agent`.
	- For important declarations, this order is reversed!
- Then we let the declarations in the highest-priority **non-empty** bucket through to the next stage. 
	- E.g. if there were 0 author declarations, 3 user declarations and 2 user-agent declarations, then we would only consider the 3 user declarations in the next step. However, if we also had **1 important user-agent declaration, that would win**

You can see this at play in our running example:
- `app.css` is Obsidian's provided stylesheet and it has an `author` origin.
- `<style>` is referring to my Obsidian plugin's style sheet (the thing we have control over) and it is also `author` origin.
- `buttonface` value is provided by `user-agent`, hence why it is at the bottom of the list

![[origin, importance and layer.png]]
(Provided by https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@layer)

That means **both Obsidian and our declarations have the same origin**, so we need to go on to the next pass to pick a winner.
##### Pass 3: Specificity
The idea of this pass is that **more specific selectors** should take a higher priority. Intuitively, a selector with more conditions should trump one with fewer. But also, the category of condition is important and should be considered.

Formally, we take the basic selectors and assign a vector (called a `weight-value`) to them:
- ID Selector (like `#login-button`) = `1 0 0`
- Class selectors (like `.btn` or pseudo-classes like `:hover`) = `0 1 0`
- Type selectors (elements like `p` or pseudo-elements like `::before`) = `0 0 1`

Remember, selectors may be composed together using combinators to create more complex conditions. You therefore sum together all constituent weight-values, column-wise.

To compare two weight values, you find the first column where the vectors differ and the one with the higher number wins. For example:
- `0 5 1` > `0 2 3`
- `1 0 1` > `0 10 0`

So to compare the selectors of our running example:
- **Obsidian** = `button:not(.clickable-icon)` = `0 1 1`
	- The `button` is a type selector because it matches the element `<button>`, and contributes `0 0 1`
	- `:not(.clickable-icon)` contributes `0 1 0` (technically the `:not` adds nothing, but the `.clickable-icon` inside it is a class name and so contributes to the 2nd column)
- **Ours** = `.bg-primary/10` = `0 1 0` (single class)

**This explains why our declaration loses out to Obsidian's!**

#### Exploring the Decision Tree of Solutions
##### Ideas
There are basically three ideas I considered:
1) **Use `!important`**: I opted against this because it would make every generated utility feel like an emergency override. It solves the immediate conflict, but it makes future conflicts with Obsidian or user themes harder to reason about.
2) **Layers**: As a newer kind of **Pass 2.5**, CSS has a layer mechanism in which you may define and order "layers", put rules in those layers, and higher priority layers with the same origin and importance always trump lower priority ones. **However**, **un-layered rules always beat layered rules**, and since Obsidian has virtually everything in unlayered rules, there is no point adding layers because this can only decrease our priority.
3) **Increasing Specificity**: The most natural choice. We pick our fight at the exact pass we are losing at.

With a little more analysis, I came to the conclusion that we really just want to be **adding another class selector** because:
- Playing around with IDs isn't practical. A document can only have one element with a particular ID, and our design system totally ignores them anyway
- Because of the way weight-values are compared, if, ignoring IDs, we can win at the class-selector column, we are guaranteed to win. Whereas if we try winning at the type-selector column (i.e. with more matching elements) then we are not guaranteed to win.

##### Implementation ^solution
We need both: 1) Our selectors to have a higher class weight-value 2) **Our selectors still have to match**! (otherwise we wouldn't get past the relevance pass)

Using the same ideas as [this repo](https://github.com/nicholas-wilcox/tailwind-snippet-obsidian-plugin), the trick is to use a **Prefix PostCSS Plugin** in order to add weight to every Tailwind selector. Tailwind scans your codebase for any class tokens that are part of its language, then it generates tiny utility classes to define them. With the prefix plugin, you are asking the build system to take all these generated classes and modify their selector to include another class. I chose to prefix with `.franklin`, which is the name of the project. 

```js
import prefixSelector from 'postcss-prefix-selector';

const FRANKLIN_PREFIX = '.franklin';

/** PostCSS plugin that wraps every selector with `.franklin`. */
export function franklinPrefix() {
	return prefixSelector({
		prefix: FRANKLIN_PREFIX,
		exclude: [/\.franklin/],
		transform(prefix, selector) {
			if (selector === ':root' || selector === 'html') {
				return prefix;
			}
			return `${prefix} ${selector}`;
		},
	});
}

...

const cssEntry = resolve(srcDir, 'styles/globals.css');
// Run Tailwind THEN prefix.
const processor = postcss([
	tailwindcss({ optimize: isProd || !isWatch }),
	franklinPrefix(),
]);
const css = readFileSync(cssEntry, 'utf8');
const result = await processor.process(css, {
	from: cssEntry,
	to: resolve(distDir, 'styles.css'),
});
```

> [!NOTE]
> ... what postcss-prefixer-selector does vs just a plain selector transform. Why do we even need exclude?

And here is what appeared in `styles.css`!:

```css
.franklin .bg-primary\/10 {
  background-color: var(--primary);
  @supports (color: color-mix(in lab, red, red)) {
    background-color: color-mix(in oklab, var(--primary) 10%, transparent);
  }
}
```

This solves part one. In order to actually get this selector to match, we need an ancestor of the element to have the `.franklin` class because we have combined the selectors together with a [Descendant Combinator](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Descendant_combinator). All we had to do here was go to the root component that we were mounting the React element to, and add the class!

```js
contentEl.classList.add('franklin');
root = createRoot(contentEl);
root.render(component);
```

Now, our button matches the selector and `.franklin .bg-primary\/10` wins against Obsidian's because it has a weight-value of `0 2 0` vs Obsidian's `0 1 1`

> [!INSIGHT]
> In addition to increasing specificity, this approach also **scopes** all our styles to only our plugin's components. No risk of introducing dependencies, which is not something we could have said for the `!important` approach.

What is also beautiful about this approach is that **we did not need to touch the custom button's implementation**. We only added a build step and a wrapper component!

![[agent-sees-1-file-good.png]]
#### Caveats
Our solution raised the weight-value by `0 1 0`. That was enough for the conflict in our running example, but unfortunately there are some Obsidian selectors at `0 2 1` and above. For example:
```css
input[type='text']:hover {
  background-color: var(--background-modifier-form-field-hover);
  border-color: var(--background-modifier-border-hover);
  transition: box-shadow var(--anim-duration-fast) ease-in-out,
              border var(--anim-duration-fast) ease-in-out;
}
```

From what I've observed so far, these more specific cases haven't had a noticeable effect on the "intended" design of components to warrant shielding against. But you can probably imagine how we might go about that:
- Use multiple class prefixes
- Add them all to the root

One obvious downside would be that this starts to get quite nuclear just to address a shrinking set of edge cases, all at the cost of bloating `styles.css`.


### Organizing Codebase
Before finishing off, I wanted to give a couple architectural notes that may be valuable. There are 2 independent packages here: **Shared UI** and the **Obsidian Plugin**. The relevant shape looks like this:

```text
apps/
├── shared/
│   └── ui/
│       └── src/
│           ├── components/
│           └── styles/
│               ├── shared.css
│               ├── theme.css
│               └── theme-tokens.css
└── obsidian/
    ├── build/css/
    │   ├── build.mjs
    │   └── prefix.mjs
    └── src/
        ├── renderer/
        │   └── mount.tsx
        └── styles/
            ├── global.css
            └── theme.css
```

- **Shared UI**:
	- `theme-tokens.css` maps `Tailwind Theme -> Design System`
	- `shared.css`: Joins together all the mechanics to make reusing tailwind components in any project. It includes
		- `@source` directives: Makes Tailwind scan the shared component code so those utility classes get emitted by the consuming app
		- Imports `theme-tokens.css`
	- (optional)`theme.css` allows multiple electron apps to all define the same `Design System -> Theme` mapping.
- **Obsidian Plugin**:
	- `theme.css` defines the `Design System -> Obsidian Theme` mapping discussed in "The Easy Step"
	- `global.css` is the entry point and imports the Obsidian `theme.css`, `shared.css`, and also adds `@source` directives to pull any plugin specific components.

## Conclusion
Although we have discussed specifically embedding ShadCn + Tailwind + React components in Obsidian extensions, the thought process is largely the same. 

You need to:
- Understand how the host application deals with its own styles, and with the plugin styles. **You must have strong intuitions about how they interact during the Cascade algorithm**
- Figure out the appropriate build steps needed to create all stylesheets for your components that **adhere to the host's theme** and **that have higher priority than ambient defaults/overrides**. 

I have also left a couple topics out of this post, but are also important to consider:
- **Portals**: How do the shared portal components know which root component they should attach to? (hint: it can't be the container of the extension's view because modals will add a background dim/blur effect to only part of the viewport).
- **Resets**: We've discussed how introduce explicit styles. On the otherhand, the computed value for a style might be implicit. For example [Firefox](https://raw.githubusercontent.com/mozilla-firefox/firefox/main/layout/style/res/ua.css) uses adds this rule to style visited links: `:visited {color:VistedText};`. But changing host (i.e. from your Electron app to Obsidian), also change these values. The trick is to add each problematic case to a `reset.css` file that has the exact same selector but is also prefixed by `.franklin`. Then, all elements scoped under the `.franklin` root 'reset' the host's defaults to something preferred. 
- **Tailwind Preflight**: Because host defaults vary across browser, Tailwind tries to normalize values through it's `tailwindcss/preflight.css` stylesheet. Naively importing this in a plugin is a bad idea though because it is unscoped, hence why I omitted it from `global.css`

---

This was also my first technical blog post, so feedback on style, on clarity and usefulness would be much appreciated :)
