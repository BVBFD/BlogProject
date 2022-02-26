import React, { useRef, useState } from "react";
import Header from "../../components/header/Header.jsx";
import styles from "./Write.module.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";

const Write = (props) => {
  const [titleImg, setTitleImg] = useState("../images/empire.jpg");
  const [editorText, setEditorText] = useState("");
  const editorRef = useRef();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(editorRef.current.getInstance().getMarkdown());
    console.log(editorRef.current.getInstance().getHTML());
  };

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
          <input id="imgFileInput" type="file" style={{ display: "none" }} />
          <input
            className={styles.titleInput}
            type="text"
            autoFocus={true}
            placeholder="Title"
          />
          <select name="Category" className={styles.selectCategory}>
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
