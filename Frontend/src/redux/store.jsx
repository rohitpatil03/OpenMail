import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/reducers';
import sidebarReducer from './reducers/sidebarReducers'

const store = configureStore({
  reducer: {rootReducer, sidebarReducer}
});

export default store;
