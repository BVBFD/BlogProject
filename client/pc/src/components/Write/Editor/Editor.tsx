'use client';

import React from 'react';

import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';

import Prism from 'prismjs';

import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';

import { Editor as ToastUIEditor } from '@toast-ui/react-editor';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

import styles from './Editor.module.scss';

const Editor = () => {
  return (
    <div className={styles.container}>
      <ToastUIEditor
        height="50vh"
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
        plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
        previewStyle="vertical"
        useCommandShortcut
      />
    </div>
  );
};

export default Editor;
