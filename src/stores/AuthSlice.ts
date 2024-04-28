import { createSlice } from "@reduxjs/toolkit";

interface CurrentUserInfo {
  userID: string;
  userEmail: string;
  userName: string;
  userOrganization: string | null;
}

interface AUTH_INTERFACE {
  isSignedIn: boolean;
  currentUserEmail: string;
  currentUserPassword: string;
  currentUserName: string;
  currentUserID: string;
  currentUserInfo: CurrentUserInfo;
}

const initialState: AUTH_INTERFACE = {
  isSignedIn: false,
  currentUserEmail: '',
  currentUserPassword: '',
  currentUserName: '',
  currentUserID: '',
  currentUserInfo: {
    userID: '',
    userEmail: '',
    userName: '',
    userOrganization: null,
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsSignedIn: (state, action) => {
      state.isSignedIn = action.payload;
    },
    setCurrentUserEmail: (state, action) => {
      state.currentUserEmail = action.payload;
    },
    setCurrentUserPassword: (state, action) => {
      state.currentUserPassword = action.payload;
    },
    setCurrentUserName: (state, action) => {
      state.currentUserName = action.payload;
    },
    setCurrentUserID: (state, action) => {
      state.currentUserID = action.payload;
    },
    setCurrentUserInfo: (state, action) => {
      state.currentUserInfo = action.payload;
    }
  }
});

export const {
  setIsSignedIn,
  setCurrentUserEmail,
  setCurrentUserPassword,
  setCurrentUserName,
  setCurrentUserID,
  setCurrentUserInfo
} = authSlice.actions;

export const selectIsSignedIn = (state: any) => state.auth.isSignedIn;
export const selectCurrentUserEmail = (state: any) => state.auth.currentUserEmail;
export const selectCurrentUserPassword = (state: any) => state.auth.currentUserPassword;
export const selectCurrentUserName = (state: any) => state.auth.currentUserName;
export const selectCurrentUserID = (state: any) => state.auth.currentUserID;
export const selectCurrentUserInfo = (state: any) => state.auth.currentUserInfo;

export default authSlice.reducer;