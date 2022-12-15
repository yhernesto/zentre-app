import axios from 'axios'

const apiClient = axios.create({
  //baseURL: 'https://my-json-server.typicode.com/Code-Pop/Real-World_Vue-3',
  baseURL: 'http://localhost:3000/client',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'tenancy': 'dev'
  }
})

export default {
  getClientInfo() {
    return apiClient.get('app')
  },
}
