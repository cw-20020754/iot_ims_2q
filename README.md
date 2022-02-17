# iotims-admin-web-client
통합관제 리뉴얼 WEB(react)



## ⛏Project Setup


### `yarn`
npm을 대체할 수 있는 도구로 npm보다 더 빠르며 효율적인 캐시 시스템과 기타 부가 기능을
제공  [(yarn 공식사이트)](https://classic.yarnpkg.com/en/docs/install#windows-stable)

 ```txt
yarn install

yarn start
```


### `yarn test`
Run your tests.  [running tests](https://facebook.github.io/create-react-app/docs/running-tests)

### `yarn build`

Compiles and minifies for production. [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`
The built-in environment setting file is displayed in the project root path.

### `material-UI` & `Core_UI`
UI 관련 libaray  
[(material-Ui)](https://material-ui.com/)  
[(core-Ui)](https://coreui.io/react/docs/4.1/getting-started/introduction/)


 ```txt
yarn add @material-ui/core

yarn add @material-ui/icons

yarn add @coreui/react
```


### `router`
react-router

 ```txt
yarn add react-router-dom
```


### `Redux`
상태 관리 라이브러리

 ```txt
 
yarn add redux react-redux redux-devtools-extension redux-logger redux-thunk

```

<br>

### `Redux toolkit` [(redux-toolkit)](https://redux-toolkit.js.org/introduction/getting-started)
Redux를 더 사용하기 쉽게 만들기 위해 Redux에서 공식 제공하는 개발도구
```txt
yarn add @reduxjs/toolkit
```

<br>


### `Day.js` [(Day.js)](https://day.js.org/)
Day.js는 moment.js 축소된 버전으로 moment.js와 동일한 API지만 용량이 적기 때문에 해당 library를 적용함.

```txt
yarn add dayjs
```


## ⛏ screen configuration
../page/

|폴더|router|화면|설명|
|---|---|---|-----|
|DashboardPage/index.js|/dashboard|대시보드|대시보드 메인 페이지|
|DeviceIntegratedMonitoringPage/index.js|/deviceMonitoring|디바이스 통합 모니터링|통합 모니터링 페이지|
|FotaPage/FirmwareManagementPage.js|/fota/firmwareManagement|FOTA Firmware 관리|FOTA Firmware 리스트, 펌웨어 리스트 추가 수정 삭제 및 엑셀 다운로드 기능|
|FotaPage/FirmwareManagementDetailPage.js|/fota/firmwareManagementDetail|FOTA Firmware 관리 상세|Firmware 등록 및 수정|
|FotaPage/FotaPolicyManagementPage.js|/fota/policyManagement|FOTA 정책관리|FOTA 정책 리스트, 정책 추가 수정 삭제 및 엑셀 다운로드 기능|
|FotaPage/FotaPolicyManagementDetailPage.js|/fota/policyManagementDetail|FOTA 정책관리 상세|FOTA 정책 등록 및 수정|
|FotaPage/CertPolicyManagementPage.js|/fota/certPolicyManagement|인증서 정책관리|인증서 정책 리스트, 인증서 추가 수정 삭제 및 엑셀 다운로드 기능|
|FotaPage/CertPolicyManagementDetailPage.js|/fota/certPolicyManagementDetail|인증서 정책관리 상세|인증서 정책 등록 및 수정|
|FotaPage/FotaStatusSearchPage.js|/fota/fotaStatusSearchPage|FOTA 상태 조회|Fota 상태 조회 리스트, 펌웨어 파일 상세 및 이력 조회 |
|FotaPage/FotaHistroySearchPage.js|/fota/fotaHistorySearchPage|FOTA 이력 조회|Fota 이력 조회 리스트|


## ⛏ File Structure


```
iotims-admin-web-client
├── public/          #static files
│   └── index.html   #html template
│
├── src/             #project root
│   ├── assets/      #assets - js icons object
    │     ├── common   # scss (related style)
    │     └── ...      # font, icon, images ..
    ├── common/      #product data with common utils, components
    │   ├── data/  #container source - template layout
|   │   ├── _nav.js  #sidebar config
|   │   └── ...   
    │── components/  #reusable component folder
    │── layout/      #layout
    ├── lib/         # api related
    │     └── api      
    ├── pages/       # navigation related detail pages
│   ├── redux/       #redux
│   │    ├── reducers #redux reducers
    │    └── store   # redux store
│   ├── views/       # views source (common button, theme...)
    ├── _nav.js/     # navigation with icon, router..
│   ├── App.js
│   ├── index.js
│   ├── routes.js    #routes config
│   └── store.js     #template state example 
│
└── package.json
```

