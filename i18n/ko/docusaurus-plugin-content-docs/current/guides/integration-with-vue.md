---
sidebar_label: Vue와의 통합
title: Vue와의 통합
description: DHTMLX JavaScript Booking 라이브러리 문서에서 Vue와의 통합에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험해 보세요. DHTMLX Booking 30일 무료 평가판을 다운로드할 수도 있습니다.
---

# Vue와의 통합 {#integration-with-vue}

DHTMLX Booking은 `ref`가 지정된 컨테이너 안에 위젯을 마운트하는 단일 파일 컴포넌트를 통해 Vue 3와 통합됩니다. 이 가이드에서는 Vue 프로젝트를 생성하고, Booking을 설치하고, 데이터와 이벤트를 포함한 위젯을 렌더링하는 방법을 안내합니다. 완전한 참조 구현은 [GitHub의 Vue 예제](https://github.com/DHTMLX/vue-booking-demo)를 참조하십시오.

:::tip
이 가이드는 Vue 3 핵심 개념에 대한 기본 지식을 갖추고 있다고 가정합니다. 입문 내용은 [Vue 3 문서](https://vuejs.org/guide/introduction.html#getting-started)를 참조하십시오.
:::

## 프로젝트 생성 {#create-a-project}

Booking 통합을 추가하기 전에 Vue 프로젝트를 먼저 생성합니다.

:::info
시작하기 전에 [Node.js](https://nodejs.org/en/)를 설치하십시오.
:::

다음 명령은 공식 Vue 스캐폴딩 도구를 실행합니다:

~~~bash
npm create vue@latest
~~~

이 명령은 `create-vue`를 설치하고 실행합니다. 프롬프트 및 옵션에 대한 자세한 내용은 [Vue.js 빠른 시작](https://vuejs.org/guide/quick-start.html#creating-a-vue-application)을 참조하십시오. 프롬프트가 나타나면 프로젝트 이름을 *my-vue-booking-app*으로 지정하십시오.

### 의존성 설치 {#install-dependencies}

프로젝트 디렉터리로 이동합니다.

다음 명령은 새로 생성된 앱 폴더를 엽니다:

~~~bash
cd my-vue-booking-app
~~~

패키지 매니저를 사용하여 의존성을 설치하고 개발 서버를 시작합니다.

다음 명령은 [yarn](https://yarnpkg.com/)을 사용합니다:

~~~bash
yarn
yarn dev
~~~

다음 명령은 [npm](https://www.npmjs.com/)을 사용합니다:

~~~bash
npm install
npm run dev
~~~

앱은 예를 들어 [http://localhost:5173](http://localhost:5173)과 같은 로컬호스트에서 실행됩니다.

## 앱에 Booking 추가 {#add-booking-to-the-app}

Booking 패키지를 설치하기 전에 개발 서버를 중지한 다음, 위젯을 감싸는 Vue 컴포넌트를 생성합니다.

### 1단계. 패키지 설치 {#step-1-install-the-package}

[Booking 평가판 패키지](how-to-start.md#installing-trial-booking-via-npm-or-yarn)를 다운로드하고 패키지 README의 단계를 따릅니다. 평가판 버전은 30일 동안 활성 상태를 유지합니다.

### 2단계. Booking 컴포넌트 생성 {#step-2-create-the-booking-component}

*src/components/* 디렉터리에 *Booking.vue* 파일을 생성하고 아래 단계를 완료하여 위젯을 연결합니다.

#### 소스 파일 가져오기 {#import-the-source-files}

배포판에 맞는 경로로 Booking 클래스와 스타일시트를 가져옵니다:

- *dhx-booking-package* — 로컬 폴더에서 설치된 PRO 버전
- *@dhx/trial-booking* — 평가판 버전

다음 코드는 PRO 패키지에서 Booking을 가져옵니다:

~~~html title="Booking.vue"
<script>
import { Booking } from 'dhx-booking-package';
import 'dhx-booking-package/dist/booking.css';
</script>
~~~

PRO 패키지가 압축된 에셋을 제공하는 경우 CSS 파일을 *booking.min.css*로 가져오십시오.

다음 코드는 평가판 패키지에서 Booking을 가져옵니다:

~~~html title="Booking.vue"
<script>
import { Booking } from '@dhx/trial-booking';
import '@dhx/trial-booking/dist/booking.css';
</script>
~~~

:::info
이 튜토리얼은 Booking 평가판 버전을 사용합니다.
:::

#### 컨테이너 설정 및 Booking 초기화 {#set-the-container-and-initialize-booking}

템플릿에 호스트 컨테이너를 선언하고 `mounted()` 훅에서 Booking을 인스턴스화합니다. Vue가 컴포넌트를 제거할 때 위젯을 언마운트하려면 `unmounted()`에서 `destructor()`를 호출합니다.

다음 코드는 ref가 지정된 컨테이너와 라이프사이클 훅이 있는 Booking 컴포넌트를 선언합니다:

~~~html {2,7-8,18} title="Booking.vue"
<script>
import { Booking } from "@dhx/trial-booking";
import "@dhx/trial-booking/dist/booking.css";

export default {
    mounted() {
        // Booking 인스턴스 생성
        this.booking = new Booking(this.$refs.container, {});
    },

    unmounted() {
        this.booking.destructor(); // Booking 언마운트
    }
};
</script>

<template>
    <div ref="container" class="widget"></div>
</template>
~~~

#### 스타일 추가 {#add-the-styles}

Booking에는 위젯 스타일시트(위에서 가져온)와 크기가 지정된 컨테이너가 모두 필요합니다. 프로젝트의 메인 CSS 파일에서 페이지와 위젯 컨테이너에 전체 높이를 설정합니다.

다음 코드는 페이지와 Booking 컨테이너에 전체 높이를 설정합니다:

~~~css title="main.css"
/* 페이지 스타일 — #app 루트 컨테이너 사용 */
html,
body,
#app {
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

Booking에 카드 데이터를 로드하려면 [`data`](api/config/booking-data.md) 속성에 맞는 데이터셋을 준비합니다. 전체 데이터 형식 및 로딩 시나리오는 [데이터 로딩](guides/loading-data.md) 가이드를 참조하십시오.

*src/* 디렉터리에 *data.js* 파일을 생성합니다.

다음 코드는 샘플 데이터셋을 반환하는 `getData()` 헬퍼를 정의합니다:

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

*App.vue*를 열고 데이터셋을 가져와서 `data()` 옵션을 통해 노출하고, 데이터셋을 `<Booking/>` 컴포넌트에 prop으로 전달합니다.

다음 코드는 `data` prop을 가진 Booking 컴포넌트를 렌더링합니다:

~~~html {3,7-10,15} title="App.vue"
<script>
import Booking from "./components/Booking.vue";
import { getData } from "./data";

export default {
    components: { Booking },
    data() {
        const dataset = getData();
        return { dataset };
    }
};
</script>

<template>
    <Booking :data="dataset" />
</template>
~~~

*Booking.vue*를 열고 `data` prop을 Booking 설정에 연결합니다.

다음 코드는 prop을 Booking 생성자에 연결합니다:

~~~html {6,10} title="Booking.vue"
<script>
import { Booking } from "@dhx/trial-booking";
import "@dhx/trial-booking/dist/booking.css";

export default {
    props: ["data"],

    mounted() {
        this.booking = new Booking(this.$refs.container, {
            data: this.data,
            // 기타 구성 속성
        });
    },

    unmounted() {
        this.booking.destructor();
    }
};
</script>

<template>
    <div ref="container" class="widget"></div>
</template>
~~~

이제 Booking 컴포넌트가 로드된 데이터로 렌더링됩니다. 위젯을 더 세부적으로 커스터마이즈하려면 추가 구성 속성을 전달하십시오. 전체 목록은 [속성 개요](api/overview/booking-properties-overview.md)를 참조하십시오.

#### 이벤트 처리 {#handle-events}

위젯에서 사용자가 작업을 수행하면 이벤트가 발생합니다. `booking.api.on(eventName, handler)`를 사용하여 이벤트를 구독하고 해당 작업에 반응합니다. 전체 이벤트 목록은 [이벤트 개요](api/overview/booking-events-overview.md)를 참조하십시오.

*Booking.vue*를 열고 이벤트 구독으로 `mounted()`를 확장합니다.

다음 코드는 사용자가 슬롯을 선택할 때 슬롯 ID를 로그에 출력합니다:

~~~html {8-11} title="Booking.vue"
<script>
// ...
export default {
    // ...
    mounted() {
        this.booking = new Booking(this.$refs.container, {});

        // 선택된 슬롯 id 로그 출력
        this.booking.api.on("select-slot", (obj) => {
            console.log(obj.id);
        });
    }
    // ...
}
</script>

<!--...-->
~~~

앱을 시작하여 페이지에 데이터가 로드된 Booking을 확인합니다.

![Vue 애플리케이션에서 데이터가 로드된 DHTMLX Booking 위젯](/img/trial-booking.png)

프로젝트 요구 사항에 맞게 코드를 커스터마이즈하십시오. 완전한 참조 구현은 [GitHub](https://github.com/DHTMLX/vue-booking-demo)에서 확인할 수 있습니다.
