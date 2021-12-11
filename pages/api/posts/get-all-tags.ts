import handler from "backend/handler"
import prisma from 'prisma/prismaClient'

async function getAllTags(req, res) {
  try {
    const allTags = await prisma.tag.findMany()
    res.json({ allTags })
  } catch (error) {
    console.log(error)
    res.json({ error })
  }
}

export default handler().get(getAllTags)

