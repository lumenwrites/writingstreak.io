// @ts-nocheck
import prisma from 'prisma/prismaClient'

export async function getPost({ slug }) {
  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      tags: true,
      upvoters: {
        select: {
          username: true
        }
      },
      author: {
        select: {
          username: true
        }
      },
      comments: {
        select: {
          body: true,
          author: {
            select: {
              username: true
            }
          },
        }
      },
    }
  })

  return post
}
