import React, { useContext, useEffect, useState } from "react"
import Header from "../../components/Header/Header"
import NavBar from "../../components/NavBar/NavBar"
import style from "./CheckOutPage.module.css"
import { RiArrowDropDownLine } from "react-icons/ri"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { useSelector } from "react-redux"
import { UserContext } from "../../context/UserContext"

const CheckOutPage = () => {
  const [feedType, setFeedType] = useState("Choose the type")
  const [open, setOpen] = useState(false)
  const { products, cartItems, getTotalAmount, clearCart } =
    useContext(UserContext)
  const [address, setAddress] = useState("")
  const [paymentType, setPayment] = useState("")
  const [itemsInfo, setItemsInfo] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [errors, setErrors] = useState("")
  const currentUser = useSelector((state) => state.user.currentUser)
  const navigate = useNavigate()
  const totalAmount = getTotalAmount()

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        let newItemsInfo = []
        for (const item in cartItems) {
          if (cartItems[item] > 0) {
            let itemInfo = products.find((product) => product._id === item)
            newItemsInfo.push({
              Pname: itemInfo.Pname,
              color: itemInfo.color,
              image: itemInfo.images[0]
            })
          }
        }
        setItemsInfo(newItemsInfo)
        if (newItemsInfo.length > 0) {
          setSelectedItem(newItemsInfo[0])
        }
      } catch (error) {
        console.log(error)
      }
    }
    getProductDetails()
  }, [cartItems, products])

  const validateForm = () => {
    let newErrors = {}
    if (!address) {
      newErrors.address = "*Required Field"
    }
    if (!paymentType) {
      newErrors.paymentType = "*Required Field"
    }
    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    const isValid = validateForm()
    if (isValid) {
      try {
        const { data } = await axios.post("/api/user/invoice", {
          address,
          paymentType,
          itemsInfo,
          totalAmount
        })
        localStorage.removeItem("cart")
        clearCart()
        navigate("/success")
        return data
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log("form validation failed")
    }
  }

  return (
    <div>
      <Header />
      <NavBar />
      <p id={style.Prod_icon} onClick={() => navigate("/mycart")}>
        Back to Cart
      </p>
      <div>
        <h1>Checkout</h1>
      </div>
      <div className={style.main_checkout}>
        <div className={style.checkout}>
          <div className={style.address}>
            <p className={style.checkout_heading}>1.Delivery address</p>
            <div id={style.user_info}>
              <p>{currentUser?.userName}</p>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                onChange={(e) => setAddress(e.target.value)}
                className={
                  errors.address ? style.text_box_active : style.text_box
                }
              ></textarea>
              {errors.address && (
                <div className={style.error}>{errors.address}</div>
              )}
            </div>
          </div>

          <div className={style.address}>
            <p className={style.checkout_heading}>2.Payment Method</p>
            {/* <input type="text" placeholder="Choose Payment type" /> */}
            <div
              className={
                errors.paymentType ? style.input_box_active : style.input_box
              }
            >
              <p>{feedType}</p>
              <span className={style.arrow}>
                <RiArrowDropDownLine onClick={() => setOpen(!open)} />
                {open && (
                  <div className={style.popup_inner}>
                    <p
                      onClick={() => {
                        setOpen(false)
                        setFeedType("Pay on Delivery")
                        setPayment("Pay on Delivery")
                      }}
                    >
                      Pay on Delivery
                    </p>
                    <p
                      onClick={() => {
                        setOpen(false)
                        setFeedType("UPI")
                        setPayment("UPI")
                      }}
                    >
                      UPI
                    </p>
                    <p
                      onClick={() => {
                        setOpen(false)
                        setFeedType("Card")
                        setPayment("Card")
                      }}
                    >
                      Card
                    </p>
                  </div>
                )}
              </span>
            </div>
          </div>
          {errors.paymentType && (
            <div className={style.error} style={{ marginLeft: "19rem" }}>
              {errors.paymentType}
            </div>
          )}
          <div className={style.address}>
            <p className={style.checkout_heading}>
              3.Review Items and delivery
            </p>
            <div className={style.last_box}>
              {itemsInfo.map((detail, index) => (
                <div key={index}>
                  <img
                    src={detail.image}
                    alt={detail.Pname}
                    className={style.final_images}
                    onClick={() => setSelectedItem(detail)}
                  />
                </div>
              ))}
              <div className={style.items_details}>
                {selectedItem ? ( // Modify this section
                  <>
                    <h2>{selectedItem.Pname}</h2>
                    <p style={{ color: "#797979" }}>
                      Color: {selectedItem.color}
                    </p>
                    <p>Estimated delivery : Monday — FREE Standard Delivery</p>
                  </>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </div>
          </div>
          <div className={style.confirm_order}>
            <button onClick={handleSubmit}>Place your order</button>
            <div>
              <p id={style.total}>Order Total : ₹{totalAmount + 45}</p>
              <p id={style.terms}>
                By placing your order, you agree to Musicart privacy notice and
                conditions of use.
              </p>
            </div>
          </div>
        </div>
        <div className={style.placeOrder}>
          <div className={style.main_container}>
            <div className={style.upper}>
              <button>Place your Order</button>
              <p>
                By placing order, you agree to Musicart privacy notice and
                conditions or use
              </p>
            </div>
            <div className={style.middle}>
              <p>Order Summary</p>
              <div className={style.middle_details}>
                <div>
                  {" "}
                  <p>Items:</p>
                  <p>Delivery:</p>
                </div>
                <div>
                  <p>${totalAmount}</p>
                  <p>$45.00</p>
                </div>
              </div>
            </div>
            <div className={style.lower}>
              <p>OrderTotal:</p>
              <p>${totalAmount + 45}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckOutPage
