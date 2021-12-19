import prisma from 'prisma/prismaClient'

export async function getDays(user, numberOfDays) {
  const days = await prisma.day.findMany({
    where: { authorId: user.id },
    orderBy: [{ date: 'desc' }],
    take: numberOfDays, //31
  })
  return days
}
