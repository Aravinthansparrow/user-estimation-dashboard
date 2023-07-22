import { configureStore } from '@reduxjs/toolkit';
import clientReducer from './reducers/clientReducer';
import customizationReducer from './customizationReducer';
import authReducer from './reducers/authReducer';
import complexityReducer from './reducers/complexityReducer';
import componentReducer from './reducers/componentReducer';
import workitemReducer from './reducers/workitemReducer';
const store = configureStore({
  reducer: { 
    estimateList: clientReducer, 
    customization: customizationReducer, 
    login: authReducer,
    complexity: complexityReducer,
    component: componentReducer, 
    workitem: workitemReducer,
  }
});

export default store;
