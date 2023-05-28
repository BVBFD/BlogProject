# The Tech Blog Project Ver 4.0 with ES-Lint, Prettier and Husky

## 한국어 설명

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
여러 팀원들과 같이 협업을 할 때, ES-Lint, Prettier와 같은 설정과 husky pre-commit hooks를 연동하여, 여러 팀원들이 같은 코드 스타일을 강제할 수 있게끔 할 수 있는 것이 매우 중요.

https://lsevina126.netlify.app/post/640fbf8f059244411a581db4 - Husky pre-commit hooks 적용 과정 <블로그>

<br>
<br>
<br>

<br>
<br>
<br>
  
# The Tech Blog Project Ver 4.0 with ES-Lint, Prettier, and Husky

## English Explanation

### 1. ES-Lint, Prettier

![next_eslint_prettier](https://github.com/BVBFD/Blog-project/assets/83178592/1533b501-0375-4aef-a490-a0730aec1147)

The reason for updating and refactoring The Tech Blog Project to Ver 4.0 was to enforce code conventions using ES-Lint, Prettier configuration, and Husky pre-commit hooks. While the previous version, NextJS Ver 3.0, already had server-side rendering (SSR) and SEO optimization in place, this update aims to create more stable and efficient code.

Prettier configuration ensures consistent code formatting rules regardless of the syntax. The ES-Lint configuration used in this project is based on the JavaScript rules defined by Airbnb, which is currently widely used.

https://github.com/tipjs/javascript-style-guide - Airbnb's JavaScript style guide <Korean>

https://github.com/airbnb/javascript - Airbnb's JavaScript style guide <English>

https://lsevina126.netlify.app/post/640fcdaf059244411a581e19 - Blog post documenting the overall application process <Blog>

<br>

### 2. Husky

![husky](https://github.com/BVBFD/Blog-project/assets/83178592/fa618bb5-e072-4eaf-ace8-39593dc32a2f)

With Husky, after finishing the code, when a commit is made, automatic execution of the Prettier formatting and ES-Lint linting pre-commit hooks scripts can enforce code styling. When collaborating with multiple team members, it is crucial to integrate configurations like ES-Lint, Prettier, and Husky pre-commit hooks to enforce consistent code style among the team.

https://lsevina126.netlify.app/post/640fbf8f059244411a581db4 - Applying Husky pre-commit hooks process <Blog>
