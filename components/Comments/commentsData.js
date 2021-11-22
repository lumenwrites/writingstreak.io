export const comments = [
  {
    username: 'Supreme Mugwump',
    email: '',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porttitor convallis velit, vel sollicitudin eros. Proin tellus turpis, viverra eget cursus in, tincidunt ut odio. Vestibulum condimentum massa sed velit auctor commodo.',
    upvotes: 5,
    downvotes: 0,
    postSlug: '',
    parentId: '',
    ip: '123',
    children: [
      {
        username: 'User 2',
        body: 'Lorem ipsum dolor sit amet.',
        upvotes: 5,
        downvotes: 0,
        children: [
          {
            username: 'User 3',
            body: 'Lorem ipsum dolor sit amet.',
            upvotes: 5,
            downvotes: 0,
            children: []
          },
          {
            username: 'User 4',
            body: 'Lorem ipsum dolor sit amet.',
            upvotes: 5,
            downvotes: 0,
            children: []
          },
        ]
      },
      {
        username: 'User 2',
        body: 'Lorem ipsum dolor sit amet.',
        upvotes: 5,
        downvotes: 0,
        children: []
      },
    ]
  },
  {
    username: 'User 2',
    body: 'Lorem ipsum dolor sit amet.',
    upvotes: 5,
    downvotes: 0,
    children: []
  },
  {
    username: 'User 3',
    body: 'Lorem ipsum dolor sit amet.',
    upvotes: 5,
    downvotes: 0,
    children: []
  },
]
