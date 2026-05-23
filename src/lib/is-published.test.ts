import { describe, expect, it } from "vitest";
import { isPublished } from "./is-published";

describe("isPublished", () => {
  it("should publish a post dated before today (JST)", () => {
    expect(
      isPublished(new Date("2026-01-01"), new Date("2026-05-24T03:00:00Z")),
    ).toBe(true);
  });

  it("should publish a post dated exactly today (JST)", () => {
    expect(
      isPublished(new Date("2026-05-24"), new Date("2026-05-24T03:00:00Z")),
    ).toBe(true);
  });

  it("should not publish a post dated in the future (JST)", () => {
    expect(
      isPublished(new Date("2026-12-31"), new Date("2026-05-24T03:00:00Z")),
    ).toBe(false);
  });

  // The 0:05 JST build runs at 15:05 UTC on the previous UTC day. A naive UTC
  // comparison would treat the just-arrived JST date as still in the future.
  describe("at the JST-midnight build (now = 2026-01-01T15:05:00Z = 2026-01-02 00:05 JST)", () => {
    const now = new Date("2026-01-01T15:05:00Z");

    it("should publish a post dated to the new JST day", () => {
      expect(isPublished(new Date("2026-01-02"), now)).toBe(true);
    });

    it("should not publish a post dated the day after", () => {
      expect(isPublished(new Date("2026-01-03"), now)).toBe(false);
    });
  });
});
