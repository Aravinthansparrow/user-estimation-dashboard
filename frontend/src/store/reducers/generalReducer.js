import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_STATUS } from '../../utils/constants';
import { getGeneralSettingsAPI, updateGeneralSettingsAPI } from '../../services/api';

const namespace = 'generalSetting';
const initialState = {
  data: {},
  status: API_STATUS.PENDING,
  error: null
};

export const fetchGeneralSettings = createAsyncThunk(`${namespace}/fetchGeneralSettings`, async () => {
  try {
    const response = await getGeneralSettingsAPI();
    return response.data;
  } catch (error) {
    throw new Error(error.message || API_STATUS.NETWORK_ERROR);
  }
});

export const updateGeneralSettings = createAsyncThunk(`${namespace}/updateGeneralSettings`, async (updatedValues, { rejectWithValue }) => {
  try {
    const response = await updateGeneralSettingsAPI(updatedValues);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});


const generalSettingsSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {},
  extraReducers: {
    [fetchGeneralSettings.pending](state) {
      state.status = API_STATUS.PENDING;
      state.error = null;
    },
    [fetchGeneralSettings.fulfilled](state, action) {
      state.status = API_STATUS.FULFILLED;
      state.error = null;
      state.data = action.payload; 
    },
    [fetchGeneralSettings.rejected](state, action) {
      state.status = API_STATUS.REJECTED;
      state.error = action.error.message || API_STATUS.NETWORK_ERROR;
    },
    [updateGeneralSettings.pending](state) {
      state.status = API_STATUS.PENDING;
      state.error = null;
    },
    [updateGeneralSettings.fulfilled](state, action) {
      state.status = API_STATUS.FULFILLED;
      state.error = null;
      state.data = action.payload; 
    },
    [updateGeneralSettings.rejected](state, action) {
      state.status = API_STATUS.REJECTED;
      state.error = action.payload || API_STATUS.NETWORK_ERROR;
    },
  }
});

export const generalSettingsSelector = (state) => state.generalSetting;
export default generalSettingsSlice.reducer;
