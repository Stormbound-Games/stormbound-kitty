# Analytics

Tracking is done via [Plausible](https://plausible.io/), a privacy-friendly alternative to Google Analytics.

The tracking script is proxied on Next.js (see `next.config.js`) to be loaded from our top-level domain in order to bypass aggressive ad-blockers. It is loaded asynchronously with low priority to minimize its impact on performance.

## Events

Custom events can be tracked via the `helpers/track` utility function. This only works on the client though as it relies on the global `window.plausible` function, so make sure to only call it when the app has mounted (e.g. in `useEffect` React hooks).

To track custom events on the server (such as in API routes), the [Plausible REST API](https://plausible.io/docs/events-api) can be used. For instance:

```js
fetch('https://plausible.io/api/event', {
  method: 'POST',
  headers: {
    'User-Agent': request.headers['user-agent'],
    'X-Forwarded-For': getIP(request),
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: eventName,
    domain: 'stormbound-kitty.com',
    url: 'https://stormbound-kitty.com/path/to/relevant/url',
    props: { path: '/path/to/relevant/url' },
  }),
})
```

To be able to monitor events on Plausible, a [goal](https://plausible.io/docs/goal-conversions) must first be defined in the site settings interface. While Plausible will record all events sent its way, it will only display the ones that are monitored via custom goals.

## Google Search Console

Plausible is connected with the Google Search Console to getter better insights into what led people from a Google search into the site. To access this information, click on “Google” in the “Top Sources” panel of the dashboard or follow [this link to the Google referrer filter](https://plausible.io/stormbound-kitty.com/referrers/Google?source=Google).
