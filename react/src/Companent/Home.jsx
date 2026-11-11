import { useAtom, useSetAtom } from 'jotai'
import {
  dataAtom,
  addDataAtom,
  editDataAtom,
  deleteDataAtom
} from '../store/counter'

const Home = () => {
  const [data] = useAtom(dataAtom)

  const addData = useSetAtom(addDataAtom)
  const editData = useSetAtom(editDataAtom)
  const deleteData = useSetAtom(deleteDataAtom)

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">Users</h1>

      <button
        onClick={() => addData({
          name: 'New User',
          age: 20,
          job: 'Student'
        })}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Add User
      </button>

      <div className="grid grid-cols-3 gap-4 mt-5">
        {data.map(e => (
          <div key={e.id} className="border p-4 rounded shadow">
            <h2 className="font-bold">{e.name}</h2>
            <p>Age: {e.age}</p>
            <p>Job: {e.job}</p>

            <button
              onClick={() => editData({
                ...e,
                name: 'Updated Name'
              })}
              className="bg-green-500 text-white p-2 rounded mt-3 mr-2"
            >
              Edit
            </button>

            <button
              onClick={() => deleteData(e.id)}
              className="bg-red-500 text-white p-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home