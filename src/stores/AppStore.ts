import { defineStore } from 'pinia'
import { IAppStore } from 'src/hub/interfaces/AppStore.interface'
import AppStoreService from 'src/services/AppStoreService'

export const useAppStoreStore = defineStore('appStore', {
  state: () => ({
    appStores: [] as IAppStore[],
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2,
  },
  actions: {
    fetchAppStores(storeId?: number): void {
      if (this.appStores.length == 0) {
        console.log('... Loading AppStore Data')
        AppStoreService.getAppStores(storeId)
          .then((data) => (this.appStores = data.data))
          .catch((error) => {
            console.log(error)
          })
      } else {
        console.log('AppStores data has already loaded')
      }
    },
  },
})
