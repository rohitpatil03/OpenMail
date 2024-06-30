import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tabname : 'inbox'
  };


const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
      setTabName: (state, action) => {
        state.tabname = action.payload;
      },
      
    }
  });


export const { setTabName } = sidebarSlice.actions;
export default sidebarSlice.reducer;