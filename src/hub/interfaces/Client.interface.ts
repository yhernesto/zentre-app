export interface IClientSN {
  code: string
  icon: string
  url: string
  show: boolean
}

export interface IClientOpeningHour {
  weekDay: number
  fromHour: string
  toHour: string
}

export interface IClientApp {
  code: string
  name: string
  plan: number
  show: boolean
  enable: boolean
}

export interface IClientPhone {
  phone: number
  countryCode: number
  type: string
  isWspMain: boolean
}

export interface IClient {
  // tenancyId: number
  tenancyName: string
  name: string
  description: string
  logo?: string
  cover?: string
  favicon?: string
  // address?: string
  currencyName?: string
  currencySymbol?: string
  businessType: string
  brightness?: string
  primary?: string
  onPrimary?: string
  secondary?: string
  onSecondary?: string
  error?: string
  onError?: string
  background?: string
  onBackground?: string
  surface?: string
  onSurface?: string
  // phones?: IClientPhone[]
  // openingHours?: IClientOpeningHour[]
  apps?: IClientApp[]
  sns?: IClientSN[]
}

