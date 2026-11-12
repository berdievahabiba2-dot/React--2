import { atom } from "jotai";

export const jobsAtom=atom([])

export const addJobAtom=atom(null,(get,set,user)=>{
    set(jobsAtom,[...get(jobsAtom),user])
})

export const editJobAtom=atom(null,(get,set,user)=>{
    set(jobsAtom,get(jobsAtom).map((e)=>e.id==user.id?user:e))
})

export const deleteJobAtom=atom(null,(get,set,id)=>{
    set(jobsAtom,get(jobsAtom).filter((e)=>e.id!=id))
})