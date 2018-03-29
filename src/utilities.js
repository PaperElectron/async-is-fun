/**
 * @file utilities
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project async-is-fun
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

'use strict'

/**
 * Helper functions and other tools.
 * @module utilities
 */
/**
 *
 * @type {{limitArray: function(*, *=, *=)}}
 */
module.exports = {
  /**
   * Limits an array to the last -limit- items inserted.
   * @param array - The array to modify
   * @param item - the item to add
   * @param limit - Amount desired.
   *
   * @return {number} length of the array
   */
  limitArray: (array, item, limit) => {
    let length

    if(array.length >= limit) {
      array.shift()
      length = array.push(item)

    }

    if(array.length < limit) {
      length = array.push(item)
    }

    return length
  }
}

