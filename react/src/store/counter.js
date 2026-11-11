import { createSlice } from '@reduxjs/toolkit'

const initialState={
  data:[
    {
      id:1,
      name:'Habiba',
      age:19,
      job:'student'
    },
     {
      id:2,
      name:'Zebo',
      age:17,
      job:'student'
    },
     {
      id:3,
      name:'Fotima',
      age:18,
      job:'student'
    }
  ]
}

export const counterSlice=createSlice({
  name:'counter',
  initialState,
  reducers:{
    deleteUser:(state,{payload:id})=>{
      state.data=state.data.filter((e)=>e.id!=id)
    },
    addUser:(state,{payload:newUser})=>{
      state.data.push(newUser)
    },
    editUser:(state,{payload:newUser})=>{
      state.data=state.data.map((e)=>e.id==newUser.id?newUser:e)
    }
  }
})
export const{deleteUser,addUser,editUser}=counterSlice.actions
export default counterSlice.reducer