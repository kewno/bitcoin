import React from 'react'
import css from '../CurrencyTable.module.scss'

interface ICurrencyItem {
    data: {id: string, name: string, count: string, percentChange: string, portfolioPercentage: string, price: string | number, priceWithCount: number}
    removeItemTable: (id: string) => void
}
const CurrencyItem = (props: ICurrencyItem) => {
    const {removeItemTable, data} = props
    const getPercentChange = (value: string) => {
        const belowZero = Number(value) < 0
        const mark = belowZero ? '-' : '+'
        return <td className={belowZero ? css.negative : css.positive}>{`${mark}${value} %`}</td>
    }
    return (
        <tr onClick={() => removeItemTable(data.id)}>
            <td>{data.name}</td>
            <td>{data.count}</td>
            <td>{data.price}</td>
            <td>{data.priceWithCount}</td>
            <>{getPercentChange(data.percentChange)}</>
            <td>{data.portfolioPercentage}</td>
        </tr>
    );
};

export default CurrencyItem