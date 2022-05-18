import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import customFetch from '../../utils/axios'
import {
  addUserToLocalStorage,
  removeUserFromLocalStorage,
  getUserFromLocalStorage,
} from '../../utils/localStorage'

const initialState = {
  isLoading: true,
  isSideBarOpen: false,
  user: getUserFromLocalStorage(),
}

// Register User place holder

export const getRegisterUser = createAsyncThunk(
  'user/getRegisterUser',
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post('/auth/register', user)
      return resp.data
    } catch (error) {
      toast.error(error.response.data.msg)
      return thunkAPI.fulfillWithValue(error.response.data.msg)
    }
  }
)

// Login User place holder

export const getLoginUser = createAsyncThunk(
  'user/getLoginUser',
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post('/auth/login', user)
      return resp.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSideBarOpen = !state.isSideBarOpen
    },
    logoutUser: (state) => {
      state.user = null
      removeUserFromLocalStorage()
    },
  },
  extraReducers: {
    [getRegisterUser.pending]: (state) => {
      state.isLoading = true
    },
    [getRegisterUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      const { user } = payload
      state.user = { user }
      toast.success(`Hello there, ${user.name}`)
      addUserToLocalStorage(user)
    },
    [getRegisterUser.rejected]: (state, { payload }) => {
      state.isLoading = false
    },
  },
  extraReducers: {
    [getLoginUser.pending]: (state) => {
      state.isLoading = true
    },
    [getLoginUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      const { user } = payload
      state.user = user
      toast.success(`Welcome back ${user.name}`)
      addUserToLocalStorage(user)
    },
    [getLoginUser.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
  },
})

export const { toggleSidebar, logoutUser } = userSlice.actions

export default userSlice.reducer
