import { EventBus, EventBusEvent } from './src/utils/EventBus';
import Wrapper from './src/components/Wrapper';
export default {
    install: (app, options) => {
        app.component(options && options.wrapperName ? options.wrapperName : 'dynamic-components-wrapper', Wrapper);
        app.config.globalProperties.$dc = {
            push(component, options, wrapperName) {
                EventBus.$emit(EventBusEvent.PUSH_COMPONENT, { component, ...options }, wrapperName);
            },
            hide(id, wrapperName) {
                EventBus.$emit(EventBusEvent.HIDE_COMPONENT, id, wrapperName);
            }
        };
    }
};
