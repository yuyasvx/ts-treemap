[🇯🇵 日本語はここ](https://github.com/yuyasvx/ts-treemap/blob/master/README-ja.md)

# ts-treemap

a TypeScript implementation of TreeMap

[![CI](https://circleci.com/gh/yuyasvx/ts-treemap/tree/master.svg?style=shield&circle-token=f7dfd3305577f40429c6b2046bc658cbc3614997)](https://circleci.com/gh/yuyasvx/ts-treemap)
[![codecov](https://codecov.io/gh/yuyasvx/ts-treemap/branch/master/graph/badge.svg)](https://codecov.io/gh/yuyasvx/ts-treemap)

You can use some features of [TreeMap](https://docs.oracle.com/javase/8/docs/api/java/util/TreeMap.html) in Java with TypeScript.

# Installation

```
npm i ts-treemap --save
```

# Usage

## Create New TreeMap and Add Entries

```typescript
import TreeMap from 'ts-treemap'

const treeMap = new TreeMap<number, string>()

// add new entry
treeMap.set(10, 'abc')
treeMap.set(5, 'def')
treeMap.set(0, 'ghi')

// you can also create new TreeMap with iterable
const treeMap2 = new TreeMap<number, string>([[1, 'foo'], [2, 'bar']])
```

## Get Entry from TreeMap

```typescript
// get first entry
treeMap.firstEntry() // [0, 'ghi']

// get entry nearest to key '7'
treeMap.floorEntry(7) // [5, 'def']
treeMap.ceilingEntry(7) // [10, 'abc']

treeMap.higherEntry(5) // [10, 'abc']
treeMap.lowerEntry(5) // [0, 'ghi']
```

## Duplicate a Map

```typescript
// copy map
const treeMap = new TreeMap<number, string>()
const copiedMap = treeMap.duplicate()

// copy as Map object
const map: Map<number, string> = treeMap.toMap()

// create TreeMap from Map
const treeMap2 = TreeMap.from(map)
```

# Note

In order to sort keys, you need to define a comparison function, and TreeMap has an internal comparison function that automatically sorts keys each time you add them.

The ES2015 Map uses the "Same-value-zero" algorithm to determine if there are duplicate keys when an entry is added. The algorithm uses "===" to determine equivalence when comparing objects (but +0 and -0 are considered equal). This means that when you add multiple entries with the same key, the duplicate check will not work correctly if the type of key is object (such as `Date`).

To avoid this problem, TreeMap does not use that algorithm when adding keys, but uses a comparison function. If the return value of the comparison function is 0, the key is considered to be a duplicate.

This comparison function conforms to the [compare function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Description) used in `Array.prototype.sort()`.

You don’t have to define the compare function if the type of the key is `number`, `string` or `Date`.

If you want to use other types as keys, you can use one of the following methods to generate a TreeMap

- Passing a comparison function to the constructor
- Class which has the comparison function `compare()`.

**✅ Do:**

```typescript
import TreeMap from 'ts-treemap'
import Day from 'dayjs'

const numberMap = new TreeMap<number, string>()
numberMap.set(1, 'foo') // OK

const stringMap = new TreeMap<string, string>()
stringMap.set('1', 'foo') // OK

const dateMap = new TreeMap<Date, string>()
dateMap.set(new Date('2019-01-01'), 'foo') // OK

// compareFn is defined
const objectMap = new TreeMap<Day.Dayjs, string>((a, b) => a.unix() - b.unix())
objectMap.set(Day('2019-01-01'), 'foo') // OK

const objectMap2 = new TreeMap<Day.Dayjs, string>([[Day('2019-01-01'), 'foo']], (a, b) => a.unix() - b.unix())
```

**🛑 Don’t:**

```typescript
import TreeMap from 'ts-treemap'
import Day from 'dayjs'

// compareFn is not defined
const errMap = new TreeMap<Day.Dayjs, string>()
errMap.set(Day('2019-01-01'), 'foo') // throws error
```
