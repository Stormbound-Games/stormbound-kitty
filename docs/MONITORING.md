# Monitoring

## Status checks

Recurring status checks are orchestrated with [Checkly](https://app.checklyhq.com/). There is a check for almost every route of the site to ensure it responds with HTTP 200. It runs every 1 or 12 hours, depending on how important the page is. API routes (revalidation, preview, search…) are tested every hour with a sample request.

A [public facing dashboard](https://stormbound.checklyhq.com/) exists to display the service status of the main endpoints (home page + API routes).

## Internal Server Errors

Internal server errors (HTTP status 5xx) should be pretty rare, because the site cannot be deployed if there is any. That means if Next.js cannot statically compile a page, it won’t go through with the deployment.

That being said, internal server errors can happen. When faced such a server error, it might be tricky to figure out what when wrong, especially when there are no clear reproduction steps.

To get more information about it, log into Vercel, then open the [Deployments tab for the site](https://vercel.com/stormbound/stormbound-kitty/deployments). Find the latest production deployement, the one marked as “Production (current)” and open it. Finally, open the “Functions” tab, then filter the incoming logs by “Errors” (see [Vercel documentation](https://vercel.com/docs/concepts/deployments/logs)). You should be able to get more information about the error (URL + stack trace) the next time it happens.

![Screenshot of the incoming logs on Vercel showcasing a couple of errors](https://cdn.sanity.io/images/5hlpazgd/production/fdf94b7c66b92774820ce5660ecc8c2a9d96361d-3584x2028.png?w=1200&auto=format)

## Not Found Errors

The site has a lot of pages, and for the most part it does its best to maintain some form of backward compatibility with old URLs. A lot of them are maintained with permanent redirects in `next.config.js`, and some redirects are done at runtime in relevant pages.

404 errors can also be [tracked in Plausible](https://plausible.io/stormbound-kitty.com?goal=404). It should list the paths yielding a proper HTTP 404 in the browser. This is a good way to figure out which path might need to be updated or redirected.

Finding old links can be done in two ways:

- By searching the codebase for hard-coded paths. A search for `to={` or `to='` should yield all links, and then they can be browsed to look for the dead links.
- By running the following query in Sanity Vision to find links that were authored in rich text fields.

```groq
*[ defined(content) ] {
  // Figure out a name, a title or an ID for the document that contains the
  // links in the rich-text (to be able to find it in the CMS).
  "id": coalesce(name, title, id),
  // Find all links within the `content` field.
  "links": (
    content[ _type == "block" ]
    .markDefs[ _type == "link" ]
    // In case you’re looking for a specific link, you can uncomment the
    // following line giving it the exact link.
    // [href == "/your/path"]
    .href
  )
}[count(links) > 0]
```
