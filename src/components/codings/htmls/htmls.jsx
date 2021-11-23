import React from "react";
import { Link, Switch, Route, useParams } from "react-router-dom";
import styles from "./htmls.module.css";
import { useRef, useState } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";

// import innerText from "react-innertext";
import ReactHtmlParser from "react-html-parser";

const Htmls = ({
  htmls,
  setHtmls,
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
  // const imgUploadBoxInputRef = useRef();
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
      ${htmls[htmls.length - 1].contents}
    </div>`;

  let newKey = htmls.length + 1;
  const newWritingDefaultUpdata = () => {
    setNewWritingDefaultIndex(true);
    if (!newWritingDefaultIndex) {
      fixUpdateRef.current.style.display = "none";
      dataRemoveRef.current.style.display = "none";
      newWritingLiRef.current.style.display = "block";
      history.push(`/html/practice`);
      setNewWritingDefaultIndex(true);
    } else {
      fixUpdateRef.current.style.display = "";
      dataRemoveRef.current.style.display = "";
      newWritingLiRef.current.style.display = "none";
      history.push(`/html/${htmls.length}`);
      setNewWritingDefaultIndex(false);
    }
  };

  // 항상 리액트처럼 생각을 하자!!
  const writeFormSubTitleInputOnChange = (event) => {
    newSubTitle = `${event.target.value}`;
    setNewSubTitle(newSubTitle);
  };
  const writeFormContentsTextareaOnChange = () => {
    const contentChanged = writeFormContentsTextareaRef.current
      .getInstance()
      .getHTML();
    setNewTestStr(contentChanged);
  };

  const saveNewWritingData = (event) => {
    event.preventDefault();
    if (editPermission === undefined ? false : editPermission.admin) {
      const addUpdated = [...htmls];
      addUpdated[newKey - 1] = {
        id: newKey,
        type: htmls[1].type,
        title: newSubTitle,
        contents: `${newTestStr}`,
        image: selectedImg,
        video: selectedVideo,
      };
      setHtmls(addUpdated);

      // datas state 업데이트 하기.
      const datasCopy = [...datas];
      const datasUpdate = datasCopy.map((data) => {
        if (data.id === "htmls") {
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
      history.push(`/html/${htmls.length + 1}`);
    } else {
      alert("블로그 편집 권한이 없습니다. 관리자한테 문의 부탁드립니다");
    }
  };

  const dataRemove = (event) => {
    event.preventDefault();
    if (editPermission === undefined ? false : editPermission.admin) {
      const removeUpdated = [...htmls];
      const filtered = removeUpdated.filter(
        (data) => data.id.toString() !== keyValue
      );
      setHtmls(filtered);

      // // datas update 하기
      const datasCopy = [...datas];
      const datasUpdate = datasCopy.map((data) => {
        if (data.id === "htmls") {
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
      history.push(`/html/${keyValue - 1}`);
    } else {
      alert("블로그 편집 권한이 없습니다. 관리자한테 문의 부탁드립니다");
    }
  };

  // const onImgUpBtnClick = (event) => {
  //   event.preventDefault();
  //   imgUploadBoxInputRef.current.click();
  // };

  const onVideoUpBtnClick = (event) => {
    event.preventDefault();
    videoUploadBoxInputRef.current.click();
  };

  // const onImgUpChange = async (event) => {
  //   event.preventDefault();
  //   console.log(event.target.files[0].name);
  //   let uploaded = await imageUploader.upload(event.target.files[0]);
  //   console.log(uploaded.url);
  //   setSelectedImg(
  //     `<img class="dbImgAndDbVideoBoxImg" src="${uploaded.url}"></img>`
  //   );
  // };

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
  // const fixImgRef = useRef();
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
      const prevContents = document.querySelectorAll(".htmls_switchBox__2cTM8");
      // post css는 각 모듈별로 따로 꾸며주기 때문에 왠만하면 ref로 전달해야 되지만
      // 이번 건의 경우 예외. 절대 post css는 querySelector는 지역이 아니라 전역으로 적요됨.
      if (keyValue === "practice") {
        history.push(`/html/${htmls.length}`);
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
    const prevContents = document.querySelectorAll(".htmls_switchBox__2cTM8");
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
    <h1>${htmls[keyValue - 1]?.type}</h1>
    <h2>${htmls[keyValue - 1]?.title}</h2>
  `;

  const fixImgVid =
    keyValue !== "practice" &&
    `
  ${htmls[keyValue - 1]?.image}
  ${htmls[keyValue - 1]?.video}
`;

  const fixContent =
    keyValue !== "practice" &&
    `
    ${htmls[keyValue - 1]?.contents}
  `;

  // const fixImgBtn = (event) => {
  //   event.preventDefault();
  //   fixImgRef.current.click();
  // };

  const fixVidBtn = (event) => {
    event.preventDefault();
    fixVideoRef.current.click();
  };

  const realTimeFixLinkInputChange = (event) => {
    console.log(event.target.value);
    let novelUsaEuDataCopy = [...htmls];
    novelUsaEuDataCopy[keyValue - 1].title = event.target.value;
    console.log(novelUsaEuDataCopy);
    setHtmls(novelUsaEuDataCopy);
  };

  const realTimeFixContentAreaChange = () => {
    const contentChanged = fixTxtAreaRef.current.getInstance().getHTML();
    let novelUsaEuDataCopy = [...htmls];
    novelUsaEuDataCopy[keyValue - 1].contents = contentChanged;
    setHtmls(novelUsaEuDataCopy);
  };

  const writeFixFormBtnRef = useRef();
  const writeFixFormBtn = (event) => {
    event.preventDefault();
    // datas update 하기
    const datasCopy = [...datas];
    const datasUpdate = datasCopy.map((data) => {
      if (data.id === "htmls") {
        data.data = htmls;
        return data;
      }
      return data;
    });
    setDatas(datasUpdate);
    // firebase server update
    dataRepository.saveData(datasUpdate);
    writeFixFormBtnRef.current.style.display = "none";
  };

  // const fixImgChange = async (event) => {
  //   console.log(event.target.files[0]);
  //   let novelUsaEuDataCopy = [...htmls];
  //   let uploaded = await imageUploader.upload(event.target.files[0]);
  //   console.log(uploaded.url);
  //   console.log(novelUsaEuDataCopy[keyValue - 1]);
  //   novelUsaEuDataCopy[
  //     keyValue - 1
  //   ].image = `<img class="dbImgAndDbVideoBoxImg" src="${uploaded.url}"></img>`;
  //   setHtmls(novelUsaEuDataCopy);

  //   // datas update 하기
  //   let datasCopy = [...datas];
  //   let datasUpdate = datasCopy.map((data) => {
  //     if (data.id === "htmls") {
  //       data.data = novelUsaEuDataCopy;
  //       return data;
  //     }
  //     return data;
  //   });
  //   console.log(datasUpdate);
  //   setDatas(datasUpdate);
  //   // firebase server update
  //   dataRepository.saveData(datasUpdate);
  // };

  const fixVideoChange = async (event) => {
    console.log(event.target.files[0]);
    let novelUsaEuDataCopy = [...htmls];
    let uploaded = await imageUploader.videoUpload(event.target.files[0]);
    console.log(uploaded);
    novelUsaEuDataCopy[keyValue - 1].video = `<video
    controls
    class="dbImgAndDbVideoBoxVideo"
    src="${uploaded.url}"
    type="video/*"
    controls
  ></video>`;
    setHtmls(novelUsaEuDataCopy);

    // datas update 하기
    let datasCopy = [...datas];
    let datasUpdate = datasCopy.map((data) => {
      if (data.id === "htmls") {
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
              value={htmls[keyValue - 1]?.title}
            ></input>
            <Editor
              previewStyle="vertical"
              initialEditType="markdown"
              initialValue="밑에 있는 텍스트를 복사해서 원본을 유지하세요"
              ref={fixTxtAreaRef}
              toolbarItems={[
                ["heading", "bold", "italic"],
                ["image"],
                ["code", "codeblock"],
              ]}
              className={`${styles.realTimeFixContentArea} ${styles.writeFormContentsTextarea}`}
              onChange={realTimeFixContentAreaChange}
              plugins={[colorSyntax]}
            />
            <textarea
              className={styles.writeFormContentsTextarea}
              value={htmls[keyValue - 1]?.contents}
              readOnly="readOnly"
            ></textarea>
            <button ref={writeFixFormBtnRef} onClick={writeFixFormBtn}>
              작성
            </button>
            <div className={styles.imgVideoInputBtnBox}>
              {/* <div className={styles.imgInputBtnBox}>
                <input
                  ref={fixImgRef}
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={fixImgChange}
                ></input>
                <button onClick={fixImgBtn}>이미지</button>
              </div> */}

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
        <Route ref={newWritingLiRouteRef} path={`/html/practice`}>
          <div className={styles.novelUsaEuBox}>
            <div>
              <h1>{htmls[0].type}</h1>
              <h2>{newSubTitle}</h2>
              <div>{ReactHtmlParser(codeImgVideoTag)}</div>
              <div>{ReactHtmlParser(newTestStr)}</div>
            </div>
          </div>
        </Route>
        <Link className={styles.novelUsaEuDataList} to={`/html/practice`}>
          <h4>{newKey}.&emsp;</h4>
          <h4>{htmls[0].type}&nbsp;-&nbsp;</h4>
          <h4>{newSubTitle}</h4>
        </Link>

        <form ref={writeFormRef} className={styles.writeForm}>
          <input
            ref={writeFormSubTitleInputRef}
            className={styles.writeFormSubTitleInput}
            onChange={writeFormSubTitleInputOnChange}
          />
          <Editor
            previewStyle="vertical"
            initialEditType="markdown"
            initialValue="hello"
            ref={writeFormContentsTextareaRef}
            toolbarItems={[
              ["heading", "bold", "italic"],
              ["image"],
              ["code", "codeblock"],
            ]}
            className={styles.writeFormContentsTextarea}
            onChange={writeFormContentsTextareaOnChange}
            plugins={[colorSyntax]}
          />
          <button onClick={saveNewWritingData}>작성</button>
          <div className={styles.imgVideoUploadBox}>
            {/* <div className={styles.imgUploadBox}>
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
            </div> */}

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
              <h1>{htmls[htmls.length - 1].type}</h1>
              <h2>{htmls[htmls.length - 1].title}</h2>
              <div>{ReactHtmlParser(initialCodes)}</div>
            </div>
          </div>
        ))}
      {Object.keys(htmls)
        .reverse()
        .map((key) => {
          const testStr = htmls[key].contents;
          const dbImg = htmls[key].image;
          const dbVideo = htmls[key].video;
          let codes = `
              <div>
                <h1>${htmls[key].type}</h1>
                <h2>${htmls[key].title}</h2>
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
                  <Route path={`/html/${htmls[key].id}`}>
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
        {Object.keys(htmls)
          .reverse()
          .map((key) => {
            return (
              <li onClick={backFixUpdate}>
                <Link
                  className={styles.novelUsaEuDataList}
                  to={`/html/${htmls[key].id}`}
                >
                  <h4>{htmls[key].id}.&emsp;</h4>
                  <h4>{htmls[key].type}&nbsp;-&nbsp;</h4>
                  <h4>{htmls[key].title}</h4>
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

export default Htmls;
