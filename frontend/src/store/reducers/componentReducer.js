import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { API_STATUS } from "../../utils/constants";
import { getComponents } from "../../services/api";
const namespace = "component";


const initialState = {
    componentloading: "initial",
    loadData: null,
    error: null,
   
};

export const fetchComponents = createAsyncThunk(
    `${namespace}/fetchComponents`,
    async (payload, { rejectWithValue }) => {
      try {
        const response = await getComponents(); 
        console.log("getScanCount--> ", response);// Replace 'fetchData' with your actual API function call
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );


  const componentSlice = createSlice({
    name: namespace,
    initialState,
    reducers: {
      //Your synchronous action creators here (if needed)
      
    },
    extraReducers: {
      [fetchComponents.pending](state) {
          state.componentloading = API_STATUS.PENDING;
          state.error = null;
      },
      [fetchComponents.fulfilled](state, action) {
          state.componentloading = API_STATUS.FULFILLED;
          state.error = null;
          state.loadData = action.payload
          
      },
      [fetchComponents.rejected](state, action) {
        state.componentloading = false;
        state.error = action.payload;
      },
      
  
    
  },
  });
   export const componentSelector = (state) => state.component;
  
  // Export the individual action creators
//   export const { setCreated, setApproved, setRejected, setUnApproved } = complexitySlice.actions;
  
  // Export the reducer
  export default componentSlice.reducer;