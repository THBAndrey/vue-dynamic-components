# Vue dynamic components

## Vue3 only now

### See [online demo](https://thbandrey.github.io/csb-cy6cs/)

### See [demo project repository](https://github.com/THBAndrey/vue-dynamic-components-demo)

### See [demo project codesandbox](https://codesandbox.io/s/github/THBAndrey/vue-dynamic-components-demo)

## Table of Contents

-   [Vue dynamic components](#vue-dynamic-components)
    -   [Table of Contents](#table-of-contents)
    -   [Install](#install)
    -   [Configuration](#configuration)
    -   [Easy start](#easy-start)
    -   [Push method](#push-method)
    -   [Hide method](#hide-method)
    -   [Named wrappers](#named-wrappers)
    -   [Cases](#cases)

## Install

```sh
$ npm install vue-dynamic-components --save

$ yarn add vue-dynamic-components
```

## Configuration

```javascript
import Vue from 'vue';
import VueDynamicComponents from 'vue-dynamic-components';
Vue.use(VueDynamicComponents);
```

## Easy start

1. Add the `<dynamic-components-wrapper />` where you want (as default to root in App.vue)
2. Where you want import needed vue component
3. Call `this.$dc.push(YourVueComponent);`
4. All components called from `push` has `$hide()` method, use it of `emit('hide')` for close your component from it.

## Push method

`push(component, options, wrapperName)`
Name | Type | Description | |
------------- | ------------- | ------------ | -
component | Vue component | Your imported Vue component | Required
options | Object |
wrapperName | String | The name of the wrapper in which you want to display the component

### Options object

| Property name | Type   | Descrition                                                                          |
| ------------- | ------ | ----------------------------------------------------------------------------------- |
| props         | Object | Props that will be passed to your component                                         |
| events        | Object | Event handlers that will be passed to your component                                |
| queue         | String | If you want your components to appear in turn, specify the queue                    |
| type          | String | If you want the same components not to appear multiple times, specify the same type |
| animation     | String | Each component is wrapped in a transition tag, name the animation if you want       |
| refs          | Array  | If you want to close component use refs to get id                                   |

## Hide method

`hide(id, wrapperName)`
Name | Type | Description | |
------------- | ------------- | ------------ | -
id | Number | Component unique id, use object.refs to get it | Required
wrapperName | String | The name of the wrapper which displays the component

## Named wrappers

Use `<dynamic-components-wrapper name="wrapperName"/>`

## Cases

### Use different wrappers for toast and modals

App.vue

```html
<template>
    <div id="app">
        <button @click="showToast">Show toast</button>
        <button @click="showModal">Show modal</button>
        <dynamic-components-wrapper name="modals" class="modals-wrapper-class" />
        <dynamic-components-wrapper name="toasts" class="toasts-wrapper-class" />
    </div>
</template>
```

```js
import ToastComponent from '@/components/ToastComponent';
import ModalComponent from '@/components/ModalComponent';

export default {
    methods: {
        showToast() {
            this.$dc.push(ToastComponent, {}, 'toasts');
        },
        showModal() {
            this.$dc.push(ModalComponent, {}, 'modals');
        }
    }
};
```

### Use refs for hiding showed modals

App.vue

```html
<template>
    <div id="app">
        <button @click="showModal">Show modal</button>
        <button @click="hideAllModal">Hide modals</button>
        <dynamic-components-wrapper />
    </div>
</template>
```

```js
import ModalComponent from '@/components/ModalComponent';

export default {
    data() {
        return {
            modals: []
        };
    },
    methods: {
        showModal() {
            this.$dc.push(ModalComponent, { refs: this.modals });
        },
        hideAllModal() {
            this.modals.forEach(modal => {
                this.$dc.hide(modal.id);
            });
        }
    }
};
```

### Use props, events, queue and animation

App.vue

```html
<template>
    <div id="app">
        <button @click="showModal">Show modal</button>
        <dynamic-components-wrapper />
    </div>
</template>
```

```js
import ModalComponent from '@/components/ModalComponent';

export default {
    methods: {
        showModal() {
            this.$dc.push(ModalComponent, {
                props: { text: 'Dynamic modal' },
                events: {
                    selected(value) {
                        console.log(value);
                    }
                },
                queue: 'modals',
                animation: 'fade'
            });
        }
    }
};
```

```css
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
```

### For example modal component

ModalComponent.vue

```html
<template>
    <div class="wrapper" @click.self="$hide()">
        <div class="dialog">
            <div>{{ text }}</div>
            <div>
                <button @click="$emit('selected', true)">Yes</button>
                <button @click="$emit('selected', false)">No</button>
            </div>
        </div>
    </div>
</template>
```

```js
export default {
    props: {
        text: {
            type: String,
            default: 'Dynamic component'
        }
    }
};
```

```css
<style scoped>
.wrapper {
    left: 0;
    top: 0;
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.dialog {
    width: 300px;
    height: 300px;
    border-radius: 5px;
    cursor: default;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
```
