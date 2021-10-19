import React, { useState } from "react";
import styles from "./header.module.css";

const Header = (props) => {
  const [slideIndex, setSlideIndex] = useState(1);
  const [imgs, setImgs] = useState({
    1: "images/1.jpg",
    2: "images/2.jpg",
    3: "images/3.jpg",
    4: "images/4.jpg",
    5: "images/5.jpg",
  });
  const [imgsObjCount, setImgsObjCount] = useState(Object.keys(imgs).length);

  const nextSlide = () => {
    if (slideIndex !== imgsObjCount) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === imgsObjCount) {
      setSlideIndex(1);
    }
  };
  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(imgsObjCount);
    }
  };

  const moveDot = (index) => {
    setSlideIndex(index);
  };

  return (
    <div className={styles.containerSlide}>
      {Object.keys(imgs).map((key, index) => {
        return (
          <div
            key={key}
            className={
              slideIndex === index + 1
                ? `${`${styles.slide} ${styles.activeAnim}`}`
                : `${styles.slide}`
            }
          >
            <img className={styles.bgImage} src={imgs[key]} />
          </div>
        );
      })}
      <button
        onClick={prevSlide}
        className={`${styles.moveLeftBtn} ${styles.moveBtn}`}
      >
        <i class="fas fa-chevron-left"></i>
      </button>
      <button
        onClick={nextSlide}
        className={`${styles.moveRightBtn} ${styles.moveBtn}`}
      >
        <i class="fas fa-chevron-right"></i>
      </button>

      <div className={styles.containerDots}>
        {Array.from({ length: imgsObjCount }).map((item, index) => {
          return (
            <div
              onClick={() => moveDot(index + 1)}
              className={
                slideIndex === index + 1
                  ? `${`${styles.dot} ${styles.active}`}`
                  : `${styles.dot}`
              }
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
