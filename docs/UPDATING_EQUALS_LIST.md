# Updating the equals list

Here is how your can update the [equals list](https://stormbound-kitty.com/list/equals) on your own to Stormbound-Kitty. It consists on 2 main steps: update the ID of the equals list and submitting it for review.

- [Logging into GitHub](#logging-into-github)
- [Updating the list](#updating-the-list)
- [Submitting the change](#submitting-the-change)

## Logging into GitHub

Log into your GitHub account. GitHub is a platform to collaboratively work on (open-source) code. It is almost an industry standard, very secure, and you shouldn’t be scared to create an account.

## Updating the list

Go to https://github.com/KittySparkles/stormbound-kitty/edit/main/src/constants/list.js. This will open a page with a big form where you will get to update the content.

This file you will edit is the one containing constants about the list builder. At the bottom of it, you’ll find a constant called `EQUALS_TIER_LIST` that looks like this:

```js
export const EQUALS_TIER_LIST = {
  date: '07/2021',
  value: '…',
}
```

Copy the piece of text associated to the `value` key (represented with `…` above) and open it on the site by pasting it at the end of this URL: https://stormbound-kitty.com/list/. This will open the current state of the equals list on the site.

There, do all your changes, then copy the new identifier from the URL. In the file, replace the current value with the new one, and update the date (MM/YYYY format).

## Submitting the change

At the bottom of the page, there is a “Propose file change” form. Fill the first field with the description of your change, such as “Update the equals list”. You can leave the description empty.

Once you’ve submitted this, you’ll be redirected to a page that invites you to create a “pull request” (that is, a code change suggestion). Click the big green “Create pull request” button, which should redirect you to your pull-request page.

From there, I can review your code addition, make changes if necessary, and merge it. You can just let me know you created a pull-request on Discord and I will have a look at it. :)
