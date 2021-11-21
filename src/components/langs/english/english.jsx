import React from "react";
import { Link, Switch, Route, useParams } from "react-router-dom";
import styles from "./english.module.css";
import { useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from "react-html-parser";

const English = ({
  englishs,
  setEnglishs,
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
      ${englishs[englishs.length - 1].contents}
    </div>`;

  let newKey = englishs.length + 1;
  const newWritingDefaultUpdata = () => {
    setNewWritingDefaultIndex(true);
    if (!newWritingDefaultIndex) {
      fixUpdateRef.current.style.display = "none";
      dataRemoveRef.current.style.display = "none";
      newWritingLiRef.current.style.display = "block";
      history.push(`/english/practice`);
      setNewWritingDefaultIndex(true);
    } else {
      fixUpdateRef.current.style.display = "";
      dataRemoveRef.current.style.display = "";
      newWritingLiRef.current.style.display = "none";
      history.push(`/english/${englishs.length}`);
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
      const addUpdated = [...englishs];
      addUpdated[newKey - 1] = {
        id: newKey,
        type: englishs[1].type,
        title: newSubTitle,
        contents: `${newTestStr}`,
        image: selectedImg,
        video: selectedVideo,
      };
      setEnglishs(addUpdated);

      // datas state 업데이트 하기.
      const datasCopy = [...datas];
      const datasUpdate = datasCopy.map((data) => {
        if (data.id === "englishs") {
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
      history.push(`/english/${englishs.length + 1}`);
    } else {
      alert("블로그 편집 권한이 없습니다. 관리자한테 문의 부탁드립니다");
    }
  };

  const dataRemove = (event) => {
    event.preventDefault();
    if (editPermission === undefined ? false : editPermission.admin) {
      const removeUpdated = [...englishs];
      const filtered = removeUpdated.filter(
        (data) => data.id.toString() !== keyValue
      );
      setEnglishs(filtered);

      // // datas update 하기
      const datasCopy = [...datas];
      const datasUpdate = datasCopy.map((data) => {
        if (data.id === "englishs") {
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
      history.push(`/english/${keyValue - 1}`);
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
      const prevContents = document.querySelectorAll(
        ".english_switchBox__2KV4B"
      );
      // post css는 각 모듈별로 따로 꾸며주기 때문에 왠만하면 ref로 전달해야 되지만
      // 이번 건의 경우 예외. 절대 post css는 querySelector는 지역이 아니라 전역으로 적요됨.
      if (keyValue === "practice") {
        history.push(`/english/${englishs.length}`);
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
    const prevContents = document.querySelectorAll(".english_switchBox__2KV4B");
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
    <h1>${englishs[keyValue - 1]?.type}</h1>
    <h2>${englishs[keyValue - 1]?.title}</h2>
  `;

  const fixImgVid =
    keyValue !== "practice" &&
    `
  ${englishs[keyValue - 1]?.image}
  ${englishs[keyValue - 1]?.video}
`;

  const fixContent =
    keyValue !== "practice" &&
    `
    ${englishs[keyValue - 1]?.contents}
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
    let novelUsaEuDataCopy = [...englishs];
    novelUsaEuDataCopy[keyValue - 1].title = event.target.value;
    console.log(novelUsaEuDataCopy);
    setEnglishs(novelUsaEuDataCopy);
  };

  const realTimeFixContentAreaChange = (event, editor) => {
    const data = editor.getData();
    let novelUsaEuDataCopy = [...englishs];
    novelUsaEuDataCopy[keyValue - 1].contents = data;
    setEnglishs(novelUsaEuDataCopy);
  };

  const writeFixFormBtnRef = useRef();
  const writeFixFormBtn = (event) => {
    event.preventDefault();
    // datas update 하기
    const datasCopy = [...datas];
    const datasUpdate = datasCopy.map((data) => {
      if (data.id === "englishs") {
        data.data = englishs;
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
    let novelUsaEuDataCopy = [...englishs];
    let uploaded = await imageUploader.upload(event.target.files[0]);
    console.log(uploaded.url);
    console.log(novelUsaEuDataCopy[keyValue - 1]);
    novelUsaEuDataCopy[
      keyValue - 1
    ].image = `<img class="dbImgAndDbVideoBoxImg" src="${uploaded.url}"></img>`;
    setEnglishs(novelUsaEuDataCopy);

    // datas update 하기
    let datasCopy = [...datas];
    let datasUpdate = datasCopy.map((data) => {
      if (data.id === "englishs") {
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
    let novelUsaEuDataCopy = [...englishs];
    let uploaded = await imageUploader.videoUpload(event.target.files[0]);
    console.log(uploaded);
    novelUsaEuDataCopy[keyValue - 1].video = `<video
    controls
    class="dbImgAndDbVideoBoxVideo"
    src="${uploaded.url}"
    type="video/*"
    controls
  ></video>`;
    setEnglishs(novelUsaEuDataCopy);

    // datas update 하기
    let datasCopy = [...datas];
    let datasUpdate = datasCopy.map((data) => {
      if (data.id === "englishs") {
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
              value={englishs[keyValue - 1]?.title}
            ></input>
            <CKEditor
              editor={ClassicEditor}
              ref={fixTxtAreaRef}
              onKeyPress={onTestFixChange}
              onChange={realTimeFixContentAreaChange}
              className={`${styles.realTimeFixContentArea} ${styles.writeFormContentsTextarea}`}
            >
              {englishs[keyValue - 1]?.contents}
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
        <Route ref={newWritingLiRouteRef} path={`/english/practice`}>
          <div className={styles.novelUsaEuBox}>
            <div>
              <h1>{englishs[0].type}</h1>
              <h2>{newSubTitle}</h2>
              <div>{ReactHtmlParser(codeImgVideoTag)}</div>
              <div>{ReactHtmlParser(newTestStr)}</div>
            </div>
          </div>
        </Route>
        <Link className={styles.novelUsaEuDataList} to={`/english/practice`}>
          <h4>{newKey}.&emsp;</h4>
          <h4>{englishs[0].type}&nbsp;-&nbsp;</h4>
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
              <h1>{englishs[englishs.length - 1].type}</h1>
              <h2>{englishs[englishs.length - 1].title}</h2>
              <div>{ReactHtmlParser(initialCodes)}</div>
            </div>
          </div>
        ))}
      {Object.keys(englishs)
        .reverse()
        .map((key) => {
          const testStr = englishs[key].contents;
          const dbImg = englishs[key].image;
          const dbVideo = englishs[key].video;
          let codes = `
              <div>
                <h1>${englishs[key].type}</h1>
                <h2>${englishs[key].title}</h2>
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
                  <Route path={`/english/${englishs[key].id}`}>
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
        {Object.keys(englishs)
          .reverse()
          .map((key) => {
            return (
              <li onClick={backFixUpdate}>
                <Link
                  className={styles.novelUsaEuDataList}
                  to={`/english/${englishs[key].id}`}
                >
                  <h4>{englishs[key].id}.&emsp;</h4>
                  <h4>{englishs[key].type}&nbsp;-&nbsp;</h4>
                  <h4>{englishs[key].title}</h4>
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

export default English;
