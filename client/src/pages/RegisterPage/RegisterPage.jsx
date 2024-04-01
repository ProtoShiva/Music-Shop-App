import React, { useState } from "react"
import logoImage from "../../assets/image.png"
import style from "../RegisterPage/RegisterPage.module.css"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
const RegisterPage = () => {
  const [userInfo, setUserInfo] = useState({
    userName: "",
    email: "",
    mobileNo: "",
    password: ""
  })
  const [message, setMessage] = useState("")
  const { email, password, userName, mobileNo } = userInfo
  const [errors, setErrors] = useState("")
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { value, name } = e.target
    setUserInfo({ ...userInfo, [name]: value })
  }

  const isValidEmail = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/
    return emailRegex.test(email)
  }

  const validateForm = () => {
    let newErrors = {}

    if (!userName) {
      newErrors.userName = "Name is required"
    }

    if (!email) {
      newErrors.email = "Email is required"
    } else if (!isValidEmail(email)) {
      newErrors.email = "Invalid email format"
    }

    if (!password) {
      newErrors.password = "Password is required"
    }

    if (!mobileNo) {
      newErrors.mobileNo = "Mobile Number is required"
    }
    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValid = validateForm()
    if (isValid) {
      try {
        const { data } = await axios.post("/api/auth/register", userInfo)
        navigate("/sign-in")
        return data
      } catch (error) {
        setMessage(error.response.data.message)
      }
    } else {
      console.log("form validation failed")
    }
  }

  return (
    <>
      <div className={style.main_container}>
        <nav className={style.heading}>
          <img src={logoImage} alt="logo" />
          <p>Musicart</p>
        </nav>
        <p id={style.head}>Welcome</p>
        <form className={style.form_box} onSubmit={handleSubmit}>
          <h2>Create Account</h2>
          <div className={style.email_box}>
            <label htmlFor="userName">Your Name</label>
            <input
              className={style.form_input}
              type="text"
              name="userName"
              value={userName}
              onChange={handleChange}
            />
          </div>
          {errors.userName && (
            <div className={style.error}>{errors.userName}</div>
          )}
          <div className={style.email_box}>
            <label htmlFor="mobileNo">Mobile Number</label>
            <input
              className={style.form_input}
              type="text"
              name="mobileNo"
              value={mobileNo}
              onChange={handleChange}
            />
          </div>
          {errors.mobileNo && (
            <div className={style.error}>{errors.mobileNo}</div>
          )}
          <div className={style.email_box}>
            <label htmlFor="email">Email Id</label>
            <input
              className={style.form_input}
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>
          {errors.email && <div className={style.error}>{errors.email}</div>}
          <div className={style.email_box}>
            <label htmlFor="password">Password</label>
            <input
              className={style.form_input}
              type="text"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          {errors.password && (
            <div className={style.error}>{errors.password}</div>
          )}
          <p className={style.information}>
            By enrolling your mobile phone number, you consent to receive
            automated security notifications via text message from Musicart.
            Message and data rates may apply.
          </p>
          <p
            className={style.error}
            style={{ fontSize: "1.2rem", fontWeight: "400", marginTop: "1rem" }}
          >
            {message}
          </p>
          <input className={style.form_button} type="submit" value="Continue" />
          <p className={style.caution}>
            By continuing, you agree to Musicart privacy notice and conditions
            of use.
          </p>
        </form>
        <section>
          <p className={style.last}>
            Already have an account?
            <span>
              <Link to={"/sign-in"}>Sign in</Link>
            </span>
          </p>
        </section>
      </div>
      <footer className={style.footer}>Musicart | All rights reserved</footer>
    </>
  )
}

export default RegisterPage
