# Vue Basics - Episode 06

## **Custom Events**

---

Now that we know how to use components and props, we can start to build more complex and intricate applications and websites. As powerful as these two conecpts are by themselves, we still face some limitations when working with data. 
We have a few enhancements when working with components and props to help us get around these limitations. Vue gives us the use of **Custom Events**, **Slots** and **Dynamic Components**. Of course there are many aspects of Vue that we havn't looked at, but for now we will stick to these three concepts. So let's begun, shall we? In this epsiode we will take a look at Custom Events.

### **CUSTOM EVENTS**

> **[Vue.js Docs on Custom Events](https://vuejs.org/v2/guide/components-custom-events.html)**

Props are great. They allow us to pass data from a parent Vue instance to a child Vue instance effortlessly. The one downfall of props is that they are only **one way directional data**, meaning they only get passed down to child components and not the other way around.

_Wouldn't it be great if we could do that?_

Using Vue.js Custom Events we can achieve just that! A custom event in Vue is exactly what is sounds like, a Custom Event. In other words it is a synthetic event that Vue components can `$emit` (triggers the custom event), and `$on` (listen for the custom event). Take a look at this basic example to start.

```js
// Example Syntax
this.$emit('event-name')

//================================

export default {
  methods: {
    callCustomEvent() {
      // emit a custom event without any data
      this.$emit('my-custom-event');
    },
  },
  mounted() {
    // listen for a custom event, run a function when heard.
    this.$on('my-custom-event', () => console.log('custom event listened to'))
  }
}

```

Well that can useful for just for the event trigger alone, but we can also include a second arguement that will be some sort of data we want to pass along with the custom event.

For example:

```js
// Example Syntax
this.$emit('firstParam', optionalSecondParam)

//================================

export default {
  data() {
    return {
      enteredData: '',
    }
  },
  methods: {
    callCustomEvent(data) {
      // emit a custom event with 
      this.$emit('my-custom-event', data);
    },
  },
  mounted() {
    // listen for a custom event, run a function when heard using the data as an param/arguement.
    this.$on('my-custom-event', data => {
      this.enteredData = data;
      console.log('data received from custom event!')
    })
  }
}

```

When we pass data with a custom event, it will always be the second parameter of the `$on` listener method, in the form of a callback function. Some times we will fire a custom event based on an actual DOM event, but we aren't limited to only that way. We can use it for a number of cases

- when conditions are met
- when data changes
- during lifecycle hook points

_This was an example of a custom event being **emitted** and **listened** to on the same local Vue Instance. But what about between Vue instances?_

Vue makes it quite easy to communicate data on a child component back up to its parent component using custom events.

### **PARENT COMPONENT**

```html
<template>
  <div>
  
    <ChildComponent @pass-data-to-parent="handleCustomEvent(payload)"/>
  
  </div>
</template>

<script>
import ChildComponent from './child-component/ChildComponent';

export default {
  name: 'ParentComponent',
  data() {
    return {
      receviedData: ''
    }
  },
  components: {
    ChildComponent,
  },
  methods: {
    handleCustomEvent(payload) {
      this.receivedData = payload;
    }
  }
}
</script>
```

### **CHILD COMPONENT**

```html
<template>
  <div>
    <input type="text" v-model="enteredData">
    <button @click="triggerCustomEvent">Click</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      enteredData: '',
    }
  },
  methods: {
    triggerCustomEvent() {
      this.$emit('pass-data-to-parent', this.enteredData);
    }
  },
}
</script>
```

To break this down a bit we need to talk a look at both the parent and child components. A series actions happen to make this all come together.

1. Native `click` DOM event is being triggered and calls a `method` to run.
2. Inside the `method`, Vue `$emits` a custom event with optional data a.k.a. `payload`.
3. On the Parent Component, we use `v-on` to listen for the custom event coming from the child component.
4. When the parent `listens` to the custom event, it runs a method again
5. Vue automatically proxies the `payload` passed with the custom event as an argument in the method being called.
6. We finally set the payload value to the `receivedData` data property on the parent component.

The maintainability issues stem from not having the ability to know where an event is being emitted, and where its being listened to. Here we can use a bit of code to send with the event that tells us where it is coming from via `console.log`, and we can also trigger a `console.log` when the event gets listened-to on the receiving component.

> _Example from the Color Custom Events demo app | synonymous with the Parent/Child example_

Child Component

```js
sendColorData() {
  // declare a payload variable as object
  const payload = {
    // set property origin as object
    origin: {
      // refers to the current vue instance
      vueInstance: this.$options._componentTag,
      // refers to the corresponding DOM element
      domElement: this.$el,
    },
    // set property data to hold payload data
    data: this.colorData,
  }
  this.$emit('sending-color-data', payload)
}
```

Parent Component

```js
receivedColor(payload) {
  // utilize data payload from custom event
  this.receivedDataColor = payload.data;
  // log the origin of the custom event
  console.log('emitted from: ', payload.origin);
  // log the reciprient of the custom event (this)
  console.log('listened on: ', { vueInstance: this.$options._componentTag, domElement: this.$el});
}
```

---

So now we have **Parent => Child** data flow and we also have **Child => Parent** data flow capabilities. But what about communicating between sibling components?

Well, if we `emit` a custom event on one component, then try to `listen` for the event on a sibling component, we can see that it doesn't work. The event fires all the same, but it doesn't leave the scope of the Vue instance, therefore it never gets `listened` to by its sibling.

Okay. So what do we do now?

_Well, the proper thing to do is change over to Vuex State Management, but lets just look at using an event bus._

### **CUSTOM EVENT BUS**

We can create a global Vue instance to house all of our custom events internally, which we can tap into throughout our app, where ever we may need it. This in turn allows us to `emit` and `listen` to the same custom event on separate components! 

> **CAUTION!**  
Using an EVENT BUS can create maintainability issues if not done correctly, see below. Its highly considered better to use Vuex for handling state across components versus an event bus, but this can be useful for certain cases.

**1. We need to create our `EventBus`**  

- inside the main.js file
- declare a variable `eventBus`
- set `eventBus` to a new Vue instance with an empty options object
- pass the `eventBus` into the root Vue App instance

```js
// inside the main.js file
import Vue from 'vue',
import App from './App',

const eventBus = new Vue({});

new Vue({
  eventBus,
  render: h => h(App)
}).$mount('#app');
```

**2. Emit a custom event**  

- import the `eventBus` at the top of component script tag
- instead of emitting events via `this`
- emit using `eventBus.$emit('custom-event-name', data)
- trigger it how we normally would (condition, logic, event, etc..)

```js
import eventBus from '../path/to/main.js';

export default {
  data() {
    return {
      enteredData: 'some entered data',
    }
  },
  methods: {
    triggerCustomEvent() {
      eventBus.$emit('emit-custom-event', this.enteredData);
    }
  },
}
```

**3. Listen for the custom event**

- import the `eventBus` at the top of component script tag
- set up the listener in a lifecycle hook to initialize it
- when the custom event gets triggered, runs a callback function
- payload is the data being passed from the `emitting` component

```js
import eventBus from '../path/to/main.js';

export default {
  data() {
    return {
      receivedData: '',
    }
  },
  mounted() {
    eventBus.$on('emit-custom-event', payload => {
      this.receivedData = payload;
    });
  },
}
```

Now this is almost ready to go, and in fact the eventBus will work just fine as is. But we have a problem. It may not be apparent right away but we have created a maintainability nightmare if we leave is as is. The main issue we have is we very quickly lose the ability to know where a custom event is coming from, where it gets listened to at, and the data it is sending. 

One custom event may not be too bad, but imagine your app was dependant on these custom events to function. Well we will lose track of everything very quickly. We have a few tricks however that we can utilize to give us a bit more control.

First, the Vue.js DevTools now feature an `events` panel for monitoring **EMITTED** events and records when custom events are triggered. This provides us with some useful info such as:

- The name of the custom event itself.
- The name of the component the event is getting emitted from.
- The `payload` being sent in the event.

This helps with `emits` but not `listens`.

We can proxy the receiving components information to the console when they listen to custom events. This will at least give us info on where things are happening.

---

