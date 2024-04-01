import mongoose from "mongoose"
import { Schema } from "mongoose"
const newItemSchema = new Schema({
  Pname: String,
  color: String,
  image: String
})
const invoiceSchema = mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  address: {
    type: String
  },
  paymentType: { type: String },
  itemsInfo: [newItemSchema],
  totalAmount: { type: Number }
})

const Invoicemodel = mongoose.model("Invoice", invoiceSchema)

export default Invoicemodel
