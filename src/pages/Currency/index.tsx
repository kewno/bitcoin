'use client'

import React from 'react'
import {Box} from "@mui/material"
import {Provider} from "react-redux"
import {rootReducer} from "@/store/store"
import CurrencyTable from "@/components/CurrencyTable"
import ButtonShowModal from "@/components/ButtonShowModal"

const Currency = () => {

    return (
         <Provider store={rootReducer}>
            <Box padding='8px 16px'>
                <ButtonShowModal />
                <CurrencyTable/>
            </Box>
        </Provider>
    );
};

export default Currency;