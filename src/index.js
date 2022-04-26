import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import {configureStore} from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
import blobReducer from "./features/test"

const store = configureStore({
  reducer: {
    blobs: blobReducer,
  }
})

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);



