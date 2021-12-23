# iotims-admin-web-client
통합관제 리뉴얼 WEB(react)

## ⛏installation

**✔ core_ui react**
[(CoreUi)](https://coreui.io/react/docs/3.3/)

**✔ redux-toolkit**
[(createSlice)](https://redux-toolkit.js.org/introduction/getting-started)

**✔ material-ui**
[(material-ui)](https://mui.com/getting-started/usage/)

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
