// reducer/generalReducer.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_STATUS } from '../../utils/constants';
import { getGeneralSettingsAPI, updateGeneralSettingsAPI } from '../../services/api';
const namespace = 'generalSetting';

const initialState = {
  data: {},
  status: API_STATUS.PENDING,
  error: null
};

// Async thunk to fetch general settings from the API
export const fetchGeneralSettings = createAsyncThunk(`${namespace}/fetchGeneralSettings`, async () => {
  try {
    const response = await getGeneralSettingsAPI();
    return response.data;
  } catch (error) {
    throw new Error(error.message || API_STATUS.NETWORK_ERROR);
  }
});

// Async thunk to update general settings to the API
export const updateGeneralSettings = createAsyncThunk(`${namespace}/updateGeneralSettings`, async (updatedValues, { rejectWithValue }) => {
  try {
    const response = await updateGeneralSettingsAPI(updatedValues);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Create a slice of the Redux state for general settings
const generalSettingsSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {},
  extraReducers: {
    [fetchGeneralSettings.pending]: (state) => {
      state.status = API_STATUS.PENDING;
      state.error = null;
    },
    [fetchGeneralSettings.fulfilled]: (state, action) => {
      state.status = API_STATUS.FULFILLED;
      state.error = null;
      state.data = action.payload; // Update the state with the new data from the API response
    },
    [fetchGeneralSettings.rejected]: (state, action) => {
      state.status = API_STATUS.REJECTED;
      state.error = action.error.message || API_STATUS.NETWORK_ERROR;
    },
    [updateGeneralSettings.pending]: (state) => {
      state.status = API_STATUS.PENDING;
      state.error = null;
    },
    [updateGeneralSettings.fulfilled]: (state, action) => {
      state.status = API_STATUS.FULFILLED;
      state.error = null;
      state.data = action.payload; // Update the state with the new data from the API response
    },
    [updateGeneralSettings.rejected]: (state, action) => {
      state.status = API_STATUS.REJECTED;
      state.error = action.payload || API_STATUS.NETWORK_ERROR;
    },
  }
});


export const generalSettingsSelector = (state) => state.generalSetting;
export default generalSettingsSlice.reducer;
