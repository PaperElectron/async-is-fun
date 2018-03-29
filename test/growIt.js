/**
 * @file growIt
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project async-is-fun
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

'use strict';

const tap = require('tap')
const growIt = require('../src/growIt')



tap.test('Negative number initial value converts to 1',(t) => {
  let n = growIt(-1, 100, .15, 2)
  t.equal(n(), 1, 'Returns the initial value first.')
  t.equal(n(), 1.14)
  t.equal(n(), 1.31)
  t.equal(n(), 1.5)
  t.equal(n(), 1.72)
  t.equal(n(), 1.97)

  t.done()
})

tap.test('0 initial value converts to 1',(t) => {
  let n = growIt(0, 100, .15, 2)
  t.equal(n(), 1, 'Returns the initial value first.')

  t.done()
})

tap.test('Respects bounding value',(t) => {
  let n = growIt(100, 150, .15, 2)
  t.equal(n(), 100, 'returns the initial value first.')
  t.equal(n(), 115)
  t.equal(n(), 132.25)
  t.equal(n(), 152.08, 'Stops at first value to exceed bound')
  t.equal(n(), 152.08, 'Returns this value on every additional call')

  t.done()
})

tap.test('Truncates decimal places.',(t) => {
  let n = growIt(100, 150, .15)
  t.equal(n(), 100, 'returns the initial value first.')
  t.equal(n(), 115)
  t.equal(n(), 132)
  t.equal(n(), 151, 'Stops at first value to exceed bound')
  t.equal(n(), 151, 'Returns this value on every additional call')

  t.done()
})