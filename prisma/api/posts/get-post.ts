// @ts-nocheck
import prisma from 'prisma/prismaClient'

export async function getPost({ slug }) {
  let post = await prisma.post.findUnique({
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
      // socialImage: {
      //   select: {
      //     url: true
      //   }
      // },
      comments: {
        select: {
          id: true,
          parentId: true,
          body: true,
          author: {
            select: {
              username: true
            }
          },
          upvoters: {
            select: {
              username: true
            }
          }
        }
      },
    }
  })
  return post
}

