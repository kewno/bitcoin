import React from 'react'
import CurrencyItem from "@/components/CurrencyTable/CurrencyItem";
import {removeItem} from "@/store/currencyRate/slice";
import {useAppDispatch, useAppSelector} from "@/store/hook";
import {currencySelectors} from "@/store/currencyRate/selectors";
import useWebSocket from "@/utils/hooks/useWebSocket";
import css from './CurrencyTable.module.scss'

const CurrencyTable = () => {
    const {currency} = useWebSocket()
    const currencyItems = useAppSelector(currencySelectors.items)

    const dispatch = useAppDispatch()
    const removeItemTable = (id: string) => {
        dispatch(removeItem(id))
    }

    const getPrice = (name: string) => (
        Number(currency.find(el => el.name === name)?.price)
    )

    return (
        <>
            {currencyItems.length > 0 &&
                <div className={css.tableContainer}>
                    <table className={css.table}>
                        <thead>
                            <tr>
                                <th>Актив</th>
                                <th>Количество</th>
                                <th>Цена</th>
                                <th>Общая стоимость</th>
                                <th>Изм. за 24 ч.</th>
                                <th>% портфеля</th>
                            </tr>
                        </thead>

                        <tbody>
                            {currencyItems?.map(el => {
                                const price = getPrice(el.name).toFixed(2) || 0
                                const priceWithCount = +price * +el.count

                                return <CurrencyItem key={el.id} {...{removeItemTable, data: {price, priceWithCount, ...el}}}/>
                            })}
                        </tbody>
                    </table>
                </div>
            }
        </>
    );
};

export default CurrencyTable