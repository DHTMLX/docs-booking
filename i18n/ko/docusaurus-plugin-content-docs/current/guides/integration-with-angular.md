---
sidebar_label: Angular와의 통합
title: Angular와의 통합
description: DHTMLX JavaScript Booking 라이브러리 문서에서 Angular와의 통합에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험해 보세요. DHTMLX Booking 무료 30일 평가판을 다운로드할 수도 있습니다.
---

# Angular와의 통합 {#integration-with-angular}

DHTMLX Booking은 위젯 생성자를 감싸는 커스텀 컴포넌트를 통해 Angular와 통합됩니다. 이 가이드는 새 Angular 프로젝트를 생성하고, Booking을 설치하고, 데이터와 events를 포함한 위젯을 렌더링하는 과정을 안내합니다. 전체 참조 구현은 [GitHub의 Angular 예제](https://github.com/DHTMLX/angular-booking-demo)를 참조하십시오.

:::tip
이 가이드는 Angular 핵심 개념에 대한 기본 지식이 있다고 가정합니다. 소개가 필요하다면 [Angular 문서](https://v17.angular.io/docs)를 참조하십시오.
:::

## 프로젝트 생성 {#create-a-project}

Booking 통합을 추가하기 전에 Angular CLI로 새 Angular 앱을 생성합니다.

:::info
시작하기 전에 [Angular CLI](https://v17.angular.io/cli)와 [Node.js](https://nodejs.org/en/)를 설치하십시오.
:::

다음 명령어는 새 *my-angular-booking-app* 프로젝트를 생성합니다:

~~~bash
ng new my-angular-booking-app
~~~

:::note
CLI가 묻는 경우 Server-Side Rendering (SSR)과 Static Site Generation (SSG/Prerendering)을 비활성화하십시오. Booking 위젯은 클라이언트 측에서 DOM에 마운트됩니다.
:::

명령어가 모든 필요한 도구를 설치합니다. 추가 명령어는 필요하지 않습니다.

### 의존성 설치 {#install-dependencies}

프로젝트 디렉터리로 이동합니다.

다음 명령어는 새로 생성된 앱 폴더를 엽니다:

~~~bash
cd my-angular-booking-app
~~~

패키지 매니저로 의존성을 설치하고 개발 서버를 시작합니다.

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

앱은 예를 들어 [http://localhost:4200](http://localhost:4200)과 같은 로컬호스트에서 실행됩니다.

## 앱에 Booking 추가 {#add-booking-to-the-app}

Booking 패키지를 설치하기 전에 개발 서버를 중지하고, 위젯을 감싸는 Angular 컴포넌트를 생성합니다.

### 1단계. 패키지 설치 {#step-1-install-the-package}

[Booking 평가판 패키지](how-to-start.md#installing-trial-booking-via-npm-or-yarn)를 다운로드하고 패키지 README의 단계를 따르십시오. 평가판은 30일간 활성화됩니다.

### 2단계. Booking 컴포넌트 생성 {#step-2-create-the-booking-component}

*src/app/* 디렉터리에 *booking* 폴더를 생성하고 그 안에 *booking.component.ts* 파일을 추가합니다. 아래 단계를 완료하여 위젯을 연결합니다.

#### 소스 파일 가져오기 {#import-the-source-files}

배포판에 맞는 경로를 사용하여 Booking 클래스를 가져옵니다:

- *dhx-booking-package* — 로컬 폴더에서 설치한 PRO 버전
- *@dhx/trial-booking* — 평가판

다음 코드 스니펫은 PRO 패키지에서 Booking을 가져옵니다:

~~~ts
import { Booking } from 'dhx-booking-package';
~~~

다음 코드 스니펫은 평가판 패키지에서 Booking을 가져옵니다:

~~~ts
import { Booking } from '@dhx/trial-booking';
~~~

:::info
이 튜토리얼은 Booking 평가판을 사용합니다.
:::

#### 컨테이너 설정 및 Booking 초기화 {#set-the-container-and-initialize-booking}

컴포넌트 템플릿에 호스트 컨테이너를 정의하고 `ngOnInit()`에서 Booking을 인스턴스화합니다. Angular가 컴포넌트를 제거할 때 위젯을 언마운트하려면 `ngOnDestroy()`에서 `destructor()`를 호출합니다.

다음 코드 스니펫은 컨테이너 엘리먼트와 라이프사이클 훅이 있는 Booking 컴포넌트를 선언합니다:

~~~ts {1,8,12-13,18-19} title="booking.component.ts"
import { Booking } from '@dhx/trial-booking';
import { Component, ElementRef, OnInit, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: "booking", // app.component.ts에서 <booking />으로 사용됨
    styleUrls: ["./booking.component.css"],
    template: `<div #container class="widget"></div>`,
})

export class BookingComponent implements OnInit, OnDestroy {
    // Booking의 호스트 컨테이너
    @ViewChild('container', { static: true }) booking_container!: ElementRef;

    private _booking!: Booking;

    ngOnInit() {
        // Booking 인스턴스 생성
        this._booking = new Booking(this.booking_container.nativeElement, {});
    }

    ngOnDestroy(): void {
        this._booking.destructor(); // Booking 언마운트
    }
}
~~~

#### 스타일 추가 {#add-the-styles}

Booking은 위젯 스타일시트와 크기가 지정된 컨테이너가 모두 필요합니다.

*src/app/booking/* 디렉터리에 *booking.component.css* 파일을 생성합니다.

다음 코드 스니펫은 Booking 스타일시트를 가져오고 페이지와 위젯 컨테이너의 전체 높이를 설정합니다:

~~~css title="booking.component.css"
/* Booking 스타일 가져오기 */
@import "@dhx/trial-booking/dist/booking.css";

/* 페이지 스타일 */
html,
body {
    margin: 0;
    padding: 0;
    height: 100%;
}

/* Booking 컨테이너 */
.widget {
    height: 100%;
}
~~~

#### 데이터 로드 {#load-data}

Booking에 카드 데이터를 로드하려면 [`data`](api/config/booking-data.md) 속성에 맞는 데이터셋을 준비합니다. 전체 데이터 형식과 로딩 시나리오는 [데이터 로딩](guides/loading-data.md) 가이드를 참조하십시오.

*src/app/booking/* 디렉터리에 *data.ts* 파일을 생성합니다.

다음 코드 스니펫은 샘플 데이터셋을 반환하는 `getData()` 헬퍼를 정의합니다:

~~~ts title="data.ts"
export function getData() : any {
    function getDate(addDays : any, hoursValue = 0, minutesValue = 0) {
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
                },
            ],
            usedSlots: [getDate(0, 12), getDate(0, 18)]
        },
        // ...
    ];
}
~~~

*booking.component.ts*를 열고 데이터셋을 가져온 후 `ngOnInit()` 내부의 Booking 구성에 전달합니다.

다음 코드 스니펫은 `getData()`를 Booking 생성자에 연결합니다:

~~~ts {2,18,20} title="booking.component.ts"
import { Booking } from '@dhx/trial-booking';
import { getData } from "./data"; // 데이터 가져오기
import { Component, ElementRef, OnInit, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: "booking",
    styleUrls: ["./booking.component.css"],
    template: `<div #container class="widget"></div>`,
})

export class BookingComponent implements OnInit, OnDestroy {
    @ViewChild('container', { static: true }) booking_container!: ElementRef;

    private _booking!: Booking;

    ngOnInit() {
        const data = getData(); // 데이터셋 로드
        this._booking = new Booking(this.booking_container.nativeElement, {
            data
        });
    }

    ngOnDestroy(): void {
        this._booking.destructor();
    }
}
~~~

Booking 컴포넌트가 이제 로드된 데이터와 함께 렌더링됩니다. 위젯을 추가로 커스터마이징하려면 추가 구성 속성을 전달하십시오 — 전체 목록은 [속성 개요](api/overview/booking-properties-overview.md)를 참조하십시오.

#### Events 처리 {#handle-events}

위젯에서 사용자가 작업을 수행하면 event가 발생합니다. `booking.api.on(eventName, handler)`으로 event를 구독하여 작업에 반응합니다. 전체 events 목록은 [Events 개요](api/overview/booking-events-overview.md)를 참조하십시오.

*booking.component.ts*를 열고 `ngOnInit()`에 event 구독을 추가합니다.

다음 코드 스니펫은 사용자가 슬롯을 선택할 때 슬롯 ID를 로그에 기록합니다:

~~~ts {7-10} title="booking.component.ts"
// ...
ngOnInit() {
    this._booking = new Booking(this.booking_container.nativeElement, {
        start: new Date(2024, 5, 10),
    });

    // 선택된 슬롯 id 로그 출력
    this._booking.api.on("select-slot", (obj) => {
        console.log(obj.id);
    });
}

ngOnDestroy(): void {
    this._booking.destructor();
}
~~~

### 3단계. 앱에 Booking 등록 {#step-3-register-booking-in-the-app}

애플리케이션 부트스트랩에 `BookingComponent`를 추가합니다. *src/app/app.component.ts*를 열고 기본 코드를 교체합니다.

다음 코드 스니펫은 `AppComponent` 내부에 Booking 컴포넌트를 렌더링합니다:

~~~ts {5} title="app.component.ts"
import { Component } from "@angular/core";

@Component({
    selector: "app-root",
    template: `<booking/>` // booking.component.ts에 정의된 템플릿
})
export class AppComponent {
    name = "";
}
~~~

*src/app/*에 *app.module.ts*를 생성하고 두 컴포넌트를 선언합니다.

다음 코드 스니펫은 루트 모듈에 `AppComponent`와 `BookingComponent`를 등록합니다:

~~~ts {4-5,8} title="app.module.ts"
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { BookingComponent } from "./booking/booking.component";

@NgModule({
    declarations: [AppComponent, BookingComponent],
    imports: [BrowserModule],
    bootstrap: [AppComponent]
})
export class AppModule {}
~~~

*src/main.ts*를 열고 루트 모듈을 부트스트랩합니다.

다음 코드 스니펫은 `AppModule`로 애플리케이션을 시작합니다:

~~~ts title="main.ts"
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";
platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
~~~

앱을 시작하면 페이지에 데이터가 로드된 Booking을 볼 수 있습니다.

![Booking 초기화](../assets/trial-booking.png)

프로젝트 요구 사항에 맞게 코드를 커스터마이징하십시오. 전체 참조 구현은 [GitHub](https://github.com/DHTMLX/angular-booking-demo)에서 확인할 수 있습니다.
