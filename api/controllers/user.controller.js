import FeedBack from "../models/feedback.model.js"
import Invoice from "../models/invoice.model.js"

export const createInvoice = async (req, res, next) => {
  let userId = req.user.id
  const { address, paymentType, itemsInfo, totalAmount } = req.body
  try {
    const userDoc = await Invoice.create({
      owner: userId,
      address,
      paymentType,
      itemsInfo,
      totalAmount
    })
    res.json(userDoc)
  } catch (error) {
    res.status(422).json(error)
    next(error)
  }
}

export const createFeedback = async (req, res, next) => {
  let userId = req.user.id
  const { feedbackType, feedback } = req.body
  try {
    const userDoc = await FeedBack.create({
      owner: userId,
      feedbackType,
      feedback
    })
    res.json(userDoc)
  } catch (error) {
    res.status(422).json(error)
    next(error)
  }
}

export const getInvoiceList = async (req, res, next) => {
  const { id } = req.params
  try {
    res.json(await Invoice.find({ owner: id }))
  } catch (error) {
    next(error)
  }
}

export const getOneInvoiceList = async (req, res, next) => {
  const { id } = req.params
  try {
    res.json(await Invoice.findById(id))
  } catch (error) {
    next(error)
  }
}
