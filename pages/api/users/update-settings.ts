import prisma from 'prisma/prismaClient'
import handler from "backend/handler"

async function updateSettings(req, res) {
  const { id, username, email, bio, website, writingDays, targetWordcount, sprintPace, sprintDuration } = req.body
  const updatedUser = await prisma.user.update({
    where: { id: req.user.id },
    data: { username, email, bio, website, writingDays, targetWordcount, sprintPace, sprintDuration },
  })
  res.json({ updatedUser })
}

export default handler().post(updateSettings)