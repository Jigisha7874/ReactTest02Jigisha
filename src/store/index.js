import { combineReducers, configureStore } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer } from 'redux-persist';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import whiteList from '../features/whiteList';
import fuelSlice from '../features/fuelSlice';

const reducers = combineReducers({
  whiteList,
  fuel: fuelSlice
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['whiteList'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
});

setupListeners(store.dispatch)

