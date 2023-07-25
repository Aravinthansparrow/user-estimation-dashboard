import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { API_STATUS } from "../../utils/constants";
import { getComponents, addingComponent, deletingComponent, updateComponentName } from "../../services/api";
const namespace = "component";


const initialState = {
    componentloading: "initial",
    addcomponentloading: 'initial',
    deletecomponentloading: 'initial',
    updatecomponentnameloading: 'initial',
    deletedComponentIndex: null,
    loadData: null,
    addcomponentloadData: null,
    updatecomponentnameloadData:null,
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

  export const addComponents = createAsyncThunk(
    `${namespace}/addComponents`,
    async ({name, isDefault}, { rejectWithValue }) => {
      try {
        
        const response = await addingComponent(name, isDefault); 
        console.log("getScanCount--> ", response);// Replace 'fetchData' with your actual API function call
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const updatingComponentName = createAsyncThunk(
    `${namespace}/updatingComponentName`,
    async({id, name, isDefault}, {rejectWithValue}) => {
      try{
        const response = await updateComponentName(id, name, isDefault);
        console.log("getScanCount--> ", response);
        return response.data;

      } catch(error){
        return rejectWithValue(error.response.data);

      }
    }
  )

  export const deleteComponents = createAsyncThunk(
    `${namespace}/deleteComponent`,
    async (id, { rejectWithValue }) => {
      try {
        console.log(id)
        
        const response = await deletingComponent(id); 
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
      setDeletedComponentIndex: (state, action) => {
        state.deletedComponentIndex = action.payload;
      },
      
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
      [addComponents.pending](state) {
        state.addcomponentloading = API_STATUS.PENDING;
        state.error = null;
    },
    [addComponents.fulfilled](state, action) {
        state.addcomponentloading = API_STATUS.FULFILLED;
        state.error = null;
        state.addcomponentloadData = action.payload
        
    },
    [addComponents.rejected](state, action) {
      state.addcomponentloading = false;
      state.error = action.payload;
    },
    [deleteComponents.pending](state) {
      state.deletecomponentloading = API_STATUS.PENDING;
      state.error = null;
  },
  [deleteComponents.fulfilled](state, action) {
      state.deletecomponentloading = API_STATUS.FULFILLED;
      state.error = null;
      state.addcomponentloadData = action.payload
      
  },
  [deleteComponents.rejected](state, action) {
    state.deletecomponentloading = false;
    state.error = action.payload;
  },
  [updatingComponentName.pending](state) {
    state.updatecomponentnameloading = API_STATUS.PENDING;
    state.error = null;
},
[updatingComponentName.fulfilled](state, action) {
    state.updatecomponentnameloading= API_STATUS.FULFILLED;
    state.error = null;
    state.updatecomponentnameloadData = action.payload
    
},
[updatingComponentName.rejected](state, action) {
  state.updatecomponentnameloading = false;
  state.error = action.payload;
},
      
  
    
  },
  });
   export const componentSelector = (state) => state.component;
   export const { setDeletedComponentIndex } = componentSlice.actions;
  // Export the individual action creators
//   export const { setCreated, setApproved, setRejected, setUnApproved } = complexitySlice.actions;
  
  // Export the reducer
  export default componentSlice.reducer;