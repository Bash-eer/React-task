import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL, API } from '../constant';


export const initialState = {
  users: [],
  loading: false,
  error: false,
};


export const GetUsers = createAsyncThunk("user/getUser", async (thunkapi) => {
     try{
          const response= await axios.get(baseURL+API.USER.PATH);
          console.log(response,"response...")
          return response.data;
     }
     catch(err){
       return thunkapi.rejectWithValue("This is error")
     }
   
}
);
export const CreateUser = createAsyncThunk("post/createPost",async (user) => {
     await axios.post(`${baseURL+API.USER.PATH}`, user)
}
);
export const EditUser = createAsyncThunk(
"post/createPost",async (payload) =>{
     const {id, status} = payload;

     const path = `${baseURL+API.USER.PATH}/${id}`;
     const body = {
         ...status
     }
     try{
     //    const res = await  putApi(path,body)
     const res = await axios.put( path,body)
        console.log(res);
     }
     catch(err) {
       console.log("err",err)
      }
} 
);
export const DeleteUser = createAsyncThunk(
     console.log("hello"),
async (id) => await axios.delete(`${baseURL+API.USER.PATH}/${id}`)
);
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser: (state, action) => {
     console.log('action', action)
      state.users = action.payload;
      state.loading = true;
      state.error = false;
    },
    createUser: (state, action) => {
     console.log('action', action);
      state.users.unshift(action.payload);
      state.loading = false;
    },

    deleteUser: (state, action) => {
      state.users.filter((user) => user.id !== action.payload.id);
      state.loading = false;
    },
  },
  extraReducers:{
     [GetUsers.fulfilled]:(state,action) =>{
          console.log("payload..",action)
          state.users = action.payload
     }
  }
});

export const { createUser, deleteUser, getUser } = userSlice.actions;
export default userSlice;
