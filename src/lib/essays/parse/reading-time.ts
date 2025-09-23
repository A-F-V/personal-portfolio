const AVERAGE_READING_SPEED_WPM = 175;

const WORD_SEPARATOR = /\s+/g;

function countWords(content: string): number {
    const words = content.trim().split(WORD_SEPARATOR).filter(Boolean);

    return words.length;
}

export function estimateReadingTime(content: string): number {
    const wordCount = countWords(content);

    if (wordCount === 0) {
        return 0;
    }

    const minutes = wordCount / AVERAGE_READING_SPEED_WPM;
    const rounded = Math.round(minutes * 10) / 10;

    return Math.max(1, rounded);
}
