import React, { useContext, useEffect, useRef, useState } from "react"
import { CiSearch } from "react-icons/ci"
import { CiBoxList } from "react-icons/ci"
import { BsFillGridFill } from "react-icons/bs"
import { VscFeedback } from "react-icons/vsc"
import { TbFaceIdError } from "react-icons/tb"
import { v4 as uuidv4 } from "uuid"
import potrait from "../../assets/image_5.png"
import style from "./HomePage.module.css"
import Tab from "../../components/Tab/Tab"
import Card from "../../components/Card/Card"
import { UserContext } from "../../context/UserContext"
import axios from "axios"
import Header from "../../components/Header/Header"
import NavBar from "../../components/NavBar/NavBar"
import FeedBack from "../../components/FeedBack/FeedBack"
import { useSelector } from "react-redux"

const HomePage = () => {
  const { products, isGridView, setIsGridView, setSearch } =
    useContext(UserContext)
  const currentUser = useSelector((state) => state.user.currentUser)
  const [showFeedback, setShowFeedback] = useState(false)

  const tabNames = ["Headphone type", "Company", "Color", "Price", "Sorted by:"]
  const node = useRef()
  const dropdownRef = useRef()
  const handleClickOutside = (e) => {
    if (
      node.current?.contains(e.target) ||
      dropdownRef.current?.contains(e.target)
    ) {
      return
    }
    setShowFeedback(false)
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <>
      <Header />
      <NavBar />
      <div className={style.banner}>
        <p id={style.banner_text}>Grab upto 50% off on Selected headphones</p>
        <img src={potrait} alt="potrait" id={style.model} />
      </div>
      <div className={style.search_box}>
        <CiSearch className={style.search_icon} />
        <input
          className={style.search_bar}
          type="text"
          placeholder="Search by Product Name"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className={style.mid_tab}>
        <div className={style.side_icons}>
          <BsFillGridFill onClick={() => setIsGridView(!isGridView)} />
          <CiBoxList onClick={() => setIsGridView(!isGridView)} />
        </div>
        <div className={style.dropdown_btn}>
          {tabNames.map((name, index) => (
            <Tab key={index} name={name} />
          ))}
        </div>
      </div>
      <main
        className={
          isGridView
            ? style.grid_product_container
            : style.list_product_container
        }
      >
        {products.length > 0 ? (
          products.map((product) => <Card key={uuidv4()} product={product} />)
        ) : (
          <div className={style.Pfound}>
            <TbFaceIdError />
            Product Not Found...
          </div>
        )}
        {currentUser && (
          <div
            ref={node}
            className={style.feedback_btn}
            onClick={() => setShowFeedback(!showFeedback)}
          >
            <VscFeedback className={style.feed} />
          </div>
        )}

        {showFeedback && <FeedBack dropdownRef={dropdownRef} />}
      </main>
      <footer className={style.footer}>Musicart | All rights reserved</footer>
    </>
  )
}

export default HomePage
