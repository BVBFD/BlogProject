import React, { useContext, useRef, useState } from "react";
import Header from "../../components/header/Header.jsx";
import styles from "./Write.module.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import { Context } from "../../context/context.js";

const Write = (props) => {
  const [title, setTitle] = useState("");
  const [titleImg, setTitleImg] = useState();
  const [catName, setCatName] = useState("");
  const { id } = useContext(Context);
  const [editorText, setEditorText] = useState("");
  const editorRef = useRef();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(titleImg);
    console.log(title);
    console.log(catName);
    console.log(id);
    setEditorText(editorRef.current?.getInstance().getMarkdown());
    console.log(editorText);
  };
  // 백엔드에서 posts 테이블에 객체로 만들어서 post api method 이용해서 추가하기!
  console.log(editorText);
  console.log(editorRef.current?.getInstance().getHTML());

  return (
    <section className={styles.write}>
      <Header />
      {titleImg ? (
        <div className={styles.titleImgBox}>
          <img src={titleImg} alt="" />
        </div>
      ) : null}
      <form onSubmit={handleSubmit} className={styles.titleImgAddBox}>
        <div className={styles.titleInputBox}>
          <label className={styles.imgFileLabel} htmlFor="imgFileInput">
            <i class="fas fa-plus"></i>
          </label>
          <input
            onChange={(e) => setTitleImg(`../images/${e.target.files[0].name}`)}
            id="imgFileInput"
            type="file"
            style={{ display: "none" }}
          />
          <input
            className={styles.titleInput}
            type="text"
            autoFocus={true}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            onClick={(e) => setCatName(e.target.value)}
            name="Category"
            className={styles.selectCategory}
          >
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="JavaScript">JavaScript</option>
            <option value="React">React</option>
            <option value="Node JS">Node JS</option>
            <option value="TypeScript">TypeScript</option>
            <option value="Game">Game</option>
            <option value="Book">Book</option>
          </select>
          <button type="submit" className={styles.uploadBtn}>
            Upload
          </button>
        </div>
        <Editor
          className={styles.editor}
          ref={editorRef}
          initialValue=""
          previewStyle="vertical"
          height="75vh"
          initialEditType="wysiwyg"
          toolbarItems={[
            ["heading", "bold", "italic", "strike"],
            ["hr", "quote"],
            ["ul", "ol", "task", "indent", "outdent"],
            ["table", "image", "link"],
            ["code", "codeblock"],
          ]}
          plugins={[colorSyntax]}
        />
      </form>
    </section>
  );
};

export default Write;
