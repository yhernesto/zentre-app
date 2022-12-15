import { ICategory } from './ICategory.interface'
import { IVariation, IProductOptions, IVariationsSummary, IAvailableVariation } from './IVariation.interface'

export interface IProduct {
  id: number
  status: string
  name: string
  short_description: string
  description: string
  price: number | null
  regular_price: number | null
  on_sale: boolean | null
  sale_price: number | null
  date_on_sale_to: Date | null
  stock_quantity: number | null
  stock_status: string | null
  weight: number | null
  length: number | null
  width: number | null
  height: number | null
  images: IImage[]
  categories: ICategory[]
  variations?: IVariation[]
  variation_options?: IProductOptions[]
  crossProducts?: IProduct[] | number[]
  availableVariationOptions?: IAvailableVariation[]
}

export interface ISimpleProduct {
  id: number
  status: string
  name: string
  short_description: string
  description: string
  price: number
  variation_min_price: number | null
  regular_price: number
  on_sale: boolean
  sale_price: number | null
  date_on_sale_to: Date | null
  stock_quantity: number
  stock_status: string
  image: IImage
  categories: ICategory[]
  variation_options?: IProductOptions[]
}

export interface IImage {
  id: number
  src: string
  name: string
  alt: string
}
