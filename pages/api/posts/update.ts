import prisma from 'prisma/prismaClient'
import handler from "backend/handler"

async function updatePost(req, res) {
  const { slug, title, body, description, tags, published } = req.body
  const updatedPost = await prisma.post.update({
    where: { slug },
    data: {
      title,
      body,
      description,
      tags: { set: tags?.map(t => ({ slug: t.slug })) },
      published: published,
      updatedAt: new Date(),
    },
    include: {
      tags: true
    }
  })
  res.json({ updatedPost })
}

export default handler().post(updatePost)
