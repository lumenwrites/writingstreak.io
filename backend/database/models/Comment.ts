// https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/models/Pet.js
import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
  postSlug: { type: String, index: true },
  username: { type: String, default: "Anonymous" },
  email: { type: String, default: "" },
  body: { type: String, required: true },
  voters: [{ ip: String }],
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  children: [this]
})

const CommentModel = mongoose.models.Comment || mongoose.model('Comment', CommentSchema)

// So that it's able to detect duplicate objects
// https://stackoverflow.com/a/52395212/2713632
CommentModel.createIndexes()

export default CommentModel
