import {createSlice} from "@reduxjs/toolkit";

const nameSlice=createSlice({
    name:'names',
    initialState:{
        name:[]
    },
    reducers:{
        addName:(state,{payload:newUser})=>{
            state.name.push(newUser)
        },
        editName:(state,{payload:newUser})=>{
            state.name=state.name.map((e)=>e.id==newUser.id?newUser:e)
        },
        deleteName:(state,{payload:id})=>{
            state.name=state.name.filter((e)=>e.id!=id)
        }
    }
})

export const{addName,editName,deleteName}=nameSlice.actions
export default nameSlice.reducer