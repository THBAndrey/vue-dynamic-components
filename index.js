import { EventBus, EventBusEvent } from './src/utils/EventBus';
import Wrapper from './src/components/Wrapper.vue';
export default function install(Vue) {
    Vue.component('dynamic-components-wrapper', Wrapper);

    Vue.prototype.$dc = {
        push(component, options, wrapperName) {
            EventBus.$emit(EventBusEvent.PUSH_COMPONENT, { component, ...options }, wrapperName);
        },
        hide(id, wrapperName) {
            EventBus.$emit(EventBusEvent.HIDE_COMPONENT, id, wrapperName);
        }
    };
}
