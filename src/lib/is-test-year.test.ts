import { describe, expect, it } from "vitest";
import { isPastYear } from "./is-past-year";

describe("isTestYear", () => {
  it("should return true. If the dates have over than 1 year", () => {
    expect(isPastYear(new Date("2022-01-01"), new Date("2023-01-01"))).toBe(
      true,
    );
  });
  it("should return true. If the dates have less than 1 year", () => {
    expect(isPastYear(new Date("2022-01-01"), new Date("2022-12-31"))).toBe(
      false,
    );
  });
});
