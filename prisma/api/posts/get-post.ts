// @ts-nocheck
import prisma from 'prisma/prismaClient'
import { markdownToHtml } from 'backend/markdown'

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
  post.body = await markdownToHtml(post.body)
  let renderedComments = []
  for (let comment of post.comments) {
    const renderedComment = {
      ...comment,
      body: await markdownToHtml(comment.body)
    }
    renderedComments.push(renderedComment)
  }
  post.comments = renderedComments
  return post
}

