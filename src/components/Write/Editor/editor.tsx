import React, { useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import useWrite from '@/hooks/useWrite';

import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css';
import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { publicRequest } from '@/api/config';
import { PostsType } from '@/models/postsModel';

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');
    // @ts-ignore
    return function ({ forwardedRef, ...props }) {
      return <RQ ref={forwardedRef} {...props} />;
    };
  },
  {
    ssr: false,
  }
);

export interface WriteProps {
  post: PostsType;
  setEditBtnIndex: React.Dispatch<React.SetStateAction<boolean>>;
}

const Editor = ({ post, setEditBtnIndex }: WriteProps) => {
  const { id } = useRouter().query;
  const defaultValue = post ? post.text : '';
  const { setIsFetching, setChagneValue } = useWrite(post, setEditBtnIndex, id as string);

  const editorRef = useRef();

  const check = () => {
    if (editorRef.current) {
      return editorRef.current;
    }
    setTimeout(() => check(), 0);
    return null;
  };

  const imageHandler = () => {
    const editorRefInside = check();
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', async () => {
      const { files } = input;
      const file = files && files[0];

      if (file) {
        const formData = new FormData();
        const filename = `${Date.now()}${file.name}`;
        formData.append('name', filename);
        formData.append('file', file);

        try {
          setIsFetching(true);
          const result = await publicRequest.post('/pic/upload', formData);
          const updatedPicURL = result.data;
          const IMG_URL = updatedPicURL;

          // @ts-ignore
          const editor = editorRefInside.getEditor();
          const range = editor.getSelection();

          editor.insertEmbed(range.index, 'image', IMG_URL);

          document.querySelectorAll('img').forEach((img) => img.setAttribute('crossOrigin', 'anonymous'));

          editor.setSelection(range.index + 1);
          setIsFetching(false);
        } catch (error) {
          // @ts-ignore
          window.alert(error.response.data.message);
          setIsFetching(false);
        }
      } else {
        // @ts-ignore
        window.alert('파일 업로드가 되지 않았습니다!!');
        setIsFetching(false);
      }
    });
  };

  hljs.configure({
    languages: ['javascript', 'html', 'css', 'react', 'sass', 'typescript'],
  });

  const modules = useMemo(() => {
    return {
      syntax: {
        highlight: (text: string) => hljs.highlightAuto(text).value,
      },
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'], // toggled buttons
          ['blockquote', 'code-block'],
          ['link', 'image'],

          [{ header: 1 }, { header: 2 }], // custom button values
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
          [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
          [{ direction: 'rtl' }], // text direction

          [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
          [{ header: [1, 2, 3, 4, 5, 6, false] }],

          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ font: [] }],
          [{ align: [] }],

          ['clean'], // remove formatting button
        ],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      },
    };
  }, []);

  /*
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  const formats = [
    'image',
    'video',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'color',
    'background',
    'script',
    'header',
    'blockquote',
    'code-block',
    'indent',
    'list',
    'direction',
    'align',
    'link',
    'formula',
  ];

  return (
    <ReactQuill
      // @ts-ignore
      defaultValue={defaultValue}
      formats={formats}
      forwardedRef={editorRef}
      modules={modules}
      onChange={setChagneValue}
      style={{ width: '100%', height: '75vh', marginBottom: '10vh' }}
      theme="snow"
    />
  );
};

export default Editor;
