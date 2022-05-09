import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';
import './assets/scss/common.scss';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import './common/locale/i18n';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { injectStore } from './common/utils';

export const persistor = persistStore(store);

injectStore(store);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

reportWebVitals();
