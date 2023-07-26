import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_STATUS } from "../../utils/constants";
import { getActivities, addActivity, deleteActivity, updateActivity } from "../../services/api";

const namespace = "activities";

const initialState = {
  activitiesloading: "initial",
  addActivityloading: "initial",
  deleteActivityloading: "initial",
  updateActivityloading: "initial",
  deletedActivityId: null,
  loadData: null,
  addloadData: null,
  editloadData: null,
  error: null,
};

export const fetchActivities = createAsyncThunk(
  `${namespace}/fetchActivities`,
  async (payload, { rejectWithValue }) => {
    
    try {
      
      const response = await getActivities(); // Replace 'getActivities' with your actual API function call
      console.log("getActivities--> ", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addActivityAction = createAsyncThunk(
  `${namespace}/addActivity`,
  async ({ activity, percentagesplit }, { rejectWithValue }) => {
    try {
      const response = await addActivity(activity, percentagesplit); // Replace 'addActivity' with your actual API function call
      console.log("addActivity--> ", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateActivityAction = createAsyncThunk(
  `${namespace}/updateActivity`,
  async ({ id, name, percentagesplit }, { rejectWithValue }) => {
    try {
      const response = await updateActivity(id, name, percentagesplit); // Replace 'updateActivity' with your actual API function call
      console.log("updateActivity--> ", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteActivityAction = createAsyncThunk(
  `${namespace}/deleteActivity`,
  async (id, { rejectWithValue }) => {
    try {
      console.log(id);
      const response = await deleteActivity(id); // Replace 'deleteActivity' with your actual API function call
      console.log("deleteActivity--> ", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const activitiesSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    setDeletedActivityId: (state, action) => {
      state.deletedActivityId = action.payload;
    },
  },
  extraReducers: {

      [fetchActivities.pending](state) {
        state.activitiesloading = API_STATUS.PENDING;
        state.error = null;
      },
      [fetchActivities.fulfilled] (state, action) {
        state.activitiesloading = API_STATUS.FULFILLED;
        state.error = null;
        state.loadData = action.payload;
      },
      [fetchActivities.rejected] (state, action) {
        state.activitiesloading = API_STATUS.REJECTED;
        state.error = action.payload;
      },
      [addActivityAction.pending](state) {
        state.addActivityloading = API_STATUS.PENDING;
        state.error = null;
      },
      [addActivityAction.fulfilled] (state, action) {
        state.addActivityloading = API_STATUS.FULFILLED;
        state.error = null;
        state.addloadData = action.payload;
      },
      [addActivityAction.rejected] (state, action) {
        state.addActivityloading = API_STATUS.REJECTED;
        state.error = action.payload;
      },
      [updateActivityAction.pending] (state) {
        state.updateActivityloading = API_STATUS.PENDING;
        state.error = null;
      },
      [updateActivityAction.fulfilled] (state, action) {
        state.updateActivityloading = API_STATUS.FULFILLED;
        state.error = null;
        state.editloadData = action.payload;
      },
      [updateActivityAction.rejected] (state, action) {
        state.updateActivityloading = API_STATUS.REJECTED;
        state.error = action.payload;
      },
      [deleteActivityAction.pending] (state) {
        state.deleteActivityloading = API_STATUS.PENDING;
        state.error = null;
      },
      [deleteActivityAction.fulfilled] (state) {
        state.deleteActivityloading = API_STATUS.FULFILLED;
        state.error = null;
        

        
      },
      [deleteActivityAction.rejected] (state, action) {
        state.deleteActivityloading = API_STATUS.REJECTED;
        state.error = action.payload;
      }
  },
});

export const activitiesSelector = (state) => state.activities;
export const { setDeletedActivityId } = activitiesSlice.actions;
export default activitiesSlice.reducer;
