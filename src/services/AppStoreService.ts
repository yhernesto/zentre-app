import axios from 'axios'

const apiAppStore = axios.create({
  //baseURL: 'https://my-json-server.typicode.com/Code-Pop/Real-World_Vue-3',
  baseURL: 'http://localhost:3000/store',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'tenancy': 'dev'
  }
})

export default {
  getAppStores(storeId?: number) {
    if(storeId){
      return apiAppStore.get('app', {params: { storeId }})
    }else{
      return apiAppStore.get('app')
    }
  }
}
