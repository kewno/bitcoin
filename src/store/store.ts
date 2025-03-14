import {configureStore} from "@reduxjs/toolkit";
import currencyRateReducer from './currencyRate/slice'

export const rootReducer = configureStore({
    reducer: {
        currency: currencyRateReducer
    }
})

export type RootState = ReturnType<typeof rootReducer.getState>
export type AppDispatch = typeof rootReducer.dispatch