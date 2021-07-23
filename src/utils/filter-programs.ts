import { inPlaceSort } from 'fast-sort'

const validatePositiveInt = (value: any, fallbackValue: number) => {
  const int = parseInt(value, 10)
  if (!int) return fallbackValue
  const isPositive = int >= 1
  if (!isPositive) return fallbackValue
  return int
}

const validateString = (value: any, allowedValues: string[], defaultValue: string) => {
  if (typeof value === 'string') {
    if (allowedValues.includes(value)) return value
    else return defaultValue
  } else return defaultValue
}

const validateArrayOfStrings = (value: any): string[] | undefined => {
  if (Array.isArray(value)) {
    if (!value.length) return undefined
    return value.every(item => typeof item === 'string') ? value : undefined
  } else return undefined
}

export default (allPrograms: any[], rawFilters: any) => {
  const filters = {
    page: validatePositiveInt(rawFilters.page, 1),
    sortBy: validateString(rawFilters.sortBy, ['dateAdded', 'commission', 'popularity'], 'popularity'),
    sortOrder: validateString(rawFilters.sortOrder, ['asc', 'desc'], 'desc'),
    categories: validateArrayOfStrings(rawFilters.categories),
    commissionTypes: validateArrayOfStrings(rawFilters.commissionTypes),
    payoutStructures: validateArrayOfStrings(rawFilters.payoutStructures)
  }

  const pageSize = 30
  const pageOffset = filters.page * pageSize - pageSize

  // prettier-ignore
  const programs = allPrograms.filter((program) => {
    return (
      filters.categories ? filters.categories.some(category => program.categories.includes(category)) : true &&
      filters.commissionTypes ? filters.commissionTypes.includes(program.commissionType) : true &&
      filters.payoutStructures ? filters.payoutStructures.includes(program.payoutStructure) : true
    )
  })

  // prettier-ignore
  const sortFunction = {
    popularity: [{ [filters.sortOrder]: (program: any) => program.company }],
    dateAdded: [{ [filters.sortOrder]: (program: any) => program.createdAt }],
    commission: [ { [filters.sortOrder]: (program: any) => program.commissionPercentUpper }, { [filters.sortOrder]: (program: any) => program.commissionFixedUpper } ]
  }[filters.sortBy]

  const total = programs.length
  inPlaceSort(programs).by(sortFunction as any)
  programs.splice(0, pageOffset)
  programs.splice(pageSize)

  return {
    programs,
    total
  }
}
