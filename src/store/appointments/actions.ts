import { createAsyncThunk } from '@reduxjs/toolkit'
import tattooApi, { GetTattosProps } from './api'

export const getTattos = createAsyncThunk('tattos', async (getTattosProps?: GetTattosProps) => {
  try {
    const res = await tattooApi.getTattos(getTattosProps)
    return res
  } catch (error) {
    console.log(error)
    throw error
  }
})
