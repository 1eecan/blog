---
title: "의존성 배열에 함수를 집어넣으면 어떻게 될까?"
date: "2024-04-09"
spoiler: "의존성 배열에 함수를 집어넣으면 어떤 일이 벌어질까?"
featured: true
thumbnail: "/post/react/useHook_dependencyArray_function/thumbnail.png"
---

## Contents

# 의존성 배열이란?

리액트를 공부하면 여러가지 훅들을 배우면서 "의존성 배열"이라는 말을 한번쯤 들어보게 됩니다.

주로 useEffect,useCallback,useMemo 훅들의 두번째 인자로 들어가게 되는 배열을 말하는데요,
이 배열 안에 있는 요소들이 바뀌었는지 아닌지를 리액트가 감지해서 리랜더링을 시켜주는 그런 역할을 수행하게 됩니다.

useEffect를 사용해서 예시를 들어보겠습니다.

useEffect는 사이드 이펙트를 관리하는 훅이니까, 예를 들면 유저의 id가 달라지면 데이터를 가져오는 api를 실행시키고 싶을 경우 다음과 같이 코드를 짤 수 있을 것입니다.

```js
const [userId, setUserId] = useState(1);
const [userData, setUserData] = useState({});

useEffect(() => {
  fetchUserData(userId).then((data) => setUserData(data));
}, [userId]);
```

여기서 userId를 의존성 배열에 넣어주었기 때문에, 앞으로 useId가 바뀌는 이벤트가 발생하면 useEffect의 첫번째 인자로 들어간 함수가 실행이 되는 것이죠.

보통은 의존성 배열에 넣어주어야 하는 값으로 **state**, **props** 같은 친구들이 있다고 배우게 됩니다.

state나 props의 경우 리액트에서 감시를 하고 있고, 이 친구들이 변경되면 자연스럽게 사이드 이펙트까지 관리를 하게 해주는 그런 원리인것입니다.

보통은 여기서 "state, props를 넣어주는 구나~" 하고 끝나게 되고, 좀 더 공부를 하게 되면, Object.is라는 메소드를 사용해서 비교하는구나~ 까지 공부를 하게 됩니다.

그런데 말입니다, 여기서 함수를 넣으면 어떤일이 벌어질까요?

# 자바스크립트의 배열에 함수를 넣어보자

잠시 다른 얘기를 하고 넘어가겠습니다. 자바스크립트의 배열의 요소에는 어떤 값이 올 수 있을까요?

두루뭉술하게 말해보자면 온갖 값들이 들어올 수 있습니다.
함수도 예외는 아닌데요 다음과 같은 코드가 존재할 수 있습니다.

```js
const a = [
  function sayHello() {
    console.log("Hello!");
  },
];
a[0](); // Hello!
```

그렇다면 이건 어떨까요?

```js
const a = [console.log("Hello!")];
// Hello!
```

a를 출력해보면 [undefined]를 출력하는 것을 알 수 있습니다.

이처럼 함수를 배열에 넣게 되면 함수를 실행한 결과값이 배열에 들어가게 됩니다.

이 흐름을 나타내 보면, 다음과 같습니다.

1. 실행컨텍스트 생성
2. const a 선언 및 초기화
3. [console.log("Hello")] 평가
4. console.log("Hello")가 호출 스택으로 이동 후 실행
5. console.log에 의해 "Hello"가 콘솔에 출력되고 undefined 반환
6. 평가된 배열 [undefined]가 a에 할당

이런식으로 배열에 함수의 실행결과가 리턴되게 되고 그 결과로 의존성 배열에 함수를 넣어도 실행이 된다... 라는 이야기입니다.

# 왜 하면 안되는지?

의존성 배열에 함수를 넣는다는 건 뭔가 되게 억지스러운 가정이라고 생각합니다. 글의 제목 자체가 의존성 배열에 함수를 넣으면 어떻게 될까? 라는 다소 유튜브 실험 채널스러운 제목인것만 봐도 그렇지요.

의존성 배열에 state, props가 주로 들어가고, 함수 실행결과가 아니라 함수를 넣고싶다고 하면 useCallback등을 넣어서 상태를 관리하는게 좋겠습니다.
