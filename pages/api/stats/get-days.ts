import handler from "backend/handler"
import prisma from 'prisma/prismaClient'

async function getDays(req, res) {
  try {
    const { username, numberOfDays } = req.body
    let authorId
    if (username) {
      // On profile I pass username and show profile's stats
      const author = await prisma.user.findUnique({ where: { username } })
      authorId = author.id
    } else {
      // In editor, I show the logged in user's stats
      authorId = req.user.id
    }
    const days = await prisma.day.findMany({
      where: { authorId },
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

