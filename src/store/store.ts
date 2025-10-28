import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import carsReducer from './slices/carsSlice';
import { carsApi } from './api/carsApi';

export const store = configureStore({
  reducer: {
    user: userReducer,
    cars: carsReducer,
    [carsApi.reducerPath]: carsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['user/setUser'],
        ignoredPaths: ['user.user'],
      },
    }).concat(carsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
