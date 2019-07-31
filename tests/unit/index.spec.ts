import TreeMap from '../../src/TreeMap'

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
  it('add', () => {
    const treeMap = getTreeMap()

    expect(treeMap.size).toBe(5)
    expect(Array.from(treeMap.keys())).toStrictEqual([0, 5, 10, 15, 20])
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
    treeMap.set(new Date('2019-02-11'), '建国記念の日')
    treeMap.set(new Date('2019-01-01'), "new year's day")
    treeMap.set(new Date('2019-01-14'), '成人の日')

    expect(Array.from(treeMap.keys())).toStrictEqual([
      new Date('2019-01-01'),
      new Date('2019-01-14'),
      new Date('2019-02-11')
    ])
    expect(treeMap.higherKey(new Date('2019-01-31'))).toStrictEqual(new Date('2019-02-11'))
  })

  it('compare and throw error', () => {
    let expetedError: Error | undefined
    try {
      const treeMap = new TreeMap<TestInterface, string>()
      treeMap.set({ id: 1, content: 'a' }, 'a')
      treeMap.set({ id: 2, content: 'b' }, 'b')
      treeMap.set({ id: 3, content: 'c' }, 'c')
    } catch (e) {
      expetedError = e
    }

    expect(expetedError).toBeTruthy()
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
