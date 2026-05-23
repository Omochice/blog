const jstDateFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Tokyo",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/**
 * Build a zero-padded `YYYYMMDD` key for a date in Asia/Tokyo.
 *
 * Parts are picked by `type` rather than read from `format()` output, so the
 * key does not depend on the locale's date order or separators, which keeps the
 * lexicographic comparison correct even where the ICU data differs.
 */
const jstDateKey = (date: Date): string => {
  const parts = jstDateFormatter.formatToParts(date);
  const pick = (type: Intl.DateTimeFormatPartTypes): string =>
    parts.find((part) => part.type === type)?.value ?? "";
  return `${pick("year")}${pick("month")}${pick("day")}`;
};

/**
 * Check whether a post should be published as of the given moment.
 *
 * Both dates are reduced to their calendar date in Asia/Tokyo before being
 * compared, so a post is published once its date has arrived in JST. Comparing
 * in JST rather than UTC is required because the scheduled build runs at 0:05
 * JST, which is the previous calendar day in UTC.
 *
 * @param postDate The `date` of the post.
 * @param now The current moment.
 * @returns Whether the post is published.
 */
export const isPublished = (postDate: Date, now: Date): boolean => {
  return jstDateKey(postDate) <= jstDateKey(now);
};
