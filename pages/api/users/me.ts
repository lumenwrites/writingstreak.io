import handler from "backend/handler"

// AuthContext requests a user when the app loads to know if I'm logged in
// handler takes JWT from cookies, finds user in the db, attaches it to req
async function getUser(req, res) {
  try {
    if (!req.user) return res.json({ data: "Not logged in." })
    const { username, email, bio, website } = req.user
    res.json({
      user: { username, email, bio, website }
    })
  } catch (error) {
    console.log(error)
    res.json({ error })
  }
}

export default handler().get(getUser)

