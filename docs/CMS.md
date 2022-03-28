# CMS

- [Previewing content](#previewing-content)
- [Publishing content](#publishing-content)
- [Undoing mistakes](#undoing-mistakes)
- [Publishing release notes](#publishing-release-notes)

## Previewing content

In [Sanity](https://www.sanity.io/), documents can either be drafts or published. To preview a newly created document or a content update before it gets published, one can use the content preview mode.

In any document, look at the top right corner of the page for 3 little dots. Clicking it should open a dropdown menu with an “Open preview” link (<kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>o</kbd>). If that option does not exist, it means there is nothing to preview for such a document, but that should be uncommon. Most documents should have that option.

Opening that preview will open the official site in a new tab, but with the preview mode enabled. This works by setting a small cookie in your browser to know that you have enabled the preview mode. A banner at the bottom of the page should make that clear as well, as well as offer you a way to turn off the preview mode.

In that mode, every request made to the CMS will query draft documents as well, so you will see unpublished content. You can safely browse the website or refresh the page — the preview mode will remain active for an hour or until the next website deployment (or until you remove it).

## Publishing content

Content does not get automatically deployed as you publish it in the CMS. Content gets deployed and becomes visible for everyone on the site when:

- Some code gets pushed to the `main` branch of this GitHub repository.
- A page gets invalidated by Vercel based on its cache time (every few days for most pages on this site).
- A page gets revalidated manually via the `bin/revalidate.js` script.

If you have published a content update on the CMS and needs it to be visible on the live website, reach out to Kitty to have it revalidated.

## Undoing mistakes

Sanity is surprisingly resilient to mistakes. There are 3 levels of defense for undoing mistakes:

1. If the undesired content update has _not_ been published yet, click on the arrow at the bottom right of the document, then “Discard changes”. This will discard unpublished changes, effectively restoring the form to the currently published version.

2. If the undesired content update has been published, click the “Current version” at the top right of the document, then find the previous “Published” version, click it, then click “Restore” at the bottom of the screen. This will essentially roll back the document to that version.

3. If the undesired content update is irreversible, the whole database is backed up every 3 days, so Kitty can restore it to the latest stable version. That’s a little more complicated, but that’s a good way to recover from large mistakes.

## Publishing release notes

To publish new release notes, start by preparing every you need as a draft on the CMS: the release notes themselves, but also the new cards, the card changes, a news entry, etc.

When you’re ready to publish the release notes, publish all the draft entries. It can take a bit of time depending on how many entries there are to publish, so plan ahead.

Finally, when everything is published, trigger a production build. This is usually done by pushing some changes to the `main` branch. A new release typically involve updating some unit tests, so that’s a good time to do that.

Summary:

1. Work on the release notes and all related documents in drafts.
2. Publish everything when finally ready.
3. Update the tests on the `main` branch.
4. This will cause a deployment that renews the content.
