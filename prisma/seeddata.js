export const users = [
  {
    username: 'testuser',
    email: 'testuser@gmail.com',
    password: 'testpass',
    bio: "Test user.",
    website: 'https://lumenwrites.dev',
    twitter: 'lumenwrites',
  }
]

export const tags = [
  {
    name: 'On Writing',
    slug: 'writing',
  },
  {
    name: 'Fiction',
    slug: 'fiction',
  },
  {
    name: 'Non-fiction',
    slug: 'non-fiction',
  }
]

export const sequences = [
  {
    name: 'Startup Notes',
    slug: 'startup-notes',
  },
]

export const posts = [
  {
    title: 'Hello World!',
    body: `Welcome to Nexy!`,
    sequence: { connect: { id: 'startup-notes' } },
    tags: { connect: [{ id: 'writing' }, { id: 'startup' }] },
  },
]

export const comments = [
  {
    id: 'awesome-post',
    body: 'Awesome post, thanks for sharing!',
  },
  // {
  //   id: 'great-tips',
  //   body: positiveComments[Math.floor(Math.random() * positiveComments.length)],
  // },
  // {
  //   id: 'thanks1',
  //   parentId: 'awesome-post',
  //   author: { connect: { id: 'lumen' } },
  //   body: thankfulReplies[Math.floor(Math.random() * thankfulReplies.length)],
  // },
]

export const positiveComments = [
  'Awesome post, thanks for sharing!',
  'Very insightful ideas, thank you for writing this.',
  "I really enjoy learning from other people's ideas, and your blog posts are very helpful.",
  'This is gonna be useful.',
  'Good info, thanks! ',
  'This is a very inspiring article.',
  'Thanks for sharing, this is very useful information.',
  'I always enjoy reading your posts.',
  'Looking forward to reading more. Great blog.',
  'Thanks for taking the time to write this.',
  'I am very grateful for your blog. Really looking forward to read more. Keep writing.',
  'Very helpful tips especially the last part :)',
  'Bookmarked',
]

export const thankfulReplies = [
  "Thanks, I'm really glad you liked it!",
  "That's great, I'm happy you found it useful.",
  "Thank you for that, it's nice to hear from you.",
  'Thank you for your positive comments! I really appreciate them!',
  "That's great to hear! Thank you for reading.",
  "Thank you! I'm glad you enjoyed it.",
  'Much appreciated! Good to hear from you.',
]
