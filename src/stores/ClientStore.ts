import { defineStore } from 'pinia';
import { IClient } from 'src/hub/interfaces/Client.interface'
import ClientService from 'src/services/ClientService'

export const useClientStore = defineStore('client', {
  state: () => ({
    client: {
      tenancyName: '',
      name: '',
      description: '',
      logo: '',
      cover: '',
      favicon: '',
      address: '',
      currencyName: '',
      currencySymbol: '',
      businessType: '',
      brightness: '',
      primary: '',
      onPrimary: '',
      secondary: '',
      onSecondary: '',
      error: '',
      onError: '',
      background: '',
      onBackground: '',
      surface: '',
      onSurface: '',
      phones: [],
      openingHours: [],
      apps: [],
      sns: []
    } as IClient,
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2,
  },
  actions: {
    fetchClient(): void {
      if(!this.client.tenancyName){
        console.log('... Loading Client Data')
        ClientService.getClientInfo()
        .then(data => this.client = data.data)
        .catch(error => {console.log(error)})
      }else{
        console.log('Client data has already loaded')
      }
    },
  },
});
