import { AxiosInstance } from '../../shared'
import { TattoResponse, Appointment } from './types'

export interface GetTattosProps {
  offset?: number
  limit?: number
  done?: boolean
  date?: Date
}

const tattooApi = {
  async getTattos(getTattosProps?: GetTattosProps) {
    try {
      const res = await AxiosInstance.get<Appointment[]>('/tattoo', { params: getTattosProps })
      return res.data
    } catch (error) {
      throw error
    }
  },

  async getTattosByDate(getTattosProps: GetTattosProps) {
    try {
      const res = await AxiosInstance.get<Appointment[]>('/tattoo', { params: getTattosProps })
      return res.data
    } catch (error) {
      throw error
    }
  },

  async getTattoById(id: string) {
    try {
      const res = await AxiosInstance.get<Appointment>(`/tattos/${id}`)
      return res.data
    } catch (error) {
      throw error
    }
  },
}

export default tattooApi
