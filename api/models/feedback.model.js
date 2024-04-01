import mongoose from "mongoose"
const feedbackSchema = mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  feedbackType: {
    type: String
  },
  feedback: { type: String }
})

const Feedbackmodel = mongoose.model("Feedback", feedbackSchema)

export default Feedbackmodel
