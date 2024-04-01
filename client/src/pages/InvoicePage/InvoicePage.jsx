import React, { useContext, useEffect, useState } from "react"
import Header from "../../components/Header/Header"
import NavBar from "../../components/NavBar/NavBar"
import style from "./InvoicePage.module.css"
import invoiceImg from "../../assets/mdi_invoice-edit.png"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import axios from "axios"
import { UserContext } from "../../context/UserContext"
const InvoicePage = () => {
  const navigate = useNavigate()
  const [invoiceList, setInvoiceList] = useState([])
  const currentUser = useSelector((state) => state.user.currentUser)
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const { data } = await axios.get(
          `/api/user/getInvoice/${currentUser._id}`
        )
        setInvoiceList(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchInvoices()
  }, [currentUser._id])
  return (
    <div>
      <Header />
      <NavBar />
      <p id={style.Prod_icon} onClick={() => navigate("/")}>
        Back to Home
      </p>
      <div className={style.inner_box}>
        <h1>My Invoices</h1>
        <div>
          {invoiceList.map((bill) => (
            <div className={style.invoice_box} key={bill._id}>
              <div className={style.addr_box}>
                <img src={invoiceImg} alt="" />
                <div>
                  <p>{currentUser.userName}</p>
                  <p>{bill.address}</p>
                </div>
              </div>
              <button onClick={() => navigate(`/finalInvoice/${bill._id}`)}>
                View Invoice
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default InvoicePage
