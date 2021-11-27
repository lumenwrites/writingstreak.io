import prisma from 'prisma/prismaClient'
import handler from "backend/handler"

async function upvotePost(req, res) {
  const { slug } = req.body
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { upvoters: true },
  })
  const hasUpvoted = post.upvoters.find(u => u.id === req.user.id)
  if (hasUpvoted) { // Unupvote
    await prisma.post.update({
      where: { slug },
      data: {
        upvoters: { disconnect: { id: req.user.id } },
        score: { decrement: 1 },
      },
    })
    return res.json({ message: "Un-upvoted post." })
  }
  await prisma.post.update({
    where: { slug },
    data: {
      upvoters: { connect: { id: req.user.id } },
      score: { increment: 1 },
    },
  })
  return res.json({ message: "Upvoted post." })
}

export default handler().post(upvotePost)
