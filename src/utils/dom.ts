import Vue from 'vue'

const isServer = Vue.prototype.$isServer
/* istanbul ignore next */
export const on = (function() {
  if (!isServer && document.addEventListener) {
    return function(element: any, event:string, handler: () => void) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function(element: any, event:string, handler: () => void) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()