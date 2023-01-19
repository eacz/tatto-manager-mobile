import { createAsyncThunk } from '@reduxjs/toolkit'
import tattooApi, { GetTattoosProps } from './api'
import { Appointment } from './types'

export const getTattoos = createAsyncThunk('get-tattoos', async (getTattosProps?: GetTattoosProps) => {
  try {
    const tattos = await tattooApi.getTattoos(getTattosProps)
    return tattos
  } catch (error) {
    console.log(error)
    throw error
  }
})

export const createTattoo = createAsyncThunk('create-tattoo', async (appointment: Appointment) => {
  try {
    const { client, day, price } = appointment

    if (!client || !day || !price) {
      throw new Error('Faltan propiedades obligatorias')
    }
    
    const tattoo = await tattooApi.postTattoo(appointment)
    return tattoo
  } catch (error) {
    throw error
  }
})

export const updateTattoo = createAsyncThunk('update-tattos', async (appointment: Appointment) => {
  try {
    const { client, day, price } = appointment

    if (!client || !day || !price) {
      throw new Error('Faltan propiedades obligatorias')
    }

    const tattoo = await tattooApi.patchTattoo(appointment)
    return tattoo
  } catch (error) {
    console.log(error)
    throw error
  }
})
