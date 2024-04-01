import mongoose from "mongoose"

const productSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },
  review: String,
  images: {
    type: [String],
    required: true
  },
  Pname: {
    type: String,
    required: true
  },

  price: { type: Number },
  color: String,
  headPhoneType: String,
  description: String,
  brand: String
})

const Productmodel = mongoose.model("Product", productSchema)

export default Productmodel
