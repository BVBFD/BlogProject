import userEvent from "@testing-library/user-event";
import React, { useEffect, useRef, useState } from "react";
import styles from "./header.module.css";

const Header = (props) => {
  const [imgs, setImgs] = useState({});
  const [index, setIndex] = useState(0);

  const img1Ref = useRef();
  const img2Ref = useRef();
  const img3Ref = useRef();
  const img4Ref = useRef();
  const img5Ref = useRef();
  const imgUlRef = useRef();

  const circleRef0 = useRef();
  const circleRef1 = useRef();
  const circleRef2 = useRef();
  const circleRef3 = useRef();
  const circleRef4 = useRef();

  // React에서 DOM으로 접근할때는 useRef를 사용해야한다.
  // queryselector와 같은 직접적인 조작은 왠만하면 피해야 한다.
  // 예상치 못한 오류가 발생한다.
  useEffect(() => {
    circleRef0.current.style.backgroundColor = `whitesmoke`;
    setImgs({
      0: img1Ref,
      1: img2Ref,
      2: img3Ref,
      3: img4Ref,
      4: img5Ref,
    });
  }, []);

  const moveLeftBtn = () => {
    if (index > -1 && index < 4) {
      if (imgs[index] === imgs[0]) {
        imgUlRef.current.style.transform = `translateX(0)`;
        circleRef0.current.style.backgroundColor = `whitesmoke`;
        circleRef1.current.style.backgroundColor = `transparent`;
        console.log(index);
      }
      if (imgs[index] === imgs[1]) {
        imgUlRef.current.style.transform = `translateX(-300vw)`;
        setIndex(index - 1);
        circleRef1.current.style.backgroundColor = `whitesmoke`;
        circleRef2.current.style.backgroundColor = `transparent`;
        console.log(index);
      }
      if (imgs[index] === imgs[2]) {
        imgUlRef.current.style.transform = `translateX(-200vw)`;
        setIndex(index - 1);
        circleRef2.current.style.backgroundColor = `whitesmoke`;
        circleRef3.current.style.backgroundColor = `transparent`;
        console.log(index);
      }
      if (imgs[index] === imgs[3]) {
        imgUlRef.current.style.transform = `translateX(-100vw)`;
        setIndex(index - 1);
        circleRef3.current.style.backgroundColor = `whitesmoke`;
        circleRef4.current.style.backgroundColor = `transparent`;
        console.log(index);
      }
    }
  };

  const moveRightBtn = () => {
    if (index < 4 && index > -1) {
      if (imgs[index] === imgs[0]) {
        imgUlRef.current.style.transform = `translateX(-100vw)`;
        setIndex(index + 1);
        circleRef0.current.style.backgroundColor = `transparent`;
        circleRef1.current.style.backgroundColor = `whitesmoke`;
        console.log(index);
      }
      if (imgs[index] === imgs[1]) {
        imgUlRef.current.style.transform = `translateX(-200vw)`;
        setIndex(index + 1);
        circleRef1.current.style.backgroundColor = `transparent`;
        circleRef2.current.style.backgroundColor = `whitesmoke`;
        console.log(index);
      }
      if (imgs[index] === imgs[2]) {
        imgUlRef.current.style.transform = `translateX(-300vw)`;
        setIndex(index + 1);
        circleRef2.current.style.backgroundColor = `transparent`;
        circleRef3.current.style.backgroundColor = `whitesmoke`;
        console.log(index);
      }
      if (imgs[index] === imgs[3]) {
        imgUlRef.current.style.transform = `translateX(-400vw)`;
        circleRef3.current.style.backgroundColor = `transparent`;
        circleRef4.current.style.backgroundColor = `whitesmoke`;
        console.log(index);
      }
    }
  };

  return (
    <div className={styles.headerBox}>
      <button
        onClick={moveLeftBtn}
        className={`${styles.headerBoxBtn} ${styles.headerLeftBoxBtn}`}
      >
        <i class="fas fa-chevron-left"></i>
      </button>
      <ul ref={imgUlRef} className={styles.imgBox}>
        <li>
          <img
            ref={img1Ref}
            className={`${styles.headerBoxImg}`}
            src="/images/1.jpg"
          />
        </li>
        <li>
          <img
            ref={img2Ref}
            className={styles.headerBoxImg}
            src="/images/2.jpg"
          />
        </li>
        <li>
          <img
            ref={img3Ref}
            className={styles.headerBoxImg}
            src="/images/3.jpg"
          />
        </li>
        <li>
          <img
            ref={img4Ref}
            className={styles.headerBoxImg}
            src="/images/4.jpg"
          />
        </li>
        <li>
          <img
            ref={img5Ref}
            className={styles.headerBoxImg}
            src="/images/5.jpg"
          />
        </li>
        {/* 리액트에서는 이미지 폴더 파일 public에 넣고 적용해야함 */}
      </ul>
      <button
        onClick={moveRightBtn}
        className={`${styles.headerBoxBtn} ${styles.headerRightBoxBtn}`}
      >
        <i class="fas fa-chevron-right"></i>
      </button>
      <div className={styles.clickCircleBox}>
        <div ref={circleRef0} className={styles.circle}></div>
        <div ref={circleRef1} className={styles.circle}></div>
        <div ref={circleRef2} className={styles.circle}></div>
        <div ref={circleRef3} className={styles.circle}></div>
        <div ref={circleRef4} className={styles.circle}></div>
      </div>
    </div>
  );
};

export default Header;
