# ToDo 
## Next Up
- Connect posts to days.
Click on day modal:
Created: list of posts
Edited: list of posts
- Spinner in post settings, indicate that they have been saved.  


## Bug
- Solve the sendgrid issue.
- learn to do custom emails on vercel domains

## Small

# MVP
Don't rush to launch:
- Max out all the minor issues. Maybe do feature parity.
- Create content. Course, posts, posts buffer, tweets buffer.
- Have a solid discord. r/OnlineBusiness and r/Bloggers if possible.
// Use it myself until I trust it with my own data.
// Figure out traction channels and growth strategies.
// Launch plan.
// After all this, talk to users and invite some of them personally to try the beta. Reach out to good writers/bloggers, offer them free accounts.
Implement user feedback. Only after all that move domains.

## Future
>> 3 extra things wst could be:
- Hemingway/grammarly (editing mode).
- Prolific Academy (30 days course, subscription community).
- Foster. Collab editing. If I can figure out how that works.


Habit strength is a meh indicator. Display progress towards the writing goal instead.
- Stripe integration.
	- Handle the subscription pauses/cancellations, trial expirations. Handle failed subscriptions because of insufficient funds. Simply in subscription-success redirect the user to "Something went wrong" or "Invalid payment" page.
	https://stripe.com/docs/billing/subscriptions/overview
	To resolve these scenarios:
	Notify the customer.
	Collect new payment information and confirm the payment intent.
	Update the default payment method on the subscription.
	- Emailing the customer when a payment fails
	You can set up several automatic retries and then cancel:
	https://stripe.com/docs/billing/subscriptions/overview#settings
	https://stripe.com/docs/billing/subscriptions/fixed-price#manage-subscription-payment-failur	- Terminating access when a subscription is canceled
	- Discounts.
	- Way to raise prices while grandfathering old users.
- Forum?
- Sequences
	- Should be attached to authors, posts
	- Need a way to rank posts in sequences
- Follow button. 
- Community
	- Discord server (+ support + course).
	- Give people status for writing quality comments, learn from that dude in foster academy (the tech loaf guy).
	- Leaderboard of the most active users
	- Daily accountability partner
- Marketing
	- Sharing incentive. Referral program, or discounts.
	- Affiliate system HypeFury is using: https://firstpromoter.com/
- Auth
	- Google/Twitter auth.
	- Password recovery/reset.
- Database
	- Upgrade the RDS instance, enable backups.
	- Learn to migrate the db without losing data.
	- Export. As markdown, html. Export all data. button in settings.
- Error handling.
- Templates like in typeshare. Essay, fiction, journaling. Guiding questions. Create your own templates.
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
	- Prompts.
- Make it procedural so that I could use the same code for rpga and nexy.
- Settings
	- Select dark/bright from a dropdown.
	- Make website/handle customizable in settings.
- Editor
	- Syntax highlighting. Ideally for godot.
	- Custom social image url
	- Upload images.
	- Hemingway and grammarly would be sick.
	https://tiptap.dev/experiments/linter

## Maybe
// Mobile app using whatever obsidian people are using.
- Upgrade your account to customize image footer.
- Best streak
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
## 2021-12-24
- Submit support request to ImprovMX
- Validate username/password when signing up. Fixed signup bug.
- Delete post confirmation dialog
- Fixed user profile meta.
- Allow users to create custom tags.
- Remember which tab is open using hashtags.
## 2021-12-23
- Tested failed credit card subscriptions - stripe does everything for me, I don't have to do anything, amazing.
- Now every time I renew my subscription, subscriptionExpires updates. The benefit of that is that if a user cancels subscription, he'll still keep access to the app until the end of the period.
- Post descriptions used to be overwritten on update, but they should only be initially generated when creating a post.
- Hide the "Upgrade" button in editor menu for upgraded accounts
- Cleaned up seeding, seeding tags.
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
