import handler from "backend/handler"
import prisma from 'prisma/prismaClient'

async function getDays(req, res) {
  try {
    const days = await prisma.day.findMany({
      where: {
        authorId: req.user.id,
      }
    })
    res.json({ days })
  } catch (error) {
    console.log(error)
    res.json({ error })
  }
}

export default handler().get(getDays)

