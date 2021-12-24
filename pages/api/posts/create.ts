import slugify from 'slugify'
import cuid from 'cuid'
import prisma from 'prisma/prismaClient'
import handler from "backend/handler"

async function createPost(req, res) {
  try {
    const { title, body, description, tags } = req.body
    const upsertTags = await Promise.all(tags.map(async (tag) =>
      await prisma.tag.upsert({
        where: { slug: tag.slug },
        create: tag,
        update: tag,
      }),
    ))
    const post = await prisma.post.create({
      data: {
        title: title,
        body: body,
        description: description,
        slug: `${slugify(title, { lower: true, strict: true })}-${cuid().substring(0, 5)}`,
        author: { connect: { id: req.user.id } },
        tags: { connect: tags?.map(t => ({ slug: t.slug })) },
        upvoters: { connect: { id: req.user.id } },
        score: 1,
        published: false,
      },
    })
    res.json({ post })
  } catch (error) {
    console.log('[post create error]', error) // JSON.stringify(error, null, 2))
    res.json({ error })
  }
}

export default handler().post(createPost)
