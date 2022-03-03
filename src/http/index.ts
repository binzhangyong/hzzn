import axios from 'axios'
import { requestThen, requestCatch, responseThen, responseCatch } from '@http/interceptors'

axios.interceptors.request.use(requestThen, requestCatch)
axios.interceptors.response.use(responseThen, responseCatch)

export default axios
