# KB Healthcare Assignment

## 참여 인원

 - 김영만 [💻 Github](https://github.com/sksn12)
 - 김학률 (팀장) [💻 Github](https://github.com/markyul)
 - 노서현 [💻 Github](https://github.com/Seohyun-Roh)
 - 마지혁 [💻 Github](https://github.com/majih93)
 - 유인종 [💻 Github](https://github.com/in3166)
 - 이강윤 [💻 Github](https://github.com/rkddbs1031)
 - 이지훈 [💻 Github](https://github.com/jihun1233)
 - 이치호 [💻 Github](https://github.com/usernamechiho)
 - 조혜빈 [💻 Github](https://github.com/hyebin829)
 - 지수근 [💻 Github](https://github.com/jsg0629)

## Techs

React: `"^18.1.0"` <br/>
Typescript": `"^4.4.2"` <br/>
React-router-dom: `"6"` <br/>
Sass: `^1.51.0"` <br/>
Sass-loader: `^12.6.0"` <br/>
Classnames: `"^2.3.1"` <br/>
Victory: `"^36.4.0"` <br/>
Victory-core: `"^36.4.0"` <br/>

**To work as one,**

Eslint: `"^8.14.0"` <br/>
Prettier: `"^2.6.2"` <br/>
Eslint-config-airbnb: `"^19.0.4"` <br/>
Eslint-config-prettier: `"^8.5.0"` <br/>


## 개발 과정
<img width="800" alt="KB 개발 과정" src="https://user-images.githubusercontent.com/87627359/170858904-0af7a903-5612-4cc3-875a-d9183081a8b2.png">

## 폴더 구조
```
├─assets
│  ├─images
│  ├─jsons
│  └─svgs
│      ├─healthInfo
│      └─healthManage
├─hooks
│  └─worker
├─layouts
├─routes
│  ├─LoginPage
│  ├─MainPage
│  │  ├─HealthCharts
│  │  ├─HealthManage
│  │  │  └─HealthManageCard
│  │  ├─UserInfo
│  │  └─components
│  │      └─Chart
│  └─NotFoundPage
├─services
├─styles
│  ├─base
│  ├─constants
│  └─mixins
├─types
└─utils
```

## 기능
### 로그인
![로그인](https://user-images.githubusercontent.com/87627359/170861705-17fea283-de23-44a9-aaa6-cfd681b3c7b2.gif)

- 로그인 기능을 추가했습니다.
- 입력을 하지 않았을 때, 잘못된 아이디를 입력했을 때 로그인 오류 문구를 다르게 했습니다.
- 잘못된 아이디를 입력했을 때, "ID가 존재하지 않습니다."라는 문구를 쓰려고 했으나, 보안에 문제가 있을 수 있어 "입력한 정보를 확인해주세요."라는 문구로 변경했습니다.

### 사용자 정보
<img width="364" alt="image" src="https://user-images.githubusercontent.com/87627359/170862010-e188346e-68b5-4eec-be1d-45cfdc5afe07.png">

- 사용자의 건강점수를 확인할 수 있는 컴포넌트 입니다.
- 건강 점수 계산일, 사용자의 기본 정보 또한 확인할 수 있습니다.

### 건강 점수 분석 결과
<img width="379" alt="image" src="https://user-images.githubusercontent.com/87627359/170882644-83f1a048-0583-438a-bef1-32dfd34cec2c.png">

- 각 년도의 건강 점수를 비교해, 현재 건강 점수와 가장 최근 년도의 건강 점수 차이를 한눈에 파악할 수 있습니다.
- 자신과 비슷한 나이의 비교군과 자신의 건강 점수를 대조해 현재 건강 상태를 알려줍니다.

### 10년 후 건강 예측

<img width="393" alt="image" src="https://user-images.githubusercontent.com/87627359/170882692-0c483460-19b8-4ab7-b0e0-e762253f9110.png">

- 10년 후 자신의 건강 점수와 의료비를 예측해주는 컴포넌트 입니다.

### 맞춤 건강 관리
![건강카드](https://user-images.githubusercontent.com/87627359/170882311-d85b6b3e-3e4c-46d0-a9cd-602f8feab3da.gif)

- 사용자에게 맞춤 건강관리 서비스를 제공하는 컴포넌트입니다.
- 현재의 건강상태와, 정상 수치를 비교해 병을 진단합니다. 정상 수치에서 벗어나는 경우, 사용자의 수치에 맞는 질병 관리 방법을 알려줍니다.
- 관리 태그들을 나열해 사용자가 한 눈에 어떤 관리가 필요한지 알아 볼 수 있습니다.


## 느낀 점
김학률
- 역할 분담은 잘했지만 세부적인 소통이 덜 되어서 후반에 수정이 조금 잦았다.
- 정적인 데이터로 개발을 하니 오히려 설계하는게 헷갈린 느낌이었다.

이지훈
- 여러명이서 작업하다보니 함수가 겹치는 경우가 있어 어려웠다. 
- 다음엔 함수를 만들 때 명확한 기능에 따라  적절히 나누어야겠다

이치호
- 처음 해보는 작업이라, 재밌기도 했고 어렵기도 했다.
- 하나의 객체만 필요한 컴포넌트의 경우 배열로 감싸주지 않아도 된다.
- 코드를 작성하면서 "더 깔끔하게 코드를 작성하는 방법이 분명 있을 텐데"라는 생각이 자주 들었다.

조혜빈
- 차트를 처음 만들었는데, 차트 스타일링을 하는 과정에서 코드가 길어져 정리하는 방법을 익히고 적용하는 과정이 조금 어려웠다. 

지수근
- JSON 데이터를 처리하는 과정에서 어떻게하면 좀 더 효율적이게 코드를 짤 수 있는지에 대한 고민이 있었습니다.

유인종
- JSON 데이터에서 특정 key 들에 해당하는 데이터만 뽑아서 가공하는 부분이 조금 까다로웠다.
- 해당 key 들을 배열에 넣고 loop를 돌려서 값을 가져왔는데 반복문 없이 가져올 수 있지 않았을까 생각해봤다.