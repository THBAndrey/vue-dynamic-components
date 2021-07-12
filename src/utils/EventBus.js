import emitter from 'tiny-emitter/instance';

let EventBusEvent = {
    PUSH_COMPONENT: 'pushComponent',
    HIDE_COMPONENT: 'hideComponent'
};
let EventBus = {
    $on: (...args) => emitter.on(...args),
    $once: (...args) => emitter.once(...args),
    $off: (...args) => emitter.off(...args),
    $emit: (...args) => emitter.emit(...args)
};

export { EventBus, EventBusEvent };
