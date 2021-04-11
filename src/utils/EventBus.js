import Vue from 'vue';

let EventBusEvent = {
    PUSH_COMPONENT: 'pushComponent',
    HIDE_COMPONENT: 'hideComponent'
};
let EventBus = new Vue();

export { EventBus, EventBusEvent };
