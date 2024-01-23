# Blog Project Client with NextJS

### [ 👉 블로그 바로가기 ✍️ ](https://lsevina126.netlify.app)

![next_eslint_prettier](https://github.com/BVBFD/Blog-project/assets/83178592/1533b501-0375-4aef-a490-a0730aec1147)

## 사용스킬

<a href="링크" target="_blank" style="text-decoration: none">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=fff" />
</a>
<a href="링크" target="_blank" style="text-decoration: none">
  <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=fff" />
</a>
<a href="링크" target="_blank" style="text-decoration: none">
  <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=fff" />
</a>
<a href="링크" target="_blank" style="text-decoration: none">
  <img src="https://img.shields.io/badge/SWR-000000?style=for-the-badge&logo=SWR&logoColor=fff" />
</a>
<a href="링크" target="_blank" style="text-decoration: none">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=fff" />
</a>
<a href="링크" target="_blank" style="text-decoration: none">
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=fff" />
</a>
<a href="링크" target="_blank" style="text-decoration: none">
  <img src="https://img.shields.io/badge/antdesign-0170FE?style=for-the-badge&logo=antdesign&logoColor=fff" />
</a>
<a href="링크" target="_blank" style="text-decoration: none">
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=ESLint&logoColor=fff" />
</a>
<a href="링크" target="_blank" style="text-decoration: none">
  <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=fff" />
</a>

## 프로젝트 소개

- 개인 Tech 블로그 프로젝트 `서버사이드렌더링(SSR)`로 `SEO` 메타데이터 신경쓰면서, 개발 리팩토링 해보기.
- 블로그 개발을 통해서 프론트엔드, 백엔드 `CRUD` 스킬 향상 및 클라이언트, 백엔드 서버 `배포` 해보기.
- 기능적으로 완성 후, `서비스 유지 보수` 및 `리팩토링`까지 도전해보기.

## 주요 기능

### 포스트 검색 기능

홈 화면에서 검색어를 입력하면, 받아온 데이터 포스트들을 홈 화면에 띄워줍니다.

https://github.com/BVBFD/Blog-project/assets/83178592/2c38f371-a488-4ff7-8289-31878d403e24

### 페이지네이션

서버로 포스트 데이터 HTTP 요청시, 한번에 모든 포스트들을 다 받아오는 것이 아니라, 페이지마다 4개의 포스트 데이터만 불러오게 구현하였습니다.

https://github.com/BVBFD/Blog-project/assets/83178592/741383b6-a4fe-4298-888f-3194cff877a1

### 포스트 CRUD 구현

react-quill 에디터를 통해서, 포스트 글을 새롭게 업로드하고, 편집할 수 있도록 구현하였으며, 삭제하는 기능도 window.alert 창을 통해서 한번 더 확인을 거쳐 삭제할 수 있게끔 하였습니다 ( 관리자 권한만 )

https://github.com/BVBFD/Blog-project/assets/83178592/b3b0f954-4638-44c4-81de-da23b90b1333

https://github.com/BVBFD/Blog-project/assets/83178592/ee53cec7-3389-4861-bb6f-238ed651306f

### Cloudinary 이미지 저장소

Cloudinary 저장소를 통해서, 업로드한 이미지를 저장하고 해당 URL을 가져와서 클라이언트의 img 태그에 이식시켜주었습니다.

https://github.com/BVBFD/Blog-project/assets/83178592/9b724c29-302f-4091-a830-d62d75ec2750

### ESLint, Prettier and Husky

`Husky pre-commit hooks`를 통해서 `Airbnb에서 정의한 자바스크립트 규칙`을 `ES-Lint`에 적용하였으며, `Prettier 규칙`도 적용하였습니다. 이를 통해서, `commit을 하게되면`, 정해진 ESLint, Prettier 규칙에 따라 자동으로 검사하게 되며, `통과`하지 `못하면`, `commit이 안되게` 하여 `일관된 코드 컨벤션`을 적용하였습니다.

#### commint 성공

https://github.com/BVBFD/Blog-project/assets/83178592/d1cf35fc-7ed4-4883-b389-ccb09b89e611

#### commit 실패

https://github.com/BVBFD/Blog-project/assets/83178592/cb14863e-11e7-4bdc-8694-fed30d041a42

## 프로젝트 주요 구조

```
blog-project-nextjs
├─ .env              // 환경변수 관련 설정 (github에는 올라가 있지 않음)
├─ .husky            // eslint, prettier 규칙 검사 pre-commit hooks 관련 설정
├─ config.ts         // axios를 통한 HTTP 통신 요청 공통 모듈 함수 정의
├─ src
│  ├─ common         // 모든 페이지에 쓰이는 공통 모듈 컴포넌트 정의(모달, 버튼, 스핀 등등...)
│  ├─ components     // 페이지에 공통적으로 들어가는 부분적인 컴포넌트 요소 정의
│  ├─ pages          // 페이지 URL에 따른 렌더링될 페이지 요서 정의
│  ├─ redux          // 전역 데이터 다루는 redux-storage 구현
│  └─ styles         // pages의 css 파일 정의
├─ package.json      // 사용한 라이브러리 모듈 및 버전 정보
├─ .eslintrc.json    // eslint 규칙 정의
├─ .prettierrc       // pretter 규칙 정의
├─ .gitignore
├─ netlify.toml      // 배포 관련 설정
├─ next.config.js    // nextjs에서 프레임워크 관련 설정 및 실험적 최적화 설정 적용
└─ tsconfig.json     // typescript 관련 정의
```

## 블로그 기록 사항 - 개발 및 유지 보수

- 2024.01.05 : [개인 블로그 사이트 성능 개선 및 트러블 슈팅 해결 여정기](https://lsevina126.netlify.app/post/65979ed57a920683806df985)
- 2023.03.29 : [NextJS, ReactJS - Pagination 구현 ( Feat. 라이브러리 없이 구현 )](https://lsevina126.netlify.app/post/642350ca059244411a587631)
- 2023.03.14 : [NextJS 프로젝트 환경 세팅하기 - ESLint, Prettier, Airbnb Code Style](https://lsevina126.netlify.app/post/640fbf8f059244411a581db4)
- 2023.03.14 : [husky 에 대하여...](https://lsevina126.netlify.app/post/640fbf8f059244411a581db4)
