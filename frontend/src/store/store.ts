import storage from 'redux-persist/lib/storage'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import { persistStore } from 'redux-persist'
import authReducer from '../features/authSlice'
import userReducer from '../features/userSlice'
import postReducer from '../features/postSlice'

const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    post: postReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store)