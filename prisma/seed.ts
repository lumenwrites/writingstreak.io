// @ts-nocheck
import { PrismaClient, Prisma } from '@prisma/client'
import { hash } from 'bcryptjs'
import slugify from 'slugify'
import { users, sequences, tags, posts, comments } from './seeddata'

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
  for (let tag of tags) {
    tag.id = tag.slug
    const createdTag = await prisma.tag.create({ data: tag })
    console.log(`Created tag: ${createdTag.slug}`)
  }
  let postIds = [] // When I create a comment, I connect it to post id
  for (let post of posts) {
    post.published = true
    post.slug = slugify(post.title, { lower: true, strict: true })
    post.canonicalUrl = `https://lumenwrites.io/post/${post.slug}`
    post.author = { connect: { id: userIds[Math.floor(Math.random() * userIds.length)] } } // userIds[0]
    
    post.upvoters = { connect: [{ id: userIds[Math.floor(Math.random() * userIds.length)] }] } // userIds[0]
    post.rank = Math.random()
    post.views = Math.floor(Math.random() * 100)
    
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
