# ToDo 
## Nextup:
- Set up established tags.

## Bug
- react tooltip doesn't appear if you navigate to the page instead of refreshing
- Hide the "Upgrade" button in editor menu for upgraded accounts
- Ah, Ill need to handle subscrption cancellations in a separate field. Because if the user has cancelled, I still want them to be able to use it until the end of the trial period.
- Test failed credit card subscriptioms.
- Solve the sendgrid issue.
- Why didn't my custom post descriptions get seeded?

## Small: 
- About page with contact info.
- Edit post description and maybe slug.
- Canonical urls.
- Upgrade your account to customize image footer.
- Best streak
- Validate username/password when signing up.
	Add my slugify username vaildation trick from settings to login form.
- Settings tab should add hashtag to the url to go to the correct tab.
- Add pointer cursor to the screenshots.
- learn to do custom emails on vercel domains
- Remove the ugly gear icon at the bottom, do something else instead. Or just add "Post Settings" words to it.
- Delete post confirmation dialog
- spinner in post settings, indicate that they have been saved.  
- 
## Future
- Stripe integration.
	- Handle failed subscriptions because of insufficient funds. Simply in subscription-success redirect the user to "Something went wrong" or "Invalid payment" page.
	https://stripe.com/docs/billing/subscriptions/overview
	To resolve these scenarios:
	Notify the customer.
	Collect new payment information and confirm the payment intent.
	Update the default payment method on the subscription.
	- Emailing the customer when a payment fails
	You can set up several automatic retries and then cancel:
	https://stripe.com/docs/billing/subscriptions/overview#settings
	https://stripe.com/docs/billing/subscriptions/fixed-price#manage-subscription-payment-failure
	- Terminating access when a subscription is canceled
	- Handle the subscription pauses/cancellations, trial expirations. 
	- Update subscription expires date.
	- Discounts.
	- Way to raise prices while grandfathering old users.
- Can I have custom post slugs? That'd be sick.
- Let users create their own tags?
- Forum?
- Sequences
	- Should be attached to authors, posts
	- Need a way to rank posts in sequences
- Password recovery/reset for users who signed up with gmail.
- Incrntivize feedback and good commenting as much as possible. Give people prominent urls to their profiles if nothing else. Maybe even a follow button. Give people status for writing quality comments, learn from that dude in Forem academy (the tech loaf guy)
	Affiliate system HypeFury is using: https://firstpromoter.com/
- Hemingway and grammarly would be sick.
https://tiptap.dev/experiments/linter
- Discord server (+ support + course).
- Leaderboard of the most active users
- Google/Twitter auth.
- Sharing incentive. Referral program, or discounts.
- Upgrade the RDS instance, enable backups.
- Learn to migrate the db without losing data.
- Canonical and prominent links - use wst as a tool, write anywhere, use our community for feedback/support, AND get free traffic to your own thing.
- Templates like in typeshare. Essay, fiction, journaling. Guiding questions. Create your own templates.
- Prompts.
- Error handling.
- Analytics: See the active users. Last logged in field on user, last wrote.
- Feature parity with wst1:
	- Burndown chart
	- Email reminders when it's time to write
	- Typewriter mode.
	- Blur text
	- Simple Writing (use only 1000 most common words)
	- Prompts
	- Dark theme.
	- Export
	- Full screen
	- Hotkeys
- Mobile app using whatever obsidian people are using.
- Make it procedural so that I could use the same code for rpga and nexy.
- Settings
	- Select dark/bright from a dropdown.
	- Make website/handle customizable in settings.
- Editor
	- Syntax highlighting. Ideally for godot.
	- Upload images.
##Community
- Daily accountability partner

## Maybe
- Autocreate the post
- Migrate the old database.
	- Learn to turn slate into html.
	- Use their email before @ as their username

## Fast
- Split CSS into modules.

## Clean
## Question
## Launch

## Archive
# Done
## 2021-12-23
- Rebuilding react tooltip on route change.
- Post settings. Custom slug, description, canonical url.
## 2021-12-22
- Webhooks work. When subscription updates, I update customer plan in the db, just in case.
- Checkout success redirects to api routes, which update the db, and then redirect to the app, which now fetches the freshly updated user.
- Trial status.
	- If trial expired, / and /post/create redirects to paywall.
	- If trial has not expired, paywall redirects to /.
- Showing the paywalled publish button and the upgrade/manage subscription button in settings.
- Also save button toggles properly when I edit title and tags.
## 2021-12-21
- Thank you and cancelled pages.
- Saving stripe user and subscription info into the db.
- Have a subscription status enum, can upgrade it, can fetch it.
## 2021-12-19
- Fixee the bug where I forgot to save the day stats..
- Landing page is well designed and functional.
- Tooltips are gorgeous and work great.
- Plugged settings into stats, it seems to be working! In the image footer as well.
- Loading days and profile bio/twitter/website, profile pages are better now.
- Refactored timeline, much simpler. Loading days in getSSP.
- Refactored editor context to be in Editor, so much simpler.
- Account and writing settings are updated and saved.
## 2021-12-18
- Settings tabs look great.
- Displaying both landing page and editor at index.
- Guarding post/edit and settings.
## 2021-12-14
- Basic stripe checkout setup
- Basic paywall
- Basic header
- Github heatmap on profiles.
- Tooltips
## 2021-12-13
- Tried setting up stripe, discord conversation with support.
- Made "Writing for Startup Founders" ConvertKit newsletter  with a ton of value prop.
- Counting words on space press works.
## 2021-12-11
Too much stuff to mention in the last few days.
Completed atomic essays generator, designed new superior writing streak toolbar,
merged it with nexy, now I have a superior writing streak + nexy with crud + beautifully designed editor.
- Writing streak widget.
- Fix safari rendering bugs (timeline fade, title line height).
- Make dropdowns drop up.
- refactor editor
## 2021-12-07
Built and deployed the whole Atomic Essays editor in one day, amazing.
