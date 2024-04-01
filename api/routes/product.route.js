import express from "express"
import {
  getProducts,
  getProduct,
  getHeadphones
} from "../controllers/product.controller.js"
const router = express.Router()

router.get("/allProducts", getProducts)
router.get("/oneProduct/:id", getProduct)
router.get("/getAllItems", getHeadphones)

export default router
