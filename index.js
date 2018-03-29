// /**
//  * @file index
//  * @author Jim Bulkowski <jim.b@paperelectron.com>
//  * @project async-is-fun
//  * @license MIT {@link http://opensource.org/licenses/MIT}
//  */

"use strict"
const delayPromise = require('./src/delay')
/**
 *
 * @module async-is-fun
 */

module.exports = {
  /**
   *  An overlooked pattern for Promise usage, returns An old school self contained deferred object.
   *  A fun use of this is waiting for async instantiation in class constructors.
   *
   *
   *  @type {object} deferred
   *  @property {function(any)} resolve - resolve the Promise with value.
   *  @property {function(any)} reject - reject the Promise with value.
   *  @property {Promise} promise
   *
   *  @see {@link test/defer.js} For usage.
   *  @example
   *
   *  const defer = require('async-is-fun').defer
   *
   *  class AsyncConstructor {
   *    constructor(promise){
   *      this.Promise = promise.promise
   *      setTimeout(() => {
   *        promise.resolve(Math.random())
   *      }, 1000)
   *    }
   *  }
   *
   *  let later = new AsyncConstructor(defer())
   *  let evenLater = new AsyncConstructor(defer())
   *
   *  Promise.all([later.Promise, evenLater.Promise])
   *  .then((results)=>{
   *    console.log(results) // [ 0.17888717674897858, 0.8638054083464473 ]
   *  })
   */
  defer: require('./src/defer'),

  /**
   * Delays resolution of a Promise by [time] amount, resolving [value]
   *
   * Yes, it is true that plenty of other libraries implement this method, but is included here
   * because it is used internally and could save someone from having to load a second bigger library
   * like bluebird.
   *
   * @param {number} time - in milliseconds
   * @return {function(any)}
   *
   * @see {@link test/delayPromise.js} For usage.
   * @example
   *
   * const delay = require('async-is-fun').delay
   *
   * Promise.resolve('Wait for it')
   * .then(delay(1000))
   * .then((result)=>{
   *   console.log(result) // 'wait for it'
   * }
   */
  delay: (time) => {
    return (value) => {
      return delayPromise(time, value)
    }
  },

  /**
   * Retry a Promise returning function
   * @type {function} retryUntil
   * @param {function} fun - A promise or value returning function, values will be wrapped in a Promise.
   * @param {object} [config] - The optional configuration object.
   * @param {object} [config.timeout=250] - Initial timeout value before retry.
   * @param {object} [config.bound=1000] - Upper bound of the computed timeout.
   * @param {object} [config.growth=0.2] - Growth rate of the timeout per iteration. {@link src/growIt.js}
   * @param {object} [config.tries=10] - Number of attempts before the promise is rejected.
   * @param {object} [config.returnErrors=5] - Number of errors to report if [func] throws or rejects.
   *
   * @returns {function(value)} Returns a Promise returning function that will resolve the first truthy value
   * returned or resolved by the provided function. It will reject when all attempts are exhausted.
   *
   * @see {@link test/retryUntil.js} For usage.
   * @see {@link src/growIt.js} For the timeout growth function.
   *
   * @example
   * const retryUntil = require('async-is-fun').retryUntil
   *
   * Promise.resolve({msg: 'Retry a bunch', value: 10})
   * .then(retryUntil((value)=>{
   *
   *   //Value is passed through.
   *   console.log(value) // {msg: 'Retry a bunch', value: 10}
   *
   *   return somePromiseReturningFun(9)
   *   .then((count)=>{
   *     console.log(count) // 9
   *     let total = count + value
   *
   *     //If a truthy value is returned the promise will resolve with that value.
   *     if(total === 15){
   *       return {total: total}
   *     }
   *
   *     //If we return false, the method will retry after the timout expires.
   *     return false
   *   })
   * }))
   * .then((result)=>{
   *   console.log(result) // {total: 19}
   * }
   */
  retryUntil: require('./src/retryUntil')
}