import { useState, useEffect } from "react"

const useWebSocket = () => {
    const [currency, setCurrency] = useState([
        {
            name: 'BTC',
            price: '',
            percentChange: '',
        },
        {
            name: 'ETH',
            price: '',
            percentChange: '',
        },
        {
            name: 'XRP',
            price: '',
            percentChange: '',
        },
    ])

    useEffect(() => {
        const connectWebSocket = () => {
            const socketUrl = 'wss://stream.binance.com:9443/stream?streams=btcusdt@ticker/ethusdt@ticker/xrpusdt@ticker'

            const socket = new WebSocket(socketUrl)

            socket.onopen = () => {
                console.log('WebSocket connected')
            }

            socket.onmessage = (event) => {
                const data = JSON.parse(event.data)
                const stream = data.stream
                const priceData = data.data

                if (stream === 'btcusdt@ticker') {
                    setCurrency(prevItems =>
                        prevItems.map(item =>
                            item.name === 'BTC' ? { ...item, price: priceData.c, percentChange: priceData.P } : item
                        )
                    )
                } else if (stream === 'ethusdt@ticker') {
                    setCurrency(prevItems =>
                        prevItems.map(item =>
                            item.name === 'ETH' ? { ...item, price: priceData.c, percentChange: priceData.P } : item
                        )
                    )
                } else if (stream === 'xrpusdt@ticker') {
                    setCurrency(prevItems =>
                        prevItems.map(item =>
                            item.name === 'XRP' ? { ...item, price: priceData.c, percentChange: priceData.P } : item
                        )
                    )
                }
            }

            socket.onclose = () => {
                console.log('WebSocket disconnected')
                setTimeout(connectWebSocket, 3000);
            }

            return () => {
                socket.close()
            }
        }
        connectWebSocket()
    }, [])

    return {currency}
}

export default useWebSocket