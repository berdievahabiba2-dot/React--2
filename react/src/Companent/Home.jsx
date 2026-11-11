
import React, { useEffect } from 'react'
import { useAtom, useSetAtom } from 'jotai'

import {
  dataAtom,
  getDataAtom,
  addDataAtom,
  editDataAtom,
  deleteDataAtom
} from '../store/counter'

const Home = () => {

  const [data] = useAtom(dataAtom)

  const getData = useSetAtom(getDataAtom)
  const addData = useSetAtom(addDataAtom)
  const editData = useSetAtom(editDataAtom)
  const deleteData = useSetAtom(deleteDataAtom)

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="max-w-5xl mx-auto p-5">

      <h1 className="text-3xl font-bold text-center mb-6">
        Users
      </h1>

      <button
        onClick={() => addData({
          name: 'Habiba',
          age: 19,
          job: 'Student'
        })}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg mb-6"
      >
        Add User
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

        {data.map((e) => (
          <div key={e.id} className="bg-white p-5 rounded-xl shadow-md border">

            <h2 className="text-xl font-bold mb-3">{e.name}</h2>

            <p>Age: {e.age}</p>
            <p>Job: {e.job}</p>

            <div className="flex gap-3 mt-4">

              <button
                onClick={() => editData({
                  ...e,
                  name: 'New Name'
                })}
                className="bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Edit
              </button>

              <button
                onClick={() => deleteData(e.id)}
                className="bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>

            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default Home
