import axios from 'axios'

const apiAnnouncement = axios.create({
  //baseURL: 'https://my-json-server.typicode.com/Code-Pop/Real-World_Vue-3',
  baseURL: 'http://localhost:3000/announcement',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'tenancy': 'dev'
  }
})

export default {
  getAnnouncements(screenCode: string) {
    return apiAnnouncement.get('app', {params: { screenCode }})
  }
}
