import prisma from 'prisma/prismaClient'
import handler from "backend/handler"

async function updateSettings(req, res) {
  const { id, username, email, bio, website, twitter, writingDays, targetWordcount, sprintPace, sprintDuration, blurredMode, typewriterMode, startDate, endDate, writingGoal } = req.body
  const updatedUser = await prisma.user.update({
    where: { id: req.user.id },
    data: { username, email, bio, website, twitter, writingDays, targetWordcount, sprintPace, sprintDuration, blurredMode, typewriterMode, startDate, endDate, writingGoal },
  })
  res.json({ updatedUser })
}

export default handler().post(updateSettings)
