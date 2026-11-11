
import { create } from "zustand"

export const useUserStore = create((set) => ({
  data: [
    {
      id: 1,
      name: "Habiba",
      age: 19,
      job: "student"
    },
    {
      id: 2,
      name: "Fotima",
      age: 17,
      job: "student"
    },
    {
      id: 3,
      name: "Zebo",
      age: 16,
      job: "student"
    }
  ],

  // ADD
  addUser: (user) => set((state) => ({
    data: [...state.data, { id: Date.now(), ...user }]
  })),

  // EDIT
  editUser: (id, newUser) => set((state) => ({
    data: state.data.map((e) =>
      e.id === id ? { ...e, ...newUser } : e
    )
  })),

  // DELETE
  deleteUser: (id) => set((state) => ({
    data: state.data.filter((e) => e.id !== id)
  }))
}))
