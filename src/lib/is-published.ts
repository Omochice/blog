const jstDateFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Tokyo",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

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
  return jstDateFormatter.format(postDate) <= jstDateFormatter.format(now);
};
