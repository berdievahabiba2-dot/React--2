
import { create } from "zustand"
import axios from "axios"

const api = "https://to-dos-api.softclub.tj/api/to-dos"

export const useTodo = create((set, get) => ({
  data: [],

  getData: async () => {
    try {
      const { data } = await axios.get(api)
      set({ data: data.data })
    } catch (error) {
      console.log(error)
    }
  },

  addData: async (user) => {
    try {
      const formData = new FormData()

      formData.append("Name", user.name)
      formData.append("Description", user.description)

      Array.from(user.images || []).forEach((file) => {
        formData.append("Images", file)
      })

      await axios.post(api, formData)
      await get().getData()
    } catch (error) {
      console.log(error)
    }
  },

  deleteData: async (id) => {
    try {
      await axios.delete(`${api}?id=${id}`)
      await get().getData()
    } catch (error) {
      console.log(error)
    }
  },

  editData: async (user) => {
    try {
      await axios.put(api, {
        id: user.id,
        name: user.name,
        description: user.description
      })

      await get().getData()
    } catch (error) {
      console.log(error)
    }
  },

  postImg: async (files, id) => {
    try {
      const formData = new FormData()

      Array.from(files).forEach((file) => {
        formData.append("Images", file)
      })

      await axios.post(`${api}/${id}/images`, formData)
      await get().getData()
    } catch (error) {
      console.log(error)
    }
  },

  deleteImage: async (imageId) => {
    try {
      await axios.delete(`${api}/images/${imageId}`)
      await get().getData()
    } catch (error) {
      console.log(error)
    }
  },

  handleCompleted: async (id) => {
    try {
      await axios.put(`https://to-dos-api.softclub.tj/completed?id=${id}`)
      await get().getData()
    } catch (error) {
      console.log(error)
    }
  }
}))
