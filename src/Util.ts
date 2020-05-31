import { Comparable } from './Types'

export const isIterable = <K, V>(value: unknown): value is Iterable<readonly [K, V]> => {
  if (value == null) {
    return false
  }
  const itr = value as Iterable<readonly [K, V]>
  if (itr[Symbol.iterator] == null) {
    return false
  }
  return true
}

export const isComparable = (object: unknown): object is Comparable<unknown> => {
  const toString = Object.prototype.toString
  const cast = object as Record<string, Function | undefined>
  return cast.compare != null && toString.call(cast.compare).endsWith('Function]')
}

export const isDate = (value: unknown): value is Date => {
  const toString = Object.prototype.toString
  return toString.call(value).endsWith('Date]')
}
