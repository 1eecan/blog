---
title: "axios 인터셉터 만들어보기"
date: "2024-03-19"
spoiler: "axios에 대해 공부해보고, axios의 인터셉터 기능을 만들어봅니다."
featured: true
thumbnail: "/post/vanilla/axios/axios_interceptor.png"
---

## Contents

# 왜 이걸 하게 됐나요?

일전에 스타트업에 면접을 보러 갔었습니다.

생에 처음 면접을 보는거라 매우 매우 떨렸는데요, 면접관님이 하신 질문중에 다음과 같은 질문이 있었습니다.

> 요청 500개에 대한 일괄적인 처리는 어떻게 할 수 있을까요?

당시에 저는 너무 긴장한 나머지 "요청을 감싸는 함수를 만들어 처리하겠습니다." 라고 대답을 했었습니다.

뒤늦게 면접을 복기해보면서 axios라는 라이브러리에 대한 활용을 바탕으로 대답을 할 걸... 이라는 후회가 들었습니다.

그래서 한번 그때의 대답과 요구사항을 융합(?) 하는 겸, axios에 대해 공부해보고, 간단하게 axios의 interceptor를 vanilla JS로 구현해보고자 합니다.
![퓨전](/post/vanilla/axios/fusion.png)

# Axios를 왜 사용할까?

axios는 http 클라이언트입니다.

http를 사용해서 서버와 통신하는 라이브러리라고 이해할 수 있겠습니다.

그런데 왜 사람들이 axios를 애용하는 걸까요?

제가 axios를 처음 접했을 때는 단순히 '코드의 가독성을 향상시켜주는 라이브러리' 라고 생각을 했었습니다.

과연 그럴까요?

예시를 한 번 들어보겠습니다.

다음과 같이 서버에 요청을 보내는 코드가 있다고 가정해보겠습니다.
(예시 서버 : https://koreanjson.com)

이는 다음과 같이 표현될 수 있습니다.

```js
// XMLHttpRequest
const xhr = new XMLHttpRequest();
xhr.open("GET", "https://koreanjson.com/users", true);

xhr.onload = function () {
  if (xhr.status >= 200 && xhr.status < 300) {
    console.log(JSON.parse(xhr.responseText));
  } else {
    console.error("Request failed with status: " + xhr.status);
  }
};

xhr.onerror = function () {
  console.error("Request failed");
};

xhr.send();

// Fetch API
fetch("https://koreanjson.com/users")
  .then(function (response) {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (error) {
    console.error("Fetch error: " + error.message);
  });

// Axios
import axios from "axios";

axios
  .get("https://koreanjson.com/users")
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
```

모두 같은 결과를 콘솔에 출력하게 되는데요, 뭔가 간결해서 쓴다라고 하기에는 XMLHttpRequest를 제외하면 나머지 둘은 차이가 없어 보입니다.

Post 요청의 경우도 마찬가지인 것 같은데요,

```js
//Fetch API
fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
});

// Axios
axios({
  method: "post",
  url: "/user/12345",
  data: {
    firstName: "Fred",
    lastName: "Flintstone",
  },
});
```

이 경우에도 headers의 여부와 약간의 방식적인 차이만 존재하지 딱히 크게 불편함을 느끼지는 못하겠습니다.

하지만, 위의 XMLHttpRequest와 Fetch API는 Node.js 환경에서는 사용할 수 없는데요,

axios는 **Node.js에서도 그대로 사용**할 수 있다는 점이 장점으로 작용합니다.

node.js에서도 돌아가고 브라우저에서도 사용 가능하니 개발자가 번거롭게 신경을 쓰지 않아도 되는 것이죠.

개인적으로 이러한 특성은 SSR이나 SSG가 대세가 되는 흐름에서 유용해보입니다.

그 밖에도 몇몇 이유가 있습니다. 공식홈페이지의 설명은 다음과 같습니다.

![axios 설명](/post/vanilla/axios/axios_detail.png)

제가 면접에서 대답한 질문의 답인 "어떤 함수로 감싼다"라는 맥락에서는 node 환경과 브라우저 환경 모두에서 동작하는게 중요해보입니다.

따라서 **node.js와 브라우저 환경에서 잘 돌아가고, 인터셉터 기능이 추가**된 뭔가를 만들어야겠습니다.

# XMLHttpsRequest를 사용할까 Fetch API를 사용할까

우선 서버에 요청을 보내는 내장 api를 사용해야겠습니다.

Node.js의 경우에는 자체적으로 제공하는 https 모듈을 가져오면 되지만, 브라우저에서는 두가지의 선택지가 남게 되는데요,

XMLHttpRequest와 Fetch API 중 선택을 해야 하겠습니다.

XMLHttpRequest와 Fetch API는 다음과 같은 차이를 나타냅니다.

|        | XMLHttpRequest                                                                                       | Fetch API                                                                                                               |
| ------ | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| 호환성 | 오래 전부터 사용되어 온 방식으로, 초기 AJAX 통신을 가능하게 함. 대부분의 브라우저에서 넓게 지원됨.   | 비교적 새로운 API로, Promise를 기반으로 함. 일부 구형 브라우저에서는 폴리필이 필요함.                                   |
| 사용법 | 복잡하고 세부적인 설정이 가능. 이벤트 리스너를 통해 요청의 생명주기를 세밀하게 관리할 수 있음.       | Promise 객체를 반환하며, async/await 구문과 함께 사용하기 좋음. 간결한 구문을 제공함.                                   |
| 기능   | 기본적인 AJAX 통신 기능 제공.                                                                        | CORS와 HTTP/2 지원, 스트림을 사용한 응답 본문의 비동기 처리 가능, Service Worker와의 통합으로 PWA 개발에 이점 제공.     |
| 단점   | 낮은 수준의 API로, 많은 코드가 필요하며, 현대적인 JavaScript 비동기 패턴과 자연스럽게 연결되지 않음. | IE를 포함한 일부 구형 브라우저에서 지원되지 않음. 요청 타임아웃 설정이 없으며, 네트워크 실패가 아닌 경우 거부되지 않음. |
|        |

axios는 프로미스를 지원하고, XMLHttpRequest 자체의 학습이 목적이 아님으로 Fetch API를 사용해보도록 하겠습니다.

# Http 요청을 만들기

Fetch API를 통해 다음과 같은 요청을 보낼 수 있다고 언급했습니다.

```js
fetch("https://koreanjson.com/users")
  .then(function (response) {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (error) {
    console.error("Fetch error: " + error.message);
  });
```

이를 다음과 같이 바꿔보겠습니다.

```js
const DEFAULT_URL = "https://koreanjson.com";
const END_POINT = "/users";

const request = function (url = "", endPoint = "") {
  fetch(url + endPoint)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })
    .catch(function (error) {
      console.error("Fetch error: " + error.message);
    });
};

request(DEFAULT_URL, END_POINT);
```

이렇게 되면 request라는 함수에 url과 end point를 넣어주면 get 요청이 가게 됩니다.

post, put, delete 요청은 일단 제쳐두고, 가장 중요한 요청과 응답부터 가로채보겠습니다.

우선 axios에서 interceptor를 어떻게 사용하고 있는지부터 봐야할 것 같습니다.

![axios 인터셉터 사용법](/post/vanilla/axios/axios_interceptor_description.png)

이런식으로 사용을 한다고 합니다.

그러고 보니 axios.get, axios.create, axios.interceptor... 와 같은 형식으로 이루어져 있으므로 하나의 객체라고 봐도 될 것 같고, instance를 만들어내는 걸 보니 class로 쓰거나 prototype 형식의 문법을 써도 괜찮을 것 같습니다.

클래스를 써서 작성해보면 다음과 같겠습니다.

```js
//request.js
class InterceptorManager {
  constructor() {
    this.handlers = [];
  }

  use(interceptor) {
    this.handlers.push(interceptor);
  }
}

export class Request {
  static interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager(),
  };

  static async get(url, endPoint) {
    this.interceptors.request.handlers.forEach((handler) => handler());

    try {
      let response = await fetch(url + endPoint);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      let data = await response.json();

      this.interceptors.response.handlers.forEach((handler) => {
        data = handler(data);
      });

      return data;
    } catch (error) {
      console.error("Fetch error: " + error.message);
    }
  }
}

//main.js
import { Request } from "./modules/request.js";
import { DEFAULT_URL } from "./constants/DEFAULT_URL.js";
import { END_POINT } from "./constants/END_POINT.js";

Request.interceptors.request.use(() => console.log("before"));
Request.interceptors.response.use((dataList) =>
  dataList.filter((data) => (data.id % 2 === 0 ? false : true))
);

(async function run() {
  const data = await Request.get(DEFAULT_URL, END_POINT);
  console.log("data", data);
})();
//before
//data (5) [{…}, {…}, {…}, {…}, {…}]
```

대략 이런식으로 하면 axios에서 쓰는 사용법에 맞춰서 interceptor를 사용할 수 있을 것 같습니다.

# Node.js에서도 돌아가게 하기

문제는 이제 이 코드를 node.js에서도 돌아가게 해야한다는 것입니다.

node.js는 자체적으로 http 요청을 하는 코드를 사용할 수 있는데요, 우리는 import문을 사용했으니까 동적으로 import를 하는 방식을 사용하면 되겠습니다.

isNode라는 플래그를 만들고 isNode가 true값일떄는 https모듈을 사용하고, 아닐 경우에는 그대로 fetch를 쓰면 되겠습니다.

그리고 isNode라는 플래그를 만들기 위해서 process라는 객체를 조사하면 될 것 같습니다.

**process란?**
process는 Node.js에서 제공하는 전역 객체 중 하나로, 현재 Node.js 프로세스에 대한 정보와 제어를 위한 다양한 속성과 메소드를 포함하고 있습니다.

process에는 많은 속성들이 있는데, 보통 프로젝트를 할 떄 환경변수에 접근하기 위해 process.env를 사용하고는 하죠? 그때의 process가 이 process입니다.

이 process 객체가 브라우저에서는 undefined이니까 이 점을 활용해서 isNode 플래그를 만들면 되겠습니다.

추가로 process의 version이라는 속성이 있는데요, 이걸 사용하면 현재 node의 몇버전을 사용하는지 알려주니까 이게 null인지 검사해주면 좀 더 안전한 코드가 되겠습니다.

```js
class InterceptorManager {
  constructor() {
    this.handlers = [];
  }

  use(interceptor) {
    this.handlers.push(interceptor);
  }
}

export class Request {
  static interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager(),
  };

  static async get(url, endPoint) {
    // 환경 감지
    const isNode = typeof process !== "undefined" && process.version != null;

    this.interceptors.request.handlers.forEach((handler) => handler());

    try {
      let data;

      if (isNode) {
        // Node.js 환경
        const https = await import("https");
        data = await new Promise((resolve, reject) => {
          https
            .get(url + endPoint, (res) => {
              let rawData = "";
              res.on("data", (chunk) => (rawData += chunk));
              res.on("end", () => {
                try {
                  const parsedData = JSON.parse(rawData);
                  resolve(parsedData);
                } catch (e) {
                  reject(e);
                }
              });
            })
            .on("error", reject);
        });
      } else {
        // 브라우저 환경
        const response = await fetch(url + endPoint);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        data = await response.json();
      }

      this.interceptors.response.handlers.forEach((handler) => {
        data = handler(data);
      });

      return data;
    } catch (error) {
      console.error("Fetch error:", error.message);
      throw error;
    }
  }
}
```

이제 이 코드는 Node.js 환경에서도 돌아가고 브라우저에서도 돌아가게 되었습니다...!!

# 나가면서...

사실 어떻게 보면 호기심에 시작한 프로젝트인데, 생각보다 고려해야할 사항들이 많았습니다!

위의 조그마한 기능을 구현하는 것도 따져봐야할 경우들이 많은데, (심지어 기본 http 메소드는 다 하지도 않았음에도 불구하고) **범용적으로 사용 가능한 라이브러리**를 만드는 것은 얼마나 고려해야할 사항들이 많겠나 싶었습니다.

그리고 확실히 브라우저에서만 돌아가는 라이브러리보다 서버와 상호작용을 해야하는 라이브러리를 만드는게 더 어렵다고 느껴졌습니다.

왜냐하면 테스트를 하는 환경자체가 브라우저보다 까다롭기 때문입니다. 지금은 간단한 get요청을 날려보는 수준에 그치고, 또 http메소드를 테스트해볼 수 있는 사이트들도 많습니다만, 서버에서 로그를 찍어봐야한다 정도만 되어도 난이도가 올라가지 않을까요?

아무튼 오늘도 내가 쓰는 라이브러리는 많은 개발자들의 땀으로 일궈졌다는 것을 상기하게되었습니다...ㅎㅎ;;
![농부들의땀](/post/vanilla/axios/farmer.png)

> 감사합니다 센세이...
