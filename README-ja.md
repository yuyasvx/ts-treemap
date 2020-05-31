# ts-treemap

a TypeScript implementation of TreeMap

[![CI](https://circleci.com/gh/yuyasvx/ts-treemap/tree/master.svg?style=shield&circle-token=f7dfd3305577f40429c6b2046bc658cbc3614997)](https://circleci.com/gh/yuyasvx/ts-treemap)
[![codecov](https://codecov.io/gh/yuyasvx/ts-treemap/branch/master/graph/badge.svg)](https://codecov.io/gh/yuyasvx/ts-treemap)

ES2015 から追加された“Map”オブジェクトをベースに、Java でお馴染みの [TreeMap](https://docs.oracle.com/javase/jp/8/docs/api/java/util/TreeMap.html) の一部機能を TypeScript で使うことが出来ます。

# インストール

```
npm i ts-treemap --save
```

# 使う

ES2015 の Map と同じ要領で使うことが出来ます。

## Map の作成とエントリの追加

```typescript
import TreeMap from 'ts-treemap'

const treeMap = new TreeMap<number, string>()

// add new entry
treeMap.set(10, 'abc')
treeMap.set(5, 'def')
treeMap.set(0, 'ghi')

// これもOK
const treeMap2 = new TreeMap<number, string>([[1, 'foo'], [2, 'bar']])
```

## エントリの取得

```typescript
// get first entry
treeMap.firstEntry() // [0, 'ghi']

// get entry nearest to key '7'
treeMap.floorEntry(7) // [5, 'def']
treeMap.ceilingEntry(7) // [10, 'abc']

treeMap.higherEntry(5) // [10, 'abc']
treeMap.lowerEntry(5) // [0, 'ghi']
```

## Map のコピー

```typescript
// copy map
const treeMap = new TreeMap<number, string>()
const copiedMap = treeMap.duplicate()

// copy as Map object
const map: Map<number, string> = treeMap.toMap()

// create TreeMap from Map
const treeMap2 = TreeMap.from(map)
```

# 重要！

TreeMap にエントリを追加したり、キーをソートするためには、**比較を行うための関数**を定義する必要があります。TreeMap は内部で比較関数を持っており、キーを追加するたびに、比較関数によって自動でキーをソートします。

ES2015 の Map は、エントリの追加時、キーが重複しているかの判定は[“same-value-zero”アルゴリズム](https://developer.mozilla.org/ja/docs/Web/JavaScript/Equality_comparisons_and_sameness)を用いています。“same-value-zero”アルゴリズムは、オブジェクト同士を比較する際、“**===**” を用いて等価性を判断します（+0 と-0 は同じ）。これは、キーが同一のエントリを複数回追加する際、それらのキーの型が`Date`型のようなオブジェクト型である場合、正常に重複判定が行われないことを意味します。

この問題を避けるため、TreeMap ではキーの追加時に“same-value”アルゴリズムは使わず、**比較関数**を用いて、登録済みのキーと追加時のキーを比較し、比較関数の返却値が 0 かどうかでキーの重複を判断します。

比較関数は、Array.prototype.sort()で用いられる[比較関数](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#説明)に準拠しています。

キーの型が`number`, `string`, `Date`のいずれかである場合は、デフォルトで用意されている関数で比較を行うので、比較関数を定義する必要はありません。

上記以外の型をキーとしたい場合は、次のいずれかの方法で TreeMap を生成します：

- コンストラクタに比較関数を渡す
- 比較関数`compare()`を持っているクラス

それ以外の場合で比較関数を与えずに TreeMap を生成した場合は、**1 つ目のエントリを追加した時にエラーが発生します。**

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

```typescript
import TreeMap from 'ts-treemap'
import Day from 'dayjs'

// A class that is defined compare function
class ExampleObject implements Comparable<ExampleObject> {
  value: number

  constructor(value: number) {
    this.value = value
  }

  compare(object: ExampleObject) {
    return this.value - object.value
  }
}

const map = new TreeMap<ExampleObject, string>()
map.set(new ExampleObject(1), 'a') // OK
```

**🛑 Don’t:**

```typescript
import TreeMap from 'ts-treemap'
import Day from 'dayjs'

// compareFn is not defined
const errMap = new TreeMap<Day.Dayjs, string>()
errMap.set(Day('2019-01-01'), 'foo') // throws error
```
