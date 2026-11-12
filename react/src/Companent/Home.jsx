import { addJobAtom, deleteJobAtom, editJobAtom, jobsAtom } from '@/store/jotaiStore'
import { addName,deleteName, editName } from '@/store/reduxStore'
import { useAgeStore } from '@/store/zustandStore'
import { useAtomValue, useSetAtom } from 'jotai'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {

  const names=useSelector(state=>state.names.name)
  const dispatch=useDispatch()

  const ages=useAgeStore(state=>state.ages)
  const addAge=useAgeStore(state=>state.addAge)
  const editAge=useAgeStore(state=>state.editAge)
  const deleteAge=useAgeStore(state=>state.deleteAge)

  const jobs=useAtomValue(jobsAtom)
  const addJob=useSetAtom(addJobAtom)
  const editJob=useSetAtom(editJobAtom)
  const deleteJob=useSetAtom(deleteJobAtom)

  const [elem,setElem]=useState({
    name:'',
    age:'',
    job:''
  })
  const [editId,setEditId]=useState(null)

  const data=names.map((e)=>({
    id:e.id,
    name:e.name,
    age:ages.find(a=>a.id===e.id)?.age,
    job:jobs.find(j=>j.id===e.id)?.job
  }))

  const handleSubmit=(e)=>{
    e.preventDefault()

    const newUser={
      id:editId || Date.now(),
      name:e.target.name.value,
      age:e.target.age.value,
      job:e.target.job.value,
    }
    if (editId){
      dispatch(editName({id:newUser.id,name:newUser.name}))
      editAge({id:newUser.id,age:newUser.age})
      editJob({id:newUser.id,job:newUser.job})
    }else{
      dispatch(addName({id:newUser.id,name:newUser.name}))
      addAge({id:newUser.id,age:newUser.age})
      addJob({id:newUser.id,job:newUser.job})
    }

    setElem({
      id:null,
      name:'',
      age:'',
      job:''
    })
    setEditId(null)
  }

  const handleDelete=(id)=>{
    dispatch(deleteName(id))
    deleteAge(id)
    deleteJob(id)
  }

  const handleEdit=(user)=>{
    setElem({
      name:user.name,
      age:user.age,
      job:user.job
    })
    setEditId(user.id)
  }

  
  return (
    <div className='max-w-5xl mx-auto p-5'>
      <form action="" onSubmit={handleSubmit} className='bg-gray-100 p-5 rounded-xl mb-8 flex flex-col gap-3'>
        <input type="text" name='name' placeholder='name' value={elem.name} onChange={e=>setElem({...elem,name:e.target.value})} className='border p-3 rounded'/>
        <input type="text" name='age' placeholder='age' value={elem.age} onChange={e=>setElem({...elem,age:e.target.value})} className='border p-3 rounded'/>
        <input type="text" name='job' placeholder='job' value={elem.job} onChange={e=>setElem({...elem,job:e.target.value})} className='border p-3 rounded'/>
        <button type='submit' className='bg-blue-600 text-white p-3 rounded-lg'>{editId?"save":'submit'}</button>
      </form>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
        {
          data.map((e)=>(
            <div key={e.id} className='border rounded-xl p-5 shadow-md bg-white'>
              <h1 className='text-xl font-bold mb-3'>{e.name}</h1>
              <p>Age:{e.age}</p>
              <p>Job:{e.job}</p>

              <div className='flex gap-2 mt-4'>
                <button onClick={()=>handleEdit(e)} className='bg-green-600 text-white px-4 py-2 rounded'>edit</button>
                <button onClick={()=>handleDelete(e.id)} className='bg-red-600 text-white px-4 py-2 rounded'>delete</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Home