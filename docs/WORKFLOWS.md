# Workflows

## backup.yml

The `backup.yml` workflow is a CRON job performing a backup of the whole Sanity dataset every 3 days. This makes sure we can restore a former clean version of the site if a problem occurs. Each backup is preserved for 7 days on GitHub.

To download a database backup, open the latest [backup workflow run](https://github.com/sheepyard/stormbound-kitty/actions/workflows/backup.yml), and download the `production-dataset` archive.

## ci.yml

The `ci.yml` workflow runs on all deployments, whether preview or production, and runs Jest unit tests and Cypress end-to-end tests. It starts when Vercel deploys a version of the site, which happens on pull-requests (branch previews) or on the `main` branch (production).

## cms.yml

The `cms.yml` workflow deploys the Sanity CMS and is run on every commit to the `main` branch.

## codeql.yml

The `codeql.yml` workflow runs on every branch and commit to the `main` branch as well as on a schedule to do a light quality check on the whole codebase. It uses [github/codeql-action](https://github.com/github/codeql-action) to find potential code smells or security issues.

## revalidate.yml

The `revalidate.yml` workflow is a manual pipeline that can be used to invalidate the Next.js cache of a given page. It is typically not needed as there is a Sanity webhook configured to automatically revalidate pages as they get updated, but it might come in handy at times.

Read more about it in the [documentation about publishing content](./CMS.md#publishing-content).
