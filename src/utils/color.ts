// src/utils/color.ts
export const generateRandomHex = (): string => {
    const rand = () => Math.floor(Math.random() * 256);
    const r = rand();
    const g = rand();
    const b = rand();
    return `#${[r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("")}`.toUpperCase();
};

/** Returns either '#000' or '#fff' depending on perceived brightness for contrast */
export const getContrastTextColor = (hex: string): string => {
    // remove '#'
    const clean = hex.replace("#", "");
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    // Perceived luminance
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance > 150 ? "#000000" : "#FFFFFF";
};
