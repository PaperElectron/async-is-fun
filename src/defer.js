'use strict'

/**
 * Old school deferred promise.
 * @module defer
 */

/**
 * Creates a Promise you can tote around and resolve later.
 * @returns {{resolve: function, reject: function, promise: Promise<any>}}
 */
module.exports = function defer(){
  let resolve, reject
  let promise = new Promise(function(_resolve, _reject){
    resolve = _resolve
    reject = _reject
  })
  return {
    resolve: resolve,
    reject: reject,
    promise: promise
  }
}