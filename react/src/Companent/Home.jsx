
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getData,addData,editData,deleteData} from '../store/counter'

const Home = () => {
  const { data, isLoading } = useSelector((store) => store.counter)
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [avatar, setAvatar] = useState(null)
  const [editId, setEditId] = useState(null)

  useEffect(() => {
    dispatch(getData())
  }, [dispatch])

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setAvatar(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    const user = {
      name,
      age,
      avatar
    }

    if (editId) {
      const result = await dispatch(editData({
        id: editId,
        ...user
      }))

      if (editData.fulfilled.match(result)) {
        clearForm()
      }
    } else {
      const result = await dispatch(addData(user))

      if (addData.fulfilled.match(result)) {
        clearForm()
      }
    }
  }

  const handleEdit = (e) => {
    setEditId(e.id)
    setName(e.name)
    setAge(e.age)
    setAvatar(e.avatar)
  }

  const handleDelete = (id) => {
    dispatch(deleteData(id))
  }

  const clearForm = () => {
    setName('')
    setAge('')
    setAvatar(null)
    setEditId(null)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-5">Users</h1>

      <form onSubmit={handleAdd}className="flex flex-col gap-3 max-w-sm mb-8">
        <input type="text"value={name}placeholder="Name"onChange={(e) => setName(e.target.value)}className="border p-2 rounded"/>
        <input type="number"value={age}placeholder="Age"onChange={(e) => setAge(e.target.value)}className="border p-2 rounded"/>
        <input type="file"accept="image/*"onChange={handleImage}className="border p-2 rounded"/>
        {avatar && (<img src={avatar}className="w-20 h-20 rounded-full object-cover"/>)}
        <button type="submit" className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700">{editId ? 'Update User' : 'Add User'}</button>
        {editId && (<button type="button" onClick={clearForm} className="bg-gray-500 text-white p-2 rounded">Cancel</button>)}
      </form>

      {isLoading && (<p className="text-purple-600 mb-3">Loading...</p>)}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-purple-600 text-white">
              <th className="border p-3">№</th>
              <th className="border p-3">Avatar</th>
              <th className="border p-3">Name</th>
              <th className="border p-3">Age</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((e, index) => (
              <tr key={e.id}className="text-center hover:bg-gray-100">
                <td className="border p-3">{index + 1}</td>
                <td className="border p-3"><img src={e.avatar}alt={e.name}className="w-12 h-12 rounded-full object-cover mx-auto"/></td>
                <td className="border p-3">{e.name}</td>
                <td className="border p-3">{e.age}</td>
                <td className="border p-3">
                  <div className="flex justify-center gap-2">
                    <button onClick={() => handleEdit(e)}className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">Edit</button>
                    <button onClick={() => handleDelete(e.id)}className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default Home