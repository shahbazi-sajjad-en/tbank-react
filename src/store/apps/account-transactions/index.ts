import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AccountTransactionsState {
  selectedId: string | null
}

const initialState: AccountTransactionsState = {
  selectedId: null,
}

const accountTransactionsSlice = createSlice({
  name: "accountTransactions",
  initialState,
  reducers: {
    setSelectedId: (state, action: PayloadAction<string>) => {
      state.selectedId = action.payload
    },
    clearSelectedId: (state) => {
      state.selectedId = null
    },
  },
})

export const { setSelectedId, clearSelectedId } = accountTransactionsSlice.actions
export default accountTransactionsSlice.reducer
