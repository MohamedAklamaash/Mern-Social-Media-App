import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        profileUrl:[],
        userId:[],
        userData:[]
    },
    reducers:{
        setProfileUrl(state,action){
            state.profileUrl = state.profileUrl.length>1?state.profileUrl.pop():[];
            state.profileUrl.push(action.payload);
            console.log(state.profileUrl);
        },
        setUserId(state,action){
            state.userId.push(action.payload);
        },
        setUserData(state,action){
            state.userData.push(action.payload);
            console.log(state.userData);
        }
    }
})

export const {setProfileUrl,setUserData,setUserId} = userSlice.actions;

export default userSlice.reducer;