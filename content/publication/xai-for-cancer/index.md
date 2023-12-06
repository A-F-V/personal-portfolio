---
title: "Digital Histopathology with Graph Neural Networks: Concepts and
Explanations for Clinicians"
authors:
  - alessandro
date: "2023-12-07T00:00:00Z"
#doi: ""

# Schedule page publish date (NOT publication's date).
publishDate: "2017-01-01T00:00:00Z"

# Publication type.
# Accepts a single type but formatted as a YAML list (for Hugo requirements).
# Enter a publication type from the CSL standard.
publication_types: ["article"]

# Publication name and optional abbreviated publication name.
publication: ""
publication_short: ""

abstract: Addressing the challenge of the “black-box” na-ture of deep learning in medical settings, we com-bine GCExplainer - an automated concept discovery solution - along with Logic Explained Networks to provide global explanations for Graph Neural Networks. We demonstrate this using a generally applicable graph construction and classification pipeline, involving panoptic segmentation with HoVer-Net and cancer prediction with Graph Convolution Networks. By training on H&E slides of breast cancer, we show promising results in offering explainable and trustworthy AI tools for clinicians.

# Summary. An optional shortened abstract.
summary: We combine GCExplainer and Logic Explained Networks to provide concept-based explanations for Graph Neural Networks, and apply it to digital histopathology.

tags:
  - xai
featured: true

links:
  - name: ArXiv
    url: https://arxiv.org/abs/2312.02225
#url_pdf: https://arxiv.org/abs/2312.02225
url_code: "https://github.com/A-F-V/XAI-Cancer-Diagnosis"
#url_dataset: "#"
#url_poster: "#"
#url_project: ""
#url_slides: ""
#url_source: "#"
#url_video: "#"


# Associated Projects (optional).
#   Associate this publication with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `internal-project` references `content/project/internal-project/index.md`.
#   Otherwise, set `projects: []`.
projects:
  - internal-project

# Slides (optional).
#   Associate this publication with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides: "example"` references `content/slides/example/index.md`.
#   Otherwise, set `slides: ""`.
slides: example
---

{{% callout note %}}
This work has been submitted to ArXiv and is currently under review. We expect to publish the full paper in the coming months.
{{% /callout %}}
