import { createContext, useEffect, useState } from "react"
import axios from "axios"
export const UserContext = createContext({})
export function UserContextProvider({ children }) {
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart")
    return savedCart ? JSON.parse(savedCart) : {}
  })
  const [items, setItems] = useState([])
  const [selectId, setSelectId] = useState("")
  const [isGridView, setIsGridView] = useState(true)
  const [search, setSearch] = useState("")
  const [company, setCompany] = useState("")
  const [htype, setHtype] = useState("")
  const [color, setColor] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [sort, setSort] = useState("")

  // const [page,setPage] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/products/allProducts?search=${search}&company=${company}&htype=${htype}&color=${color}&minPrice=${minPrice}&maxPrice=${maxPrice}&sort=${sort}`
        )
        setProducts(data)
        setCartItems((prev) => {
          const newCart = getDefaultCart(data, prev)
          localStorage.setItem("cart", JSON.stringify(newCart))
          return newCart
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [search, company, htype, color, minPrice, maxPrice, sort])

  function getTotalAmount() {
    let amount = 0
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find((product) => product._id === item)
        amount += cartItems[item] * itemInfo?.price
      }
    }
    return amount
  }

  function getTotalItems() {
    let count = 0
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        products.find((product) => product._id === item)
        count++
      }
    }
    return count
  }

  // function addToCart(itemId, quantity = 1) {
  //   setCartItems((prev) => {
  //     const newCart = { ...prev, [itemId]: (prev[itemId] || 0) + quantity }
  //     localStorage.setItem("cart", JSON.stringify(newCart))
  //     return newCart
  //   })
  // }
  function addToCart(itemId, quantity = 1) {
    setCartItems((prev) => {
      const currentQuantity = prev[itemId] ? prev[itemId] : 0
      const newQuantity =
        currentQuantity + quantity > 8 ? 8 : currentQuantity + quantity
      const newCart = { ...prev, [itemId]: newQuantity }
      localStorage.setItem("cart", JSON.stringify(newCart))
      return newCart
    })
  }

  function setItemQuantity(itemId, quantity) {
    setCartItems((prev) => {
      const newQuantity = quantity > 8 ? 8 : quantity
      const newCart = { ...prev, [itemId]: newQuantity }
      localStorage.setItem("cart", JSON.stringify(newCart))
      return newCart
    })
  }
  // function setItemQuantity(itemId, quantity) {
  //   setCartItems((prev) => {
  //     const newCart = { ...prev, [itemId]: quantity }
  //     localStorage.setItem("cart", JSON.stringify(newCart))
  //     return newCart
  //   })
  // }

  function clearCart() {
    setCartItems((prev) => {
      const newCart = { ...prev }
      for (let key in newCart) {
        newCart[key] = 0
      }
      localStorage.setItem("cart", JSON.stringify(newCart))
      return newCart
    })
  }

  function getDefaultCart(products, currentCart) {
    let cart = { ...currentCart }
    products.forEach((product) => {
      if (!cart[product._id]) {
        cart[product._id] = 0
      }
    })
    return cart
  }
  return (
    <UserContext.Provider
      value={{
        products,
        setProducts,
        setSelectId,
        selectId,
        isGridView,
        setIsGridView,
        cartItems,
        items,
        setItems,
        addToCart,
        setItemQuantity,
        getTotalAmount,
        getTotalItems,
        setSearch,
        setColor,
        setHtype,
        setMaxPrice,
        setMinPrice,
        setCompany,
        setSort,
        clearCart
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
