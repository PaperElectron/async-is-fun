/**
 * @file growIt
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project async-is-fun
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

'use strict'

/**
 * Provides geometric growth starting from a provided positive value
 * @module growIt
 */

module.exports = function growIt(initial, bound, rate, decimals) {

  let initialReturn = true

  if(!decimals) {decimals = 0}
  let mult = Math.pow(10, decimals)

  initial = Math.abs(initial)
  if(!initial) { initial = 1 }


  return function(){
    if(initialReturn){
      initialReturn = false
      return initial
    }
    if(initial >= bound){
      return initial
    }
    let n = (initial + (initial * rate))
    let base = n * mult
    let adj = Math.floor(base)
    initial = adj / mult
    return initial
  }
}
