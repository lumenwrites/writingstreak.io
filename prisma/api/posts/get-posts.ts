// @ts-nocheck
import prisma from 'prisma/prismaClient'

export async function getPosts({ username, published, tagSlug, searchString, sort, skip, take }) {
  console.log(`Get posts. Sorting: ${sort}`)
  // Filter posts by user (to show them on their profile)
  let author
  if (username) {
    author = await prisma.user.findUnique({ where: { username } })
    // If someone is at the profile page (@lumen12), but the link is wrong, I return null
    if (!author) return { posts: [], postCount: 0}
  }
  // Filter by tag
  const tagFilter = tagSlug ? {
    tags: { some: { slug: tagSlug } }
    // AND: [
    //   { tags: { some: { slug: 'writing' } } } ,
    //   { tags: { some: { slug: 'ideas' } } }
    // ]
  } : {}
  // Search through posts
  const search = searchString ? {
    OR: [
      { title: { contains: searchString, mode: "insensitive", } },
      { body: { contains: searchString, mode: "insensitive", } },
      { tags: { some: { name: { contains: searchString, mode: "insensitive", } } } },
      { author: { username: { contains: searchString, mode: "insensitive", } } },
    ],
  } : {}

  let orderBy = [{ rank: 'desc' }]
  if (sort === 'new') orderBy = [{ createdAt: 'desc' }]
  if (sort === 'top') orderBy = [{ score: 'desc' }]

  const allFilters = {
    authorId: author?.id,
    published: published,
    ...search,
    ...tagFilter,
  }
  const [posts, postCount] = await prisma.$transaction([
    prisma.post.findMany({
      where: allFilters,
      orderBy: orderBy, //rank: 'desc' //score: 'desc'
      take, skip,
      include: {
        tags: true,
        author: {
          select: {
            username: true
          }
        },
        upvoters: {
          select: {
            username: true
          }
        },
        // Just for the comment counter
        comments: {
          select: {
            id: true
          }
        }
      }
    }),
    prisma.post.count({ where: allFilters })
  ])

  return { posts, postCount }
}
