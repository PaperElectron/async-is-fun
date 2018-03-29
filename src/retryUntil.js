/**
 * @file retryUntil
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project async-is-fun
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

'use strict'

const defaults = require('lodash/fp/defaults')({
  timeout: 250,
  bound: 1000,
  growth: 0.2,
  tries: 10,
  returnErrors: 5
})
const isString = require('lodash/fp/isString')
const isNumber = require('lodash/fp/isNumber')
const isObject = require('lodash/fp/isObject')
const isFunction = require('lodash/fp/isFunction')

const delay = require('./delay')
const growIt = require('./growIt')
const limitArray = require('./utilities').limitArray

/**
 * Retries a promise resolving function with an increasing delay.
 * @module retryUntil
 */


module.exports = function retryUntil(fun, config) {
  return (value) => {
    let startingConfig
    let errors = []

    if(!isFunction(fun)) {
      return Promise.reject(new Error('The first argument to .retryUntil() must be a promise or value returning function.'))
    }

    if(isString(config)){
      return Promise.reject(new Error('The second argument to .retryUntil() must be an options object or a number.'))
    }
    if(isFunction(config)) {
     return Promise.reject(new Error('The second argument to .retryUntil() must be an options object or a number.'))
    }

    if(isNumber(config)) {
      startingConfig = defaults({tries: config})
    }
    if(isObject(config)) {
      startingConfig = defaults(config)
    }

    let timeoutGrowth = growIt(startingConfig.timeout,startingConfig.bound, startingConfig.growth, 2)

    function rolloff(c) {
      return new Promise((resolve, reject) => {
        if(c.tries > 0) {
          let newOpts = {
            timeout: timeoutGrowth(),
            tries: c.tries - 1
          }

          let promiseOrValue
          try{
            promiseOrValue = fun(value)
          }
          catch(err){
            promiseOrValue = Promise.reject(err)
          }

          Promise.resolve(promiseOrValue)
            .then((result) => {
              if(result) {
                return resolve(result)
              }
              return delay(newOpts.timeout, 10).then(() => {
                return resolve(rolloff(newOpts))
              })
            })
            .catch((err) => {
              limitArray(errors, err, startingConfig.returnErrors)
              return delay(newOpts.timeout, 10).then(() => {
                return resolve(rolloff(newOpts))
              })
            })
        } else {
          let e = new Error(`Exhausted attempts.`)
          e.errors = errors
          reject(e)
        }
      })
    }

    return rolloff(startingConfig)
  }

}

