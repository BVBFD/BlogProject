import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://res.cloudinary.com/dewa3t2gi/image/upload/v1674981291/qyeb9rvghfair1pkgqud.png"
          rel="icon"
        />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css" rel="stylesheet" />
        <script
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          crossorigin
          defer
          src="https://unpkg.com/react@16/umd/react.development.js"
        />
        <script
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          crossorigin
          defer
          src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"
        />
        <script defer src="https://unpkg.com/react-quill@1.3.3/dist/react-quill.js" />
        <script defer src="https://unpkg.com/babel-standalone@6/babel.min.js" />
        <script defer src="/my-scripts.js" type="text/babel" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
