import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import {configureStore} from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
import blobReducer from './services/BlobRetriever'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import { PersistGate } from 'redux-persist/es/integration/react'


const persistConfig = {
  key:'persist-key',
  storage,
}

const persistedReducer = persistReducer(persistConfig, blobReducer)

const store = configureStore({
  reducer: { 
      blobs: blobReducer, 
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

const persistorStore = persistStore(store)

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistorStore={persistorStore}> */}
        <App />
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>,
);



