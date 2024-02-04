import {
  setHours,
  setMinutes,
  format,
  addMinutes,
  getHours,
  getDate,
} from 'date-fns'

interface generateDayTimeListTypes {
  date: Date
}

export function generateDayTimeList({
  date,
}: generateDayTimeListTypes): string[] {
  const currentHour = getHours(new Date())
  const currentDay = getDate(new Date())
  const dateSelected = getDate(date)

  const startTime = setMinutes(
    setHours(
      date,
      dateSelected === currentDay && currentHour > 9 ? currentHour : 9,
    ),
    0,
  ) // Set start time to 09:00 or current hour

  const endTime = setMinutes(setHours(date, 22), 0) // Set end time to 21:00
  const interval = 60 // interval in minutes
  const timeList: string[] = []

  let currentTime = startTime

  while (currentTime <= endTime) {
    timeList.push(format(currentTime, `HH:mm`))
    currentTime = addMinutes(currentTime, interval)
  }

  return timeList
}
