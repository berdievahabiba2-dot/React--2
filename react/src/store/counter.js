import { atom } from 'jotai'

export const dataAtom = atom([
  { id: 1, name: 'Habiba', age: 19, job: 'Student' },
  { id: 2, name: 'Zebo', age: 17, job: 'Student' }
])

export const addDataAtom = atom(null, (get, set, user) => {
  set(dataAtom, [...get(dataAtom), {
    ...user,
    id: Date.now()
  }])
})

export const editDataAtom = atom(null, (get, set, user) => {
  set(dataAtom, get(dataAtom).map(e =>
    e.id === user.id ? user : e
  ))
})

export const deleteDataAtom = atom(null, (get, set, id) => {
  set(dataAtom, get(dataAtom).filter(e => e.id !== id))
})