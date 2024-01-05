# 기술 블로그 사이트 버전 4.0 with ES-Lint, Prettier and Husky

### 1. ES-Lint, Prettier

![next_eslint_prettier](https://github.com/BVBFD/Blog-project/assets/83178592/1533b501-0375-4aef-a490-a0730aec1147)

The Tech Blog Project Ver 4.0 으로 업데이트 리팩토링한 이유는 기존 NextJS Ver 3.0 코드는 서버사이드 렌더링 (SSR), SEO 최적화가 완료되어 있었지만,
ES-Lint, Prettier 설정 및 Husky pre-commit hooks를 통해서 commit 하기 전에 ES-Lint, Prettier 코드 컨벤션을 강제하여, 조금 더 안정적이고 효율적인 코드로 리팩토링하였음.

Prettier 설정을 통해 문법과 상관없이 코드 정리 규칙을 일관성 있게 하나로 통일 시킴.
ES-Lint 설정은 현재 기준에서 가장 많이 사용되는 Airbnb 에서 정의한 자바스크립트 규칙을 적용함.

https://github.com/tipjs/javascript-style-guide - Airbnb 에서 정의한 자바스크립트 규칙 <한국어>

https://github.com/airbnb/javascript - Airbnb 에서 정의한 자바스크립트 규칙 <영어>

https://lsevina126.netlify.app/post/640fcdaf059244411a581e19 - 전체적인 적용 과정 기록 <블로그> 

<br>

### 2. Husky

![husky](https://github.com/BVBFD/Blog-project/assets/83178592/fa618bb5-e072-4eaf-ace8-39593dc32a2f)

코드가 끝나고 커밋을 하면 자동으로 프로젝트에서 Prettier Formatting 과 ES-Lint 검사 pre-commit hooks 스크립트를 실행하여 코드 스타일을 강제하도록 할 수 있음.
ES-Lint, Prettier와 같은 설정과 husky pre-commit hooks를 연동하여, 같은 코드 스타일을 강제할 수 있게끔 할 수 있는 것이 매우 중요.

https://lsevina126.netlify.app/post/640fbf8f059244411a581db4 - Husky pre-commit hooks 적용 과정 <블로그>

<br>
<br>
<br>

# 개인 블로그 사이트 성능 개선 및 트러블 슈팅 해결 여정기 

![lighthouse](https://github.com/BVBFD/Blog-project/assets/83178592/bfa73980-5442-4b2d-adc0-ca3b69c6ad6a)

### 1. 무거운 Editor 편집기 라이브러리 필요한 시점에 렌더링 ( 초기 렌더링 X - React.lazy, React.Suspense )

`React.lazy`와 `React.Suspense` 문법을 사용하여 어떠한 `리액트 컴포넌트를 동적으로 필요한 시점에서 불러와서 렌더링`할 수 있음.

즉, 초기에 필요하지 않은 일부 컴포넌트들의 초기 렌더링을 피하고, 실제로 필요한 시점에 불러와서 렌더링하게끔 하여 초기 렌더링 속도 향상에 도움된다.
나 역시도 이 개인 블로그 사이트 post 페이지에서 제목 오른쪽 연필 아이콘을 클릭하고 편집기로 넘어가 해당 포스트를 편집할 수 있게 끔 개발을 하였었다.

하지만, 초기에 post를 클릭하여 해당 포스트 글을 볼 때, 편집기는 보일 필요도 없고, 나타낼 필요도 없다.
해당 post 초기 렌더링 시에 무거운 Quill Editor 편집기 라이브러리까지 항상 같이 렌더링이 되었기 때문에, post 글 접속시 초기 렌더링 속도가 아주 느린 문제점이 있었음.

그래서 이를 React.lazt, React.Suspense 문법을 사용하여 Quill Editor 편집기 라이브러리 초기 렌더링을 피하고, 실질적으로 필요한 시점에 렌더링 되게 끔 해서 초기 렌더링 속도 빠르게 했었던 경험이 있었다.
아래의 블로그 사이트에 적용된 실제 코드를 확인해보자.

`< React.lazy >`
```js
const Write = React.lazy(() => import('../write'));
```
여기에서 React.lazy 함수를 통해서 초기 렌더링을 피하고, Editor 컴포넌트가 실질적으로 필요한 시점에 동적으로 import 되게 끔 위의 코드처럼 할 수 있다.
실질적으로 필요한 시점에 비동기적으로 로딩을 한다는 것이다.

`< React.Suspense >`
```js
<React.Suspense fallback={<div />}>
  {editBtnIndex && <Write post={ps} />}
</React.Suspense>
```
이제 React.Suspense로 필요한 에디터 편집기 컴포넌트를 필요한 시점 어제 가져올 것인지 결정할 수 있다.
`editBtnIndex 변수가 true가 되었을 때, 그때부터 해당 편집기 컴포넌트 import 가 시작이 되고, import 가 완료되면 그때서야 렌더링` 되는 것이다.
fallback은 해당 컴포넌트가 로딩되는 동안 유저에게 보여질 HTML 내용이 표시되게끔 하는 것임.

<br>

### 2. 자주 사용하는 함수 useCallback을 활용하여 메모리에 저장

`< 도움되었던 글 >` : [면접 - JavaScript (7) - React](https://lsevina126.netlify.app/post/64938b1ea14bc1b52100bf89) - useCallback, memo, useMemo 항목 참고할 것!!!

나의 이 블로그 사이트를 확인을 해보면, 페이지를 클릭할 때마다 해당 페이지 숫자에 따라 4개의 포스트만 HTTP GET 메서드를 통해 불러오게끔 하였다.
`처음에는 모든 포스트를 다 불러와서, 페이지네이션 처리를 클라이언트 상에서 진행했었던 코드를 만들었던 적도 있었다.`

하지만, 시간이 6개월, 1년 가까이 흐르면서 `포스트 갯수가 점점 많아지면서 초기 렌더링 시 한꺼번에 모든 포스트를 다 불러오는 것이 상당히 시간이 오래걸렸었다.`
그래서 `페이지 숫자`에 따라 `포스트 4개`만 불러오도록 하는 방식으로 `ExpressJS 백엔드 코드`와 `NextJS 프론트 코드`를 바꾸었다.

그래서 page 숫자가 바뀔 때마다 호출되는 goToPage 함수가 자주 쓰이는 만큼, `useCallback을 통해서 한번 생성하고 메모리에 저장하여 계속 쓸 수 있게끔 성능개선`을 한 적이 있다.
카테고리가 선택되었을 때, 그리고 검색하고자 하는 키워드가 존재할 때 마다 다르게 HTTP URL GET Method를 불러와야 하는 만큼, 자주 쓰이는 함수이다.

그래서 `이 함수를 호출할 때마다 함수를 새롭게 생성하는 것은 비효율적이다` 라는 판단을 하여 useCallback을 써서 함수를 메모리에 저장을 해두고 생성할 필요없이 계속 쓰게 하였다.
그러나 pageNum 하는 함수 매개변수가 아닌 `외부 변수에 goToPage라는 함수가 영향을 받게하는 searchText, catName 같은 경우는 해당 변수가 변할 때마다 goToPage 함수 역시 새롭게 생성하여 다시 메모리에 저장`을 해두어야 한다.

처음에 이러한 개념을 몰라서 useCallback을 사용하고 [searchText, catName] 이라는 것을 사용하지 않아서 pagination이 정상적으로 작동하지 않았던 문제도 경험을 했던 적이 있다.
그래서 이러한 개념을 정확하게 이해하고 `[searchText, catName] 이 부분을 추가했더니 pagination 기능이 정상 작동`을 했던 적도 있었다.

```js
const goToPage = useCallback(
  async (pageNum: number) => {
    let url = `/posts?page=${pageNum}`;

    if (searchText !== '') {
      url += `&text=${searchText}`;
    }

    if (catName !== '') {
      url += `&cat=${catName}`;
    }

    dispatch(setCurrentPage(pageNum));
    setOnProgress(true);

    try {
      const res = await publicRequest.get(url);
      const { posts, totalPostsCount } = await res.data;

      dispatch(setPostsVar(posts));

      if (catName !== '') {
        dispatch(setPaginationTotalNum(totalPostsCount));
      }
    } catch (error) {
    } finally {
      setOnProgress(false);
    }
  },
  [searchText, catName]
);
```

<br>

### 3. ContextAPI에 등록된 변수, 함수 객체 성능 이슈 - useMemo 활용

`PopUp 공통 모듈`을 만들 때 `useMemo를 활용`한 경우이다.

`ContextAPI`를 통해서 등록된 함수와 변수를 전역적으로 감싸서 관리를 해줘야 했던 경우가 있었다.
`ContextAPI에 등록된 변수, 함수가 매번 호출되고 렌더링 될 때마다 변수, 함수 객체가 생성되고, 해당 참조값이 변경이 되어 또 렌더링이 일어나는 성능 저하 문제`가 있었음.
이러한 문제를 해결하기 위해 ContextAPI에서 provider의 value 속성을 통해서 전역적으로 관리하고 전달하는 prop 변수, 함수들을 `useMemo로 감싸서 한번 생성되고 메모리에 저장`하게 하였음.

한번 생성이 되고, 메모리에 저장된 것을 계속 활용하기 때문에 `성능 저하 이슈를 해결`할 수 있었음.

```js
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { PopUpContextValueType, PopUpProviderPropsType } from '../common';

const PopUpContext = React.createContext<PopUpContextValueType>({
  showPopUp: () => {},
  closePopUp: () => {},
});

const PopUpProvider = ({ children }: PopUpProviderPropsType) => {
  const [openPopUp, setOpenPopUp] = useState<React.ReactNode>();

  const providerValue = useMemo(() => {
    return {
      showPopUp: (popUp: JSX.Element) => {
        setOpenPopUp(popUp);
      },
      closePopUp: () => {
        setOpenPopUp(<div />);
      },
    };
  }, []);

  useEffect(() => {}, [openPopUp]);

  return (
    <PopUpContext.Provider value={providerValue}>
      {children}
      {openPopUp}
    </PopUpContext.Provider>
  );
};

const usePopUp = () => {
  const popups = useContext(PopUpContext);
  return popups;
};

export { PopUpProvider, usePopUp };
```

<br>

### 4. window.scrollTo 함수 동작 안되던 에러 해결

setTimeout을 주지 않고 그냥 window.scrollTo() 함수만 썼었던 적이 있다. 하지만 동작이 원하는 대로 되지 않았다.
`window.scrollTo`는 어떻게 보면 `DOM을 조작`하는 것이다. 그래서 `브라우저 상에서 DOM 렌더링이 완전히 끝난 다음에 scrollTo 함수를 실행해야 안정적으로 작동함.`
그래서 아래와 같이 `DOM 렌더링이 끝날 때까지 기다린 다음 스크롤 함수를 실행하게 끔` 하였다. 이렇게 하니 정상적으로 원하는 대로 작동을 하였다.

```js
useEffect(() => {
  setTimeout(() => {
    window.scrollTo({ top: postClientY, behavior: 'auto' as ScrollBehavior });
  }, 30);
}, [postClientY]);
```

<br>

### 5. 이미지 최적화

NextJS에서는 자체 Image 태그가 존재하는데, 이 태그에는 이미지를 최적화 시킬 수 있는 다양한 옵션 속성들이 존재한다.
먼저 나의 블로그 이미지 사이트에서는 banner 이미지와 sidebar 이미지에 적용한 옵션이다

`< Sidebar 이미지 >`
```js
<Image
   alt="blog-sidebar-image"
   fetchPriority="high"
   fill
   objectFit="cover"
   loading="eager"
   quality={1}
   src="/imgs/sidebar-image.png"
/>
```

`< Banner 이미지 >`
```js
<Image 
   alt="banner" 
   fetchPriority="high" 
   fill 
   loading="eager" 
   quality={100} 
   src="/imgs/banner.png" 
/>
```

가장 눈 여겨 보아야 할 것은 `fetchPriority`와 `loading, quality` 속성이다.
아마 이 속성이 사이트 이미지 최적화 성능에 결정적인 역할을 하는 속성들일 것이다.

일단 sidebar, banner 이미지 같은 경우 블로그 사이트 Home Index 페이지에 가장 먼저 크게 나오는 것이므로 우선 순위를 `'high'` 옵션을 주었다.
그리고 화면 뷰포트에서 바로 보이는 이미지인 만큼 `'eager'` 옵션을 주어서 바로 이미지가 로딩되게끔 하였다.
이에 반해서 `'lazy'` 라는 옵션도 있는데, 이는 화면 뷰포트에 보일 때, 이미지 로딩이 시작되게끔 하는 옵션이다.

그리고, `quality` 옵션을 주어서 이미지 quailty를 낮추어서 이미지 최초 렌더링 속도를 올릴 수 있었다.
화면 배너 이미지 같은 경우 중요하기 떄문에, 100으로 원본 상태를 유지하고, 사이드바 같은 경우 1로 주어서 이미지 품질을 조금은 낮추었다.
이런 식으로 `이미지 최적화를 nextjs 에서는 할 수가 있다.`

`< Posts 이미지 - Home Index 페이지 >`
```js
<Image 
   alt="post-img" 
   fetchPriority="auto" 
   fill 
   loading="eager" 
   quality={1}
   src={post.imgUrl}
/>
```

Home Index 페이지에 존재하는 4개의 포스트 이미지의 경우에도 그렇게 중요한 이미지는 아니기에 quality를 1로 주었다.
그리고 일단은 화면 Home Index 페이지에 바로 보여지는 이미지인 만큼 loading 속성을 'eager' 로 주었다.

그리고 fetchPriority 같은 경우 일단은 Home 화면에서 banner, sidebar 이미지가 우선적으로 먼저 로딩 되어야 하기에, post 이미지는 auto로 속성을 주었다.
( low 라는 옵션을 줄 수도 있었지만, 기분이 찝찝해서 그냥 auto로 주었다. )

<br>

### 6. MongoDB 데이터베이스 연결 로딩 10초 이상 걸리던 문제 해결
```js
import mongoose from 'mongoose';

async function dbConnect() {
  let maxRetries = 1000;
  let currentRetry = 0;

  while (currentRetry < maxRetries) {
    try {
      await mongoose.connect(`${process.env.MONGO_DB_URL}`, {
        dbName: 'Database Name',
        connectTimeoutMS: 700,
        serverSelectionTimeoutMS: 700,
        maxPoolSize: 10,
        minPoolSize: 1,
      });

      console.log('MongoDB connected successfully!!');
      break;
    } catch (error) {
      currentRetry++;
      console.log('MongoDB connect failed!!');
      await new Promise((resolve) => setTimeout(resolve, 700));
    }
  }

  if (currentRetry === maxRetries) {
    console.error('Max retries reached. MongoDB connection failed.');
  }
}

async function dbDisConnect() {
  return await mongoose.disconnect();
}

export { dbDisConnect };
export default dbConnect;
```

하지만 `MongoDB 최초 연결 시도 시 혹은 가끔씩 10초 이상 걸렸던 적이 너무 많아서, 일정한 ms 연결 시도 후 과감하게 그 작업 과정을 끊고, 재시도하게 하는 매커니즘으로 코드`를 작성해서 해결하였음.
10초 이상 걸리게 되어, 초기 렌더링이 되지 않는다면 프론트 배포 사이트 `Netlify`에서 자체적으로 해당 연결을 끊어 버리는 `9s timed out consume error`가 발생하여 위의 Database 연결 코드를 추가하여 해결.

[`개인 블로그 사이트 성능 개선 및 트러블 슈팅 해결 여정기`](https://lsevina126.netlify.app/post/65979ed57a920683806df985) - 더 자세한 내용은 해당 링크 포스트에서 확인할 수 있습니다.
