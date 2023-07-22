import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { workItemsSubmit } from "../../services/api";
import { API_STATUS } from "../../utils/constants";
const namespace = "workitem";

const initialState = {
    workitemloading: "initial",
    loadData: null,
    
};

export const submitWorkItem = createAsyncThunk(
    `${namespace}/submitWorkItem`,
    async ({ workItem }, { rejectWithValue }) => {
        try {
            
            const data = await workItemsSubmit(workItem);
            
            console.log("getScanCount--> ", data);
            return data;
        } catch (error) {
            console.log("getScanCount error--->", error);
            return rejectWithValue(error.response);
        }
    }
);



const workItemSlice = createSlice({
    name: namespace,
    initialState,
    reducers: {
       
    },
    extraReducers: {
        [submitWorkItem.pending](state) {
            state.workitemloading = API_STATUS.PENDING;
        },
        [submitWorkItem.fulfilled](state, action) {
            state.workitemloading = API_STATUS.FULFILLED;
            state.loadData = action.payload
        },
        [submitWorkItem.rejected](state, action) {
            state.workitemloading = API_STATUS.REJECTED;
            state.errorMessage = action?.payload?.data;
        },
      
    },
});



export const workItemSelector = (state) => state.workitem;

export default workItemSlice.reducer;
