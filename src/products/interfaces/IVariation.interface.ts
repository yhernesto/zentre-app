import { IImage } from './IProduct.interface'

export interface IVariation {
  id: number
  productId: number
  variation_tuples: IVariationOption[]
  price: number
  regular_price: number
  description: string | null
  sale_price: number | null
  on_sale: boolean | null
  date_on_sale_to: Date | null
  stock_quantity: number | null
  stock_status: string | null
  weight: number | null
  length: number | null
  width: number | null
  height: number | null
  images?: IImage[]
}

export interface IVariationsSummary {
  min_price: number
  images?: IImage[]
}

export interface IProductOptions {
  icon: string
  variation: string
  options: string[]
}

export interface IVariationOption {
  variation: string
  option: string
}

export interface IAvailableVariation {
  variation: string,
  option: string,
  available: {
    variation: string,
    options: IRadioGroupOption[],
  }[]
}

export interface IRadioGroupOption {
  label: string,
  value: string,
  disable: boolean
}
