
import React, { useEffect } from 'react'
import { useUserStore } from '../store/counter'

const Home = () => {
  const {data,isLoading,error,getData,addData,editData,deleteData} = useUserStore()

  useEffect(() => {
    getData()
  }, [])

  if (isLoading) {
    return <h1 className="text-center text-2xl mt-10">Loading...</h1>
  }

  if (error) {
    return <h1 className="text-center text-red-500">{error}</h1>
  }

  return (
    <div className="max-w-5xl mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-6">Users</h1>
      <button
        onClick={() => addData({name: 'Habiba',age: 19,job: 'Student'})}className="bg-blue-600 text-white px-5 py-2 rounded-lg mb-6 hover:bg-blue-700">Add User</button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((e) => (
          <div key={e.id}className="bg-white p-5 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-3">{e.name}</h2>
            <p className="text-gray-600 mb-2">Age: {e.age}</p>
            <p className="text-gray-600 mb-4">Job: {e.job}</p>
            <div className="flex gap-3">
              <button onClick={() => editData({...e,name: 'New Name'})}className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">Edit</button>
              <button onClick={() => deleteData(e.id)}className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Home
