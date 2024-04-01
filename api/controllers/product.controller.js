import Product from "../models/product.model.js"

export const getProducts = async (req, res, next) => {
  const { search, company, htype, color, minPrice, maxPrice, sort } = req.query

  let query = {}

  if (search) {
    query.Pname = { $regex: `${search}`, $options: "i" }
  }

  if (company) {
    query.brand = company
  }

  if (htype) {
    query.headPhoneType = htype
  }

  if (color) {
    query.color = color
  }

  if (minPrice && maxPrice) {
    query.price = { $gte: minPrice, $lte: maxPrice }
  }

  let sortQuery = {}
  if (sort) {
    if (sort === "Price: Lowest") {
      sortQuery = { price: 1 }
    } else if (sort === "Price: Highest") {
      sortQuery = { price: -1 }
    } else if (sort === "Name: (A-Z)") {
      sortQuery = { Pname: 1 }
    } else if (sort === "Name: (Z-A)") {
      sortQuery = { Pname: -1 }
    }
  }

  try {
    console.log(req.query)
    const products = res.json(
      await Product.find(query)
        .collation({ locale: "en", strength: 2 })
        .sort(sortQuery)
    )
    if (products.length === 0) {
      res.json({ message: "No results" })
    } else {
      res.json(products)
    }
  } catch (error) {
    next(error)
  }
}

export const getProduct = async (req, res, next) => {
  const { id } = req.params
  try {
    res.json(await Product.findById(id))
  } catch (error) {
    next(error)
  }
}

export const getHeadphones = async (req, res, next) => {
  try {
    res.json(await Product.find())
  } catch (error) {
    next(error)
  }
}
