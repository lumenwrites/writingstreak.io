import prisma from 'prisma/prismaClient'
import handler from "backend/handler"

async function deletePost(req, res) {
  const { slug } = req.body
  await prisma.post.delete({ where: { slug } })
  res.json({ message: "Successfully deleted post."})
}

export default handler().post(deletePost)
