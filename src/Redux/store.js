import {configureStore} from '@reduxjs/toolkit';
import RootReducer from './RootReducer';
export const store=configureStore({
    reducer:RootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          immutableCheck: false, // Disable the immutable state check
          serializableCheck: false, // You may also disable this if needed
        }),
});
export default store;