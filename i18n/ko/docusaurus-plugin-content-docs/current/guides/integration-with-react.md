---
sidebar_label: React와의 통합
title: React와의 통합
description: DHTMLX JavaScript Booking 라이브러리 문서에서 React와의 통합에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 직접 체험해 보세요. DHTMLX Booking 무료 30일 평가판도 다운로드할 수 있습니다.
---

# React와의 통합 {#integration-with-react}

DHTMLX Booking은 ref가 지정된 컨테이너 안에 위젯을 마운트하는 래퍼 컴포넌트를 통해 React와 통합됩니다. 이 가이드에서는 React 프로젝트를 생성하고, Booking을 설치하며, 데이터와 이벤트로 위젯을 렌더링하는 전 과정을 안내합니다. 완전한 참조 구현은 [GitHub의 React 예제](https://github.com/DHTMLX/react-booking-demo)를 참조하십시오.

:::tip
이 가이드는 React의 핵심 개념에 대한 사전 지식을 전제로 합니다. 소개가 필요하다면 [React 공식 문서](https://react.dev/learn)를 참조하십시오.
:::

## 프로젝트 생성 {#create-a-project}

Booking 통합을 추가하기 전에 React 앱을 먼저 생성하십시오. Create React App 또는 Vite를 사용할 수 있습니다.

:::info
시작하기 전에 [Vite](https://vite.dev/) (선택 사항)와 [Node.js](https://nodejs.org/en/)를 설치하십시오.
:::

다음 명령어는 Create React App으로 새 *my-react-booking-app* 프로젝트를 생성합니다:

~~~bash
npx create-react-app my-react-booking-app
~~~

### 의존성 설치 {#install-dependencies}

프로젝트 디렉토리로 이동하십시오.

다음 명령어는 새로 생성된 앱 폴더를 엽니다:

~~~bash
cd my-react-booking-app
~~~

패키지 매니저를 사용하여 의존성을 설치하고 개발 서버를 시작하십시오.

다음 명령어는 [yarn](https://yarnpkg.com/)을 사용합니다:

~~~bash
yarn
yarn start
~~~

다음 명령어는 [npm](https://www.npmjs.com/)을 사용합니다:

~~~bash
npm install
npm start
~~~

앱은 로컬호스트에서 실행됩니다(예: [http://localhost:3000](http://localhost:3000)).

## 앱에 Booking 추가하기 {#add-booking-to-the-app}

Booking 패키지를 설치하기 전에 개발 서버를 중지한 뒤, 위젯을 감싸는 React 컴포넌트를 생성하십시오.

### 1단계. 패키지 설치 {#step-1-install-the-package}

[Booking 체험판 패키지](how-to-start.md#installing-trial-booking-via-npm-or-yarn)를 다운로드하고 패키지 README의 단계를 따르십시오. 체험판은 30일 동안 유효합니다.

### 2단계. Booking 컴포넌트 생성 {#step-2-create-the-booking-component}

*src/* 디렉토리에 *Booking.jsx* 파일을 생성하고, 아래 단계를 완료하여 위젯을 연결하십시오.

#### 소스 파일 가져오기 {#import-the-source-files}

배포 방식에 맞는 경로로 Booking 클래스와 스타일시트를 가져오십시오:

- *dhx-booking-package* — 로컬 폴더에서 설치된 PRO 버전
- *@dhx/trial-booking* — 체험판 버전

다음 코드 스니펫은 PRO 패키지에서 Booking을 가져옵니다:

~~~jsx title="Booking.jsx"
import { Booking } from 'dhx-booking-package';
import 'dhx-booking-package/dist/booking.css';
~~~

PRO 패키지에 축소된 에셋이 포함된 경우 CSS 파일을 *booking.min.css*로 가져오십시오.

다음 코드 스니펫은 체험판 패키지에서 Booking을 가져옵니다:

~~~jsx title="Booking.jsx"
import { Booking } from '@dhx/trial-booking';
import "@dhx/trial-booking/dist/booking.css";
~~~

:::info
이 튜토리얼은 Booking 체험판을 사용합니다.
:::

#### 컨테이너 설정 및 Booking 초기화 {#set-the-container-and-initialize-booking}

호스트 컨테이너에 `ref`를 선언하고, `useEffect()` 안에서 Booking 인스턴스를 생성하십시오. React가 컴포넌트를 언마운트할 때 위젯을 제거하는 정리 함수를 반환하여 `destructor()`를 호출하십시오.

다음 코드 스니펫은 ref가 지정된 컨테이너와 생명주기 정리를 포함한 Booking 컴포넌트를 선언합니다:

~~~jsx {2,6,9-10,17} title="Booking.jsx"
import { useEffect, useRef } from "react";
import { Booking } from "@dhx/trial-booking";
import "@dhx/trial-booking/dist/booking.css"; // Booking 스타일 가져오기

export default function BookingComponent(props) {
    let container = useRef(); // Booking의 호스트 컨테이너

    useEffect(() => {
        // Booking 인스턴스 생성
        const booking = new Booking(container.current, {});

        return () => {
            booking.destructor(); // Booking 언마운트
        };
    }, []);

    return <div ref={container} className="widget"></div>;
}
~~~

#### 스타일 추가 {#add-the-styles}

Booking은 위젯 스타일시트(위에서 가져옴)와 크기가 지정된 컨테이너 두 가지가 모두 필요합니다. 프로젝트의 메인 CSS 파일에서 페이지와 위젯 컨테이너에 전체 높이를 설정하십시오.

다음 코드 스니펫은 페이지와 Booking 컨테이너에 전체 높이를 설정합니다:

~~~css title="index.css"
/* 페이지 스타일 */
html,
body,
#root {
    height: 100%;
    padding: 0;
    margin: 0;
}

/* Booking 컨테이너 */
.widget {
    height: 100%;
}
~~~

#### 데이터 로드 {#load-data}

Booking에 카드 데이터를 로드하려면 [`data`](api/config/booking-data.md) 속성에 맞는 데이터셋을 준비하십시오. 전체 데이터 형식과 로딩 시나리오는 [데이터 로딩](guides/loading-data.md) 가이드를 참조하십시오.

*src/* 디렉토리에 *data.js* 파일을 생성하십시오.

다음 코드 스니펫은 샘플 데이터셋을 반환하는 `getData()` 헬퍼를 정의합니다:

~~~jsx title="data.js"
export function getData() {
    function getDate(addDays, hoursValue = 0, minutesValue = 0) {
        const date = new Date();
        const secondsValue = 0; // 분 단위로 반올림
        const msValue = 0;

        date.setDate(date.getDate() + addDays);
        date.setHours(hoursValue, minutesValue, secondsValue, msValue);

        return date.getTime();
    }

    return [
        {
            id: "ee828b5d-a034-420c-889b-978840015d6a",
            title: "Natalie Tyson",
            category: "Therapist",
            subtitle: "2 years of experience",
            details: "Cleveland Clinic\n9500 Euclid Ave",
            preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/01.jpg",
            price: "$35",
            review: {
                stars: 4,
                count: 120
            },
            slots: [
                {
                    from: 9,
                    to: 20,
                    days: [1, 2, 3, 4, 5]
                },
                {
                    from: 10,
                    to: 18,
                    days: [6, 0]
                }
            ]
        },
        {
            id: "9b037564-77be-429f-b719-eebbe499027a",
            title: "Emma Johnson",
            category: "Cardiologist",
            subtitle: "2 years of experience",
            details: "Stanford Health Care\n1468 Madison Ave",
            preview: "https://snippet.dhtmlx.com/codebase/data/booking/01/img/03.jpg",
            price: "$25",
            review: {
                stars: 5,
                count: 10
            },
            slots: [
                {
                    from: 14,
                    to: 17,
                    size: 30,
                    gap: 10
                },
                {
                    from: 12,
                    to: 19,
                    size: 50,
                    gap: 20,
                    days: [2],
                    dates: [getDate(0)]
                },
                {
                    from: "18:30",
                    to: 20,
                    size: 20,
                    gap: 20,
                    days: [3, 4, 5]
                }
            ],
            usedSlots: [getDate(0, 12), getDate(0, 18)]
        },
        // ...
    ];
}
~~~

*App.js*를 열고, 데이터셋을 가져온 뒤 `<Booking/>` 컴포넌트에 prop으로 전달하십시오.

다음 코드 스니펫은 `data` prop을 가진 Booking 컴포넌트를 렌더링합니다:

~~~jsx {2,5-6} title="App.js"
import Booking from "./Booking";
import { getData } from "./data";

function App() {
    const dataset = getData();
    return <Booking data={dataset} />;
}

export default App;
~~~

*Booking.jsx*를 열고, `data` prop을 Booking 설정에 전달하십시오.

다음 코드 스니펫은 prop을 Booking 생성자에 연결합니다:

~~~jsx {5,10} title="Booking.jsx"
import { useEffect, useRef } from "react";
import { Booking } from "@dhx/trial-booking";
import "@dhx/trial-booking/dist/booking.css";

export default function BookingComponent(props) {
    let container = useRef();

    useEffect(() => {
        const booking = new Booking(container.current, {
            data: props.data
            // 기타 구성 속성
        });

        return () => {
            booking.destructor();
        }
    }, []);

    return <div ref={container} className="widget"></div>;
}
~~~

이제 Booking 컴포넌트가 로드된 데이터와 함께 렌더링됩니다. 위젯을 더 커스터마이즈하려면 추가 구성 속성을 전달하십시오 — 전체 목록은 [속성 개요](api/overview/booking-properties-overview.md)를 참조하십시오.

#### 이벤트 처리 {#handle-events}

위젯에서 사용자가 동작을 수행하면 이벤트가 발생합니다. `booking.api.on(eventName, handler)`으로 이벤트를 구독하여 동작에 반응하십시오. 이벤트 전체 목록은 [이벤트 개요](api/overview/booking-events-overview.md)를 참조하십시오.

*Booking.jsx*를 열고, `useEffect()`에 이벤트 구독을 추가하십시오.

다음 코드 스니펫은 사용자가 슬롯을 선택할 때 슬롯 ID를 로그에 기록합니다:

~~~jsx {5-8} title="Booking.jsx"
// ...
useEffect(() => {
    const booking = new Booking(container.current, {});

    // 선택된 슬롯 id 로그 기록
    booking.api.on("select-slot", (obj) => {
        console.log(obj.id);
    });

    return () => {
        booking.destructor();
    }
}, []);
// ...
~~~

앱을 시작하면 페이지에 데이터가 로드된 Booking을 확인할 수 있습니다.

![Booking 초기화](../assets/trial-booking.png)

프로젝트 요구 사항에 맞게 코드를 커스터마이즈하십시오. 완전한 참조 구현은 [GitHub](https://github.com/DHTMLX/react-booking-demo)에서 확인할 수 있습니다.
