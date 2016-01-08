import FragmentFactory from '../../fragment/factory'
import { INJECT } from '../priorities'
import {
  remove,
  createAnchor,
  warn
} from '../../util/index'

export default {

  priority: INJECT,

  bind () {
    var el = this.el
    if (!el.__vue__) {
      var container = this.arg
        ? document.getElementById(this.arg)
        : document.body
      this.anchor = createAnchor('v-inject')
      container.appendChild(this.anchor)
      remove(this.el)
      var factory = new FragmentFactory(this.vm, el)
      this.frag = factory.create(this._host, this._scope, this._frag)
      this.frag.before(this.anchor)
    } else {
      process.env.NODE_ENV !== 'production' && warn(
        'v-inject="' + this.expression + '" cannot be ' +
        'used on an instance root element.'
      )
    }
  },

  unbind: function () {
    this.frag.remove()
    remove(this.anchor)
  }
}
