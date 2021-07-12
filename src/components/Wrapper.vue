<template>
    <div class="dynamic-components-wrapper">
        <div style="pointer-events: none" v-for="(item, index) in components" :key="'transition' + item.id">
            <transition @after-leave="components.splice(index, 1)" :name="item.animation">
                <component
                    style="pointer-events: auto"
                    v-if="item.show && (!item.queue || components.find(component => component.queue == item.queue) == item)"
                    :is="item.component"
                    :key="'component' + item.id"
                    v-bind="item.props"
                    v-on="{
                        ...item.events,
                        hide: () => {
                            hideComponent(item.id, name);
                        }
                    }"
                ></component>
            </transition>
        </div>
    </div>
</template>

<script>
import { EventBus, EventBusEvent } from '../utils/EventBus';
export default {
    props: {
        name: {
            type: String
        }
    },
    data() {
        return {
            components: [],
            lastId: -1
        };
    },
    computed: {
        animations() {
            return new Set(this.components.map(component => component.animation));
        },
        queues() {
            return new Set(this.components.map(component => component.queue));
        }
    },
    created() {
        EventBus.$on(EventBusEvent.PUSH_COMPONENT, this.showComponent);
        EventBus.$on(EventBusEvent.HIDE_COMPONENT, this.hideComponent);
    },
    beforeDestroy() {
        EventBus.$off(EventBusEvent.PUSH_COMPONENT, this.showComponent);
        EventBus.$off(EventBusEvent.HIDE_COMPONENT, this.hideComponent);
    },
    methods: {
        showComponent(item, wrapperName) {
            if (wrapperName != this.name) return;
            if (!(item.type && this.components.findIndex(component => component.type == item.type) > -1)) {
                this.lastId++;

                item.id = this.lastId;
                if (item.refs) item.refs.push(item);

                if (!item.props) item.props = {};
                item.props._id = this.lastId;

                if (!item.component.methods) item.component.methods = {};
                item.component.methods.$hide = function () {
                    EventBus.$emit(EventBusEvent.HIDE_COMPONENT, this.$attrs._id, wrapperName);
                };

                this.components.push(item);
                this.$nextTick(() => {
                    this.$set(item, 'show', true);
                });
            }
        },
        hideComponent(id, wrapperName) {
            if (wrapperName != this.name) return;
            let component = this.components.find(item => item.id == id);
            if (component) {
                component.show = false;
                if (component.refs)
                    component.refs.splice(
                        component.refs.findIndex(item => item.id == id),
                        1
                    );
            }
        }
    }
};
</script>

<style>
.dynamic-components-wrapper {
    pointer-events: none;
}
</style>
