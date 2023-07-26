import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { workItemsGet, workItemsSubmit } from "../../services/api";
import { API_STATUS } from "../../utils/constants";
const namespace = "workitem";

const initialState = {
    workitemloading: "initial",
    getworkitemloading: "initial",
    loadData: null,
    workitemloadData: null,
    errorMessage: null,
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

export const getWorkItem = createAsyncThunk(
    `${namespace}/getWorkItem`,
    async (clientId, { rejectWithValue }) => {
        try {
            
            const data = await workItemsGet(clientId);
            
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
        [getWorkItem.pending](state) {
            state.getworkitemloading = API_STATUS.PENDING;
        },
        [getWorkItem.fulfilled](state, action) {
            state.getworkitemloading = API_STATUS.FULFILLED;
            state.workitemloadData = action.payload
        },
        [getWorkItem.rejected](state, action) {
            state.getworkitemloading = API_STATUS.REJECTED;
            state.errorMessage = action?.payload?.data;
        },
      
    },
});



export const workItemSelector = (state) => state.workitem;

export default workItemSlice.reducer;
