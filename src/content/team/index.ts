import { currentTenure } from "./tenure-2025-2026";
import { legacyTenure } from "./tenure-2024-2025";
import { TenureRecord } from "@/types/team.types";

export const allTenures: TenureRecord[] = [currentTenure, legacyTenure];

export function getTenureByYear(year: string): TenureRecord | undefined {
  return allTenures.find((t) => t.tenureYear === year) || currentTenure;
}

