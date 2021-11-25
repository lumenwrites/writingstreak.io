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
  post.comments = processComments(post.comments)
  return post
}

// Flat comments to tree
function processComments(comments) {
  console.log('Process comments', comments)
  let processedComments = []
  for (let comment of comments) {
    if (!comment.parentId) {
      comment.children = comments.filter(c => c.parentId === comment.id)
      processedComments.push(comment)
    }
  }
  return processedComments
}
