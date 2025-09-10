import storage from 'redux-persist/lib/storage'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import { persistStore } from 'redux-persist'
import authReducer from '../features/authSlice'
import userReducer from '../features/userSlice'
import postReducer from '../features/postSlice'
import commentReducer from '../features/commentSlice'
import friendReducer from '../features/friendSlice'

const persistConfig = {
    key: 'root',
    storage
}

const appReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    post: postReducer,
    comment: commentReducer,
    friend: friendReducer
})

const rootReducer = (state: any, action: any) => {
    if(action.type === "RESET"){
        state = undefined
    }
    return appReducer(state, action)
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store)