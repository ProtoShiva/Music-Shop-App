import React from "react"
import { FaPhoneAlt } from "react-icons/fa"
import { CiSearch } from "react-icons/ci"
import { Link } from "react-router-dom"
import style from "./Header.module.css"
import { useSelector } from "react-redux"
const Header = () => {
  const currentUser = useSelector((state) => state.user.currentUser)
  return (
    <div>
      <header className={style.heading}>
        <div id={style.search_bar}>
          <CiSearch className={style.search_icon} />
          <input type="text" placeholder="Search Musicart" />
        </div>

        <div className={style.phone}>
          <FaPhoneAlt />
          <p>912123423432</p>
        </div>
        <div className={style.center}>
          <p className={style.discount}>Get 50% off on selected items</p>
          <p className={style.shop}>Shop Now</p>
        </div>
        {!currentUser ? (
          <div className={style.auth_btn}>
            <Link to={"/sign-in"} className={style.link}>
              <p>Login</p>
            </Link>

            <Link to={"/register"} className={style.link}>
              <p> | Sign up</p>
            </Link>
          </div>
        ) : (
          <div
            className={style.auth_btn}
            style={{ backgroundColor: "#2E0052", width: "155px" }}
          ></div>
        )}
      </header>
    </div>
  )
}

export default Header
