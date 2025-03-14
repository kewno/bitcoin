import React, {useState} from 'react'
import {Box, Button, Modal, TextField} from "@mui/material"
import useWebSocket from "@/utils/hooks/useWebSocket"
import {useAppDispatch} from "@/store/hook"
import {addItem} from "@/store/currencyRate/slice"
import {createId} from "@/utils/helper/createId"

interface IModalAddCurrency {
    modalShow: boolean
    setModalShow: (x: boolean) => void
}
interface ISelectedElem {
    name: string,
    price: string,
    percentChange: string,
}

const ModalAddCurrency = (props: IModalAddCurrency) => {
    const {modalShow, setModalShow} = props
    const dispatch = useAppDispatch()
    const handleClose = () => setModalShow(false)

    const [textSearch, setTextSearch] = useState('')
    const handleTextSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextSearch(e.target.value)
    }

    const [count, setCount] = useState(0)
    const handleCount = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCount(Number(e.target.value))
    }

    const [selectedElem, setSelectedElem] = useState<ISelectedElem | null>(null)
    const handleSelectElem = (el: ISelectedElem) => {
        setSelectedElem(el)
    }

    const addItemTable = () => {
        if (selectedElem)
            dispatch(addItem({id: createId(), name: selectedElem.name, count: count.toString(), percentChange: selectedElem.percentChange, portfolioPercentage: ''}))
        handleClose()
        setSelectedElem(null)
    }

    const closeModal = () => {
        handleClose()
        setSelectedElem(null)
    }

    const {currency} = useWebSocket()

    return (
        <Modal
            open={modalShow}
            onClose={handleClose}
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: '#ffff',
                width: '100%',
                maxWidth: '350px',
                minHeight: '300px',
                borderRadius: '10px',
                padding: '20px',
            }}>
                <TextField
                    value={textSearch}
                    onChange={handleTextSearch}
                    placeholder='Поиск валюты'
                    sx={{
                        outline: 'none',
                        color: 'grey',
                        width: '100%',
                        marginBottom: '10px',
                        'input' : {
                            padding: '5px 10px',
                            maxWidth: '400px',
                        }
                    }}
                />
                <div>
                    {currency.map(el =>
                        <Box key={el.name}
                             display='flex'
                             justifyContent='space-between'
                             mb='5px'
                             onClick={() => handleSelectElem(el)}
                        >
                            <span>{el.name}</span>
                            <span>{el.price}</span>
                            <span>{el.percentChange}</span>
                        </Box>
                    )}
                </div>

                {selectedElem &&
					<Box mt='30px'>
                        <Box display='flex' justifyContent='space-between'>
                            <span>{selectedElem.name}</span>
                            <span>{selectedElem.price}</span>
                            <span>{selectedElem.percentChange}</span>
                        </Box>
						<TextField
							value={count}
							onChange={handleCount}
							placeholder='Количество'
							type='number'
							sx={{
                                outline: 'none',
                                color: 'grey',
                                width: '100%',
                                marginTop: '10px',
                                'input' : {
                                    padding: '5px 10px',
                                    maxWidth: '400px',
                                }
                            }}
						/>
                        <Box display='flex' mt='20px'>
                            <Button
                                variant="contained"
                                fullWidth
                                sx={{
                                    mr: '10px',
                                    padding: '4px 20px',
                                    textTransform: 'none',
                                    borderRadius: '10px',
                                }}
                                onClick={addItemTable}
                            >Добавить</Button>
                            <Button
                                variant="contained"
                                fullWidth
                                sx={{
                                    padding: '4px 20px',
                                    textTransform: 'none',
                                    borderRadius: '10px',
                                }}
                                onClick={closeModal}
                            >Отмена</Button>
						</Box>
					</Box>
                }
            </Box>
        </Modal>
    )
}

export default ModalAddCurrency