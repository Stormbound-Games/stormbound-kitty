# Monitoring

## Status checks

Recurring status checks are orchestrated with [Checkly](https://app.checklyhq.com/). There is a check for every route of the site to ensure it responds with 200. It runs every 1 or 12 hour, depending on how important the page is. API routes (revalidation, preview, search…) are tested every hour with a sample request.

A [public facing dashboard](https://stormbound.checklyhq.com/) exists to display the service status of the main endpoints (home page + API routes).

## Internal Server Errors

Internal server errors (HTTP status 5xx) should be pretty rare, because the site cannot be deployed if there is any. That means if Next.js can statically compile a page, it won’t go through with the deployment.

That being said, internal server errors can happen. When faced such a server error, it might be tricky to figure out what when wrong, especially when there are no clear reproduction steps.

To get more information about it, log into Vercel, then open the [Deployments tab for the site](https://vercel.com/stormbound/stormbound-kitty/deployments). Find the latest production deployement, the one marked as “Production (current)” and open it. Finally, open the “Functions” tab, then filter the incoming logs by “Errors”. You should be able to get more information about the error (URL + stack trace).

![Screenshot of the incoming logs on Vercel showcasing a couple of errors](https://cdn.sanity.io/images/5hlpazgd/production/fdf94b7c66b92774820ce5660ecc8c2a9d96361d-3584x2028.png?w=1200&auto=format)
