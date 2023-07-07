import axios from 'axios'
import Config from 'react-native-config'

const Service = axios.create({
  baseURL: Config.BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default Service
