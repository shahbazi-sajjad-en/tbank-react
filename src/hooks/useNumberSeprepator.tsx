import { useMemo } from "react";

export function useNumberSeprepator(value: number | string | undefined | null, locale: string = "fa-IR") {
    const formatted = useMemo(() => {
        if (value === undefined || value === null || value === "") return "-";
        const num = Number(value);
        if (isNaN(num)) return "-";
        return num.toLocaleString(locale);
    }, [value, locale]);

    return formatted;
}
