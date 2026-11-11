
import { atom } from 'jotai'
import axios from 'axios'

const api = 'https://6aaa8c17ff4dd5698b4eae0d.mockapi.io/data'

export const dataAtom = atom([])

export const getDataAtom = atom(null, async (get, set) => {
  try {
    const { data } = await axios.get(api)
    set(dataAtom, data)
  } catch (error) {
    console.log(error)
  }
})

export const addDataAtom = atom(null, async (get, set, newUser) => {
  try {
    const { data } = await axios.post(api, newUser)
    set(dataAtom, [...get(dataAtom), data])
  } catch (error) {
    console.log(error)
  }
})

export const editDataAtom = atom(null, async (get, set, newUser) => {
  try {
    const { data } = await axios.put(api + '/' + newUser.id, newUser)
    set(dataAtom, get(dataAtom).map((e) =>
      e.id === data.id ? data : e
    ))
  } catch (error) {
    console.log(error)
  }
})

export const deleteDataAtom = atom(null, async (get, set, id) => {
  try {
    await axios.delete(api + '/' + id)
    set(dataAtom, get(dataAtom).filter((e) => e.id !== id))
  } catch (error) {
    console.log(error)
  }
})
