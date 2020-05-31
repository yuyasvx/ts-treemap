import TreeMap, { Comparable } from '../../src/TreeMap'

class ComparableTest implements Comparable<ComparableTest> {
  value: number

  constructor(val: number) {
    this.value = val
  }

  compare(object: ComparableTest): number {
    return this.value - object.value
  }
}

const getTreeMap = (): TreeMap<number, string> => {
  const treeMap = new TreeMap<number, string>()
  treeMap.set(0, 'a')
  treeMap.set(20, 'e')
  treeMap.set(15, 'd')
  treeMap.set(5, 'b')
  treeMap.set(10, 'c')

  return treeMap
}

interface TestInterface {
  id: number
  content: string
}

describe('TreeMap test', () => {
  it('construct TreeMap', () => {
    // create custom comparator
    const compareFn = (a: number, b: number): number => b - a

    const map1 = new TreeMap<number, number>(compareFn)
    const map2 = new TreeMap<number, number>()
    expect(map1.comparator(10, 9)).toBe(-1)
    expect(map1.size).toBe(0)
    expect(map2.comparator(10, 9)).toBe(0)
    expect(map2.size).toBe(0)

    const iterableArray: [number, string][] = [[1, 'a'], [2, 'b']]
    const map3 = new TreeMap<number, string>(iterableArray, compareFn)
    const map4 = new TreeMap<number, string>(iterableArray)
    expect(map3.comparator(10, 9)).toBe(-1)
    expect(map3.size).toBe(2)
    expect(Array.from(map3.entries())).toStrictEqual([[2, 'b'], [1, 'a']])
    expect(map4.comparator(10, 9)).toBe(1)
    expect(map4.size).toBe(2)
    expect(Array.from(map4.entries())).toStrictEqual(iterableArray)

    const map5 = new TreeMap<number, string>(undefined, compareFn)
    const map6 = new TreeMap<number, string>(undefined, undefined)
    expect(map5.comparator(10, 9)).toBe(-1)
    expect(map5.size).toBe(0)
    expect(map6.comparator(10, 9)).toBe(0)
    expect(map6.size).toBe(0)

    const plainMap = new Map([[2, 'b'], [1, 'a']])
    const map7 = new TreeMap(plainMap.entries())
    expect(Array.from(map7.entries())).toStrictEqual([[1, 'a'], [2, 'b']])

    const comparableObjectMap: TreeMap<ComparableTest, string> = new TreeMap()
    comparableObjectMap.set(new ComparableTest(3), 'c')
    comparableObjectMap.set(new ComparableTest(1), 'a')
    comparableObjectMap.set(new ComparableTest(2), 'b')
    comparableObjectMap.set(new ComparableTest(1), 'd')
    expect(Array.from(comparableObjectMap.values())).toStrictEqual(['d', 'b', 'c'])

    const comparableObjectMap2: TreeMap<ComparableTest, string> = new TreeMap((a, b) => b.value - a.value)
    comparableObjectMap2.set(new ComparableTest(3), 'c')
    comparableObjectMap2.set(new ComparableTest(1), 'a')
    comparableObjectMap2.set(new ComparableTest(2), 'b')
    comparableObjectMap2.set(new ComparableTest(1), 'd')
    expect(Array.from(comparableObjectMap2.values())).toStrictEqual(['c', 'b', 'd'])
  })

  it('reverse', () => {
    const keys = getTreeMap().reverseKeys()

    expect(Array.from(keys)).toStrictEqual([20, 15, 10, 5, 0])
  })

  it('set', () => {
    const treeMap = getTreeMap()
    const keys = [20, 15, 10, 5, 0]
    const values = ['e', 'd', 'c', 'b', 'a']
    keys.forEach((k, i) => {
      expect(treeMap.get(k)).toBe(values[i])
    })
  })

  it('get', () => {
    const treeMap = getTreeMap()

    expect(treeMap.size).toBe(5)
    expect(Array.from(treeMap.keys())).toStrictEqual([0, 5, 10, 15, 20])
    expect(treeMap.get(999)).toBeUndefined()
  })

  it('overwrites value', () => {
    // primitive key
    const treeMap = getTreeMap()
    treeMap.set(0, '123')
    treeMap.set(0, '456')

    expect(treeMap.size).toBe(5)
    expect(Array.from(treeMap.keys())).toStrictEqual([0, 5, 10, 15, 20])
    expect(treeMap.get(0)).toBe('456')

    // object key
    const treeMap2 = new TreeMap<Date, string>()
    treeMap2.set(new Date('2020-01-01'), 'a')
    treeMap2.set(new Date('2020-01-01'), 'b')
    expect(treeMap2.size).toBe(1)
    expect(treeMap2.get(new Date('2020-01-01'))).toBe('b')
  })

  it('delete', () => {
    const treeMap = getTreeMap()

    expect(treeMap.delete(10)).toBe(true)
    expect(treeMap.size).toBe(4)
    expect(Array.from(treeMap.keys())).toStrictEqual([0, 5, 15, 20])
    expect(treeMap.delete(3)).toBe(false)
  })

  it('clear', () => {
    const treeMap = getTreeMap()
    treeMap.clear()

    expect(treeMap.size).toBe(0)
    expect(Array.from(treeMap.keys())).toStrictEqual([])
  })

  it('duplicate', () => {
    const treeMap = getTreeMap()

    expect(treeMap.duplicate()).toStrictEqual(treeMap)
  })

  it('keys / values / entries', () => {
    const treeMap = getTreeMap()

    expect(Array.from(treeMap.keys())).toStrictEqual([0, 5, 10, 15, 20])
    expect(Array.from(treeMap.values())).toStrictEqual(['a', 'b', 'c', 'd', 'e'])
    expect(Array.from(treeMap.entries())).toStrictEqual([[0, 'a'], [5, 'b'], [10, 'c'], [15, 'd'], [20, 'e']])
  })

  it('first / last', () => {
    const treeMap = getTreeMap()

    expect(treeMap.firstKey()).toBe(0)
    expect(treeMap.lastKey()).toBe(20)
    expect(treeMap.firstEntry()).toStrictEqual([0, 'a'])
    expect(treeMap.lastEntry()).toStrictEqual([20, 'e'])
  })

  it('ceiling', () => {
    const treeMap = getTreeMap()

    expect(treeMap.ceilingKey(-1)).toBe(0)
    expect(treeMap.ceilingKey(2)).toBe(5)
    expect(treeMap.ceilingKey(5)).toBe(5)
    expect(treeMap.ceilingKey(21)).toBeUndefined()
    expect(treeMap.ceilingEntry(-1)).toStrictEqual([0, 'a'])
    expect(treeMap.ceilingEntry(2)).toStrictEqual([5, 'b'])
    expect(treeMap.ceilingEntry(5)).toStrictEqual([5, 'b'])
    expect(treeMap.ceilingEntry(21)).toBeUndefined()
  })

  it('floor', () => {
    const treeMap = getTreeMap()

    expect(treeMap.floorKey(-1)).toBeUndefined()
    expect(treeMap.floorKey(2)).toBe(0)
    expect(treeMap.floorKey(5)).toBe(5)
    expect(treeMap.floorKey(21)).toBe(20)
    expect(treeMap.floorEntry(-1)).toBeUndefined()
    expect(treeMap.floorEntry(2)).toStrictEqual([0, 'a'])
    expect(treeMap.floorEntry(5)).toStrictEqual([5, 'b'])
    expect(treeMap.floorEntry(21)).toStrictEqual([20, 'e'])
  })

  it('first / last', () => {
    const treeMap = new TreeMap<number, string>((a, b) => a - b)

    expect(treeMap.firstKey()).toBeUndefined()
    expect(treeMap.lastKey()).toBeUndefined()
    expect(treeMap.firstEntry()).toBeUndefined()
    expect(treeMap.lastEntry()).toBeUndefined()
  })

  it('shift', () => {
    const treeMap = getTreeMap()

    expect(treeMap.shiftEntry()).toStrictEqual([0, 'a'])
    expect(treeMap.size).toBe(4)
    expect(Array.from(treeMap.keys())).toStrictEqual([5, 10, 15, 20])
    expect(new TreeMap<number, string>((a, b) => a - b).shiftEntry()).toBeUndefined()
  })

  it('pop', () => {
    const treeMap = getTreeMap()

    expect(treeMap.popEntry()).toStrictEqual([20, 'e'])
    expect(treeMap.size).toBe(4)
    expect(Array.from(treeMap.keys())).toStrictEqual([0, 5, 10, 15])
    expect(new TreeMap<number, string>((a, b) => a - b).popEntry()).toBeUndefined()
  })

  it('higher', () => {
    const treeMap = getTreeMap()

    expect(treeMap.higherKey(-1)).toBe(0)
    expect(treeMap.higherKey(2)).toBe(5)
    expect(treeMap.higherKey(5)).toBe(10)
    expect(treeMap.higherKey(21)).toBeUndefined()
    expect(treeMap.higherEntry(-1)).toStrictEqual([0, 'a'])
    expect(treeMap.higherEntry(2)).toStrictEqual([5, 'b'])
    expect(treeMap.higherEntry(5)).toStrictEqual([10, 'c'])
    expect(treeMap.higherEntry(21)).toBeUndefined()
  })

  it('lower', () => {
    const treeMap = getTreeMap()

    expect(treeMap.lowerKey(-1)).toBeUndefined()
    expect(treeMap.lowerKey(2)).toBe(0)
    expect(treeMap.lowerKey(5)).toBe(0)
    expect(treeMap.lowerKey(21)).toBe(20)
    expect(treeMap.lowerEntry(-1)).toBeUndefined()
    expect(treeMap.lowerEntry(2)).toStrictEqual([0, 'a'])
    expect(treeMap.lowerEntry(5)).toStrictEqual([0, 'a'])
    expect(treeMap.lowerEntry(21)).toStrictEqual([20, 'e'])
  })

  it('lower', () => {
    const treeMap = getTreeMap()

    expect(treeMap.lowerKey(-1)).toBeUndefined()
    expect(treeMap.lowerKey(2)).toBe(0)
    expect(treeMap.lowerKey(5)).toBe(0)
    expect(treeMap.lowerKey(21)).toBe(20)
    expect(treeMap.lowerEntry(-1)).toBeUndefined()
    expect(treeMap.lowerEntry(2)).toStrictEqual([0, 'a'])
    expect(treeMap.lowerEntry(5)).toStrictEqual([0, 'a'])
    expect(treeMap.lowerEntry(21)).toStrictEqual([20, 'e'])
  })

  it('compare string', () => {
    const treeMap = new TreeMap<string, string>()
    treeMap.set('a', 'test1')
    treeMap.set('c', 'test3')
    treeMap.set('b', 'test2')

    expect(Array.from(treeMap.keys())).toStrictEqual(['a', 'b', 'c'])
  })

  it('compare date', () => {
    const treeMap = new TreeMap<Date, string>()
    treeMap.set(new Date('2019-02-11'), 'holiday 2')
    treeMap.set(new Date('2019-01-01'), "new year's day")
    treeMap.set(new Date('2019-01-14'), 'holiday 1')

    expect(Array.from(treeMap.keys())).toStrictEqual([
      new Date('2019-01-01'),
      new Date('2019-01-14'),
      new Date('2019-02-11')
    ])
    expect(treeMap.higherKey(new Date('2019-01-31'))).toStrictEqual(new Date('2019-02-11'))
  })

  it('compare and throw error', () => {
    const treeMap = new TreeMap<TestInterface, string>()
    expect(() => {
      treeMap.set({ id: 1, content: 'a' }, 'a')
    }).toThrow()
  })

  it('split', () => {
    const lowerMap = getTreeMap().splitLower(10)
    expect(Array.from(lowerMap.keys())).toStrictEqual([0, 5, 10])

    const higherMap = getTreeMap().splitHigher(10)
    expect(Array.from(higherMap.keys())).toStrictEqual([10, 15, 20])
  })

  it('split include:false', () => {
    const lowerMap = getTreeMap().splitLower(10, false)
    expect(Array.from(lowerMap.keys())).toStrictEqual([0, 5])

    const higherMap = getTreeMap().splitHigher(10, false)
    expect(Array.from(higherMap.keys())).toStrictEqual([15, 20])
  })

  it('forEach', () => {
    const treeMap = getTreeMap()
    const entries: [number, string][] = []
    treeMap.forEach((value, key) => {
      entries.push([key, value])
    })
    expect(Array.from(entries.values())).toStrictEqual(Array.from(treeMap.entries()))
  })
})
