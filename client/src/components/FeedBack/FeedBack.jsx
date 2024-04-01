import React, { useState } from "react"
import { RiArrowDropDownLine } from "react-icons/ri"
import style from "./FeedBack.module.css"
import axios from "axios"
const FeedBack = ({ dropdownRef }) => {
  const [open, setOpen] = useState(false)
  // const [buttonOpen, setButtonOpen] = useState(false)
  const [errors, setErrors] = useState("")
  const [feedType, setFeedType] = useState("Choose the type")
  const [feedbackType, setFeedbackType] = useState("")
  const [feedback, setFeedback] = useState("")

  const validateForm = () => {
    let newErrors = {}
    if (!feedbackType) {
      newErrors.feedbackType = "*Required Field"
    }
    if (!feedback) {
      newErrors.feedback = "*Required Field"
    }
    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    const isValid = validateForm()
    if (isValid) {
      try {
        const { data } = await axios.post("/api/user/feedback", {
          feedbackType,
          feedback
        })
        return data
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log("form validation failed")
    }
  }

  return (
    <>
      <div className={style.feedback_container} ref={dropdownRef}>
        <div className={style.feedback_inner}>
          <div className={style.feed_box}>
            <p className={style.heading}>Type of feedback</p>
            <div
              className={
                errors.feedback ? style.input_box_active : style.input_box
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
                        setFeedType("Bugs")
                        setFeedbackType("Bugs")
                      }}
                    >
                      Bugs
                    </p>
                    <p
                      onClick={() => {
                        setOpen(false)
                        setFeedType("FeedBack")
                        setFeedbackType("FeedBack")
                      }}
                    >
                      Feedback
                    </p>
                    <p
                      onClick={() => {
                        setOpen(false)
                        setFeedType("Query")
                        setFeedbackType("Query")
                      }}
                    >
                      Query
                    </p>
                  </div>
                )}
              </span>
            </div>
            {errors.feedback && (
              <div className={style.error}>{errors.feedback}</div>
            )}
          </div>
          <div className={style.feed_box}>
            <p className={style.heading}>Feedback</p>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Type your feedback..."
              onChange={(e) => setFeedback(e.target.value)}
              className={
                errors.feedbackType
                  ? style.input_box_active
                  : style.input_box_textarea
              }
            ></textarea>
            {errors.feedbackType && (
              <div className={style.error}>{errors.feedbackType}</div>
            )}
          </div>
          <div className={style.submit_box}>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default FeedBack
