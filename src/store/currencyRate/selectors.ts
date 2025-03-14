import {RootState} from "../store";

export const items = (state: RootState) => state.currency.items

export const currencySelectors = {
    items
}