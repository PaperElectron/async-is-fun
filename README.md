# Async is Fun

### A collection of small, composable helper functions and utilities for doing fun stuff with promises.

## Installation

### Node

``` shell
yarn add async-is-fun
// or
npm install --save async-is-fun

```

### Webpack




## Documentation<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [async-is-fun][1]
    -   [defer][2]
    -   [delay][3]
    -   [retryUntil][4]

## async-is-fun

### defer

-   **See: [test/defer.js][5] For usage.**

An overlooked pattern for Promise usage, returns An old school self contained deferred object.
 A fun use of this is waiting for async instantiation in class constructors.

Type: [object][6]

**Properties**

-   `resolve` **function (any)** resolve the Promise with value.
-   `reject` **function (any)** reject the Promise with value.
-   `promise` **[Promise][7]** 

**Examples**

```javascript
const defer = require('async-is-fun').defer

 class AsyncConstructor {
   constructor(promise){
     this.Promise = promise.promise
     setTimeout(() => {
       promise.resolve(Math.random())
     }, 1000)
   }
 }

 let later = new AsyncConstructor(defer())
 let evenLater = new AsyncConstructor(defer())

 Promise.all([later.Promise, evenLater.Promise])
 .then((results)=>{
   console.log(results) // [ 0.17888717674897858, 0.8638054083464473 ]
 })
```

### delay

-   **See: [test/delayPromise.js][8] For usage.**

Delays resolution of a Promise by [time] amount, resolving [value]

Yes, it is true that plenty of other libraries implement this method, but is included here
because it is used internally and could save someone from having to load a second bigger library
like bluebird.

**Parameters**

-   `time` **[number][9]** in milliseconds

**Examples**

```javascript
const delay = require('async-is-fun').delay

Promise.resolve('Wait for it')
.then(delay(1000))
.then((result)=>{
  console.log(result) // 'wait for it'
}
```

Returns **function (any)** 

### retryUntil

-   **See: [test/retryUntil.js][10] For usage.**
-   **See: [src/growIt.js][11] For the timeout growth function.**

Retry a Promise returning function

Type: [function][12]

**Parameters**

-   `fun` **[function][12]** A promise or value returning function, values will be wrapped in a Promise.
-   `config` **[object][6]?** The optional configuration object.
    -   `config.timeout` **[object][6]** Initial timeout value before retry. (optional, default `250`)
    -   `config.bound` **[object][6]** Upper bound of the computed timeout. (optional, default `1000`)
    -   `config.growth` **[object][6]** Growth rate of the timeout per iteration. [src/growIt.js][11] (optional, default `0.2`)
    -   `config.tries` **[object][6]** Number of attempts before the promise is rejected. (optional, default `10`)
    -   `config.returnErrors` **[object][6]** Number of errors to report if [func] throws or rejects. (optional, default `5`)

**Examples**

```javascript
const retryUntil = require('async-is-fun').retryUntil

Promise.resolve({msg: 'Retry a bunch', value: 10})
.then(retryUntil((value)=>{

  //Value is passed through.
  console.log(value) // {msg: 'Retry a bunch', value: 10}

  return somePromiseReturningFun(9)
  .then((count)=>{
    console.log(count) // 9
    let total = count + value

    //If a truthy value is returned the promise will resolve with that value.
    if(total === 15){
      return {total: total}
    }

    //If we return false, the method will retry after the timout expires.
    return false
  })
}))
.then((result)=>{
  console.log(result) // {total: 19}
}
```

Returns **function (value)** Returns a Promise returning function that will resolve the first truthy value
returned or resolved by the provided function. It will reject when all attempts are exhausted.

[1]: #async-is-fun

[2]: #defer

[3]: #delay

[4]: #retryuntil

[5]: test/defer.js

[6]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[7]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise

[8]: test/delayPromise.js

[9]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[10]: test/retryUntil.js

[11]: src/growIt.js

[12]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function
