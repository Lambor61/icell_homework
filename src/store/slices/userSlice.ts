import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';

interface UserState {
  user: FirebaseAuthTypes.User | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<FirebaseAuthTypes.User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = action.payload !== null;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
