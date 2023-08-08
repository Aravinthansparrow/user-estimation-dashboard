import { configureStore } from '@reduxjs/toolkit';
import clientReducer from './reducers/clientReducer';
import customizationReducer, { initialState }  from './customizationReducer';
import authReducer from './reducers/authReducer';
import complexityReducer from './reducers/complexityReducer';
import componentReducer from './reducers/componentReducer';
import workitemReducer from './reducers/workitemReducer';
import generalReducer from './reducers/generalReducer';
import activityReducer from './reducers/activityReducer';
import config from '../../src/config';

// Load the theme mode from local storage or use the default 'light' mode
const persistedThemeMode = localStorage.getItem('themeMode') || config.defaultThemeMode;

const store = configureStore({
  reducer: { 
    customization: customizationReducer, 
    estimateList: clientReducer, 
    login: authReducer,
    complexity: complexityReducer,
    component: componentReducer, 
    workitem: workitemReducer,
    generalSetting:generalReducer,
    activities: activityReducer
  },
  preloadedState: {
    customization: {
      ...initialState,
      themeMode: persistedThemeMode
    }
  }
});

export default store;
