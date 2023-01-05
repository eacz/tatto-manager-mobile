import axios from 'axios'

const AxiosInstance = axios.create({
  baseURL: process.env.BASE_URL_BACKEND,
})


export default AxiosInstance
