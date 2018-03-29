/**
 * @file retryUntil
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project async-is-fun
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

'use strict';

const tap = require('tap')
const retryUntil = require('../src/retryUntil')

const opts = {
  timeout: 10,
  bound: 30,
  growth: .2,
  tries: 10
}

tap.test('Retrys a promise returning false until success', (t) => {

  let count = 7
  return Promise.resolve({value: 100})
    .then(retryUntil(function(result) {
      if(--count === 0) {
        return Promise.resolve({ok: true, value: result.value})
      }
      return Promise.resolve(false)
    }, opts))
    .then((result) => {
      t.ok(result.ok, 'Returns correct data after several failures')
      t.equal(result.value, 100, 'Passes data from chain through several failures')
    })

})

tap.test('Retrys a promise returning function that throws, until success', (t) => {

  let count = 7
  return Promise.resolve({value: 100})
    .then(retryUntil(function(result) {
      if(--count === 0) {
        return {ok: true, value: result.value}
      }
      throw new Error('Something went wrong')
    }, opts))
    .then((result) => {
      t.ok(result.ok, 'Returns correct data after several failures')
      t.equal(result.value, 100, 'Passes data from chain through several failures')
    })


})

tap.test('Retrys a promise until attempts are exhausted, then rejects.', (t) => {

  return Promise.resolve({value: 100})
    .then(retryUntil(function(result) {

      throw new Error('derp')
    }, opts))
    .catch((err) => {
      t.equal(err.errors.length, 5, 'Limits the amout of reported errors to config.returnErrors')
      t.matches(err, new Error('Exhausted attempts.'))
    })

})

tap.test('Handles a simple number parameter to specify retry count only.', (t) => {
  let count = 7
  return Promise.resolve({value: 100})
    .then(retryUntil(function() {
      return new Promise((resolve) => {
        if(--count === 0) {
          return resolve({ok: true})
        }
        throw new Error('Failed')
      })
    }, 10))
    .then((result) => {
      t.ok(result.ok, 'returns correct data after several failures')
    })
    .catch((err) => {

    })
})

tap.test('Rejects under a few circumstances.', (t) => {
  let badArgsFirst = 'The first argument to .retryUntil() must be a promise or value returning function.'
  let badArgsSecond = 'The second argument to .retryUntil() must be an options object or a number.'


  t.test('When incorrect args are passed as first argument - no args',(tt) => {
    return Promise.resolve({value: 100})
      .then(retryUntil())
      .catch((err) => {
        tt.match(err.message, badArgsFirst)
      })
  })
  t.test('When incorrect args are passed as first argument - string',(tt) => {
    return Promise.resolve({value: 100})
      .then(retryUntil('bob'))
      .catch((err) => {
        tt.match(err.message, badArgsFirst)
      })
  })
  t.test('When incorrect args are passed as first argument - number',(tt) => {
    return Promise.resolve({value: 100})
      .then(retryUntil(10))
      .catch((err) => {
        tt.match(err.message, badArgsFirst)
      })
  })

  t.test('When incorrect args are passed as second argument - string ',(tt) => {
    return Promise.resolve({value: 100})
      .then(retryUntil(()=>{}, 'bob'))
      .catch((err) => {
        tt.match(err.message, badArgsSecond)
      })
  })

  t.test('When incorrect args are passed as second argument - function ',(tt) => {
    return Promise.resolve({value: 100})
      .then(retryUntil(()=>{}, ()=>{}))
      .catch((err) => {
        tt.match(err.message, badArgsSecond)
      })
  })
  // t.throws(() => {
  //   retryUntil('bob')
  // }, badArgsFirst, 'When incorrect args are passed - string')
  //
  // t.throws(() => {
  //   retryUntil(() => {
  //   })
  // }, badArgsSecond, 'When incorrect args are passed - func')
  //
  // t.throws(() => {
  //
  //   retryUntil(opts, 'bob')
  // }, badArgsSecond, 'When incorrect args are passed - func')
  t.done()
})