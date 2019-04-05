/**
* FitText.js 1.0 es6 custom version
*
* @author nicolas husson <hello@nusson.ninja>
*
* ## @use :
* ```js
* import FitText from 'utils/plugins/FitText'
* FitText.fit(elements, {min, max, compressor})
* ```
* ---
*
* ## Thanks to
* ---
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
* Modified by Slawomir Kolodziej http://slawekk.info
*
* Date: Tue Aug 09 2011 10:45:54 GMT+0200 (CEST)
*/
import { assign, each } from 'lodash';

export default class FitText {
  /**
   * fit text in its box
   * - work for both el or [els]
   * @param {NodeElement|NodeList[]} elements - node ou nodelist / (text wrapper)
   * @param {Object} options - {min, max, compressor}
   */
  static fit(elements, compressor = 1, options) {
    const items = elements.length ? elements : [elements];

    each(items, item => FitText.fitOnResize(item, compressor, options));

    // return set of elements
    return elements;
  }

  /**
   * fit text in its box
   * - work only for a single element
   * - watch on resize
   * @param {NodeElement} element - node (text wrapper)
   * @param {Object} options - {min, max, compressor}
   */
  static fitOnResize(element, options = {}) {
    window.addEventListener('resize', FitText.setFontsize.bind(this, element, options));
    window.addEventListener('orientationchange', FitText.setFontsize.bind(this, element, options));
    FitText.setFontsize(element, options);
  }

  /**
   * aply correct fontsize on a node
   * @param {NodeElement} element - node (text wrapper)
   * @param {Object} options - {min, max, compressor}
   */
  static setFontsize(element, options = {}) {
    const { max, min, compressor } = assign({
      max: 1 / 0,
      min: -1 / 0,
      compressor: 1,
    }, options);

    const size = Math.max(
      Math.min(
        element.clientWidth / (compressor * 10),
        parseFloat(max),
      ),
      parseFloat(min),
    );
    console.log('setFontsize', { element, options, size });
    element.style.fontSize = `${ size }px`;
  }

  // addEvent(el, type, fn) {
  //   if (el.addEventListener) {
  //     el.addEventListener(type, fn, false);
  //   } else {
  //     el.attachEvent(`on${type}`, fn);
  //   }
  // }
}
