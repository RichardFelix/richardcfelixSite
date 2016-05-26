# ls-lodash  [![Build Status](https://travis-ci.org/LiveSafe/ls-lodash.svg?branch=1.0.1)](https://travis-ci.org/LiveSafe/ls-lodash) [![Dependency Status](https://www.versioneye.com/user/projects/54be95866c0035c592000008/badge.svg?style=flat)](https://www.versioneye.com/user/projects/54be95866c0035c592000008) [![Circle CI](https://circleci.com/gh/LiveSafe/ls-lodash.svg?style=svg&circle-token=58a9afbfad6cfc0a9a46ebdd7cf396f25be3aae5)](https://circleci.com/gh/LiveSafe/ls-lodash) [![Code Climate](https://codeclimate.com/github/LiveSafe/ls-lodash/badges/gpa.svg)](https://codeclimate.com/github/LiveSafe/ls-lodash)

![Snuffles](http://i.ytimg.com/vi/ScC0T--XfkA/hqdefault.jpg)

## Usage

```js
var _ = require('ls-lodash'),
    merged = _.safeMerge({},{});
```

## API

### currySeal

```js
_.currySeal(func, maxArgs)
```

###### Arguments

1. `func` _(Function)_ The function to curry and seal
1. `maxArgs` _(Number)_ Max number of total args to apply `func` with (also arity)

###### Returns

_(Object)_: Returns a new object with keys/properties of the results of each `callback` execution.

### mapKeys

```js
_.mapKeys(object, [callback], [thisArg])
```

###### Arguments

1. `object` _(...Object)_ The object over which to iterate.
1. `[callback]` _(Function)_ The function called per iteration.
1. `[thisArg]` _(*)_ The `this` binding of `callback`

###### Returns

_(Object)_: Returns a new object with keys/properties of the results of each `callback` execution.

###### Notes

Similar to `_.mapValues`

See https://lodash.com/docs#mapValues


### safeMerge

```js
_.safeMerge([source], [callback], [thisArg])
```

###### Arguments

1. `[source]` _(...Object)_ The source objects
1. `[callback]` _(Function)_ The function to customize merging properties
1. `[thisArg]` _(*)_ The `this` binding of `callback`

###### Returns

_(Object)_: Returns a new object with source objects merged

###### Notes

Effectively equivalent to `_.partial(_.merge, {})`;

See https://lodash.com/docs#merge


### seal

```js
_.seal(fn, [prefixArgs], maxArgs, [suffixArgs], [thisArg])
```

###### Arguments

1. `fn` _(Function)_ The function to partially apply and seal.
1. `[prefixArgs]` _(Array)_ Arguments to be partially applied left.
1. `maxArgs` _(Number)_ The number of arguments to accept into partially applied function.
1. `[suffixArgs]` _(Array)_ Arguments to be partially applied right.
1. `[thisArg]` _(*)_ Context in which to run `fn`

###### Returns

_(Function)_ Partially applied function, optionally bound to `thisArg`, that accepts a max of `count` more args.



### qFilter

Async q-based version of `_.filter`

```js
_.qFilter(collection, predicateFn, [thisArg])
```

###### Arguments

1. `collection` _(Array|Object)_ The collection to asynchronously filter
1. `predicateFn` _(Function)_ Function which returns a promise that resolves to a boolean
1. `[thisArg]` _(Object)_ The `this` binding of `predicateFn`

###### Returns

_(Promise<Array>)_ Promise which resolves to the filtered array (just as lodash would perform the filter)
