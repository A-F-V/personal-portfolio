export function parseDate(value: string | Date): Date | null {
    const date = typeof value === "string" ? new Date(value) : value;

    if (Number.isNaN(date.getTime())) {
        return null;
    }

    return date;
}
