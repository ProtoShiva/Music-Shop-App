import React, { useState, useEffect, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import style from "./ProductPage.module.css"
import axios from "axios"
import Header from "../../components/Header/Header"
import NavBar from "../../components/NavBar/NavBar"
import { UserContext } from "../../context/UserContext"
import ImageCrousel from "../../components/ImageCrousel/ImageCrousel"
import { useSelector } from "react-redux"

const ProductPage = () => {
  const { addToCart, setSelectId, cartItems, items, setItems } =
    useContext(UserContext)
  const currentUser = useSelector((state) => state.user.currentUser)
  const navigate = useNavigate()
  const { id } = useParams()
  const cartItemAmount = cartItems[id]
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/products/oneProduct/${id}`)
        setItems(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
    setSelectId(id)
  }, [id])

  function handleBuynow(id) {
    if (cartItemAmount === 0) {
      addToCart(id)
    }

    navigate("/mycart")
  }

  return (
    <>
      <Header />
      <NavBar />
      <p id={style.Prod_icon} onClick={() => navigate("/")}>
        Back to Products
      </p>
      <main className={style.main_box}>
        {" "}
        <div className={style.desc_box}>{items.title}</div>
        <div className={style.big_box}>
          <ImageCrousel items={items} />
          <div className={style.details}>
            <div className={style.title}>
              <h2>{items.Pname}</h2>
            </div>
            <div className={style.rating}>stars</div>
            <div>
              <b>Price</b> - ₹&nbsp;{items.price}
            </div>
            <div className={style.more_details}>
              {items.color} | {items.headPhoneType}
            </div>
            <p>About this item</p>
            <div className={style.description}>
              <ul>
                {items &&
                  items.description &&
                  items.description
                    .split(".")
                    .filter((point) => point.trim() !== "")
                    .map((point, index) => <li key={index}>{point.trim()}</li>)}
              </ul>
            </div>
            <div>
              <b>Available</b>- In stock
            </div>
            <div>
              <b>Brand</b>- {items.brand}
            </div>
            <div
              className={style.add_cart}
              onClick={() =>
                currentUser ? addToCart(id) : navigate("/sign-in")
              }
            >
              Add to Cart
            </div>
            <div
              className={style.buy_now}
              onClick={() => {
                currentUser ? handleBuynow(id) : navigate("/sign-in")
              }}
            >
              {" "}
              Buy now
            </div>
          </div>
        </div>
      </main>
      <footer className={style.footer}>Musicart | All rights reserved</footer>
    </>
  )
}

export default ProductPage
