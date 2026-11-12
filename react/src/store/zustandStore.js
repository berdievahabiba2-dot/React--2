import { create } from 'zustand';

export const useAgeStore=create((set)=>({
    ages:[],

    addAge:(user)=>set((state)=>({
        ages:[...state.ages,user]
    })),
    editAge:(user)=>set((state)=>({
        ages:state.ages.map((e)=>e.id==user.id?user:e)
    })),
    deleteAge:(id)=>set((state)=>({
        ages:state.ages.filter((e)=>e.id!=id)
    }))
}))