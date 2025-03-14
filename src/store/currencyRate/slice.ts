import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CurrencyRateItem} from "./model";

interface CurrencyRateState {
    items: CurrencyRateItem[] | []
}

const getItemsFromLocalStorage = () => {
    const data = localStorage.getItem('currencyItems');
    return data ? JSON.parse(data) : [];
}

const setItemsToLocalStorage = (data: any) => {
    localStorage.setItem('currencyItems', JSON.stringify(data))
}

const initialState: CurrencyRateState = {
    items: getItemsFromLocalStorage(),
}
export const currencyRateSlice = createSlice({
    name: 'currencyRate',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CurrencyRateItem>) => {
            state.items = [action.payload, ...state.items]
            setItemsToLocalStorage(state.items)
            //Todo Высчитывать портфель (x/sum)*100 для это хранить итоговую цену в state
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(x => x.id !== action.payload)
            setItemsToLocalStorage(state.items)
        }
    }
})


export const {addItem, removeItem} = currencyRateSlice.actions
//export const {createTask, removeTask, toggleCompletedTask} = currencyRateSlice.actions
//export counterSlice.actions
export default currencyRateSlice.reducer