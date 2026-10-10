/**
 * @fileoverview Class Name Merger Utility
 * Combines conditional class arguments using clsx and resolves Tailwind CSS class conflicts using twMerge.
 * Used ubiquitously across components for robust style merging.
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

