import moment from 'moment'
import { PrismaClient, Prisma } from '@prisma/client'
import { hash } from 'bcryptjs'
import slugify from 'slugify'
import { users, sequences, tags, posts, comments, positiveComments, thankfulReplies } from './seeddata'
import processedMarkdownPosts from '../backend/json/out/posts.json'

const prisma = new PrismaClient()

async function SeedUsers(users) {
  let userIds = [] // When I create a post, I connect it to a user id
  for (let seedUser of users) {
    const user = {
      id: seedUser.username,
      username: seedUser.username,
      email: seedUser.email,
      password: await hash(seedUser.password, 10),
      bio: seedUser.bio || "",
      website: seedUser.website || "",
      twitter: seedUser.twitter || "",
      writingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      writingGoal: 5000,
      startDate: moment().subtract(15, "days").toDate(),
      endDate: moment().add(5, "days").toDate(),
    }
    const createdUser = await prisma.user.create({ data: user })
    userIds.push(createdUser.id)
    console.log(`Created user ${createdUser.username} with id: ${createdUser.id}`)
  }
  return userIds
}
async function SeedSequences(sequences) {
  for (let sequence of sequences) {
    const createdSequence = await prisma.sequence.create({
      data: {
        id: sequence.slug,
        name: sequence.name,
        slug: sequence.slug
      }
    })
    console.log(`Created sequence: ${createdSequence.slug}`)
  }
}
async function SeedTags(tags) {
  for (let tag of tags) {
    const createdTag = await prisma.tag.create({
      data: {
        id: tag.slug,
        name: tag.name,
        slug: tag.slug
      }
    })
    console.log(`Created tag: ${createdTag.slug}`)
  }
}
async function SeedPosts(processedMarkdownPosts, userIds) {
  let postIds = [] // When I create a comment, I connect it to post id
  let i = 0
  for (let markdownPost of processedMarkdownPosts) {
    i += 1
    // post.slug = slugify(post.title, { lower: true, strict: true })
    // for (let tag of markdownPost.tags) {
    //   // Create tag if it doesn't exist
    //   const createdTag = await prisma.tag.upsert({
    //     where: { slug: tag.slug },
    //     update: {},
    //     create: {
    //       id: tag.slug,
    //       name: tag.name,
    //       // slugify(tag.name, { lower: true, strict: true }),
    //       slug: tag.slug,
    //     },
    //   })
    //   console.log(`Created tag: ${createdTag.slug}`)
    // }
    const randomScore = Math.floor(Math.random() * 5)
    userIds = userIds.sort(() => Math.random() - 0.5) // shuffle
    const upvoters = userIds.slice(0, randomScore).map((userId) => ({ id: userId }))
    const post = {
      id: markdownPost.slug,
      slug: markdownPost.slug,
      createdAt: pastDate(i),
      canonicalUrl: `https://lumenwrites.io/post/${markdownPost.slug}`,
      published: true,
      title: markdownPost.title,
      body: markdownPost.body,
      description: markdownPost.description,
      // Random author
      author: { connect: { id: 'lumen' } }, // userIds[Math.floor(Math.random() * userIds.length)]
      // Random upvoters
      score: randomScore,
      upvoters: { connect: upvoters },
      rank: 1000 - i, // Posts are manually sorted. // Math.random(),
      views: Math.floor(Math.random() * 100),
      sequence: { connect: { id: 'startup-notes' } },
      // Connect to the tags I've just created
      tags: { connect: markdownPost.tags.map(tag => ({ id: tag.slug })) },
      socialImage: markdownPost.social, // { create: { name: "social-image", url: markdownPost.social }, },
    }
    const createdPost = await prisma.post.create({ data: post })
    postIds.push(createdPost.id)
    console.log(`Created post: ${createdPost.slug}`)
  }
  return postIds
}
async function SeedDays(numberOfDays = 90) {
  const end = moment() // today
  const start = moment().subtract(numberOfDays, 'days') // 30 days ago
  const days = []
  for (var d = start; start.diff(end, 'days') <= 0; d.add(1, 'days')) {
    if (Math.random() < 0.05) continue //25% chance of missing a day
    const day = {
      id: d.format('YYYY-MM-DD'),
      date: d.format('YYYY-MM-DD'),
      author: { connect: { id: 'lumen' } },
      wordCount: Math.floor(Math.random() * 300),
      targetWordCount: 5,
      writingTime: Math.floor(Math.random() * 24) * 5,
    }
    const createdDay = await prisma.day.create({ data: day })
  }
}

async function SeedComments(userIds, postIds) {
  let comments = []
  let posComs = [...positiveComments]
  posComs = posComs.sort(() => Math.random() - 0.5) // shuffle
  postIds = postIds.sort(() => Math.random() - 0.5) // shuffle
  const commenterIds = userIds.filter(id => id !== 'lumen')
  for (let userId of commenterIds) {
    for (let postId of postIds) {
      if (Math.random() > 0.5) continue
      if (posComs.length === 0) continue
      const randomPositiveComment = posComs.pop() // positiveComments[Math.floor(Math.random() * positiveComments.length)]
      // console.log('Comment', positiveComment)
      const comment = {
        id: slugify(randomPositiveComment.substring(0, 20), { lower: true, strict: true }),
        body: randomPositiveComment,
        parent: undefined, // seedComment.parentId ? { connect: { id: seedComment.parentId } } : undefined,
        author: { connect: { id: userId } }, // seedComment.author ? seedComment.author : { connect: { id: randomUser } },
        post: { connect: { id: postId } }, // postIds[0] 
        // Random upvoters
        upvoters: {
          connect: [
            { id: userIds[Math.floor(Math.random() * userIds.length)] },
            { id: userIds[Math.floor(Math.random() * userIds.length)] },
            { id: userIds[Math.floor(Math.random() * userIds.length)] },
            { id: userIds[Math.floor(Math.random() * userIds.length)] },
            { id: userIds[Math.floor(Math.random() * userIds.length)] }
          ]
        },
      }
      const createdComment = await prisma.comment.create({ data: comment })
      console.log(`Created comment: ${createdComment.id} on post ${postId} from ${userId}.`) // Parent: ${createdComment.parentId}
      comments.push({
        id: createdComment.id,
        postId: postId
      })
    }
  }

  let replies = [...thankfulReplies]
  replies = replies.sort(() => Math.random() - 0.5) // shuffle
  for (let userComment of comments) {
    if (Math.random() < 0.25) continue
    if (replies.length == 0) continue
    const randomThankfulReply = replies.pop() // [Math.floor(Math.random() * thankfulReplies.length)]
    // console.log('randomThankfulReply', randomThankfulReply, replies)
    const comment = {
      id: slugify(randomThankfulReply.substring(0, 20), { lower: true, strict: true }),
      body: randomThankfulReply,
      parent: { connect: { id: userComment.id } },
      author: { connect: { id: 'lumen' } }, // seedComment.author ? seedComment.author : { connect: { id: randomUser } },
      post: { connect: { id: userComment.postId } }, // postIds[0] 
      // Random upvoters
      upvoters: {
        connect: [
          { id: userIds[Math.floor(Math.random() * userIds.length)] },
          { id: userIds[Math.floor(Math.random() * userIds.length)] }
        ]
      },
    }
    const createdComment = await prisma.comment.create({ data: comment })
    console.log(`Created reply: ${createdComment.id}. Parent: ${createdComment.parentId}`)
  }
}

async function main() {
  console.log(`Seeding the db...`)
  await prisma.comment.deleteMany()
  await prisma.day.deleteMany()
  await prisma.post.deleteMany()
  await prisma.tag.deleteMany()
  await prisma.sequence.deleteMany()
  await prisma.user.deleteMany()

  await SeedSequences(sequences)
  await SeedTags(tags)
  const userIds = await SeedUsers(users)
  const postIds = await SeedPosts(processedMarkdownPosts, userIds)
  await SeedComments(userIds, postIds)
  await SeedDays(90)



  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

function pastDate(daysAgo) {
  var date = new Date();
  var pastDate = new Date(date.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
  var day = pastDate.getDate();
  var month = pastDate.getMonth() + 1;
  var year = pastDate.getFullYear();
  return pastDate
}
