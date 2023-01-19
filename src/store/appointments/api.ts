import { AxiosInstance } from '../../shared'
import { TattooResponse, Appointment } from './types'

export interface GetTattoosProps {
  offset?: number
  limit?: number
  done?: boolean
  date?: Date
}

const tattooApi = {
  async getTattoos(getTattoosProps?: GetTattoosProps) {
    try {
      const res = await AxiosInstance.get<Appointment[]>('/tattoo', { params: getTattoosProps })
      return res.data
    } catch (error) {
      throw error
    }
  },

  async getTattoosByDate(getTattoosProps: GetTattoosProps) {
    try {
      const res = await AxiosInstance.get<Appointment[]>('/tattoo', { params: getTattoosProps })
      return res.data
    } catch (error) {
      throw error
    }
  },

  async getTattooById(id: string) {
    try {
      const res = await AxiosInstance.get<Appointment>(`/tattos/${id}`)
      return res.data
    } catch (error) {
      throw error
    }
  },

  async postTattoo(appointment: Appointment){
    try {
      const res = await AxiosInstance.post<Appointment>('/tattos')
    } catch (error) {
      
    }
  }
}

export default tattooApi
