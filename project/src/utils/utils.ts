export const getRatingPercent = (value: number) => value >= 5 ? '100%' : `${100 / 5 * Math.round(value)}%`;

