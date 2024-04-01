import express from "express"
import {
  createInvoice,
  createFeedback,
  getInvoiceList,
  getOneInvoiceList
} from "../controllers/user.controller.js"
import { verifyToken } from "../utils/verifyUser.js"
const router = express.Router()

router.post("/invoice", verifyToken, createInvoice)
router.post("/feedback", verifyToken, createFeedback)
router.get("/getInvoice/:id", getInvoiceList)
router.get("/getOneInvoice/:id", getOneInvoiceList)

export default router
