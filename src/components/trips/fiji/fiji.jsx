import React from "react";
import { Link, Switch, Route, useParams } from "react-router-dom";
import styles from "./fiji.module.css";
import { useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from "react-html-parser";

const Fiji = ({
  fijis,
  setFijis,
  loginData,
  history,
  historyState,
  dataRepository,
  datas,
  setDatas,
  imageUploader,
}) => {
  const [newWritingDefaultIndex, setNewWritingDefaultIndex] = useState(false);
  const initialBoxRef = useRef();
  const newWritingLiRef = useRef();
  const newWritingLiRouteRef = useRef();
  const writeFormSubTitleInputRef = useRef();
  const writeFormContentsTextareaRef = useRef();
  const imgUploadBoxInputRef = useRef();
  const videoUploadBoxInputRef = useRef();
  const writeFormRef = useRef();

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
    setNewWritingDefaultIndex(true);
    if (!newWritingDefaultIndex) {
      fixUpdateRef.current.style.display = "none";
      dataRemoveRef.current.style.display = "none";
      newWritingLiRef.current.style.display = "block";
      history.push(`/fiji/practice`);
      setNewWritingDefaultIndex(true);
    } else {
      fixUpdateRef.current.style.display = "";
      dataRemoveRef.current.style.display = "";
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
  const writeFormContentsTextareaOnChange = (event, editor) => {
    const data = editor.getData();
    setNewTestStr(data);
  };

  const saveNewWritingData = (event) => {
    event.preventDefault();
    if (editPermission === undefined ? false : editPermission.admin) {
      const addUpdated = [...fijis];
      addUpdated[newKey - 1] = {
        id: newKey,
        type: fijis[1].type,
        title: newSubTitle,
        contents: `${newTestStr}`,
        image: selectedImg,
        video: selectedVideo,
      };
      setFijis(addUpdated);

      // datas state 업데이트 하기.
      const datasCopy = [...datas];
      const datasUpdate = datasCopy.map((data) => {
        if (data.id === "fijis") {
          data.data = addUpdated;
          return data;
        }
        return data;
      });
      setDatas(datasUpdate);

      // firebase server update
      dataRepository.saveData(datasUpdate);

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
    if (editPermission === undefined ? false : editPermission.admin) {
      const removeUpdated = [...fijis];
      const filtered = removeUpdated.filter(
        (data) => data.id.toString() !== keyValue
      );
      setFijis(filtered);

      // // datas update 하기
      const datasCopy = [...datas];
      const datasUpdate = datasCopy.map((data) => {
        if (data.id === "fijis") {
          data.data = filtered;
          return data;
        }
        return data;
      });
      setDatas(datasUpdate);
      // firebase server update
      dataRepository.saveData(datasUpdate);

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

  const onImgUpChange = async (event) => {
    event.preventDefault();
    console.log(event.target.files[0].name);
    let uploaded = await imageUploader.upload(event.target.files[0]);
    console.log(uploaded.url);
    setSelectedImg(
      `<img class="dbImgAndDbVideoBoxImg" src="${uploaded.url}"></img>`
    );
  };

  const onVideoUpChange = async (event) => {
    event.preventDefault();
    console.log(event.target.files[0]);
    let uploaded = await imageUploader.videoUpload(event.target.files[0]);
    console.log(uploaded);
    setSelectedVideo(
      `<video
          controls
          class="dbImgAndDbVideoBoxVideo"
          src="${uploaded.url}"
          type="video/*"
          controls
        ></video>`
    );
  };

  const codeImgVideoTag = `
    ${selectedImg}
    ${selectedVideo}
  `;

  const dataBoxForFixRef = useRef();
  const fixImgRef = useRef();
  const fixVideoRef = useRef();
  const fixUpdateRef = useRef();
  const dataRemoveRef = useRef();
  const newTextWriting = useRef();
  const dataBoxForFixContentRef = useRef();
  const [fixUpdateIndex, setFixUpdateIndex] = useState(true);
  const fixUpdate = (event) => {
    writeFixFormBtnRef.current.style.display = "block";
    if (editPermission === undefined ? false : editPermission.admin) {
      dataRemoveRef.current.style.display = "none";
      newTextWriting.current.style.display = "none";
      const prevContents = document.querySelectorAll(".fiji_switchBox__39drg");
      // post css는 각 모듈별로 따로 꾸며주기 때문에 왠만하면 ref로 전달해야 되지만
      // 이번 건의 경우 예외. 절대 post css는 querySelector는 지역이 아니라 전역으로 적요됨.
      if (keyValue === "practice") {
        history.push(`/fiji/${fijis.length}`);
        newWritingDefaultUpdata();
        return;
      }
      event.preventDefault();
      setFixUpdateIndex(false);
      prevContents.forEach((val) => (val.style.display = "none"));
      dataBoxForFixRef.current.style.display = "block";
    } else {
      alert("블로그 편집 권한이 없습니다. 관리자한테 문의 부탁드립니다");
    }
  };

  const backFixUpdate = (event) => {
    event.preventDefault();
    dataRemoveRef.current.style.display = "";
    newTextWriting.current.style.display = "";
    const prevContents = document.querySelectorAll(".fiji_switchBox__39drg");
    setFixUpdateIndex(true);
    prevContents.forEach((val) => (val.style.display = "block"));
    if (dataBoxForFixRef.current === null) {
      newWritingLiRef.current.style.display = "none";
      return;
    } else {
      dataBoxForFixRef.current.style.display = "none";
    }
  };

  const fixDataTitle =
    keyValue !== "practice" &&
    `
    <h1>${fijis[keyValue - 1]?.type}</h1>
    <h2>${fijis[keyValue - 1]?.title}</h2>
  `;

  const fixImgVid =
    keyValue !== "practice" &&
    `
  ${fijis[keyValue - 1]?.image}
  ${fijis[keyValue - 1]?.video}
`;

  const fixContent =
    keyValue !== "practice" &&
    `
    ${fijis[keyValue - 1]?.contents}
  `;

  const fixImgBtn = (event) => {
    event.preventDefault();
    fixImgRef.current.click();
  };

  const fixVidBtn = (event) => {
    event.preventDefault();
    fixVideoRef.current.click();
  };

  const realTimeFixLinkInputChange = (event) => {
    console.log(event.target.value);
    let novelUsaEuDataCopy = [...fijis];
    novelUsaEuDataCopy[keyValue - 1].title = event.target.value;
    console.log(novelUsaEuDataCopy);
    setFijis(novelUsaEuDataCopy);
  };

  const realTimeFixContentAreaChange = (event, editor) => {
    const data = editor.getData();
    let novelUsaEuDataCopy = [...fijis];
    novelUsaEuDataCopy[keyValue - 1].contents = data;
    setFijis(novelUsaEuDataCopy);
  };

  const writeFixFormBtnRef = useRef();
  const writeFixFormBtn = (event) => {
    event.preventDefault();
    // datas update 하기
    const datasCopy = [...datas];
    const datasUpdate = datasCopy.map((data) => {
      if (data.id === "fijis") {
        data.data = fijis;
        return data;
      }
      return data;
    });
    setDatas(datasUpdate);
    // firebase server update
    dataRepository.saveData(datasUpdate);
    writeFixFormBtnRef.current.style.display = "none";
  };

  const fixImgChange = async (event) => {
    console.log(event.target.files[0]);
    let novelUsaEuDataCopy = [...fijis];
    let uploaded = await imageUploader.upload(event.target.files[0]);
    console.log(uploaded.url);
    console.log(novelUsaEuDataCopy[keyValue - 1]);
    novelUsaEuDataCopy[
      keyValue - 1
    ].image = `<img class="dbImgAndDbVideoBoxImg" src="${uploaded.url}"></img>`;
    setFijis(novelUsaEuDataCopy);

    // datas update 하기
    let datasCopy = [...datas];
    let datasUpdate = datasCopy.map((data) => {
      if (data.id === "fijis") {
        data.data = novelUsaEuDataCopy;
        return data;
      }
      return data;
    });
    console.log(datasUpdate);
    setDatas(datasUpdate);
    // firebase server update
    dataRepository.saveData(datasUpdate);
  };

  const fixVideoChange = async (event) => {
    console.log(event.target.files[0]);
    let novelUsaEuDataCopy = [...fijis];
    let uploaded = await imageUploader.videoUpload(event.target.files[0]);
    console.log(uploaded);
    novelUsaEuDataCopy[keyValue - 1].video = `<video
    controls
    class="dbImgAndDbVideoBoxVideo"
    src="${uploaded.url}"
    type="video/*"
    controls
  ></video>`;
    setFijis(novelUsaEuDataCopy);

    // datas update 하기
    let datasCopy = [...datas];
    let datasUpdate = datasCopy.map((data) => {
      if (data.id === "fijis") {
        data.data = novelUsaEuDataCopy;
        return data;
      }
      return data;
    });
    setDatas(datasUpdate);
    // firebase server update
    dataRepository.saveData(datasUpdate);
  };

  const fixTxtAreaRef = useRef();
  const dataBoxForFixTitleRef = useRef();
  const onTestFixChange = () => {
    let key = window.event.keyCode;
    if (key === 13) {
      fixTxtAreaRef.current.value = fixTxtAreaRef.current.value + "</br>";
      return false;
    } else {
      return true;
    }
  };
  // testArea Tag에서 띄어쓰기 안되던 문제 해결.

  const onTestChange = () => {
    let key = window.event.keyCode;
    if (key === 13) {
      writeFormContentsTextareaRef.current.value =
        writeFormContentsTextareaRef.current.value + "</br>";
      setNewTestStr(writeFormContentsTextareaRef.current.value);
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      {keyValue !== "practice" && (
        <div ref={dataBoxForFixRef} className={styles.dataBoxForFix}>
          <div
            ref={dataBoxForFixTitleRef}
            className={styles.dataBoxForFixTitle}
          >
            {ReactHtmlParser(fixDataTitle)}
          </div>
          <div className={styles.dataBoxForFixImgVideoBox}>
            {ReactHtmlParser(fixImgVid)}
          </div>
          <div
            ref={dataBoxForFixContentRef}
            className={styles.dataBoxForFixContent}
          >
            {ReactHtmlParser(fixContent)}
          </div>

          <form className={styles.writeForm}>
            <input
              onChange={realTimeFixLinkInputChange}
              className={`${styles.realTimeFixLinkInput} ${styles.writeFormSubTitleInput}`}
              value={fijis[keyValue - 1]?.title}
            ></input>
            <CKEditor
              editor={ClassicEditor}
              ref={fixTxtAreaRef}
              onKeyPress={onTestFixChange}
              onChange={realTimeFixContentAreaChange}
              className={`${styles.realTimeFixContentArea} ${styles.writeFormContentsTextarea}`}
            >
              {fijis[keyValue - 1]?.contents}
            </CKEditor>
            <button ref={writeFixFormBtnRef} onClick={writeFixFormBtn}>
              작성
            </button>
            <div className={styles.imgVideoInputBtnBox}>
              <div className={styles.imgInputBtnBox}>
                <input
                  ref={fixImgRef}
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={fixImgChange}
                ></input>
                <button onClick={fixImgBtn}>이미지</button>
              </div>

              <div className={styles.videoInputBtnBox}>
                <input
                  ref={fixVideoRef}
                  type="file"
                  name="video"
                  accept="video/*"
                  onChange={fixVideoChange}
                ></input>
                <button onClick={fixVidBtn}>동영상</button>
              </div>
            </div>
          </form>
        </div>
      )}

      <li ref={newWritingLiRef} className={styles.newWritingLi}>
        <Route ref={newWritingLiRouteRef} path={`/fiji/practice`}>
          <div className={styles.novelUsaEuBox}>
            <div>
              <h1>{fijis[0].type}</h1>
              <h2>{newSubTitle}</h2>
              <div>{ReactHtmlParser(codeImgVideoTag)}</div>
              <div>{ReactHtmlParser(newTestStr)}</div>
            </div>
          </div>
        </Route>
        <Link className={styles.novelUsaEuDataList} to={`/fiji/practice`}>
          <h4>{newKey}.&emsp;</h4>
          <h4>{fijis[0].type}&nbsp;-&nbsp;</h4>
          <h4>{newSubTitle}</h4>
        </Link>

        <form ref={writeFormRef} className={styles.writeForm}>
          <input
            ref={writeFormSubTitleInputRef}
            className={styles.writeFormSubTitleInput}
            onChange={writeFormSubTitleInputOnChange}
          />
          <CKEditor
            editor={ClassicEditor}
            ref={writeFormContentsTextareaRef}
            onKeyPress={onTestChange}
            className={styles.writeFormContentsTextarea}
            onChange={writeFormContentsTextareaOnChange}
          ></CKEditor>
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
      {!keyValue ||
        (keyValue === undefined && (
          <div ref={initialBoxRef} className={styles.novelUsaEuInitialBox}>
            <div>
              <h1>{fijis[fijis.length - 1].type}</h1>
              <h2>{fijis[fijis.length - 1].title}</h2>
              <div>{ReactHtmlParser(initialCodes)}</div>
            </div>
          </div>
        ))}
      {Object.keys(fijis)
        .reverse()
        .map((key) => {
          const testStr = fijis[key].contents;
          const dbImg = fijis[key].image;
          const dbVideo = fijis[key].video;
          let codes = `
              <div>
                <h1>${fijis[key].type}</h1>
                <h2>${fijis[key].title}</h2>
                <div class="dbImgAndDbVideoBox">
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
                    <div className={styles.novelUsaEuBox}>
                      {ReactHtmlParser(codes)}
                    </div>
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
              <li onClick={backFixUpdate}>
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

      <button ref={newTextWriting} onClick={newWritingDefaultUpdata}>
        글쓰기
      </button>

      {fixUpdateIndex ? (
        <button ref={fixUpdateRef} onClick={fixUpdate}>
          수정
        </button>
      ) : (
        <button onClick={backFixUpdate}>뒤로</button>
      )}
      <button ref={dataRemoveRef} onClick={dataRemove}>
        삭제
      </button>
    </>
  );
};

export default Fiji;
