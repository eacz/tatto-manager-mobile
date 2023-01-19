import { createAsyncThunk } from '@reduxjs/toolkit'
import tattooApi, { GetTattoosProps } from './api'

export const getTattoos = createAsyncThunk('tattos', async (getTattosProps?: GetTattoosProps) => {
  try {
    const res = await tattooApi.getTattoos(getTattosProps)
    return res
  } catch (error) {
    console.log(error)
    throw error
  }
})
