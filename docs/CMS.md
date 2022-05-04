# CMS

## Previewing content

In [Sanity](https://www.sanity.io/), documents can either be drafts or published. To preview a newly created document or a content update before it gets published, one can use the content preview mode.

At the top of the form, you should see two tabs: one called “Editor” (where the form is) and one called “Preview” which you can use to preview the content before publishing it.

Switching to that “Preview” tab will open the official site in an iframe, but with the preview mode enabled. This works by setting a small cookie in your browser to know that you have enabled the preview mode. A banner at the bottom of the page should make that clear as well, as well as offer you a way to turn off the preview mode.

Alternatively, look at the top right corner of the page for 3 little dots. Clicking it should open a dropdown menu with an “Open preview” link (<kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>o</kbd>).

In that mode, every request made to the CMS will bypass cache and query draft versions, so you will see unpublished content. You can safely browse the website or refresh the page — the preview mode will remain active for an hour or until the next website deployment (or until you remove it).

## Publishing content

When a document gets published in the CMS, the cache for relevant pages gets invalidated (see [Next.js docs](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#on-demand-revalidation-beta)). For instance, updating a guide document causes the page for the guide to be updated almost immediately (or within a few seconds). Adding a new story causes this story to be visible immediately. And so on.

When updating card documents however, the site will need to be rebuilt, because cards are used all over the site, and therefore require an entire rebuild to be accurate everywhere. This can be done by pushing some code to the `main` branch or redeploying via the interface on Vercel (or asking Kitty).

If necessary, a specific path can be revalidated at any time via the `bin/revalidate.js` script or the [dedicated GitHub Workflow](https://github.com/sheepyard/stormbound-kitty/actions/workflows/revalidate.yml) that can be triggered manually (and uses the same Node script under the hood).

## Undoing mistakes

Sanity is surprisingly resilient to mistakes. There are 3 levels of defense for undoing mistakes:

1. If the undesired content update has _not_ been published yet, click on the arrow at the bottom right of the document, then “Discard changes”. This will discard unpublished changes, effectively restoring the form to the currently published version.

2. If the undesired content update has been published, click the “Current version” at the top right of the document, then find the previous “Published” version, click it, then click “Restore” at the bottom of the screen. This will essentially roll back the document to that specific version.

3. If the undesired content update is irreversible, the whole [database is backed up](./WORKFLOWS.md#backupyml) every 3 days, so it can be [restored](https://www.sanity.io/docs/importing-data) to the latest stable version. That’s a little more complicated, but that’s a good way to recover from large mistakes.

## Publishing release notes

To publish new release notes, start by preparing everything you need as a draft on the CMS: the release notes themselves, but also the new cards, the card changes, a news entry, etc.

When you’re ready to publish the release notes, publish all the draft entries. It can take a bit of time depending on how many entries there are to publish, so plan ahead.

Finally, when everything is published, trigger a production build. This is usually done by pushing some changes to the `main` branch. A new release typically involve updating some unit tests anyway, so that’s a good time to do that.

Summary:

1. Work on the release notes and all related documents in drafts.
2. Publish everything when finally ready so things show up on the website.
3. Update the tests on the `main` branch.
4. This will cause a deployment that renews the last remaining bits of the content.
