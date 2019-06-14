# Vue Basic - Episode 08

## **Dynamic Components and Keep-Alive**

Wow! We have learned a ton about Vue! If we were to stop now and build a full project, we would have a pretty decent end result, but we can do better! We have learned all about the **Vue Instance, Single File Components, Props and Slots, and Custom Events**. Thats a nice size tool belt so far, so lets keep going!

>_There are many aspects of Vue.js still to be discovered, although some features of it going forwards can be little advanced and only to be used in certain develoment cases._

---

### **Dynamic Components**

There are times when we will need to dynamically render and change enitre components based on some sort of data or condition in our app. One way we could accomplish this would be to use an overly-verbose logic chain using the `v-if`, `v-else-if` and `v-else` directives. Using the v-show may yeild some unwanted results as well..

_So... What do we do?_

Vue makes this very easy to using using it's built in `<component>` tag in conjunction with the special `is=""` attribute.

#### `<component>` tag

- generic placeholder tag for a Vue Component
- has no functionality on its own
- gets replaced by the actual component
- can be a self-closing tag or open-close tag

#### `is=""` attribute

- sets which component should be rendered at its `<component>` tag
- accepts a hardcoded string value or dynamic sata value with `v-bind`
- expression must be a string representation of a component
- e.g. `<component is="PrimaryComponent" />`


> This demostrates using the component tag statically.

```html
<template>
  <component is="PrimaryComponent"></component>
</template>

<script>
import PrimaryComponent from './primary/PrimaryComponent.vue';
import SecondaryComponent from '.secondary/SecondaryComponent.vue';

export default {
  components: {
    PrimaryComponent,
    SecondaryComponent
  }
}
</script>
```

- We can utilize the `v-bind` directive in order to dynamically set the component to be rendered at the component tag, it works just the same as other v-bind uses.
- We need to use a conditional statement, computed property, or function to return a new component `string` or actual `Component`.
- e.g. `<component v-bind:is="selectedComponent" />`

> This demostrates dynamically rendering the selected component, and how we can update which component gets rendered.

```html
<template>
  <div>
    <button @click="selectedComponent = 'PrimaryComponent'">
      Primary
    </button>
    <button @click="selectedComponent = 'SecondaryComponent'">
      Secondary
    </button>

    <component v-bind:is="selectedComponent"></component>
  </div>
</template>

<script>
import PrimaryComponent from './primary/PrimaryComponent.vue';
import SecondaryComponent from '.secondary/SecondaryComponent.vue';

export default {
  components: {
    PrimaryComponent,
    SecondaryComponent
  },
  data() {
    return {
      selectedComponent: 'PrimaryComponent'
    }
  }
}
</script>
```

This is a simple example of how we can utilize **dynamic components**. This technique can be very useful in many situaitions, especially when building complex User Interfaces and Single Page Applications. We can use many different methods to decide which component to render, the choice is really up to us.

> In fact, this concept is quite similar to what happens when we use `vue-router` to create multiple page SPA routes. In the same way that the `<component>` tag gets renders with the actual rendered component being passed into it, the Vue routers `<Route View />` component gets rendered as the route component being passed to it via the router.  
>
> _<sub>We will talk about the **Vue Router** and multi-route apps a bit further down the road, but for now just remember that these two aspects of Vue are quite similar in the ay they work.</sub>_

---

### **Keep Alive**

Now we have been getting comfortable using the awesome features of Vue such as the vue directives, single files components, and now dynamic components. But we have a problem... We may not have noticed right away but one hidden caveat may be causing us issue when using certain Vue features.

We can dynamically render a component with `v-if` or dynamically render multiple comonents with the `<component>` tag, which is good. But what happens to that component when its not being rendered?

**Lets think back to when we learned about `Lifecycle Hooks`...**

If we remember, the lifecycle of a component is the various stages of that components life. 

  - created
  - mounted
  - beforeUpdate
  - updated
  - beforeDestroy
  - destroyed

Whenever we remove a component from the DOM (not just hide via css display or `v-show`), the component at the end of its lifecycle calls `beforeDestroy` and `destroyed`. At this point all of our data and listeners are being 'torn down' and removed. So any state that may have been changed since is was rendered with being saved somehow, will be cleared and the original state will be loaded up when the component gets invoked and rendered to the DOM next.

#### Take this simple counter component for example...

_Parent Component_

```html
<template>
  <component is="Counter" />
</template>

<script>
import Counter from './components/Counter.vue';

export default {
  components: {
    Counter
  }
}
</script>
```

_Counter Component_

```html
<template>
  <div class="cmp-base">
    <h3>Counter: {{ count }}</h3>
    <button @click="count++">Plus One</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    };
  }
};
</script>
```

As it is now, if we are to remove this component from the DOM, any changes in the local state will get **cleared**. So if we were to increase our counter up to 5, then use `v-if` to conditionally remove the component, if we re-render it to the page, it will have the initial local state loaded in it, count being 0 again.

Sometimes, this wont matter, but other times this is **NOT** the behavior we want. We will want our state to persist, regardless of if the component being rendered or not.



Vue gives us such capability with its built-in component **`<keep-alive>`** tag.

  - Can only be used as a `<component>` tag wrapper, as of now.
  - Used to persist state in components that are being conditionally rendered inside the `<component>` tag.

_Parent Component_

```html
<template>
  <keep-alive>
    <component :is="selected" />
  </keep-alive>
</template>

<script>
import Counter from './components/Counter.vue';

export default {
  components: {
    Counter
  },
  data() {
    return {
      selected: 'Counter'
    }
  }
}
</script>
```

When using the `<keep-alive>` component, the Vue instance lifecycle gets altered slightly. Where typically a component has a `created()` and `destroyed()` lifecycle hooks, components wrapped in this special tag don't actually get destroyed and re-created, they get **activated** and **deactivated**. The afore mentioned lifecycle hooks get replaced with two new hooks called `actived()` and `deactivated()`, with the exception on a once called `created()` hook when Vue first renders the component.

**`activated()`**

- gets called when the component is being re-rendered from cached memory
- all local state remains in tact from previous render

**`deactivated()`**

- gets called when the component is being removed from the DOM
- the entire component gets cached in memory for instance re-rendering with updated state
