// /**
//  * @file delay
//  * @author Jim Bulkowski <jim.b@paperelectron.com>
//  * @project async-is-fun
//  * @license MIT {@link http://opensource.org/licenses/MIT}
//  */

'use strict'

/**
 * Delays resolution of a Promise by [time] amount, resolving [value]
 *
 * @param time
 * @param value
 * @return {Promise<any>}
 */
module.exports = function delay(time, value) {
  return new Promise(function(resolve) {
    setTimeout(resolve.bind(null, value), time)
  })
}