
import prisma from 'prisma/prismaClient'
import handler from "backend/handler"


async function createComment(req, res) {
  try {
    const { body, parentId, postId } = req.body
    console.log('[comments/create] creating comment', { body, parentId, postId })
    const createdComment = await prisma.comment.create({
      data: {
        body: body,
        author: { connect: { id: req.user.id } },
        post: { connect: { id: postId } },
        parent: parentId ? { connect: { id: parentId } } : undefined,
      },
      include: {
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
    })
    res.json({ createdComment })
  } catch (error) {
    console.log('[comments/create] error', error)
    // TODO When there's an error, client receives an empty object for some reason
    res.json({ error: "Something went wrong." })
    // if (error.code === '') res.json({ error: "."})
  }
  
}

export default handler().post(createComment)
