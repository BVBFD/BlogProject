import React from "react";
import { Link, Switch, Route, useParams } from "react-router-dom";
import styles from "./fiji.module.css";
import { useRef, useState } from "react/cjs/react.development";

const Fiji = ({
  fijis,
  setFijis,
  loginData,
  history,
  historyState,
  totalData,
  setTotalData,
}) => {
  const [newWritingDefaultIndex, setNewWritingDefaultIndex] = useState(false);
  const initialBoxRef = useRef();
  const newWritingLiRef = useRef();
  const newWritingLiRouteRef = useRef();
  const writeFormSubTitleInputRef = useRef();
  const writeFormContentsTextareaRef = useRef();
  const imgUploadBoxInputRef = useRef();
  const videoUploadBoxInputRef = useRef();

  let [newSubTitle, setNewSubTitle] = useState();
  let [newTestStr, setNewTestStr] = useState();
  const [selectedImg, setSelectedImg] = useState("");
  const [selectedVideo, setSelectedVideo] = useState("");

  const editPermissionIndex = Object.keys(loginData).filter(
    (key) => loginData[key].id === historyState
  );
  const editPermission = loginData[editPermissionIndex];

  const { keyValue } = useParams();
  const initialCodes = `
    <div>
      ${fijis[fijis.length - 1].contents}
    </div>`;

  let newKey = fijis.length + 1;
  const newWritingDefaultUpdata = () => {
    if (!newWritingDefaultIndex) {
      newWritingLiRef.current.style.display = "block";
      history.push(`/fiji/practice`);
      setNewWritingDefaultIndex(true);
    } else {
      newWritingLiRef.current.style.display = "none";
      history.push(`/fiji/${fijis.length}`);
      setNewWritingDefaultIndex(false);
    }
  };

  // 항상 리액트처럼 생각을 하자!!
  const writeFormSubTitleInputOnChange = (event) => {
    newSubTitle = `${event.target.value}`;
    setNewSubTitle(newSubTitle);
  };
  const writeFormContentsTextareaOnChange = (event) => {
    newTestStr = `${event.target.value}`;
    setNewTestStr(newTestStr);
  };

  const saveNewWritingData = (event) => {
    event.preventDefault();
    if (editPermission.admin) {
      const addUpdated = [...fijis];
      addUpdated[newKey - 1] = {
        id: newKey,
        type: fijis[1].type,
        title: newSubTitle,
        contents: `<p>\n${newTestStr}\n</p>`,
        image: selectedImg,
        video: selectedVideo,
      };
      setFijis(addUpdated);

      // initial page list update
      const totalDataCopy = { ...totalData };
      totalDataCopy["fiji"] = addUpdated;
      setTotalData(totalDataCopy);

      // 작성란 초기화
      setNewSubTitle("");
      setNewTestStr("");
      writeFormSubTitleInputRef.current.value = "";
      writeFormContentsTextareaRef.current.value = "";
      newWritingDefaultUpdata();
      history.push(`/fiji/${fijis.length + 1}`);
    } else {
      alert("블로그 편집 권한이 없습니다. 관리자한테 문의 부탁드립니다");
    }
  };

  const dataRemove = (event) => {
    event.preventDefault();
    if (editPermission.admin) {
      const removeUpdated = [...fijis];
      const filtered = removeUpdated.filter(
        (data) => data.id.toString() !== keyValue
      );
      setFijis(filtered);

      // initial page list update
      const totalDataCopy = { ...totalData };
      totalDataCopy["fiji"] = filtered;
      setTotalData(totalDataCopy);
      // useState 여러개 관리하면 따로 값을 내려서 받아서 처리해야함
      // 객체 오브젝트의 키값 string인지 아닌지 확인하고 처리할 것
      // "6", 6 이 두 개의 값은 틀린 것임을 명심할 것!

      // 작성란 초기화
      setNewSubTitle("");
      setNewTestStr("");
      writeFormSubTitleInputRef.current.value = "";
      writeFormContentsTextareaRef.current.value = "";
      history.push(`/fiji/${keyValue - 1}`);
    } else {
      alert("블로그 편집 권한이 없습니다. 관리자한테 문의 부탁드립니다");
    }
  };

  const onImgUpBtnClick = (event) => {
    event.preventDefault();
    imgUploadBoxInputRef.current.click();
  };

  const onVideoUpBtnClick = (event) => {
    event.preventDefault();
    videoUploadBoxInputRef.current.click();
  };

  const onImgUpChange = (event) => {
    event.preventDefault();
    console.log(event.target.files[0]);
    setSelectedImg(
      '<img style="width: 42vw; height: 20%;" src="../images/4.jpg"></img>'
    );
  };

  const onVideoUpChange = (event) => {
    event.preventDefault();
    console.log(event.target.files[0]);
    setSelectedVideo(
      `<video
          controls
          style="width: 42vw; height: 20%;"
          src="../videos/stayWithMe.mp4"
          type="video/*"
          controls
        ></video>`
    );
  };

  const codeImgVideoTag = `
    ${selectedImg}
    ${selectedVideo}
  `;

  return (
    <>
      <li ref={newWritingLiRef} className={styles.newWritingLi}>
        <Route ref={newWritingLiRouteRef} path={`/fiji/practice`}>
          <div className={styles.novelUsaEuBox}>
            <div>
              <h1>{fijis[0].type}</h1>
              <h2>{newSubTitle}</h2>
              <div dangerouslySetInnerHTML={{ __html: codeImgVideoTag }}></div>
              <div>{newTestStr}</div>
            </div>
          </div>
        </Route>
        <Link className={styles.novelUsaEuDataList} to={`/fiji/practice`}>
          <h4>{newKey}.&emsp;</h4>
          <h4>{fijis[0].type}&nbsp;-&nbsp;</h4>
          <h4>{newSubTitle}</h4>
        </Link>

        <form className={styles.writeForm}>
          <input
            ref={writeFormSubTitleInputRef}
            className={styles.writeFormSubTitleInput}
            onChange={writeFormSubTitleInputOnChange}
          />
          <textarea
            ref={writeFormContentsTextareaRef}
            className={styles.writeFormContentsTextarea}
            onChange={writeFormContentsTextareaOnChange}
          ></textarea>
          <button onClick={saveNewWritingData}>작성</button>
          <div className={styles.imgVideoUploadBox}>
            <div className={styles.imgUploadBox}>
              <input
                ref={imgUploadBoxInputRef}
                type="file"
                accept="image/*"
                name="image"
                className={styles.imgUploadBoxInput}
                onChange={onImgUpChange}
              ></input>
              <button
                onClick={onImgUpBtnClick}
                className={styles.imgUploadBoxBtn}
              >
                이미지
              </button>
            </div>

            <div className={styles.videoUploadBox}>
              <input
                ref={videoUploadBoxInputRef}
                type="file"
                accept="video/*"
                name="video"
                className={styles.imgUploadBoxInput}
                onChange={onVideoUpChange}
              ></input>
              <button
                onClick={onVideoUpBtnClick}
                className={styles.videoUploadBoxBtn}
              >
                동영상
              </button>
            </div>
          </div>
        </form>
      </li>

      {!keyValue && (
        <div ref={initialBoxRef} className={styles.novelUsaEuInitialBox}>
          <div>
            <h1>{fijis[fijis.length - 1].type}</h1>
            <h2>{fijis[fijis.length - 1].title}</h2>
            <div dangerouslySetInnerHTML={{ __html: initialCodes }}></div>
          </div>
        </div>
      )}

      {Object.keys(fijis)
        .reverse()
        .map((key) => {
          const testStr = fijis[key].contents;
          const dbImg = fijis[key].image;
          const dbVideo = fijis[key].video;
          // testStr.join("") 배열을 하나로 연결된 문자열로 바꾼다.
          let codes = `
              <div>
                <h1>${fijis[key].type}</h1>
                <h2>${fijis[key].title}</h2>
                <div>
                  ${dbImg}
                  ${dbVideo}
                </div>
                <div>
                  ${testStr}
                </div>
              </div>`;
          return (
            <>
              <div className={styles.switchBox}>
                <Switch>
                  <Route path={`/fiji/${fijis[key].id}`}>
                    <div
                      className={styles.novelUsaEuBox}
                      dangerouslySetInnerHTML={{ __html: codes }}
                    ></div>
                  </Route>
                </Switch>
              </div>
            </>
          );
        })}
      <ul className={styles.novelUsaEuDataUlBox}>
        {Object.keys(fijis)
          .reverse()
          .map((key) => {
            return (
              <li>
                <Link
                  className={styles.novelUsaEuDataList}
                  to={`/fiji/${fijis[key].id}`}
                >
                  <h4>{fijis[key].id}.&emsp;</h4>
                  <h4>{fijis[key].type}&nbsp;-&nbsp;</h4>
                  <h4>{fijis[key].title}</h4>
                </Link>
              </li>
            );
          })}
      </ul>

      <button onClick={newWritingDefaultUpdata}>글쓰기</button>
      <button onClick={dataRemove}>삭제</button>
    </>
  );
};

export default Fiji;
