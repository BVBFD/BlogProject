'use client';

import React, { useContext, useEffect, useState } from 'react';
import Prism from 'prismjs';

import { Editor as ToastUIEditor } from '@toast-ui/react-editor';
import chart from '@toast-ui/editor-plugin-chart';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';

import { ThemeContext } from 'src/common/context/ThemeContext';

import { PreviewStyle } from '@toast-ui/editor';

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

  // 1. 브라우저 사이즈변경에 따른 상태변경을 위해 state작성
  const [preview, setPreview] = useState<PreviewStyle>(window.innerWidth > 1000 ? 'vertical' : 'tab');

  // 2. 함수 실행시 마다 브라우저 사이즈에 따라 preview 상태 변경
  const handleResize = () => {
    setPreview(window.innerWidth > 1000 ? 'vertical' : 'tab');
  };

  // 3. resize이벤트 구독
  // ReactJS, NextJS에서는 코드 수정, 업데이트시 기존의 Virtual DOM(가상의 DOM)과 새로운 Virtual DOM을
  // 비교하여 실제 변경된 부분을 식별하고, 그 변경된 부분만 식별하여, 실제 DOM을 업데이트하는 방식임.

  // 그래서 useEffect내부의 return 내부 clean up(정리) 함수를 통해서, 실제 DOM에 바인딩된 이벤트 리스너를
  // 제거해야함. 그렇지 않으면 가상의 DOM이 생성될 때마다 실제 DOM에 바인딩된 이벤트 리스너 콜백함수가
  // 생성이되고, 메모리를 차지함으로써, 불필요한 메모리 차지 현상과 누수 현상이 발생하게됨.
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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

  useEffect(() => {
    // Toast UI Editor 내부적으로 width 속성 지정해주는 것이 없음.
    // 그래서 부득이하게 이렇게 설정.
    const parentNodeOfToastuiEditorDefaultUI = document.querySelector('.toastui-editor-defaultUI');
    const parentStyle = parentNodeOfToastuiEditorDefaultUI.parentElement.style;
    parentStyle.width = '100%';
    parentStyle.height = '100vh';

    return () => {
      // 만약 컴포넌트가 unmount 되고 초기 style로 돌아가야한다면,
      // 여기에서 다시 위와 같이 원래 style을 정의해줘야함.
    };
  }, []);

  // toastui-editor-dark toastui-editor-defaultUI
  return (
    // dark 다크모드 속성이 먹히지 않음.. 그래서 이렇게 설정하여 구현
    <div className={mode === 'light' ? `${styles.container}` : `${styles.container} toastui-editor-dark`}>
      <ToastUIEditor
        height="100vh"
        hooks={hookOption}
        initialEditType="markdown"
        initialValue="Tell Me Your Story..."
        plugins={[
          [codeSyntaxHighlight, codeSyntaxHighlightOption],
          [chart, chartOption],
          [colorSyntax, colorSyntaxPresetOption],
          [tableMergedCell, {}],
        ]}
        previewStyle={preview} // state값으로 반응형으로 작아질 때 tab으로 설정.
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
