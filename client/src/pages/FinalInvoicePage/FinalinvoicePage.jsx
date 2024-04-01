import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/UserContext"
import Header from "../../components/Header/Header"
import NavBar from "../../components/NavBar/NavBar"
import style from "../CheckOutPage/CheckOutPage.module.css"
import { useSelector } from "react-redux"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
const FinalinvoicePage = () => {
  const [itemsInfo, setItemsInfo] = useState([])
  const [invoices, setInvoices] = useState([])
  const { products, cartItems, getTotalAmount } = useContext(UserContext)
  const [selectedItem, setSelectedItem] = useState(null)
  const currentUser = useSelector((state) => state.user.currentUser)
  const navigate = useNavigate()
  const totalAmount = getTotalAmount()
  const { id } = useParams()
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
  useEffect(() => {
    const fetchOneInvoice = async () => {
      try {
        const { data } = await axios.get(`/api/user/getOneInvoice/${id}`)

        setInvoices(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchOneInvoice()
  }, [id])

  return (
    <div>
      <Header />
      <NavBar />
      <p id={style.Prod_icon} onClick={() => navigate("/")}>
        Back to Product
      </p>
      <div>
        <h1>Invoice</h1>
      </div>
      <div className={style.main_checkout}>
        <div className={style.checkout}>
          <div className={style.address}>
            <p className={style.checkout_heading}>1.Delivery address</p>
            <div id={style.invoice_user_info}>
              <p>{currentUser?.userName}</p>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                value={invoices.address}
              ></textarea>
            </div>
          </div>

          <div className={style.address}>
            <p className={style.checkout_heading}>2.Payment Method</p>
            <div>
              <div>
                {" "}
                <p className={style.invoice_input}>{invoices.paymentType}</p>
              </div>
            </div>
          </div>
          <div className={style.address}>
            <p className={style.checkout_heading}>
              3.Review Items and delivery
            </p>
            <div className={style.last_box}>
              {invoices.itemsInfo &&
                invoices.itemsInfo.map((item, index) => (
                  <div key={index}>
                    <img
                      src={item.image}
                      alt={item.Pname}
                      className={style.final_images}
                      onClick={() => setSelectedItem(item)}
                    />
                  </div>
                ))}
              <div className={style.items_details}>
                {
                  <>
                    <h2>{selectedItem?.Pname}</h2>
                    <p style={{ color: "#797979" }}>
                      Color: {selectedItem?.color}
                    </p>
                    <p>Estimated delivery : Monday — FREE Standard Delivery</p>
                  </>
                }
              </div>
            </div>
          </div>
        </div>
        <div className={style.placeOrder}>
          <div className={style.main_container}>
            <div className={style.middle}>
              <p>Order Summary</p>
              <div className={style.middle_details}>
                <div>
                  {" "}
                  <p>Items:</p>
                  <p>Delivery:</p>
                </div>
                <div>
                  <p>₹{invoices?.totalAmount}</p>
                  <p>₹45.00</p>
                </div>
              </div>
            </div>
            <div className={style.lower}>
              <p>OrderTotal:</p>
              <p>${invoices?.totalAmount + 45}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinalinvoicePage
