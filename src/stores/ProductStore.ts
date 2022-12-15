import { defineStore } from 'pinia';
import { ISimpleProduct } from 'src/products/interfaces/IProduct.interface'
import ProductService from 'src/services/ProductService'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [] as ISimpleProduct[]
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2,
  },
  actions: {
    fetchSimpleProducts(storeId: number): void {
      if(this.products.length == 0){
        console.log('... Loading Products List')
        ProductService.getSimpleProductsByStore(storeId)
        .then(data => this.products = data.data)
        .catch(error => {console.log(error)})
      }else{
        console.log('Products list data has already loaded')
      }
    }
  }
});
