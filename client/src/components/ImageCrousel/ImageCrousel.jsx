import React, { useEffect, useState } from "react"
import style from "./ImageCrousel.module.css"
const ImageCrousel = ({ items }) => {
  const otherImages = items.images ? items.images.slice(1) : []
  const [mainImage, setMainImage] = useState("")
  useEffect(() => {
    if (items.images && items.images.length > 0) {
      setMainImage(items.images[0])
    }
  }, [items.images])
  const handleClick = (newMainImage) => {
    setMainImage(newMainImage)
  }

  return (
    <div className={style.image_box}>
      <div className={style.main_image}>
        <img src={mainImage} alt="" />
      </div>
      <div className={style.other_image}>
        {otherImages.map((img, index) => (
          <img key={index} src={img} alt="" onClick={() => handleClick(img)} />
        ))}
      </div>
    </div>
  )
}

export default ImageCrousel
