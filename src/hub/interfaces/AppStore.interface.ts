export interface IStoreOpeningHour {
  weekDay: number
  fromHour: string
  toHour: string
}

export interface IStorePhone {
  phone: number
  countryCode: number
  type: string
  isWspMain: boolean
}

export interface IStoreWorker {
  id?: number
  storeId?: number
  store?: any
  name: string
  email: string
  jobTitle?: string
  phone?: number
  countryCode?: number
  phoneType?: string
  isActive?: boolean
  createdAt?: number
}

export interface IAppStore {
  id: number
  name: string
  description?: string
  address: string
  logo: string
  cover: string
  isOpenAlways: boolean
  isMain: boolean
  latitude?: number
  longitude?: number
  cityId?: number
  phones?: IStorePhone[]
  workers?: IStoreWorker[]
  openingHours?: IStoreOpeningHour[]
  isActive?: boolean
}
