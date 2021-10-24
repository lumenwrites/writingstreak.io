// https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/models/Pet.js
import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    index: true,
    lowercase: true,
    required: [true, 'Email is required.'],
    // maxlength: [20, 'Name cannot be longer than 20 characters'],
  }
})

/* Send back to client only the fields I want from profile */
UserSchema.methods.publicFields = function () {
  const { email, hasPurchasedCourse } = this
  return { email, hasPurchasedCourse }
}

const UserModel = mongoose.models.User || mongoose.model('User', UserSchema)

// So that it's able to detect duplicate objects
// https://stackoverflow.com/a/52395212/2713632
UserModel.createIndexes()

export default UserModel
