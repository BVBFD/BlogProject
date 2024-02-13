import { configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import storage from './storage';
import userReducer from './userSlice';
import searchTextBolSlice from './searchTextBolSlice';
import postsVarSlice from './postsVarSlice';
import paginationTotalNumSlice from './paginationTotalNumSlice';
import currentPageNumSlice from './currentPageNumSlice';
import catNameSlice from './catNameSlice';
import searchTextStringSlice from './searchTextStringSlice';
import postClientYSlice from './postClientYSlice';
import openPostSlice from './openPostSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  user: userReducer,
  searchTextBol: searchTextBolSlice,
  postsVar: postsVarSlice,
  paginationTotalNum: paginationTotalNumSlice,
  currentPageNum: currentPageNumSlice,
  catName: catNameSlice,
  searchText: searchTextStringSlice,
  postClientY: postClientYSlice,
  openPostBol: openPostSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
