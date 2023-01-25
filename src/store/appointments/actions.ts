import { createAsyncThunk } from '@reduxjs/toolkit'
import { Asset } from 'react-native-image-picker'
import tattooApi, { GetTattoosProps } from './api'
import { Appointment } from './types'
import dayjs from 'dayjs'

export const getTattoos = createAsyncThunk('get-tattoos', async (getTattosProps?: GetTattoosProps) => {
  try {
    const tattos = await tattooApi.getTattoos(getTattosProps)
    return tattos
  } catch (error) {
    console.log(error)
    throw error
  }
})

export interface createTattooPayload {
  appointment: Appointment
  images?: Asset[]
}

export const createTattoo = createAsyncThunk(
  'create-tattoo',
  async ({ appointment, images }: createTattooPayload) => {
    try {
      const { client, day, price } = appointment

      if (!client || !day || !price) {
        throw new Error('Faltan propiedades obligatorias')
      }

      const data = new FormData()
      Object.keys(appointment).forEach((k) => {
        const key = k as keyof typeof appointment
        if (key === 'day') {
          data.append(key, dayjs(appointment[key]).toISOString())
        } else {
          if (appointment[key]) {
            data.append(key, appointment[key])
          }
        }
      })

      if (images && images.length > 0) {
        images.forEach((image) => {
          data.append('images', { uri: image.uri, type: image.type, name: image.fileName })
        })
      }

      const tattoo = await tattooApi.postTattoo(data)
      return tattoo
    } catch (error) {
      throw error
    }
  }
)

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
