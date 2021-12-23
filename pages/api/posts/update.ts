import prisma from 'prisma/prismaClient'
import handler from "backend/handler"

async function updatePost(req, res) {
  const { slug, title, body, description, tags, published, updatedPostSlug, canonicalUrl, socialTitle, socialDescription } = req.body
  const updatedPost = await prisma.post.update({
    where: { slug },
    data: {
      title,
      body,
      description,
      slug: updatedPostSlug,
      tags: { set: tags?.map(t => ({ slug: t.slug })) },
      published: published,
      updatedAt: new Date(),
      canonicalUrl, socialTitle, socialDescription 
    },
    include: {
      tags: true
    }
  })
  res.json({ updatedPost })
}

export default handler().post(updatePost)
