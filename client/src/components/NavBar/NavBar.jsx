import style from "./NavBar.module.css"
import { FiShoppingCart } from "react-icons/fi"
import logoImage from "../../assets/image.png"
import {
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess
} from "../../redux/user/userSlice.js"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useContext, useEffect, useRef, useState } from "react"
import axios from "axios"
import { UserContext } from "../../context/UserContext"
import { useLocation, useNavigate, useParams } from "react-router-dom"

const NavBar = () => {
  const { cartItems, selectId, items, clearCart } = useContext(UserContext)
  const currentUser = useSelector((state) => state.user.currentUser)
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  // const node = useRef()
  const isProductPage = /^\/ProductPage\/\w+$/.test(location.pathname)
  const isCartPage = location.pathname === "/mycart"
  const isHomePage = location.pathname === "/"
  const isInvoicePage = location.pathname === "/invoices"
  const isCheckout = location.pathname === "/checkout"
  const cartItemAmount = cartItems[selectId]
  const itemCount = Object.values(cartItems).reduce(
    (acc, currentValue) => acc + currentValue,
    0
  )

  const [showPopup, setShowPopup] = useState(false)
  const handleLogout = async () => {
    setShowPopup(false)
    try {
      dispatch(signOutUserStart())
      clearCart()
      const res = await axios.get("/api/auth/logout")

      if (res.data.success === false) {
        dispatch(signOutUserFailure(res.data.message))
        return
      }
      dispatch(signOutUserSuccess(res.data))
      navigate("/")
    } catch (error) {
      dispatch(signOutUserFailure(error.res.data.message))
    }
  }

  function extractInitials(fullName) {
    const nameArray = fullName.split(" ")
    let initials = ""
    nameArray.forEach(function (word) {
      initials += word.charAt(0)
    })
    return initials
  }
  return (
    <div>
      <nav className={style.nav_bar}>
        <div className={style.left_nav}>
          {" "}
          <div className={style.music_logo} onClick={() => navigate("/")}>
            <img src={logoImage} alt="logo" />
            <p>Musicart</p>
          </div>
          {isHomePage ? (
            <>
              <p>Home</p>
              <p onClick={() => navigate("/invoices")}>Invoice</p>
            </>
          ) : (
            ""
          )}
          {isProductPage && (
            <p>
              Home<span>/ {items.Pname}</span>
            </p>
          )}
          {isCartPage && (
            <p>
              Home<span>/ View Cart</span>
            </p>
          )}
          {isInvoicePage && (
            <p>
              Home<span>/ Invoices</span>
            </p>
          )}
          {isCheckout && (
            <p>
              Home<span>/ Checkout</span>
            </p>
          )}
        </div>
        <div className={style.right_nav}>
          <div className={style.cart_nav}>
            {currentUser && !isCheckout && (
              <div className={style.cart_sec}>
                <FiShoppingCart />
                <p
                  onClick={() => {
                    navigate("/mycart")
                  }}
                >
                  View Cart{" "}
                  {isHomePage || isProductPage ? (
                    <span>{isHomePage ? itemCount : cartItemAmount}</span>
                  ) : null}
                </p>
              </div>
            )}
          </div>
          {isHomePage &&
            currentUser &&
            !isProductPage &&
            !isCartPage &&
            !isInvoicePage &&
            !isCheckout && (
              <div className={style.user_logo}>
                <p id={style.initials} onClick={() => setShowPopup(!showPopup)}>
                  {extractInitials(currentUser.userName)}
                </p>
              </div>
            )}

          {showPopup && (
            <div className={style.popup_inner}>
              <p id={style.user}>{currentUser.userName}</p>
              <p onClick={handleLogout}>Logout</p>
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}

export default NavBar
