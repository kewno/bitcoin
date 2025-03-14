import React, {useState} from 'react'
import {Button, Stack} from "@mui/material";
import ModalAddCurrency from "@/components/ModalAddCurrency";


const ButtonShowModal = () => {
    const [modalShow, setModalShow] = useState(false)

    return (
        <Stack flexDirection='row' justifyContent='flex-end' mb='20px'>
            <Button
                variant="contained"
                sx={{
                    width: '100px',
                    padding: '4px 20px',
                    textTransform: 'none',
                    borderRadius: '10px',
                }}
                onClick={() => setModalShow(true)}
            >Добавить</Button>
            <ModalAddCurrency {...{modalShow, setModalShow}}/>
        </Stack>
    )
}

export default ButtonShowModal