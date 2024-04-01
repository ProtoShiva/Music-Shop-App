import React from "react"
import style from "./SuccessPage.module.css"
import logoImage from "../../assets/image.png"
import confetti from "../../assets/confetti 1.png"
import { useNavigate } from "react-router-dom"
const SuccessPage = () => {
  const navigate = useNavigate()
  return (
    <div className={style.container}>
      <nav className={style.music_logo}>
        <img src={logoImage} alt="logo" />
        <p>Musicart</p>
      </nav>
      <div className={style.success_box}>
        <img src={confetti} alt="" />
        <div>
          <h1>Order is placed successfully!</h1>
          <p>You will be receiving a confirmation email with order details</p>
        </div>
        <button onClick={() => navigate("/")}>Go back to Home page</button>
      </div>
    </div>
  )
}

export default SuccessPage
