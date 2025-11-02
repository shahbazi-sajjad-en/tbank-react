import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AccountState {
  selectedId: string | null
}

const initialState: AccountState = {
  selectedId: null
}

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setSelectedId: (state, action: PayloadAction<string>) => {
      state.selectedId = action.payload
    }
  }
})

export const { setSelectedId } = accountSlice.actions
export default accountSlice.reducer
