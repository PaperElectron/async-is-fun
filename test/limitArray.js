/**
 * @file limitArray
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project async-is-fun
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

'use strict';

const tap = require('tap')
const limitArray = require('../src/utilities').limitArray


tap.test("limits the length of an array, keeping only the latest additions", (t) => {
  let array = []

  for (let i = 0; i < 15; i++) {
    limitArray(array, i, 10)
  }

  t.ok(array.length <= 10)
  t.done()
})

tap.test("limits the length of an array, even with outside additions", (t) => {
  let array = [1,2,3,4,5,6,7,8,9,10]

  for (let i = 10; i < 15; i++) {
    limitArray(array, i, 10)
  }

  t.ok(array.length <= 10)
  t.done()
})

tap.test("Returns the new length of the array.", (t) => {
  let array = []

  t.equal(limitArray(array, 1, 10), array.length, 'length is 1')
  t.equal(limitArray(array, 2, 10), array.length, 'length is 2')
  t.done()
})