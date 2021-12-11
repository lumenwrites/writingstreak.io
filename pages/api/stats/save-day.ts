import slugify from 'slugify'
import cuid from 'cuid'
import prisma from 'prisma/prismaClient'
import handler from "backend/handler"
import moment from 'moment'

async function saveDay(req, res) {
  try {
    const { targetWordCount, wordCount, writingTime } = req.body
    console.log(moment().format('YYYY-MM-DD').toString())
    console.log({ targetWordCount, wordCount, writingTime })
    const data = {
      targetWordCount,
      wordCount,
      writingTime,
      author: { connect: { id: req.user.id } },
    }
    const day = await prisma.day.upsert({
      where: {
        // https://flaviocopes.com/prisma-multiple-fields-unique-key/
        authorId_date: {
          date: moment().format('YYYY-MM-DD').toString(),
          authorId: req.user.id,
        }
      },
      update: {
        targetWordCount,
        wordCount,
        writingTime,
        author: { connect: { id: req.user.id } },
      },
      create: {
        date: moment().format('YYYY-MM-DD'),
        targetWordCount,
        wordCount,
        writingTime,
        author: { connect: { id: req.user.id } },
      }
    })

    res.json({ day })
  } catch (error) {
    console.log('[post create error]', error) // JSON.stringify(error, null, 2))
    res.json({ error })
  }
}

export default handler().post(saveDay)
