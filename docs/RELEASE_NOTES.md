# Release notes

Publishing release notes on a monthly basis is relatively straightforward thanks to the Sanity CMS. It consists of preparing all the content, and when ready publishing it all in the right order. Finally, the website should be redeployed in full.

> [!TIP]  
> Be sure to read the [documentation about the CMS](./CMS.md) if you’re not too familiar with it yet.

## Preparing updates

For every new release, there are quite a few things to create or update on the CMS:

- Creating a new “Release” document.
- Creating a new “Card” and “Card changes” document for each new card.
- Updating existing “Card” entries + creating new “Card changes” entries for balance changes.
- Creating a new “News” document for the home page.
- On occasion, creating other types of documents.

> [!WARNING]  
> Do not **publish** any document until you are ready to put the content live on the website. As long as documents are just drafted and not published, they are only available in preview mode, so they are inaccessible to the public.

### Creating a new release

It is advised to duplicate an existing “Release” document instead of creating one from scratch (click on the `˯` at the bottom right of the form, then “Duplicate”). This way you start with some sort of a template to just empty and fill again. Start by expanding the “Metadata” section and update all the fields with the right value.

Then, update the actual content of the page. Every release notes announcement more or less follows this pattern:

1. The introduction paragraph always starts the same way, and the second sentence gets changed to mention what kind of changes are coming. This is basically the same sentence that is used in the “Excerpt” field (in the “Metadata” section of the form), as well as in the “News” document.
2. Then there is a “Table of Contents” module to have an automated table of contents. It’s important that headlines are authored using the appropriate “Heading 2” (or “Heading 3” for subsections) styles, as this is how the table of contents works.
3. After that we normally start with the balance changes. They are (unfortunately) authored manually, and cannot be automated with a module (technically possible, just never implemented). This section can include a “Nerf compensation” module if needed.
4. Then we typically have the new card (or new cards). They are introduced with the “Card” module which displays the card across its 5 levels.
5. The next sections really depend on the type of content to be announced. This is where you can feel free to be creative with the various modules that exist: images, columns, etc.
6. Finally there should be a “FAQ” module with the basic questions like when will the release be deployed.

> [!NOTE]  
> At any time, you can [preview the content](./CMS.md#previewing-content). If you get a server error attempting to preview it, make sure all fields are properly filled.

### Creating new card entries

For each new card, a new “Card” document needs to be created. It should be quite straightforward to fill in the form.

The Stormbound-Kitty ID is the one used all over the website. It is the letter N, I, W, F, S or T depending on the faction (Neutral, Ironclad, Winter, Shadowfen, Swarm and Token respectively) followed by a number. So when adding a Shadowfen card, start with F then find the lowest number that’s not already taken; it should be the current amount of Shadowfen cards + 1. The CMS will reject the value if it already exists.

Unlike in the game, the Stormbound ID is authored all lowercase. It should be fine if authored uppercase as well, but better be consistent.

> [!TIP]  
> The “Additional notes” field can be used to provide clarification about the card. These notes are displayed under the card itself on its dedicated page (for instance, see [Malicious Finch](https://stormbound-kitty.com/cards/N106)).

For each new card, also create a new “Card change” document. Associate it with that new card, write the release date in format DD/MM/YYYY (either the first of the month, or the actual precise date), choose “Info” type and write “Added to the game”. It’s important the description says exactly that as if no “Card change” document is found with that description, the card will be assumed to have been released with the game on September 18th 2017 (see [Gifted Recruits](https://stormbound-kitty.com/cards/N3) for instance).

### Authoring balance changes

For each existing card that gets updated, you’ll need to update the “Card” document itself, and add a new “Card change” document to maintain the card history over the time. It is recommended to start by the “Card change” as the CMS makes it a little easier.

Create a new “Card change” document. Associate it with the card, write the release date in format DD/MM/YYYY (the first of the month), choose the right type (either “Buff”, “Nerf”, “Mixed” or “Info”) and write a description. The format typically looks like this:

> Strength increased by 1  
> Mana cost and strength decreased by 1  
> Ability made to impact surrounding units  
> Ability damage increased by 2 at higher levels

Then to open the current card document side-by-side, click on the card name that you picked in the 1st field. This way, you have the current card information in a side panel.

For each property that changes, add a new entry to the “Previous stats” field and copy and paste the current live value (**not** the new one). For instance if the strength goes from 1/2/3/4/5 to 2/3/4/5/6, add “Strength -> 1/2/3/4/5” to the “Previous stats” field. Once you’ve recorded each changed stats, you can update the actual card document on the right side with the new value (e.g. 2/3/4/5/6).

### Creating a news document

Finally, for the release notes to be announced on the home page, a new “News” document needs to be created. Feel free to duplicate an existing document to just update the values.

### Creating other documents

On occasion, you may need to create some other types of documents:

1. [“Avatar” documents](https://stormbound-kitty.sanity.studio/desk/avatar) to maintain the [collection of avatars in the fan-kit](https://stormbound-kitty.com/fan-kit/avatars).
2. [“Wallpaper” documents](https://stormbound-kitty.sanity.studio/desk/wallpaper) to maintain the [collection of wallpapers in the fan-kit](https://stormbound-kitty.com/fan-kit/wallpapers/desktop).
3. [“Book” documents](https://stormbound-kitty.sanity.studio/desk/book) when adding new types of books and tomes to the game.
4. [“Brawl” documents](https://stormbound-kitty.sanity.studio/desk/brawl) when adding new types of Brawl to the game.

## Publishing updates

Once ready to put the release notes live, publish all the touched documents. It is recommended to do it in that order:

1. “Card” documents (new and updated).
2. “Card change” documents (new and updated).
3. New “Release” document.
4. New “News” document.

The new content should be available almost immediately on the site. You can start monitoring traffic via our [analytics](./ANALYTICS.md) solution.

> [!TIP] If you feel like a document didn’t get a published properly because its changes are not displayed, perform any update to that document and publish it again. Sometimes, the hook responsible to update the website on publication can fail.

## Redeploying the website

For the entire site to be properly updated with everything that changed (particularly the cards), it is necessary to trigger a full deployment of the website. To do so:

1. Log onto Vercel.
2. Head into the [Deployments](https://vercel.com/stormbound/stormbound-kitty/deployments) tab.
3. Find the latest deployment marked “Production (current)”.
4. Click on the 3 dots menu on the site.
5. Click “Redeploy”.
6. Confirm the redeployment in the dialog.
7. Let the deployment complete (~15 minutes).
