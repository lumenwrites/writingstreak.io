# Course Publishing Platform
Turn your markdown files (for example, a folder inside of the Obsidian vault) into a course you can sell online.

## Setup Instructions
Enter the website data in .config

## Set up .env keys
MONGODB_URI  
Create a database in MongoDB Atlas, get its connection string.
JWT_SECRET  
Enter any random string of letters.

SENDGRID_API_KEY  
Create a sendrgid account (for sending emails to your users) and get your [api key](https://app.sendgrid.com/settings/api_keys).

For email-gated courses, set up convert kit.
CONVERT_KIT_API_KEY
Get it [here](https://app.convertkit.com/account_settings/advanced_settings)
CONVERT_KIT_FORM_ID
Learn how to get it [here](https://www.tassos.gr/joomla-extensions/convert-forms/docs/sync-leads-with-convertkit)

To accept payments - set up and activate stripe account
NEXT_PUBLIC_STRIPE_CLIENT_SECRET
STRIPE_SECRET
Kesy are available [here](https://dashboard.stripe.com/apikeys)
WEBHOOK_ENDPOINT_SECRET
Webhook keys are available [here](https://stripe.com/docs/webhooks/signatures)

## Course Content
[TODO] Set up the path to the content folder in config.json
Put your lectures inside folders starting with number.
`.ignore` file to ignore folders.

Frontmatter sample:
```
---
title: 
slug: 
description: 
thumbnail: 
preview: false
draft: false
---
```
