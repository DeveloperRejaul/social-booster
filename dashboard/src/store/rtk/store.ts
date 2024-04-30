import { configureStore } from '@reduxjs/toolkit'
import { api } from './api'
import fbReducer from '../../features/fb/Slices'


export const store = configureStore({
    reducer: {
        fb: fbReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch