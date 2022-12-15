export function isCurrentTimeBetween(fromHourStr: string, toHourStr: string): boolean {
  const d = new Date()
  const currentTime = d.getTime()

  let time = fromHourStr.split(':')
  const fromHour = Number(time[0])
  const fromMinutes = Number(time[1])
  d.setHours(fromHour, fromMinutes)
  const fromTime = d.getTime()

  time = toHourStr.split(':')
  const toHour = Number(time[0])
  const toMinutes = Number(time[1])
  d.setHours(toHour, toMinutes)
  const toTime = d.getTime()

  return fromTime <= currentTime && currentTime <= toTime
}
