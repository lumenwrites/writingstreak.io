# ToDo 
## Next Up
- Connect posts to days.
Click on day modal:
Created: list of posts
Edited: list of posts
- Spinner in post settings, indicate that they have been saved.  
- I gotta learn to run scripts on my db that aren't just "seed".
- Add typewriter mode and blurred mode in settings? Or hotkeys?
- Production keys. Stripe, convertkit.
- I should definitely try to implement editor in slate, and see if I can switch them if needed.
- Dev and prod migrations

## Bug
- Solve the sendgrid issue.

## Small
- Manually enter wordcount and time if you write something in another editor.
	(in Day modal) https://app.writinganalytics.co/new-words
- Tutorial in the editor.
- Gorgeous landing page like in writinganalytics.

## Open Questions
- How can I make the community good?
How do I make content good if it's daily writing?
Accountability buddies?
- Best audience to seed the community?
- Fiction vs nonfiction?
- How can you track changes?
Revisions - do you just store an array of old htmls, potentially naming them?
And then you do the diff and just show what changed?
https://prosemirror.net/examples/track/

## MVP
What do I REALLY need to launch?
- Confidence in my ability to edit and modify the database without losing data.
- Seed content. Aka my own writing habit.
- Some plan for the community, and people I want to seed it with.
Don't rush to launch:
- Max out all the minor issues. Maybe do feature parity.
- Create content. Course, posts, posts buffer, tweets buffer.
- Have a solid discord. r/OnlineBusiness and r/Bloggers if possible.
// Use it myself until I trust it with my own data. Develop my own habit.
// Figure out traction channels and growth strategies.
// Launch plan.
// After all this, talk to users and invite some of them personally to try the beta. Reach out to good writers/bloggers, offer them free accounts.
Implement user feedback. Only after all that move domains.

## Futue
- Sequences
	- Should be attached to authors, posts.
	- Need a way to sort posts in sequences
- Draft versioning and tracking changes.
	Keep all previous versions of the post.
	See the diff.
	Go back to the original.
	Tracking changes - total words added and removed, per time,
- Hemingway/grammarly (editing mode).
	Readability - Highlight sentences that are hard or very hard to read
	Passive Voice - Highlight passive voice as in crisis {was averted}
	Adverbs - Highlight adverbs like {quickly} or {loudly}
	Style - Highlight phrases that can be simplified like {a number of}
	Duplicate Words - Highlight duplicate words words
	Highlight custom words
	https://tiptap.dev/experiments/linter
- Prolific Academy (30 days course, subscription community).
- Foster. Collab editing. Use what they do to improve community.
- Stripe integration.
	- Handle the subscription pauses/cancellations, trial expirations. 
		Handle failed subscriptions because of insufficient funds. Simply in subscription-success redirect the user to "Something went wrong" or "Invalid payment" page.
		https://stripe.com/docs/billing/subscriptions/overview
		To resolve these scenarios:
		Notify the customer.
		Collect new payment information and confirm the payment intent.
		Update the default payment method on the subscription.
		- Emailing the customer when a payment fails
		You can set up several automatic retries and then cancel:
		https://stripe.com/docs/billing/subscriptions/overview#settings
		https://stripe.com/docs/billing/subscriptions/fixed-price#manage-subscription-payment-failur	
		- Terminating access when a subscription is canceled
	- Way to raise prices while grandfathering old users.
	- Yearly membership (cheaper).
	- Integrated into my website instead of using checkout.
- Community
	- Follow button. Following list in /browse. Useful for nexy anyway.
	- Discord server (+ support + course).
	- Give people status for writing quality comments, learn from that dude in foster academy (the tech loaf guy).
	- Leaderboard of the most active users
	- Daily accountability partner. Writingbuddies discord channel.
	- Forum tag?
	- Categories? Fiction/nonfiction? And tags are in these categories?
	- Email notifications on comments.
- Marketing
	- Affiliate program.
	https://www.writinganalytics.co/affiliates/
	https://firstpromoter.com/
	- Free writing tools.
		- Word counter
		https://www.writinganalytics.co/word-counter/
		- Writing quotes
		https://www.writinganalytics.co/quotes/
		- Writing planner
		https://www.writinganalytics.co/writing-planner/
		How long does it take to write a book?
		Goal, start date, deadline, writing days.
- Database
	- Upgrade the RDS instance, enable backups.
	- Learn to migrate the db without losing data.
	- Export. As markdown, html. Export all data. button in settings.
- Technical/clean
	- Correct error handling.
- Auth
	- Password recovery/reset.
	- Verify email.
- Settings
	- Change password.
	- Select dark/light theme from a dropdown.
	- Email: receive product updates, notifications on your personal activity, personalized reports on your activity. Daily writing prompts and writing reminders.
	- First day of the week (sunday/monday).
	- Download all your data.
- Editor
	- Functional and styled code blocks. Syntax highlighting. Ideally for godot.
	- Custom social image url
	- Upload images.
	- Hemingway and grammarly would be sick.
- Feature parity with wst1:
	- Email reminders when it's time to write
	- Typewriter mode.
	- Blur text
	- Simple Writing (use only 1000 most common words)
	- Dark theme.
	- Export
	- Full screen
	- Hotkeys
	- Prompts.
- Writing Analytics:
	https://www.writinganalytics.co/
	- Writing vs revision sessions?
	- Current streak, longest streak. 
	   Writing speed in words per hour.
	- Pretty badges.
	https://app.writinganalytics.co/overview
	- Automatically track time and focus in the editor 
	  (stop when you don't tab away elsewhere).	
	- Writing session stats.
	https://app.writinganalytics.co/session/61c7912e95f14600126d278d
		- Time spent.
		- Words written.
		- Words per minute.
		- Words over time chart.
		- Changes. How many words written, how many deleted.
		Tracked over time
		- Engagement. Your focus over time.
		- Stats. Characters, sentences, paragraphs, pages(??).
		- Readability. Word length, sentence length, readability score, reading time.
	- Pretty project dashboard
		Average speed in words per hour.
		Average session length.
		Average wordcount per day/week/month/year
		Average writing time per day/week/month/year
		Highlights
			- Longest streak.
			- Best writing day.
			- Longest day.
			- Top speed.
			- Ernest Hemingway Days ?
			- Stephen King Days
			- Recent entries/changes?
			- Total words chart.  This month/year/etc.
	- Charts he's using: https://gionkunz.github.io/chartist-js/

- Other
	- Make it procedural so that I could use the same code for rpga and nexy.	
	
## Maybe
- You can save every few seconds into local storage, and every minute to server
- make sure post title Isn't empty
- Maybe calendar should mark published days as well,
- Progress bar above the chart.
- Days dates should be set as datetime?
// Mobile app using whatever obsidian people are using.
// My own r/WritingPrompts
- Upgrade your account to customize image footer.
- Best streak
- Autocreate the post
- Google/Twitter auth. - google doesn't have username, twitter doesn't have email.
- Analytics: See the active users. Last logged in field on user, last wrote.
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
## 2021-12-25
- Old wst is now running at old.writingstreak.io. Notification is done.
- Removed extra rerenders by putting all state updates in one place.
- Stripe event verification works.
- I could use canonical url to customize the twitter image url!!
- for timeline generation, limit the number of days to 30. For graph, limit to how many fit in the graph, or change interval
- Add "deadline has passed" warning in settings.
- Stripe promotion codes work.
- Improved the landing page a bit. Cleaner, pricing and sharing incentive.
- Writing streak and chart now interactively display todays words.
- Better way to load today's stats into the timeline
- Add pretty react number inputs with words placeholder in them.
## 2021-12-24
- Figured out improvmx domain forwarding.
- Implemented and perfected the charts, implemented long-term writing goal settings, long-term writing goal is displayed in writing streak progress bar and tooltip. Added to the landing page too.
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
