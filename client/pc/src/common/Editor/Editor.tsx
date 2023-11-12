'use client';

import React, { useContext, useEffect } from 'react';
import Prism from 'prismjs';

import { Editor as ToastUIEditor } from '@toast-ui/react-editor';
import chart from '@toast-ui/editor-plugin-chart';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';

import { ThemeContext } from 'src/common/context/ThemeContext';

import styles from './Editor.module.scss';

import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';

import '@toast-ui/editor/dist/toastui-editor.css';
// Dark Theme 적용
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';

import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import '@toast-ui/chart/dist/toastui-chart.css';
import '@toast-ui/editor-plugin-table-merged-cell/dist/toastui-editor-plugin-table-merged-cell.css';

const Editor = ({ getShowEditorBoolean }) => {
  const { mode } = useContext(ThemeContext);

  useEffect(() => {
    getShowEditorBoolean(true);
  }, []);

  const codeSyntaxHighlightOption = { highlighter: Prism };
  const chartOption = { minWidth: 100, maxWidth: 700, minHeight: 100, maxHeight: 500 };
  const colorSyntaxPresetOption = {
    preset: [
      '#333333',
      '#666666',
      '#FFFFFF',
      '#EE2323',
      '#F89009',
      '#009A87',
      '#006DD7',
      '#8A3DB6',
      '#781B33',
      '#5733B1',
      '#953B34',
      '#FFC1C8',
      '#FFC9AF',
      '#9FEEC3',
      '#99CEFA',
      '#C1BEF9',
    ],
  };

  const hookOption = {
    addImageBlobHook() {
      // dev test
      // fileBlob, imgUrlCallback as params inside of callback function
      // console.log(fileBlob);
      // console.log(
      //   imgUrlCallback(
      //     'https://res.cloudinary.com/dewa3t2gi/image/upload/v1698394328/myportfolioblogproject/sfbu4gzzxjrg584kjlpc.gif'
      //   )
      // );
    },
  };

  const toolbarOption = [
    // 툴바 옵션 설정
    ['heading', 'bold', 'italic', 'strike'],
    ['hr', 'quote'],
    ['ul', 'ol', 'task', 'indent', 'outdent'],
    ['table', 'image', 'link'],
    ['code', 'codeblock'],
  ];

  // toastui-editor-dark toastui-editor-defaultUI
  return (
    // dark 다크모드 속성이 먹히지 않음.. 그래서 이렇게 설정하여 구현
    <div className={mode === 'light' ? `${styles.container}` : `${styles.container} toastui-editor-dark`}>
      <ToastUIEditor
        height="80vh"
        hooks={hookOption}
        initialEditType="markdown"
        initialValue="Tell Me Your Story..."
        plugins={[
          [codeSyntaxHighlight, codeSyntaxHighlightOption],
          [chart, chartOption],
          [colorSyntax, colorSyntaxPresetOption],
          [tableMergedCell, {}],
        ]}
        previewStyle="vertical"
        theme="light" // 다크모드 속성 먹히지 않음. 라이브러리 문제.
        toolbarItems={toolbarOption}
        usageStatistics={false} // 통계 수집 거부
        useCommandShortcut={false}
        // hideModeSwitch={true} // 하단 숨기기
      />
    </div>
  );
};

export default Editor;
