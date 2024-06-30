// reducers.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  data: null,
  loading: true,
  isInbox: true,
  showSidebar: false,
  phoneView:false,
  viewContent:false,
  contentBody:{},
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setIsInbox: (state, action) => {
      state.isInbox = action.payload;
    },
    setShowSidebar: (state, action) => {
      state.showSidebar = action.payload;
    },
    setPhoneView: (state, action) => {
      state.phoneView = action.payload;
    },
    setViewContent: (state, action) => {
      state.viewContent = action.payload;
    },
    setContentBody: (state, action) => {
      state.contentBody = action.payload;
    },
  }
});

export const { setUsername, setData, setLoading, setIsInbox, setShowSidebar,setPhoneView, setViewContent, setContentBody } = appSlice.actions;
export default appSlice.reducer;
