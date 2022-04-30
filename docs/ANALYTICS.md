# Analytics

Tracking is done via [Plausible](https://plausible.io/), a privacy-friendly alternative to Google Analytics.

The tracking script is proxied on Next.js (see `next.config.js`) to be loaded from our top-level domain in order to bypass aggressive ad-blockers. It is loaded asynchronously with low priority to minimize its impact on performance.

## Excluded paths

[Plausible’s pricing system](https://plausible.io/#pricing) is based on page views. Our current plan caps at 100,000 views a month, and we are floating a little below that limit. This is because some tools such as the card builder count a view for every single update that gets serialized in the URL.

To prevent these tools from inflating our stats and pushing us to a more expensive plan, we exclude these paths from tracking entirely. Here are the ignored paths:

- `/calculators/value/*`
- `/card/**`
- `/deck/**`
- `/list/**`
- `/quest/**`
- `/simulators/battle/*/display`
- `/simulators/battle/*`
- `/simulators/books/*`
- `/simulators/draft/*`

## Events

Custom events can be tracked via the `helpers/track` utility function. This only works on the client though as it relies on the global `window.plausible` function, so make sure to only call it when the app has mounted (e.g. in `useEffect` React hooks).

To track custom events on the server (such as in API routes), the `helpers/trackAsync` utility function can be used (which uses the [Plausible REST API](https://plausible.io/docs/events-api)).

To be able to monitor events on Plausible, a [goal](https://plausible.io/docs/goal-conversions) must first be defined in the site settings interface. While Plausible will record all events sent its way, it will only display the ones that are monitored via custom goals.

## Google Search Console

Plausible is connected with the Google Search Console to getter better insights into what led people from a Google search into the site. To access this information, click on “Google” in the “Top Sources” panel of the dashboard or follow [this link to the Google referrer filter](https://plausible.io/stormbound-kitty.com/referrers/Google?source=Google).
