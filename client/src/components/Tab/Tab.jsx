import React, { useState, useEffect, useRef, useContext } from "react"
import style from "./Tab.module.css"
import { RiArrowDropDownLine } from "react-icons/ri"
import { UserContext } from "../../context/UserContext"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"
const Tab = ({ name }) => {
  const { setCompany, setColor, setHtype, setMaxPrice, setMinPrice, setSort } =
    useContext(UserContext)
  const [showHeadPhone, setShowHeadPhone] = useState(false)
  const [showCompany, setShowCompany] = useState(false)
  const [showColor, setShowColor] = useState(false)
  const [showPrice, setShowPrice] = useState(false)
  const [showSort, setShowSort] = useState(false)
  const [selectOption, setSelectOption] = useState(null)
  const node = useRef()
  const companies = [
    "Featured",
    "JBL",
    "Bose",
    "Sennheiser",
    "Jabra",
    "AKG",
    "Skullcandy",
    "Microsoft",
    "Marshall",
    "Razer",
    "boAt"
  ]
  const colors = ["Featured", "Blue", "Black", "White", "Golden", "Green"]
  const sortOptions = [
    { label: "Featured", value: "Featured" },
    { label: "Price: Lowest", value: "Lowest" },
    { label: "Price: Highest", value: "Highest" },
    { label: "Name: (A-Z)", value: "Starting" },
    { label: "Name: (Z-A)", value: "Ending" }
  ]
  const handleClickOutside = (e) => {
    if (node.current.contains(e.target)) {
      return
    }
    setShowHeadPhone(false)
    setShowColor(false)
    setShowPrice(false)
    setShowSort(false)
    setShowCompany(false)
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className={style.dropdown} ref={node}>
      {name !== "Sorted by:" && (
        <div className={style.tab}>
          {name === "Headphone type" && (
            <div className={style.main_tab}>
              Headphone type{" "}
              <span>
                <RiArrowDropDownLine
                  className={style.arrow}
                  onClick={() => setShowHeadPhone(!showHeadPhone)}
                />
                {showHeadPhone && (
                  <div className={style.popup_inner}>
                    <p
                      onClick={() => {
                        setShowHeadPhone(false)
                        setHtype("")
                        setSelectOption("Featured")
                      }}
                      className={
                        selectOption === "Featured" ? style.selected : ""
                      }
                    >
                      Featured
                    </p>
                    <p
                      onClick={() => {
                        setShowHeadPhone(false)
                        setHtype("In-ear headphone")
                        setSelectOption("In-ear headphone")
                      }}
                      className={
                        selectOption === "In-ear headphone"
                          ? style.selected
                          : ""
                      }
                    >
                      In-ear headphone
                    </p>
                    <p
                      onClick={() => {
                        setShowHeadPhone(false)
                        setHtype("On-ear headphone")
                        setSelectOption("On-ear headphone")
                      }}
                      className={
                        selectOption === "On-ear headphone"
                          ? style.selected
                          : ""
                      }
                    >
                      On-ear headphone
                    </p>
                    <p
                      onClick={() => {
                        setShowHeadPhone(false)
                        setHtype("Over-ear headphone")
                        setSelectOption("Over-ear headphone")
                      }}
                      className={
                        selectOption === "Over-ear headphone"
                          ? style.selected
                          : ""
                      }
                    >
                      Over-ear headphone
                    </p>
                  </div>
                )}
              </span>
            </div>
          )}

          {name === "Company" && (
            <div className={style.main_tab}>
              Company{" "}
              <span>
                <RiArrowDropDownLine
                  className={style.arrow}
                  onClick={() => setShowCompany(!showCompany)}
                />
                {showCompany && (
                  <div className={style.popup_inner}>
                    {companies.map((company) => (
                      <p
                        key={uuidv4()}
                        onClick={() => {
                          setShowCompany(false)
                          if (company === "Featured") {
                            setCompany("")
                          } else {
                            setCompany(company)
                          }
                          setSelectOption(company)
                        }}
                        className={
                          selectOption === company ? style.selected : ""
                        }
                      >
                        {company}
                      </p>
                    ))}
                  </div>
                )}
              </span>
            </div>
          )}

          {name === "Color" && (
            <div className={style.main_tab}>
              Color{" "}
              <span>
                <RiArrowDropDownLine
                  className={style.arrow}
                  onClick={() => setShowColor(!showColor)}
                />
                {showColor && (
                  <div className={style.popup_inner}>
                    {colors.map((col) => (
                      <p
                        className={selectOption === col ? style.selected : ""}
                        key={uuidv4()}
                        onClick={() => {
                          setShowColor(false)
                          if (col === "Featured") {
                            setColor("")
                          } else {
                            setColor(col)
                          }
                          setSelectOption(col)
                        }}
                      >
                        {col}
                      </p>
                    ))}
                  </div>
                )}
              </span>
            </div>
          )}
          {name === "Price" && (
            <div className={style.main_tab}>
              Price{" "}
              <span>
                <RiArrowDropDownLine
                  className={style.arrow}
                  onClick={() => setShowPrice(!showPrice)}
                />
                {showPrice && (
                  <div className={style.popup_inner}>
                    <p
                      onClick={() => {
                        setShowPrice(false)
                        setMinPrice("")
                        setMaxPrice("")
                        setSelectOption("Featured")
                      }}
                      className={
                        selectOption === "Featured" ? style.selected : ""
                      }
                    >
                      Featured
                    </p>
                    <p
                      onClick={() => {
                        setShowPrice(false)
                        setMinPrice(0)
                        setMaxPrice(1000)
                        setSelectOption("₹0 - ₹1000")
                      }}
                      className={
                        selectOption === "₹0 - ₹1000" ? style.selected : ""
                      }
                    >
                      ₹0 - ₹1000
                    </p>
                    <p
                      onClick={() => {
                        setShowPrice(false)
                        setMinPrice(1000)
                        setMaxPrice(10000)
                        setSelectOption("₹1000 - ₹10000")
                      }}
                      className={
                        selectOption === "₹1000 - ₹10000" ? style.selected : ""
                      }
                    >
                      ₹1000 - ₹10,000
                    </p>
                    <p
                      onClick={() => {
                        setShowPrice(false)
                        setMinPrice(10000)
                        setMaxPrice(20000)
                        setSelectOption("₹10000 - ₹20000")
                      }}
                      className={
                        selectOption === "₹10000 - ₹20000" ? style.selected : ""
                      }
                    >
                      ₹10,000 - ₹20,000
                    </p>
                  </div>
                )}
              </span>
            </div>
          )}
        </div>
      )}
      {name === "Sorted by:" && (
        <div className={style.sort_tab}>
          <div>
            Sorted by:{" "}
            <span>
              <RiArrowDropDownLine
                className={style.arrow}
                onClick={() => setShowSort(!showSort)}
              />
              {showSort && (
                <div className={style.pop_inner}>
                  {sortOptions.map((sort) => (
                    <p
                      key={sort.value}
                      onClick={() => {
                        setShowSort(false)
                        if (sort.label === "Featured") {
                          setSort("")
                        } else {
                          setSort(sort.label)
                        }
                        setSelectOption(sort.label)
                      }}
                      className={
                        selectOption === sort.label ? style.selected : ""
                      }
                      // style={{
                      //   backgroundColor:
                      //     selectOption === sort.label ? "#0066ff" : "#fff"
                      // }}
                    >
                      {sort.label}
                    </p>
                  ))}
                </div>
              )}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Tab
