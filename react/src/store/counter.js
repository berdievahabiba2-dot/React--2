
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const api = 'https://6aaa8c17ff4dd5698b4eae0d.mockapi.io/data'

const initialState = {
  data: [],
  isLoading: false,
  error: null
}

export const getData = createAsyncThunk('todo/getData',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(api)
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const addData = createAsyncThunk('todo/addData',
  async (newUser, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(api, newUser)
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const editData = createAsyncThunk('todo/editData',
  async (newUser, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(api + '/' + newUser.id,newUser)
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const deleteData = createAsyncThunk('todo/deleteData',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(api + '/' + id)
      return id
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const counterSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(getData.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      .addCase(addData.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(addData.fulfilled, (state, action) => {
        state.isLoading = false
        state.data.push(action.payload)
      })
      .addCase(addData.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      .addCase(editData.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(editData.fulfilled, (state, action) => {
        state.isLoading = false

        state.data = state.data.map((e) =>
          e.id === action.payload.id ? action.payload : e
        )
      })
      .addCase(editData.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      .addCase(deleteData.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(deleteData.fulfilled, (state, action) => {
        state.isLoading = false

        state.data = state.data.filter(
          (e) => e.id !== action.payload
        )
      })
      .addCase(deleteData.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const {} = counterSlice.actions

export default counterSlice.reducer
