import {create} from "zustand"

export const useTodo = create((set)=>({
    data:[{id:1,name:"Habiba",job:"Student"},{id:2,name:"Zebo",job:"Student"}],
    deleteUser:(id)=>set((state)=>({data:state.data.filter((e)=>e.id!=id)})),
    addUser: (user) =>set((state) => ({data: [...state.data, { id: Date.now(), ...user }]})),
    editUser: (user) =>set((state) => ({data: state.data.map((e) =>e.id === user.id ? { ...e, ...user } : e)}))
}))