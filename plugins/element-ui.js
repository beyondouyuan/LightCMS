/*
* @Author: beyondouyuan
* @Date:   2018-09-17 13:50:58
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2018-09-17 13:52:10
*/
import Vue from 'vue'
import Element from 'element-ui'

Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.event = function (event) {
      // here I check that click was outside the el and his childrens
      if (!(el === event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event)
      }
    }
    document.body.addEventListener('click', el.event)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.event)
  }
})

export default () => {
  Vue.use(Element)
}