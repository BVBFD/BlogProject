import React from "react";
import { Link, Switch, Route, useParams, useHistory } from "react-router-dom";
import styles from "./novelUsaEu.module.css";
import { useRef, useState } from "react/cjs/react.development";

const NovelUsaEu = ({
  novelUsaEuData,
  setNovelUsaEuData,
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

  const editPermissionIndex = Object.keys(loginData).filter(
    (key) => loginData[key].id === historyState
  );
  const editPermission = loginData[editPermissionIndex];

  const { keyValue } = useParams();
  const initialCodes = `
    <div>
      ${novelUsaEuData[novelUsaEuData.length - 1].contents}
    </div>`;

  let newKey = novelUsaEuData.length + 1;
  const newWritingDefaultUpdata = () => {
    if (!newWritingDefaultIndex) {
      newWritingLiRef.current.style.display = "block";
      history.push(`/novelUsaEu/practice`);
      setNewWritingDefaultIndex(true);
    } else {
      newWritingLiRef.current.style.display = "none";
      history.push(`/novelUsaEu/${novelUsaEuData.length}`);
      setNewWritingDefaultIndex(false);
    }
  };

  let [newSubTitle, setNewSubTitle] = useState();
  let [newTestStr, setNewTestStr] = useState();

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
      const addUpdated = [...novelUsaEuData];
      addUpdated[newKey - 1] = {
        id: newKey,
        type: novelUsaEuData[1].type,
        title: newSubTitle,
        contents: `<p>\n${newTestStr}\n</p>`,
      };
      console.log(addUpdated);
      setNovelUsaEuData(addUpdated);

      // initial page list update
      const totalDataCopy = { ...totalData };
      totalDataCopy["novelUsaEu"] = addUpdated;
      setTotalData(totalDataCopy);

      // 작성란 초기화
      setNewSubTitle("");
      setNewTestStr("");
      writeFormSubTitleInputRef.current.value = "";
      writeFormContentsTextareaRef.current.value = "";
      newWritingDefaultUpdata();
      history.push(`/novelUsaEu/${novelUsaEuData.length + 1}`);
    } else {
      alert("블로그 편집 권한이 없습니다. 관리자한테 문의 부탁드립니다");
    }
  };

  const dataRemove = (event) => {
    event.preventDefault();
    if (editPermission.admin) {
      const removeUpdated = [...novelUsaEuData];
      const filtered = removeUpdated.filter(
        (data) => data.id.toString() !== keyValue
      );
      setNovelUsaEuData(filtered);

      // initial page list update
      const totalDataCopy = { ...totalData };
      totalDataCopy["novelUsaEu"] = filtered;
      setTotalData(totalDataCopy);
      // useState 여러개 관리하면 따로 값을 내려서 받아서 처리해야함
      // 객체 오브젝트의 키값 string인지 아닌지 확인하고 처리할 것
      // "6", 6 이 두 개의 값은 틀린 것임을 명심할 것!

      // 작성란 초기화
      setNewSubTitle("");
      setNewTestStr("");
      writeFormSubTitleInputRef.current.value = "";
      writeFormContentsTextareaRef.current.value = "";
      history.push(`/novelUsaEu/${keyValue - 1}`);
    } else {
      alert("블로그 편집 권한이 없습니다. 관리자한테 문의 부탁드립니다");
    }
  };

  return (
    <>
      <li ref={newWritingLiRef} className={styles.newWritingLi}>
        <Route ref={newWritingLiRouteRef} path={`/novelUsaEu/practice`}>
          <div className={styles.novelUsaEuBox}>
            <div>
              <h1>{novelUsaEuData[0].type}</h1>
              <h2>{newSubTitle}</h2>
              <div>
                <p>{newTestStr}</p>
              </div>
            </div>
          </div>
        </Route>
        <Link className={styles.novelUsaEuDataList} to={`/novelUsaEu/practice`}>
          <h4>{newKey}.&emsp;</h4>
          <h4>{novelUsaEuData[0].type}&nbsp;-&nbsp;</h4>
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
        </form>
      </li>

      {!keyValue && (
        <div ref={initialBoxRef} className={styles.novelUsaEuInitialBox}>
          <div>
            <h1>{novelUsaEuData[novelUsaEuData.length - 1].type}</h1>
            <h2>{novelUsaEuData[novelUsaEuData.length - 1].title}</h2>
            <div dangerouslySetInnerHTML={{ __html: initialCodes }}></div>
          </div>
        </div>
      )}

      {Object.keys(novelUsaEuData)
        .reverse()
        .map((key) => {
          const testStr = novelUsaEuData[key].contents;
          // testStr.join("") 배열을 하나로 연결된 문자열로 바꾼다.
          let codes = `
              <div>
                <h1>${novelUsaEuData[key].type}</h1>
                <h2>${novelUsaEuData[key].title}</h2>
                <div>
                  ${testStr}
                </div>
              </div>`;
          return (
            <>
              <div className={styles.switchBox}>
                <Switch>
                  <Route path={`/novelUsaEu/${novelUsaEuData[key].id}`}>
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
        {Object.keys(novelUsaEuData)
          .reverse()
          .map((key) => {
            return (
              <li>
                <Link
                  className={styles.novelUsaEuDataList}
                  to={`/novelUsaEu/${novelUsaEuData[key].id}`}
                >
                  <h4>{novelUsaEuData[key].id}.&emsp;</h4>
                  <h4>{novelUsaEuData[key].type}&nbsp;-&nbsp;</h4>
                  <h4>{novelUsaEuData[key].title}</h4>
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

export default NovelUsaEu;
