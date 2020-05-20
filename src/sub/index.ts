import subDays from '../subDays/index.js'
import subMonths from '../subMonths/index.js'
import toDate from '../toDate/index.js'
import Duration from 'src/_types/Duration/index.js'

/**
 * @name sub
 * @category Common Helpers
 * @summary Subtract the specified years, months, weeks, days, hours, minutes and seconds from the given date.
 *
 * @description
 * Subtract the specified years, months, weeks, days, hours, minutes and seconds from the given date.
 *
 * @param date - The date to be changed
 * @param duration - The object with years, months, weeks, days, hours, minutes and seconds to be subtracted
 *
 * | Key     | Description                        |
 * |---------|------------------------------------|
 * | years   | Amount of years to be subtracted   |
 * | months  | Amount of months to be subtracted  |
 * | weeks   | Amount of weeks to be subtracted   |
 * | days    | Amount of days to be subtracted    |
 * | hours   | Amount of hours to be subtracted   |
 * | minutes | Amount of minutes to be subtracted |
 * | seconds | Amount of seconds to be subtracted |
 *
 * All values default to 0
 *
 * @returns The new date with the seconds subtracted
 *
 * @example
 * // Subtract the following duration from 15 June 2017 15:29:20
 * const result = sub(new Date(2017, 5, 15, 15, 29, 20), {
 *   years: 2,
 *   months: 9,
 *   weeks: 1,
 *   days: 7,
 *   hours: 5,
 *   minutes: 9,
 *   seconds: 30
 * })
 * //=> Mon Sep 1 2014 10:19:50
 */
export default function sub(dirtyDate: Date | number, duration: Duration) {
  const years = duration.years || 0
  const months = duration.months || 0
  const weeks = duration.weeks || 0
  const days = duration.days || 0
  const hours = duration.hours || 0
  const minutes = duration.minutes || 0
  const seconds = duration.seconds || 0

  // Subtract years and months
  const dateWithoutMonths = subMonths(toDate(dirtyDate), months + years * 12)

  // Subtract weeks and days
  const dateWithoutDays = subDays(dateWithoutMonths, days + weeks * 7)

  // Subtract hours, minutes and seconds
  const minutestoSub = minutes + hours * 60
  const secondstoSub = seconds + minutestoSub * 60
  const mstoSub = secondstoSub * 1000
  const finalDate = new Date(dateWithoutDays.getTime() - mstoSub)

  return finalDate
}
