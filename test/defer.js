/**
 * @file defer
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project async-is-fun
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

'use strict';
const tap =require('tap')
const defer = require('../src/defer')

class AsyncConstructor {
  constructor(promise){
    this.Promise = promise.promise
    setTimeout(() => {
      promise.resolve(Math.random())
    }, 1000)
  }
}

tap.test('Can be passed around and stored for later.', (t) => {

  let later = new AsyncConstructor(defer())
  let evenLater = new AsyncConstructor(defer())

  return Promise.all([later.Promise, evenLater.Promise])
    .then((results) => {
      console.log(results)
      t.equal(results.length, 2, 'Returns to resolved promises.')
    })

})