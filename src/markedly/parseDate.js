export default function parseDate (datetime) {
  let date

  if (datetime.indexOf('T') > -1) {
    date = datetime.split('T')[0]
  } else {
    date = datetime
  }

  const [year, month, day] = date.split('-')
  return new Date(year, month - 1, day)
}
