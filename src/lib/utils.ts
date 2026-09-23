import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Zero-padded index used for editorial section numbering: 1 -> "01". */
export function index(i: number) {
  return String(i + 1).padStart(2, "0");
}
