'use client';

import React from 'react';
import Prism from 'prismjs';
import { Editor as ToastUIEditor } from '@toast-ui/react-editor';
import chart from '@toast-ui/editor-plugin-chart';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import styles from './Editor.module.scss';

import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';

import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/chart/dist/toastui-chart.css';

const Editor = () => {
  return (
    <div className={styles.container}>
      <ToastUIEditor
        height="80vh"
        hooks={{
          addImageBlobHook() // fileBlob, imgUrlCallback as params inside of callback function
          {
            // dev test
            // console.log(fileBlob);
            // console.log(
            //   imgUrlCallback(
            //     'https://res.cloudinary.com/dewa3t2gi/image/upload/v1698394328/myportfolioblogproject/sfbu4gzzxjrg584kjlpc.gif'
            //   )
            // );
          },
        }}
        initialEditType="markdown"
        initialValue="Tell Me Your Story..."
        plugins={[
          [codeSyntaxHighlight, { highlighter: Prism }],
          [chart, { minWidth: 100, maxWidth: 700, minHeight: 100, maxHeight: 500 }],
        ]}
        previewStyle="vertical"
        useCommandShortcut
      />
    </div>
  );
};

export default Editor;
