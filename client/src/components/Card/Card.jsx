import React, { useContext } from "react"
import { MdOutlineAddShoppingCart } from "react-icons/md"
import style from "./Card.module.css"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
const Card = ({ product }) => {
  const { isGridView, addToCart } = useContext(UserContext)
  const navigate = useNavigate()

  return (
    <>
      {/* <Link className={style.link_box} to={`/ProductPage/${product._id}`}> */}{" "}
      {isGridView && (
        <div className={style.grid_main_container}>
          <div
            className={style.image_box}
            onClick={() => navigate(`/ProductPage/${product._id}`)}
          >
            <img src={product.images[0]} alt="logo" />
          </div>
          <div
            className={style.cartIcon}
            onClick={() => addToCart(product._id)}
          >
            <MdOutlineAddShoppingCart />
          </div>
          <div
            className={style.descrption_box}
            onClick={() => navigate(`/ProductPage/${product._id}`)}
          >
            <p>{product.Pname}</p>
            <p className={style.info}>
              Price- <span>{product.price}</span>
            </p>
            <p className={style.info}>
              {product.color}{" "}
              <span id={style.type}>{product.headPhoneType}</span>
            </p>
          </div>
        </div>
      )}
      {/* </Link> */}
      {!isGridView && (
        <div className={style.list_main_container}>
          <div className={style.list_image_box}>
            <img src={product.images[0]} alt="logo" />
            <div className={style.cartIcon}>
              <MdOutlineAddShoppingCart
                onClick={() => addToCart(product._id)}
              />
            </div>
          </div>
          <div className={style.list_descrption_box}>
            <p id={style.title}>{product.Pname}</p>
            <p className={style.info}>
              Price- <span>{product.price}</span>
            </p>
            <p className={style.info}>
              {product.color}{" "}
              <span id={style.type}>{product.headPhoneType}</span>
            </p>
            <p>{product.title}</p>
            <button onClick={() => navigate(`/ProductPage/${product._id}`)}>
              Details
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Card
