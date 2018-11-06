
/* https://vuejs.org/v2/guide/custom-directive.html */

// Hooks:
//   bind: called only once, when the directive is first bound to the element. This is where you can do one-time setup work.
//   inserted: called when the bound element has been inserted into its parent node (this only guarantees parent node presence, not necessarily in-document).
//   update: called after the containing component’s VNode has updated, but possibly before its children have updated. The directive’s value may or may not have changed, but you can skip unnecessary updates by comparing the binding’s current and old values (see below on hook arguments).
//   componentUpdated: called after the containing component’s VNode and the VNodes of its children have updated.
//   unbind: called only once, when the directive is unbound from the element.
//
// Function Args:
//   el: The element the directive is bound to. This can be used to directly manipulate the DOM.
//     binding: An object containing the following properties.
//     name: The name of the directive, without the v- prefix.
//     value: The value passed to the directive. For example in v-my-directive="1 + 1", the value would be 2.
//   oldValue: The previous value, only available in update and componentUpdated. It is available whether or not the value has changed.
//     expression: The expression of the binding as a string. For example in v-my-directive="1 + 1", the expression would be "1 + 1".
//     arg: The argument passed to the directive, if any. For example in v-my-directive:foo, the arg would be "foo".
//     modifiers: An object containing modifiers, if any. For example in v-my-directive.foo.bar, the modifiers object would be { foo: true, bar: true }.
//   vnode: The virtual node produced by Vue’s compiler. See the VNode API for full details.
//     oldVnode: The previous virtual node, only available in the update and componentUpdated hooks.
//     Apart from el, you should treat these arguments as read-only and never modify them. If you need to share information across hooks, it is recommended to do so through element’s dataset.

/**
 * Focus the selector onto the marked component.
 */
export default {
  inserted(el) {
    el.focus();
  },
};
