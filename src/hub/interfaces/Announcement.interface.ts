export interface IAnnouncement {
  id: number
  screenCode: string
  title?: string
  description?: string
  url?: string
  image?: string
  initAt: Date
  finishAt?: Date
  isActive: boolean
}
