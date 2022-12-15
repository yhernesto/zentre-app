import { defineStore } from 'pinia';
import { ICategory } from 'src/products/interfaces/ICategory.interface'
import CategoryService from 'src/services/CategoryService'

export const useCategoryStore = defineStore('categories', {
  state: () => ({
    categories: [] as ICategory[],
  }),
  actions: {
    fetchCategories(): void {
      if(this.categories.length == 0){
        console.log('... Loading Categories Data')
        CategoryService.getCategories()
        .then(data => {
          const rawCategories: ICategory[] = data.data
          rawCategories.forEach(rawCategory => {
            const category: ICategory = {
              id: rawCategory.id,
              name: rawCategory.name,
              state: true
            }
            this.categories.push(category)
          })
        })
        .catch(error => {console.log(error)})
      }else{
        console.log('Categories data has already loaded')
      }
    },
  },
});
