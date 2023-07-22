import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getEstimateList, submitClientDetails, updateStatus } from '../../services/api'; // Replace 'fetchData' with your actual API function
import { API_STATUS } from "../../utils/constants";
const namespace = "estimateList"
const initialState = {
  created: 0,
  approved: 0,
  rejected: 0,
  notapproved: 0,
  loading: 'initial',
  changestatus: 'initial',
  submitclients : 'initial',
  error: null,
  loadData: null,
  id: null
  
};

export const fetchEstimateList = createAsyncThunk(
  `${namespace}/fetchEstimateList`,
  async (payload, { rejectWithValue }) => {
    try {
      console.log('hi')
      const response = await getEstimateList(); 
      console.log("getScanCount--> ", response);// Replace 'fetchData' with your actual API function call
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const changeStatus = createAsyncThunk(
  `${namespace}/changeStatus`,
  async ({selectedClientId, confirmationAction}, { rejectWithValue }) => {
    try {
      console.log(selectedClientId);
      console.log(confirmationAction);
      const response = await updateStatus(selectedClientId, confirmationAction); 
      console.log("getScanCount--> ", response);// Replace 'fetchData' with your actual API function call
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const clientDetails = createAsyncThunk(
  `${namespace}/clientDetails`,
  async ({formData}, { rejectWithValue}) => {
    try {
      console.log(formData);
      const response = await submitClientDetails(formData);
      console.log("getScanCount--> ", response);
      return response.data
    }catch (error){
      return rejectWithValue(error.response.data)
    }
  }
)

const mySlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    //Your synchronous action creators here (if needed)
    setCreated(state, action) {
      state.created = action.payload;
      console.log(action.payload)
    },
    setApproved(state, action) {
      state.approved = action.payload;
      console.log(action.payload)
    },
    setRejected(state, action) {
      state.rejected = action.payload;
    },
    setUnApproved(state, action) {
      state.notapproved = action.payload;
    },
  },
  extraReducers: {
    [fetchEstimateList.pending](state) {
        state.loading = API_STATUS.PENDING;
        state.error = null;
    },
    [fetchEstimateList.fulfilled](state, action) {
        state.loading = API_STATUS.FULFILLED;
        state.error = null;
        state.loadData = action.payload
        
    },
    [fetchEstimateList.rejected](state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    [changeStatus.pending](state){
      state.changestatus = API_STATUS.PENDING
    },
    [changeStatus.fulfilled](state, {payload}){
      state.changestatus = API_STATUS.FULFILLED;
      console.log({payload})
    },
    [changeStatus.rejected](state){
      state.changestatus = API_STATUS.REJECTED
    }, 
    [clientDetails.pending](state){
      state.submitclients = API_STATUS.PENDING;
    },
    [clientDetails.fulfilled](state, action){
      state.submitclients = API_STATUS.FULFILLED;
      
      state.id = action.payload.id
      console.log(state.id)
    },
    [clientDetails.rejected](state){
      state.submitclients = API_STATUS.REJECTED;
    }

  
},
});
export const estimateListSelector = (state) => state.estimateList;

// Export the individual action creators
export const { setCreated, setApproved, setRejected, setUnApproved } = mySlice.actions;

// Export the reducer
export default mySlice.reducer;