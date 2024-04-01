import mongoose from "mongoose"
const userSchema = mongoose.Schema({
  userName: {
    type: String,
    trim: true,
    required: true
  },
  email: { type: String, trim: true, unique: true },
  password: {
    type: String,
    required: true
  },
  mobileNo: { type: String, trim: true, unique: true }
})

const Usermodel = mongoose.model("User", userSchema)

export default Usermodel
