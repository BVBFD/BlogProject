import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel='icon'
          href='https://res.cloudinary.com/dewa3t2gi/image/upload/v1674981291/qyeb9rvghfair1pkgqud.png'
        />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/icon?family=Material+Icons'
        />
        <link
          rel='stylesheet'
          href='https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css'
        />
        <script
          src='https://unpkg.com/react@16/umd/react.development.js'
          // @ts-ignore
          crossorigin
        ></script>
        <script
          src='https://unpkg.com/react-dom@16/umd/react-dom.development.js'
          // @ts-ignore
          crossorigin
        ></script>
        <script src='https://unpkg.com/react-quill@1.3.3/dist/react-quill.js'></script>
        <script src='https://unpkg.com/babel-standalone@6/babel.min.js'></script>
        <script type='text/babel' src='/my-scripts.js'></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
