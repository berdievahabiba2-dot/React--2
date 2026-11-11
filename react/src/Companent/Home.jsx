
import { useUserStore } from '@/store/counter'
import React, { useState } from 'react'

const Home = () => {
  const { data, addUser, editUser, deleteUser } = useUserStore()

  const [elem, setElem] = useState({id: null,name: "",age: "",job: ""})

  const handleSubmit = (event) => {
    event.preventDefault()

    const newUser = {
      id: elem.id ? elem.id : Date.now(),
      name: event.target.name.value,
      age: event.target.age.value,
      job: event.target.job.value,
    }
    elem.id ? editUser(newUser) : addUser(newUser)
    event.target.reset()
    setElem({ id: null, name: "", age: "", job: "" })
  }

  const handleEdit = (e) => {
    setElem(e)
  }

  return (
    <div className="p-5">
      <form onSubmit={handleSubmit} className="flex gap-3 mb-5">
        <input name="name" placeholder="Name" value={elem.name}onChange={(e) => setElem({...elem, name: e.target.value})}className="border p-2 rounded"/>
        <input name="age" placeholder="Age"value={elem.age}onChange={(e) => setElem({...elem, age: e.target.value})}className="border p-2 rounded"/>
        <input name="job" placeholder="Job" value={elem.job}onChange={(e) => setElem({...elem, job: e.target.value})}className="border p-2 rounded"/>
        <button className="bg-green-600 text-white px-4 rounded">{elem.id ? "Edit" : "Add"}</button>
      </form>
      <div className="flex flex-wrap gap-4">
        {data.map((e) => (
          <div key={e.id} className="border p-4 rounded-lg w-52">
            <h2>{e.name}</h2>
            <p>{e.age}</p>
            <p>{e.job}</p>
            <button onClick={() => handleEdit(e)}className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Edit</button>
            <button onClick={() => deleteUser(e.id)}className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Home