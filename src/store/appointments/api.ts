import { AxiosInstance } from '../../shared'
import { Appointment } from './types'

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
      const res = await AxiosInstance.get<Appointment>(`/tattoo/${id}`)
      return res.data
    } catch (error) {
      throw error
    }
  },

  async postTattoo(appointment: Appointment) {
    try {
      delete appointment._id;
      const res = await AxiosInstance.post<Appointment>('/tattoo', { ...appointment })
      return res.data
    } catch (error) {
      throw error
    }
  },

  async patchTattoo(appointment: Appointment) {
    try {
      const res = await AxiosInstance.patch<Appointment>('/tattoo', { ...appointment })
      return res.data
    } catch (error) {
      throw error
    }
  },
}

export default tattooApi
