import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {loginUser} from "../../services/api";
import { API_STATUS } from "../../utils/constants";
const namespace = "login";

const initialState = {
    loading: "initial",
    forgotloading: "initial",
    resetloading: "initial",
    errorMessage: null,
    loginData: null,
    username: localStorage.getItem('username') || null,
};

export const doLogin = createAsyncThunk(
    `${namespace}/doLogin`,
    async ({ email, password }, { rejectWithValue }) => {
        try {
            console.log(email,password);
            //let payload = EncryptDecrypt.encryptdata(postData, secretKey)
            const data = await loginUser(email, password );
            
            console.log("getScanCount--> ", data);
            return data;
        } catch (error) {
            console.log("getScanCount error--->", error);
            return rejectWithValue(error.response);
        }
    }
);

const loginSlice = createSlice({
    name: namespace,
    initialState,
    reducers: {
        clearData: () => {
            return initialState;
        },
        logOut: () => {
            localStorage.clear();
            window.location.reload(true);
        },
    },
    extraReducers: {
        [doLogin.pending](state) {
            state.loading = API_STATUS.PENDING;
        },
        [doLogin.fulfilled](state, { payload }) {
            state.loading = API_STATUS.FULFILLED;
            console.log({ payload });
            console.log(payload?.data?.username)
            state.loginData = payload?.data;
            
            localStorage.setItem('isAuthenticated', true)
            localStorage.setItem('username', payload?.data?.username)
        },
        [doLogin.rejected](state, action) {
            state.loading = API_STATUS.REJECTED;
            state.errorMessage = action?.payload?.data;
        },
      
    },
});

export const { clearData, logOut } = loginSlice.actions;

export const loginSelector = (state) => state.login;

export default loginSlice.reducer;