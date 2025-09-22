export function formatDate(value: string | Date) {
    const date = typeof value === "string" ? new Date(value) : value;

    if (Number.isNaN(date.getTime())) {
        return typeof value === "string" ? value : "";
    }

    const parts = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
    }).formatToParts(date);

    const lookup: Record<string, string> = {};

    for (const part of parts) {
        if (
            part.type === "day" ||
            part.type === "month" ||
            part.type === "year"
        ) {
            lookup[part.type] = part.value;
        }
    }

    const { day, month, year } = lookup;

    if (!day || !month || !year) {
        return new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
        }).format(date);
    }

    return `${year}-${month}-${day}`;
}
