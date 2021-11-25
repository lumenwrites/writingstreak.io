// @ts-nocheck
import { PrismaClient, Prisma } from '@prisma/client'
import { hash } from 'bcryptjs'
import slugify from 'slugify'
import { users, sequences, tags, posts, comments } from './seeddata'
import processedMarkdownPosts from 'backend/json/posts/posts.json'

const prisma = new PrismaClient()

async function main() {
  console.log(`Seeding the db...`)
  await prisma.comment.deleteMany()
  await prisma.post.deleteMany()
  await prisma.tag.deleteMany()
  await prisma.sequence.deleteMany()
  await prisma.user.deleteMany()

  let userIds = [] // When I create a post, I connect it to a user id
  for (let user of users) {
    user.password = await hash(user.password, 10)
    const createdUser = await prisma.user.create({ data: user })
    userIds.push(createdUser.id)
    console.log(`Created user ${createdUser.username} with id: ${createdUser.id}`)
  }
  for (let sequence of sequences) {
    sequence.id = sequence.slug
    const createdSequence = await prisma.sequence.create({ data: sequence })
    console.log(`Created sequence: ${createdSequence.slug}`)
  }
  let postIds = [] // When I create a comment, I connect it to post id
  for (let markdownPost of processedMarkdownPosts) {
    // post.slug = slugify(post.title, { lower: true, strict: true })
    for (let tag of post.tags) {
      tag.id = tag.slug
      // Create tag if it doesn't exist
      const createdTag = await prisma.tag.upsert({
        where: { id: tag.id },
        update: {},
        create: {
          name: tag.name,
          slug: tag.slug,
        },
      })
      console.log(`Created tag: ${createdTag.slug}`)
    }
    const post = {
      slug: markdownPost.slug,
      canonicalUrl: `https://lumenwrites.io/post/${markdownPost.slug}`,
      published: true,
      title: markdownPost.title,
      body: markdownPost.body,
      description: markdownPost.description,
      // Random author
      author: { connect: { id: userIds[Math.floor(Math.random() * userIds.length)] } }, // userIds[0]
      // Random upvoters
      upvoters: {
        connect: [
          { id: userIds[Math.floor(Math.random() * userIds.length)] },
          { id: userIds[Math.floor(Math.random() * userIds.length)] }
        ]
      },
      // Connect to the tags I've just created
      tags: { connect: post.tags.map(tag => ({ id: tag.slug })) },
      rank: Math.random(),
      views: Math.floor(Math.random() * 100),
    }

    const createdPost = await prisma.post.create({ data: post })
    postIds.push(createdPost.id)
    console.log(`Created post: ${createdPost.slug}`)
  }
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
