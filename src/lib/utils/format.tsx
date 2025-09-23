import { parseDate } from "./date";

export function formatDate(value: string | Date) {
    const date = parseDate(value);

    if (!date) {
        return typeof value === "string" ? value : "";
    }

    const formatted = new Intl.DateTimeFormat("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(date);

    return formatted.toUpperCase();
}
