import { configureStore } from '@reduxjs/toolkit';
import clientReducer from './reducers/clientReducer';
import customizationReducer from './customizationReducer';
import authReducer from './reducers/authReducer';

const store = configureStore({
  reducer: { 
    estimateList: clientReducer, 
    customization: customizationReducer, 
    login: authReducer 
  }
});

export default store;
