export default function (slug) {
  const [year, month, day] = slug.split('-')
  return new Date(year, month - 1, day)
}
