import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, editUser, deleteUser } from '../store/counter'
const Home = () => {
  const {data}=useSelector((store)=>store.counter)
  const dispatch = useDispatch()
  const [elem,setElem]=useState({id:null,name:"",age:null,job:""})

  const handleSubmit=(event)=>{
    event.preventDefault()
    const newUser={
      id:elem.id?elem.id:Date.now(),
      name:event.target.name.value,
      age:event.target.age.value,
      job:event.target.job.value
    }
    elem.id?dispatch(editUser(newUser)):dispatch(addUser(newUser))
    event.target.reset()
    setElem({id:null,name:"",age:null,job:""})
  }

  const handleEdit=(e)=>{
    setElem(e)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input defaultValue={elem.name} type="text" name='name' />
        <input defaultValue={elem.age} type="text" name='age'/>
        <input defaultValue={elem.job} type="text" name='job'/>
        <button type='submit'>{elem.id?"save":"submit"}</button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {
        data.map((e) => (
        <div key={e.id}className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">{e.name}</h2>
          <p className="text-gray-600 mb-2">Age: {e.age}</p>
          <p className="text-gray-600 mb-4">Job: {e.job}</p>
      <div className="flex justify-between mt-4">
        <button onClick={() => handleEdit(e)}className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Edit</button>
        <button onClick={() => dispatch(deleteUser(e.id))}className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
</div>
    </div>
  ))}
</div>
    </div>
  )
}
export default Home