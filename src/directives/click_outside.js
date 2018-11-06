
/**
 * Binds a listener to the component,
 * to check if a click has occured outside of the element.
 */
export default {
  bind(el, binding, vnode) {
    el.clickOutsideEvent = function clickOutsideEvent(event) {
      if (!(el === event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent);
  },
  unbind(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent);
  },
};
