import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface state {
    accounts: any[]
}

const initialState = { accounts: [] } satisfies state as state

const slice = createSlice({
    name: 'fb',
    initialState,
    reducers: {
        addAccounts: (state, action: PayloadAction<any>) => {
            state.accounts = action.payload
        },
        addAccount: (state, action: PayloadAction<any>) => {
            state.accounts.push(action.payload)
        }
    },
})

export const { addAccounts, addAccount } = slice.actions
export default slice.reducer