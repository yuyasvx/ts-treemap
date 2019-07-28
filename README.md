# ts-treemap

a TypeScript implementation of TreeMap

- Java でお馴染みの TreeMap の一部機能を TypeScript で使うことが出来ます。
- ES2015 から追加された“Map”オブジェクトがベースになっていますが、以下の点で違いがあります。
  - キーの順序が保証されています。並び順は定義することができます。
  - 指定したキーの付近にあるエントリや、最小/最大のキーを取得することが出来ます
  - マップをコピーしたり、マップとマップを結合して 1 つに統合する便利機能もあります。

## 注意

- このマップはイミュータブルになっていませんので、set()や delete()を行うと、対象のマップ自体に変更が行われます。
- パフォーマンスに関する考慮や検証は一切行っていません。

# 使い方

## インストール

```
npm i ts-treemap --save
```

## 使う

ES2015 の Map と同じ要領で使うことが出来ます。

```typescript
import TreeMap from 'ts-treemap'

const treeMap = new TreeMap<number, string>()

// add new entry
treeMap.set(10, 'abc')
treeMap.set(5, 'def')
treeMap.set(0, 'ghi')

// get entry
treeMap.firstEntry() // [0, 'ghi']
treeMap.higherEntry(0) // [5, 'def']
```

## 注意

TreeMap は、キーの並び順を常にソートしています。その都合上、TreeMap には比較関数を与える必要があります。比較関数は、Array.prototype.sort()で用いられる[比較関数](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#説明)に準拠しています。

ただし、キーの型が`number`, `string`, `Date`のどれかに該当する場合は、比較関数を与えなくても動作します。該当しない場合は、**1 つ目のエントリを追加した時にエラーが発生します。**

**✅ 問題なく動作する例：**

```typescript
import TreeMap from 'ts-treemap'
import Day from 'dayjs'

const numberMap = new TreeMap<number, string>()
numberMap.set(1, 'foo') // OK

const stringMap = new TreeMap<string, string>()
numberMap.set('1', 'foo') // OK

const dateMap = new TreeMap<Date, string>()
numberMap.set(new Date('2019-01-01'), 'foo') // OK

// compareFn is defined
const objectMap = new TreeMap<Day.Dayjs, string>((a, b) => a.unix() - b.unix())
objectMap.set(Day('2019-01-01'), 'foo') // OK
```

**🛑 エラーが発生する例：**

```typescript
import TreeMap from 'ts-treemap'
import Day from 'dayjs'

// compareFn is not defined
const errMap = new TreeMap<Day.Dayjs, string>()
errMap.set(Day('2019-01-01'), 'foo') // throws error
```

### 比較関数について

- 2 つの値を比較し、比較結果を number 型として返す関数です。
  - `a`と`b`を比較した結果、`a`より`b`の方が後に並ぶ場合、`-1` (負の値) を返します。
  - `a`と`b`を比較した結果等しいので、ソートしない場合、`0` を返します。
  - `a`と`b`を比較した結果、`b`より`a`の方が後に並ぶ場合、`1` (正の値) を返します。
