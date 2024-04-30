---
title: "크롬 확장 프로그램 만들어보기"
date: "2024-04-29"
spoiler: "프로그래머스에서 쓸 크롬 확장 프로그램을 만들어봅니다."
featured: false
thumbnail: "/post/vanilla/chrome_extension_programmers-hide/thumbnail.png"
---

## Contents

# 왜 만들게 되었는지?

사건의 발단은 다음과 같습니다.

코딩테스트 강의를 들으면서 준비하고 있었는데, 강사분께서 다음과 같은 점을 중요하게 강조하시더라구요.

“절대 문제 유형을 보지 말것!”

문제 유형을 보고 푸는건 실전과 꽤나 동떨어진 일이기 때문에 문제 유형을 보고 풀지 말아라 하는게 골자였습니다.

저는 코딩테스트 연습을 프로그래머스로 하고 있습니다.

백준은 아무래도 자바스크립트로 문제를 풀려면 셋팅해야하는 것들이 너무 많아서 말이죠,,,

그런데 프로그래머스로 문제를 풀면 위에서 언급했던 문제 유형을 보지 않는게 쉽지 않은 순간들이 있습니다.

![프로그래머스_사이트_사진1](/post/vanilla/chrome_extension_programmers-hide/site1.png)

![프로그래머스_사이트_사진2](/post/vanilla/chrome_extension_programmers-hide/site2.png)

이렇게 소제목으로 문제 유형이 나오는 경우들이 종종 있습니다.

이걸 어떡하면 좋나,,, 라고 생각하던 도중 제가 평소에 쓰는 유튜브 영상 차단 크롬 확장자가 머리에 번뜩였습니다.

![언훅_스크린샷](/post/vanilla/chrome_extension_programmers-hide/unhook.png)

언훅(unhook)이라는 확장프로그램이고 이것을 쓰면 댓글이나, 피드, 연관 동영상을 차단 할 수 있는 프로그램입니다.

이런 확장프로그램이 있으면 되겠다! 라고 생각했고, 프로그래머스 문제 유형을 좀 가려줄 수 있는 크롬 확장자가 있는지 찾아봤습니다.

그런데 제가 조사해본 바로는 그런 프로그램은 존재하지 않았습니다. (혹시라도 있다면 알려주시면 감사하겠습니다.)

그래서 이걸 어쩐담,,, 하고있었는데, 한번 만들어볼까? 라는 생각이 들었습니다.

머릿속으로는 대충 문제 유형을 나타내는 DOM요소의 클래스를 찾고 그걸 가릴 수 있게 하면 되겠다! 라고 생각을 하고 바로 지피티에게 질문을 했습니다.

![챗지피티](/post/vanilla/chrome_extension_programmers-hide/chatGPT.png)

그리고 초안을 짜달라고 해서 다음과 같이 초안을 받았습니다.

```json
{
  "manifest_version": 2,
  "name": "Problem Type Hider",
  "version": "1.0",
  "description": "Hide problem types on Programmers to simulate a real test environment.",
  "permissions": ["activeTab"],
  "background": {
    "scripts": ["background.js"],
    "persistent": false
  },
  "content_scripts": [
    {
      "matches": ["https://programmers.co.kr/*"],
      "js": ["content.js"]
    }
  ],
  "browser_action": {
    "default_popup": "popup.html",
    "default_icon": "icon.png"
  },
  "icons": {
    "48": "icon.png"
  }
}
```

최종적으로는 다음과 같이 변경이 되었습니다.

# manifest.json

```json
{
  "manifest_version": 3,
  "name": "프로그래머스 가림판",
  "version": "1.3.0",
  "description": "Hide specific elements on Programmers to enhance competitive programming skill.",
  "permissions": ["activeTab", "scripting", "storage"],
  "host_permissions": ["https://school.programmers.co.kr/*"],
  "action": {
    "default_popup": "popup.html",
    "default_icon": "images/icon.png"
  },
  "content_scripts": [
    {
      "matches": ["https://school.programmers.co.kr/learn/challenges*"],
      "js": ["content.js"],
      "run_at": "document_start"
    },
    {
      "matches": ["https://school.programmers.co.kr/learn/courses/*"],
      "js": ["lesson.js"],
      "run_at": "document_start"
    }
  ],
  "icons": {
    "128": "images/icon.png"
  }
}
```

일단 크롬 확장자를 만들기 위해서는 root경로에 manifest.json 파일이 존재해야 합니다.

- manifest_version : 매니페스트 파일 형식의 버전을 몇버전으로 할건지 정하면 됩니다. 지피티는 좀 업데이트가 안돼서 2버전을 알려준 것 같은데, 2버전은 곧 deprecated될 예정이고 현재는 3 버전을 사용하길 권장하고 있습니다.

- name: 프로그램의 이름을 적는 곳입니다.

- version: 현재 프로그램이 몇 버전인지 기록하는 곳입니다. 나중에 언급하겠지만, 배포를하고 업데이트를 하려면 무조건 버전을 패치버전이라도 하나 올려줘야 합니다.

- description: 프로그램에 대한 간략한 설명을 적어주면 되겠습니다.

- permissions: 프로그램에 권한을 부여합니다. 최종적으로activeTab과 scripting, storage를 사용했습니다

  - activeTab: 이 권한은 사용자가 확장 프로그램을 호출할 때 확장 프로그램에 현재 활성 탭에 대한 임시 액세스 권한을 부여합니다. 라고 공식문서에 쓰여 있습니다.
  - scripting: 이게 있어야 확장프로그램에서 옵션을 껐다 키는 행위가 사이트에 영향을 미칠 수 있는 chrome.scripting.executeScript 메소드를 사용할 수 있습니다.
  - storage: 사용자가 설정한 내용을 저장하기 위해 필요한 권한입니다. local, session, sync중에 하나를 사용할 수 있습니다. local과 session 같은 경우는, 개발자 도구를 켜면 볼 수 있는 local session 스토리지와 비슷하고, sync 같은 경우에는 서버에서 불러오는 개념이라고 생각을 하면 될 것 같습니다.

- host_permissions: 호스트 권한은 확장 프로그램이 URL의 [일치 패턴](https://developer.chrome.com/docs/extensions/develop/concepts/match-patterns?hl=ko)과 상호작용하도록 허용합니다. 라고 공식문서에 적혀있습니다.

- action: 확장프로그램이 상단에 어떤 아이콘으로 보여질 것인가, 아이콘을 누르면 어떤 팝업창이 뜰 것인가를 설정해주는 속성입니다. 저의 경우에는 아이콘을 누르면 popup.html이 보여지게 됩니다. 그러면 popup.html이 보여지고, 거기에 있는 js파일도 돌아가겠습니다.

- content_scripts: 프로그램이 활성화 되어있으면, matches에 적어놓은 url로 접속시 js에 적혀있는 자바스크립트 파일이 실행이 됩니다. run_at에는 다음과 같은 속성들이 있습니다.
  - document_start: DOM이 아직 로드 중입니다.
  - document_end: 페이지의 리소스가 아직 로드 중입니다.
  - document_idle: DOM 및 리소스 로드가 완료되었습니다. 이는 기본값입니다.

저는 프로그램이 시작하자마자 돌아가는게 중요했기 때문에 document_start로 설정해주었습니다.

- icons: 아이콘 파일을 넣어주면 됩니다.

이외에도 무수히 많은 속성들이 있습니다. 예를 들면 background 같은 서비스워커를 지정할 수 있는 속성도 있습니다.

일단 이번 프로그램을 만들면서 이해한 흐름은 다음과 같습니다.

프로그래머스 문제 목록 사이트에 들어간다 ⇒ content.js가 실행된다.(실제 문제 푸는 곳은 lesson.js가 실행된다.)

content.js가 storage에서 설정을 불러오고 불러온 설정에서 가릴 요소로 정해진 것들이 가려진다.

아이콘을 누르면 popup.html이 나타난다. 그럼 popup.html에 있는 popup.js가 실행되고, storage에서 설정을 불러와 토글을 설정에 맞게 켜준다.

popup.html에서 토글을 작동시키면, chrome.scripting.executeScript가 프로그래머스 사이트의 DOM요소들을 조작해주고, 이를 storage에 저장해준다.

생각보다 간단한것 같은데? 라고 생각을 하고 코드를 짰더니 큰 문제에 부딪히게 되었습니다.

# 플리커링 문제

https://school.programmers.co.kr/learn/challenges* url(문제 유형을 나타내는 페이지)에서는 문제리스트 들이 동적으로 로딩되고 있었습니다. 이를 위해 다음과 같이 디바운스 함수를 작성했습니다.

```jsx
document.documentElement.style.visibility = "hidden";

...

let timeout = null;

const observer = new MutationObserver(() => {
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => {
    document.documentElement.style.visibility = "hidden";
    loadSettings();
    document.documentElement.style.visibility = "visible";
  }, 1);
});
```

처음 content.js가 실행이 되면 html의 visibility를 hidden으로 만들어줍니다.
DOM요소가 로딩이 전부 되기 전까지는 디바운스가 작동하다가 전부 로딩이 되면 셋팅을 불러와 적용하고 html의 visibility를 visible로 만들어주는 것이죠.

문제는 DOM요소가 모두 로딩이 되어야 visibility를 변경시켜 주기 때문에 깜빡이는 문제가 발생을 한다는 것이었습니다.

심지어 setTimeout 안의 콜백에는 visibility를 다시 hidden으로 만들어주는 코드가 들어가있기 때문에 이것 때문에 문제유형 또한 잠시 보이는 문제가 발생했습니다.

심지어 https://school.programmers.co.kr/learn/courses/* url(문제를 푸는 페이지)에서는 문제가 더 심했습니다. breadcrumb를 가려야 했는데, 여기서는 먼저 html이 로딩이 돼서 맨 처음에 visibility를 hidden으로 만들어놓으면 디바운스가 적용이 되지 않아 페이지가 백지가 되는;; 사태가 벌어졌습니다.

![의미가없다는걸보여주는사진](/post/vanilla/chrome_extension_programmers-hide/no_meaning.jpg)

그러니까 한쪽에서는 문제 유형이 잠깐 보여서 프로그램의 의미가 없어지고, 다른 쪽에서는 아예 장애를 발생시키는 수준이 되었습니다.

그래서 이걸 어떻게 해결을 할까,,, 생각을 하다가 css가 적용이 되는 순서와 사람들이 프로그램을 인식하는 방법을 다시 생각해보게 되었습니다.

css는 나중에 적용될수록 우선순위가 높아지는 특성이 있습니다. 그러니까 맨처음에 문제 유형 및 레벨을 나타내는 선택자의 visibility를 hidden으로 만들었다가, 나중에 디바운스로 셋팅을 불러와서 각각의 선택자에 css를 적용해주면, 나중에 선택자에 붙은 visibility가 적용이 될 것입니다.

그리고 사용자는, 시간이 지나서 가리지 않기로한 속성이 나타나게 되면 그냥 ‘로딩이 되었구나’ 라고 생각을 하게 될것입니다.

정리하자면 “최대한 빠르게 문제유형을 가리자에서” “일단 가려놓고 안가리고 싶은걸 보이게하자”로 전략이 바뀐것입니다.

이를 해결하기 위해서 다음과 같이 코드를 변경했습니다.

```jsx
const style = document.createElement("style");

style.textContent = `
  .part-title, .breadcrumb, td.level, td.finished-count, td.acceptance-rate {
    visibility: hidden;
  }
`;
document.documentElement.appendChild(style);

...

let timeout = null;

const observer = new MutationObserver(() => {
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => {
    loadSettings();
  }, 1);
});
```

이렇게 코드를 짜주고 manifest.json에서 content_scripts의 run_at을 document_start로 바꾸어주었습니다.

이렇게 되면 사이트에 들어가서 DOM이 만들어지기 시작할 때 content.js가 작동하게 되고, 즉시 문제 유형, 레벨, 완료한 사람, 정답률을 가리키는 선택자들에 visibility:hidden 속성을 추가합니다. 그리고 debounce가 작동을 하고 DOM의 로딩이 끝나면 셋팅이 불러와져서 보지 않기로 한 스타일과 보기로한 스타일이 다시 적용이 되어 사용자에게 전달이 되게 되었습니다.

# 성능개선

이렇게 코드를 짜고 끝~을 내려고 했으나 다음과 같은 부분에서 성능을 개선할 수 있었습니다.

https://school.programmers.co.kr/learn/courses/* 사이트에서 문제를 풀기 위해 코드를 짜게 되면 그게 DOM 요소에 변경을 일으키게 되고 그게 observer에 감지가 되어 또 셋팅이 호출이 되는 문제가 있었습니다.

그렇기 때문에 문제 목록을 보는 url과 문제를 푸는 url을 분리시키고, 문제를 푸는 url에는 일단 셋팅을 불러오면 observer의 감시를 종료시키는 코드를 추가시켜주었습니다.

```jsx
//lesson.js
const style = document.createElement("style");

style.textContent = `
  .breadcrumb {
    visibility: hidden;
  }
`;
document.documentElement.appendChild(style);

...

let timeout = null;

const observer = new MutationObserver((mutations) => {
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => {
    loadSettings();
    observer.disconnect();
  }, 100);
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
});
```

이렇게 불필요한 호출을 감소시킬 수 있었습니다.

또한 어차피 사용자의 심리?를 이용할거면 굳이 debounce의 시간을 극단적으로 짧게 할 필요가 없다고 판단해서 시간도 좀 늘려주었습니다.

```jsx
//content.js
const style = document.createElement("style");

style.textContent = `
  .part-title, .breadcrumb, td.level, td.finished-count, td.acceptance-rate {
    visibility: hidden;
  }
`;
document.documentElement.appendChild(style);

...

let timeout = null;

const observer = new MutationObserver(() => {
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => {
    loadSettings();
  }, 100);
});
```

이렇게 시간을 늘려주니 한번 새로고침이 될 때마다 적게는 3번 많게는 9번정도까지 발생하던 storage 호출이 최소 1번으로 감소하게 되었습니다.

# 여담

## 알고보니,,,

프로그램을 개발하면서 플리커링을 해결하려고 삽질을 좀 많이 했는데, 해결을 하고나서 원래 영감을 얻었던 unhook 확장프로그램을 분석해보니 비슷한 방식으로 페이지가 로딩되자마자 스타일을 삽입하는 방식을 쓰고 있었습니다;;
역시 참고를 하려면 분석도 확실히 하자… 라는 교훈을 얻을 수 있었습니다.

## 새삼 대단하다고 느껴지네

사실 이번에 만든 프로그램이 정말 간단함에도 불구하고, 수정하고, 고민하고 했던 과정들이 꽤나 있었습니다. 새삼 대규모의 프로그램을 만드시는 모든 개발자분들이 존경스러워졌습니다.

[완성본 깃허브 주소](https://github.com/1eecan/programmers-hide)
