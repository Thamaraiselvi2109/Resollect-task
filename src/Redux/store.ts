import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from './Slices/authSlice';
import TaskReducer from './Slices/taskSlice'
import LayoutReducer from './Slices/layoutSlice';
import storage from "redux-persist/lib/storage";
import AccordionReducer from './Slices/accordionopenSlice'
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
    key: 'root', // Key for the persisted data
    storage,
};


const persistedReducer = persistReducer(persistConfig, AuthReducer);

export const store = configureStore({
    reducer: {
        authentication: persistedReducer,
        task : TaskReducer,
        layout: LayoutReducer,
        accordionopen:  AccordionReducer,
        },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable serializable check for redux-persist
        }),
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export const persistor = persistStore(store);