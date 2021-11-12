import React, { useCallback, useEffect, memo } from "react";
import { useState } from "react";
import styles from "./header.module.css";

const Header = memo(() => {
  const [slideIndex, setSlideIndex] = useState(1);
  const [images, setImages] = useState({
    1: "../images/1.jpg",
    2: "../images/2.jpg",
    3: "../images/3.jpg",
    4: "../images/4.jpg",
    5: "../images/5.jpg",
  });

  const [imgsObjCount, setImgsObjCount] = useState(Object.keys(images).length);

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

  let interval;
  const startAutoSlide = useCallback(() => {
    interval = setInterval(() => {
      if (slideIndex < 5) {
        setSlideIndex(slideIndex + 1);
        return () => clearInterval(interval);
      } else {
        setSlideIndex(1);
      }
    }, 3000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    // startAutoSlide();
    // return () => clearInterval(interval);
    startAutoSlide();
    return () => clearInterval(interval);
  });
  // header component가 처음 마운트 되었을때 자동으로 auto슬라이드가
  // 시작된다. 그리고 언마운트 될때 cleanUp함수 정의해서 setInterval 닫아준다.
  // 그리고 글쓰기 작성, 수정 혹은 다른 페이지 넘어갈 때마다 header 컴포넌트가
  // 리렌더링 되어서 자동으로 useEffect의 autoslide이가 실행되었는데
  // 이 부분은 header component 자체를 memo 처리해서 바뀌는 props 데이터 혹은
  // 컴포넌트 구성하는 데이터 변경이 없으면 리렌더링 되지 않게 처리! 그렇게 함으로써
  // 다른 컴포넌트로 넘어가도 header부분은 리렌더링 되지 않기 때문에 useEffect 실행도 안됨.

  // 그리고 setInerval은 끝까지 돌아가는 범위까지 돌리고 반드시 clearInerval 선언을 해주어야 함
  // 그렇지 않으면 setInterval 여러개가 쌓여서 결국 메모리 누수가 발생함.

  const startAutoSlideBtnFun = (event) => {
    console.log(event.target);
    startAutoSlide();
  };

  const stopAutoSlideBtnFun = (event) => {
    console.log(event.target);
    clearInterval(interval);
  };

  return (
    <div className={styles.containerSlide}>
      {Object.keys(images).map((key, index) => {
        return (
          <div
            key={key}
            className={
              slideIndex === index + 1
                ? `${`${styles.slide} ${styles.activeAnim}`}`
                : `${styles.slide}`
            }
          >
            <img className={styles.bgImage} src={images[key]} />
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
      <button
        className={styles.startAutoSlideBtn}
        onClick={startAutoSlideBtnFun}
      >
        자동 슬라이드 시작
      </button>
      <button className={styles.stopAutoSlideBtn} onClick={stopAutoSlideBtnFun}>
        자동 슬라이드 멈춤
      </button>
    </div>
  );
});

export default Header;
