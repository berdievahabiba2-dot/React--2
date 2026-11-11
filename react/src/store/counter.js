
import { create } from 'zustand'
import axios from 'axios'

const api = 'https://6aaa8c17ff4dd5698b4eae0d.mockapi.io/data'

export const useUserStore = create((set) => ({
  data: [],
  isLoading: false,
  error: null,

  getData: async () => {
    set({ isLoading: true, error: null })
    try {
      const { data } = await axios.get(api)
      set({
        data: data,
        isLoading: false
      })
    } catch (error) {
      console.log(error);
      
    }
  },

  addData: async (newUser) => {
    set({ isLoading: true, error: null })
    try {
      const { data } = await axios.post(api, newUser)
      set((state) => ({
        data: [...state.data, data],
        isLoading: false
      }))
    } catch (error) {
      console.log(error);
    }
  },

  editData: async (newUser) => {
    set({ isLoading: true, error: null })
    try {
      const { data } = await axios.put(api + '/' + newUser.id,newUser)
      set((state) => ({
        data: state.data.map((e) =>
          e.id === data.id ? data : e
        ),
        isLoading: false
      }))
    } catch (error) {
     console.log(error);
    }
  },

  deleteData: async (id) => {
    set({ isLoading: true, error: null })
    try {
      await axios.delete(api + '/' + id)
      set((state) => ({
        data: state.data.filter((e) => e.id !== id),
        isLoading: false
      }))
    } catch (error) {
     console.log(error);
    }
  }
}))
