const numberComparator = (a: number, b: number): number => a - b
const bigIntComparator = (a: bigint, b: bigint): number => Number(a - b)
const stringComparator = (a: string, b: string): number => a.localeCompare(b)
const dateComparator = (a: Date, b: Date): number => a.getTime() - b.getTime()

export const comparators = {
  number: numberComparator,
  string: stringComparator,
  Date: dateComparator,
  bigInt: bigIntComparator,
  none: () => 0
}

export const decideCompareFn = (value: unknown): ((a: any, b: any) => number) => {
  if (typeof value === 'number') {
    return comparators.number
  }
  if (typeof value === 'string') {
    return comparators.string
  }
  if (typeof value === 'bigint') {
    return comparators.bigInt
  }
  const toString = Object.prototype.toString
  if (toString.call(value).endsWith('Date]')) {
    return comparators.Date
  }
  throw new Error(
    'Cannot sort keys in this map. You have to specify compareFn if the type of key in this map is not number, string, or Date.'
  )
}
