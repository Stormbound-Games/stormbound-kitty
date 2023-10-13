# Analytics

Tracking is done via [Vercel Analytics](https://vercel.com/analytics), the analytics solution from Vercel, our hosting provider. The integration is done entirely via Next.js.

## Excluded paths

[Vercel Analytics’ pricing system](https://vercel.com/docs/analytics/limits-and-pricing) is based on events (page views + custom events). Our current plan includes 25,000 events per month for free, and then costs $14 per extra 100,000 events per month. Over 2023, we’ve averaged at roughly 55,000 events a month. So analytics should cost us $14 a month.

## Events

Custom events can be tracked via the `helpers/track` utility function. This only works on the client though, so make sure to only call it when the app has mounted (e.g. in `useEffect` React hooks). It is not possible to track server-side events with Vercel Analytics.
