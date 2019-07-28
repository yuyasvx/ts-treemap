const numberComparator = (a: number, b: number): number => a - b
const bigIntComparator = (a: bigint, b: bigint): number => Number(a - b)
const stringComparator = (a: string, b: string): number => a.localeCompare(b)
const dateComparator = (a: Date, b: Date): number => a.getTime() - b.getTime()

const comparators = {
  number: numberComparator,
  string: stringComparator,
  Date: dateComparator,
  bigInt: bigIntComparator,
  none: () => 0
}

export default comparators
