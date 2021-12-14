import handler from "backend/handler"
import prisma from 'prisma/prismaClient'

async function getDays(req, res) {
  try {
    const { username, numberOfDays } = req.body
    const author = await prisma.user.findUnique({ where: { username } })
    const days = await prisma.day.findMany({
      where: {
        authorId: author.id,
      },
      orderBy: [{ date: 'desc' }],
      take: numberOfDays, //31
    })
    res.json({ days })
  } catch (error) {
    console.log(error)
    res.json({ error })
  }
}

export default handler().post(getDays)

