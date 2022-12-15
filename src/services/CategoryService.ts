import axios from 'axios'

const apiCategory = axios.create({
  baseURL: 'http://localhost:3000/category',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'tenancy': 'dev'
  }
})

export default {
  getCategories() {
    return apiCategory.get('app')
  }
}
