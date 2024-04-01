import Header from "../../components/Header/Header"
import NavBar from "../../components/NavBar/NavBar"
import { HiOutlineShoppingBag } from "react-icons/hi"
import style from "./MyCartPage.module.css"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/UserContext"
import { useNavigate, useParams } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
const MyCartPage = () => {
  const {
    products,
    cartItems,
    setItemQuantity,
    getTotalAmount,
    getTotalItems
  } = useContext(UserContext)
  const navigate = useNavigate()
  const { id } = useParams()
  const handleSelectChange = (e, id) => {
    let quantity = parseInt(e.target.value)
    setItemQuantity(id, quantity)
  }
  const totalAmount = getTotalAmount()
  const totalItems = getTotalItems()
  function getTotal(pId) {
    let amount = 0

    let itemInfo = products.find((product) => product._id === pId)
    amount += cartItems[pId] * itemInfo.price

    return amount
  }

  return (
    <>
      <Header />
      <NavBar />
      <div>
        <p id={style.Prod_icon} onClick={() => navigate("/")}>
          Back to Products
        </p>
      </div>
      <div>
        <h1>
          <span>
            {" "}
            <HiOutlineShoppingBag />
          </span>
          My Cart
        </h1>
      </div>
      <div className={style.prod_container}>
        <div className={style.product_detail}>
          {products.map((product) => {
            if (cartItems[product._id] !== 0) {
              return (
                <div className={style.details} key={uuidv4()}>
                  <div className={style.image_div}>
                    <img src={product.images[3]} alt="headphone" />
                  </div>
                  <div className={style.more_detail}>
                    <p id={style.pname}>{product.Pname}</p>
                    <p style={{ color: "#A2A2A2" }}>color: {product.color}</p>
                    <p style={{ color: "#A2A2A2" }}>In stock</p>
                  </div>
                  <div className={style.more_detail}>
                    <p style={{ fontWeight: 500 }}>Price</p>
                    <p>₹{product.price}</p>
                  </div>
                  <div className={style.more_detail}>
                    <label style={{ fontWeight: 500, fontSize: "1.6rem " }}>
                      Quantity:
                    </label>
                    <select
                      id="items"
                      name="items"
                      defaultValue={cartItems[product._id]}
                      onChange={(e) => handleSelectChange(e, product._id)}
                    >
                      {[...Array(8).keys()].map((value) => (
                        <option key={value + 1} value={value + 1}>
                          {value + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={style.more_detail}>
                    <p style={{ fontWeight: 500 }}>Total</p>
                    <p>₹{getTotal(product._id)}</p>
                  </div>
                </div>
              )
            }
          })}

          <div className={style.total_item}>
            <p>{totalItems} Item</p>
            <p>₹{totalAmount}</p>
          </div>
        </div>
        <div className={style.bill}>
          <div className={style.pricing}>
            <h2>Price Details</h2>
            <div className={style.priceDetail}>
              <div>
                <p>Total MRP </p>
                <p>₹{totalAmount}</p>
              </div>
              <div>
                <p> Discount on MRP </p>
                <p>0</p>
              </div>
              <div>
                <p>Convenience Fee</p>
                <p>₹45</p>
              </div>
            </div>
          </div>
          <div className={style.final_order}>
            <div className={style.total_amt}>
              <p>Total amount</p>
              <p>₹{totalAmount + 45}</p>
            </div>
            <div onClick={() => navigate("/checkout")} id={style.place_order}>
              PLACE ORDER
            </div>
          </div>
        </div>
      </div>
      <footer className={style.footer}>Musicart | All rights reserved</footer>
    </>
  )
}

export default MyCartPage
