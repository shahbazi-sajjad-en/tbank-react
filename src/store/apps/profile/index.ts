import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  username: string | null;
  role: string | null;
  phoneNumber: string | null;
}

const initialState: UserState = {
  username: null,
  role: null,
  phoneNumber: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (
      state,
      action: PayloadAction<{ username: string; role: string; phoneNumber: string }>
    ) => {
      state.username = action.payload.username;
      state.role = action.payload.role;
      state.phoneNumber = action.payload.phoneNumber;
    },
    clearUser: (state) => {
      state.username = null;
      state.role = null;
      state.phoneNumber = null;
    },
  },
});

export const { setUserData, clearUser } = userSlice.actions;
export default userSlice.reducer;
