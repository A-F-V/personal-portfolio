export const ensureStringArray = (value: unknown) => {
    if (Array.isArray(value)) {
        return value;
    }

    if (typeof value === "string" && value.trim().length > 0) {
        return [value];
    }

    return value;
};

export const toBoolean = (value: unknown) => {
    if (typeof value === "boolean") {
        return value;
    }

    if (typeof value === "string") {
        const normalized = value.trim().toLowerCase();
        if (normalized === "true") {
            return true;
        }

        if (normalized === "false") {
            return false;
        }
    }

    return value;
};

export const toNumber = (value: unknown) => {
    if (typeof value === "number") {
        return value;
    }

    if (typeof value === "string" && value.trim().length > 0) {
        const parsed = Number(value);
        if (!Number.isNaN(parsed)) {
            return parsed;
        }
    }

    return value;
};

export const toDate = (value: unknown) => {
    if (typeof value === "string") {
        return new Date(value);
    }

    if (value instanceof Date) {
        return value;
    }

    return value;
};
