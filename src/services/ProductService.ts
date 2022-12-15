import axios from 'axios'

const apiProduct = axios.create({
  baseURL: 'http://localhost:3000/product/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    tenancy: 'dev',
  },
})

export default {
  getSimpleProductsByStore(storeId?: number) {
    if(storeId){
      return apiProduct.get('app', {params: { storeId }})
    }else{
      return apiProduct.get('app')
    }
  },

  getProductById(id: number) {
    return apiProduct.get(`app/${id}`)
  }
}
