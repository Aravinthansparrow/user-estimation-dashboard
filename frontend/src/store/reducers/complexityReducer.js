import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { API_STATUS } from "../../utils/constants";
import { getComplexity, complexitySubmit } from "../../services/api";
const namespace = "complexity";


const initialState = {
    complexityloading: "initial",
    loadData: null,
    error: null,
    submitcomplexityloading:'initial'
   
};

export const fetchComplexity = createAsyncThunk(
    `${namespace}/fetchComplexity`,
    async (payload, { rejectWithValue }) => {
      try {
        const response = await getComplexity(); 
        console.log("getScanCount--> ", response);// Replace 'fetchData' with your actual API function call
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const submitComplexity = createAsyncThunk(
    `${namespace}/submitComplexity`,
    async ({selectedDays, selectedValue}, { rejectWithValue }) => {
      try {
        const response = await complexitySubmit(selectedDays, selectedValue); 
        console.log("getScanCount--> ", response);// Replace 'fetchData' with your actual API function call
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );



  const complexitySlice = createSlice({
    name: namespace,
    initialState,
    reducers: {
      //Your synchronous action creators here (if needed)
      
    },
    extraReducers: {
      [fetchComplexity.pending](state) {
          state.complexityloading = API_STATUS.PENDING;
          state.error = null;
      },
      [fetchComplexity.fulfilled](state, action) {
          state.complexityloading = API_STATUS.FULFILLED;
          state.error = null;
          state.loadData = action.payload
          
      },
      [fetchComplexity.rejected](state, action) {
        state.complexityloading = API_STATUS.REJECTED;
        state.error = action.payload;
      },
      [submitComplexity.pending](state) {
        state.submitcomplexityloading = API_STATUS.PENDING;
        state.error = null;
    },
    [submitComplexity.fulfilled](state, action) {
        state.submitcomplexityloading = API_STATUS.FULFILLED;
        state.error = null;
        state.loadData = action.payload
        
    },
    [submitComplexity.rejected](state, action) {
      state.submitcomplexityloading = API_STATUS.REJECTED;
      state.error = action.payload;
    },
      
  
    
  },
  });
   export const complexitySelector = (state) => state.complexity;
  
  // Export the individual action creators
//   export const { setCreated, setApproved, setRejected, setUnApproved } = complexitySlice.actions;
  
  // Export the reducer
  export default complexitySlice.reducer;