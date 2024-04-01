import React, { useState } from "react"
import logoImage from "../../assets/image.png"
import style from "./LoginPage.module.css"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  signInStart,
  signInFailure,
  signInSuccess
} from "../../redux/user/userSlice"
import axios from "axios"
const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { loading, error } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(signInStart())

    try {
      const response = await axios.post("/api/auth/login", { email, password })
      if (response.data.success === false) {
        dispatch(signInFailure(response.data.message))
        return
      }
      dispatch(signInSuccess(response.data))
      navigate("/")
    } catch (error) {
      dispatch(signInFailure(error.response.data.message))
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
          <h2>Sign in</h2>
          <div className={style.email_box}>
            <label htmlFor="email">Enter your email or mobile number</label>
            <input
              className={style.form_input}
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={style.email_box}>
            <label htmlFor="password">Password</label>
            <input
              className={style.form_input}
              type="text"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            className={style.form_button}
            type="submit"
            value={loading ? "loading..." : "Continue"}
          />
          {error && <p className={style.error}>{error}</p>}
          <p>
            By continuing, you agree to Musicart privacy notice and conditions
            of use.
          </p>
        </form>
        <p className={style.button_box}>New to Musicart?</p>
        <Link to={"/register"}>
          <input
            className={style.button_input}
            type="button"
            value="Create your Musicart account"
          />
        </Link>
      </div>
      <footer className={style.footer}>Musicart | All rights reserved</footer>
    </>
  )
}

export default LoginPage
