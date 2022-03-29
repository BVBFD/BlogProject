*Update Note

*Ver 1.0.1 - 2021년 11월 17일
1. 새로운 글쓰기 버튼 에러 오류 수정 - 글쓰기 버튼 누르면 새로운 게시글이 업데이트 되지 않던 문제 수정
2. Home 페이지 첫 화면 전체 게시글이 일부 나오지 않던 문제 수정

*ver 1.0.2 - 2021년 11월 18일
1. Home 페이지 첫 화면에서 몇몇 버튼 링크가 해당 페이지로 이동 안되던 문제 수정

*ver 1.1.0 - 2021년 11월 20일
1. 기존 글쓰기 상자(HTML : textarea) 전면 CKEditor API로 교체 -> 글쓰기 목록, 폰트 굵기 등등 다양하게 수정 가능
2. 기존 실시간 글쓰기 확인 박스 (dangerouslySetInnerHTML={{ __html: "~" }})에서 react-html-parser API로 전면 교체 -> 보안성 강화

*ver 1.1.1 - 2021년 11월 20일
1. CKEditor 글쓰기 에디터 모바일 화면에 크기에 맞게 적절하게 CSS 수정

*ver 1.1.2 - 2021년 11월 21일
1. 목록에 있는 Link 버튼을 누르면 엉뚱한 곳으로 이동하고 엉뚱한 내용이 뜨던 에러 수정 -> CKEditor 속성 data 삭제해서 수정 완료.

*ver 1.1.3 - 2021년 11월 21일
1. 브라우저 상 주소 표시줄로 페이지 접근시, 404 Not Found Error 수정 -> _redirect 파일 내용 참고 (Netlify 배포 관련 에러)
2. 외부 API 프록시 서버 redirect, 404 Not Found Error 수정 redirect 주소 충돌 관련 에러 수정 (Netlify 배포 관련 에러)
```
*_redirects(in public)
  
  /proxy/* https://developers.nonghyup.com/:splat 200
  /*  /index.html 200
 
  or (아니면...)
  
*netlify.toml(root 경로 안에 (.env와 같은 경로))
 [[redirects]]
  from = "/proxy/*"
  to = "https://developers.nonghyup.com/:splat"
  status = 200
  force = true

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```  
한 파일에 2개 이상의 redirects를 적용할 수 없다. 만약에 위의 순서와 반대로 배치하여 코드를 해서 작동시키면 에러가 난다. why?? 만약에 환율 api 받아오기 위해 매칭되는 redirects를 찾는다면, 만약 반대로 배치되어 있다면 "/*" 여기에서 매치가 되어버려서 다음 진짜 proxy서버 redirects는 무시당하게 될 것.. 그래서 순서를 proxy 외부 API 받아오는 것을 먼저 배치함. (Netlify 배포 관련 중복 redirects 에러 해결책)

*ver 1.2.0 - 2021년 11월 23일
1. 기존 CKEditor 기본 게시글 에디터에서 NHN 개발의 Toast UI Editor 전면 도입.
2. Toast UI Editor를 도입함으로써 Cloudinary 서버 이미지 저장 없이 여러개의 이미지 게시 가능 -> 효율성 Up!!
3. Cloudinary 서버를 이용하는 것이 아닌 HTML DOM 형식 문자열로 파이어베이스 서버에 문자열로 멀티 이미지 태그 저장.
4. Toast UI Editor node module 안의 APIs 자체 css 파일 조정하여 휴대폰 스크린화면에 최적화 완료!

*ver 1.2.1 - 2021년 11월 23일
1. 기존 쓰고 있는 Toast UI Editor에 Code, Code Box 추가할 수 있는 기능 플러그인 추가.
2. 이에 맞게 모바일 화면에 에디터 막대바 CSS 최적화.

*ver 1.2.2 - 2021년 11월 25일
1. useState와 firebase server에서 image 값 제거. image 자료 contents로 통합. image 값 관련 불필요한 코드 삭제 및 제거.
2. 용량이 큰 default 비디오 동영상 제거

*ver 1.3.0 - 2021년 11월 26일
1. 농협 환율 APIs 문의 결과. 일정 Call 넘어가면 유료. 그래서 무료 수출입 은행 환율 APIs (일일 1000 Call 가능, 비영업일 제외)로 전면 교체.
2. 농협 환율 APIs 관련 코드 주석처리 -> 향후 참고하기 위해서 삭제하지는 않음.
3. 수출입 은행 환율 APIs로 환율 APIs 코드 전면 교체 및 CORS 에러 수정을 위한 Proxy 서버 재설정.
4. netlify 배포 위한 redirect 설정을 수출입 은행 APIs 관련 Proxy 서버로 수정.

*ver 1.3.1 - 2021년 11월 26일
1. 수출입 은행 환율 업데이트 되는 영업일 11시 이후로 환율이 업데이트 안되던 에러 수정 완료.

*ver 1.3.2 - 2021년 11월 28일
1. 동영상 비디오 위치 중앙에서 왼쪽으로 조정 배치.

*ver 2.0.0 - 2022년 02월 22일
1. ver 2.0 작업 시작 
2. 기존 ver 1.0 버전은 master branch에 저장

*ver 2.0.1 - 2022년 03월 03일
1. ver 2.0 블로그 프로젝트 완료.
2. 기존 ver 1.0 버전은 폐기처분. 코드는 master branch에 저장.
3. Heroku를 통해서 Server에 배포.

*ver 2.0.2 - 2022년 03월 03일
1. post upload시 images upload 안 되었던 문제 수정.

*ver 2.1.0 - 2022년 03월 04일
1. jwt token 라이브러리가 heroku 서버 배포 과정과 호환이 안되는 문제 발생 -> 유저 데이터 모델에 editable이라는 변수 추가해서 대체 (해결책 지속적으로 찾을 예정!)

*ver 2.2.0 - 2022년 03월 04일
1. Heroku image 와 같은 대용량 리소스는 영구히 저장되지 않는 점 개선 노력.
2. 이미지 저장소는 cloudinary에 두고 cloudinary multer 라이브러리 이용해서 cloudinary 서버와는 교차출처 허용 header를 설정해서 이미지 반영.

*ver 2.2.1 - 2022년 03월 09일
1. grid template colums width 모바일, 컴퓨터 화면에 맞게 유동적으로 적용될 수 있게 크기 수정.

*ver 2.2.3 - 2022년 03월 25일
1. Image 사이즈 픽셀 안 깨지게 사이즈 조정
2. Home 화면 post 내용 및 사진 깨지는 오류 수정

*ver 2.2.4 - 2022년 03월 27일
1. Image default 이미지 설정 및 적용
2. Sidebar 내용 보충 및 수정해서 업데이트
