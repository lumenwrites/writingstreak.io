import prisma from 'prisma/prismaClient'
import handler from "backend/handler"

async function updatePost(req, res) {
  const { slug, title, body, tags, published } = req.body
  const updatedPost = await prisma.post.update({
    where: { slug },
    data: {
      title,
      body,
      tags: { connect: tags?.map(t => ({ slug: t.slug })) },
      published: published,
      updatedAt: new Date(),
    },
  })
  res.json({ updatedPost })
}

export default handler().post(updatePost)
