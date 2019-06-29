# Vue Basic - Episode 09

## **Filters | Mixins | Refs**

---

### **Filters**

Filters are small micro functions we can write that will run on data being used in our templates and components via the **String Interpolation** syntax and `v-bind` directive. We can apply our filters by denoting the | pipe followed by the Filter name.

Some common use-cases for Filters would be

- Changing the text to all uppercase
- Changing the text to all lowercase
- Capitalizing all first letters of words
- Text manipulation and adjustment
- and more advanced functionality

**Template Syntax**

**String Interpolation:** `<span>{{ variable | myFilter }}</span>`

**V-Bind:** `v-bind="variable | myFilter"`

We can write filters locally in our _Single File Vue Components_ which will allow us to use the registered filters inside the local template, but not outside of it.

```html
<template>
  <div>
    <span>{{ firstName | uppercase }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: 'Sean',
    }
  },
  filters: {
    uppercase(value) {
      return value.toUpperCase();
    }
  },
}
</script>
```

Now this will render out to be...

```html
<div>
  <span>SEAN</span>
</div>
```

In addition to locally registered filters, we can also globally register our filters making them accessible from any of our Vue instances. This can be useful when we have a number of Filters that we want to use throughout our code base, while saving us from unnecessary duplicate code. To do so, we can extract our filters to thier own `.js` file which we can then import and pass into the main Vue instance.

```js
// filters.js
Vue.filter('uppercase', (value) => {
  if (!value) return;
  return value.toUpperCase()
})
Vue.filter('lowercase', (value) => {
  if (!value) return;
  return value.toLowerCase()
})


// main.js
import filters from './filters';

new Vue({
  render: h => h(App),
}).$mount('#app')

```

---

### **Mixins**

Mixins are re-useable piece of Vue Instances that can get 'mixed in' to other Vue instances. These can be very useful for a piece of data or function that needs to be on multiple components, without having to re-write the same code in different files. We can even globally register our Mixins to automatically be mixed into every Vue instance rendered.

**Global Syntax:** `Vue.mixin({ options object })`

**Object Literal Syntax:** `const mixinName = { options object }`

Lets start by writing a simple **mixin** that console logs a message saying "Hello from the _ComponentTag_".

```js
const mountedHello = {
  data() {
    return {
      msg: 'Hello from the mounted ',
    }
  },
  mounted() {
    console.log(this.msg + this.$options.componentTag)
  }
}
// if written in its own js file
export default mountedHello;
```

Now we can use that mixin in our components, if we register the mixin on it.

```html
<script>
export default {
  data() {
    return {
      abc: 'alpha beta cappa',
    }
  }
  mixins: ['mountedHello'],
}
</script>
```

And if we look at the our component, we will see it evaluated out to

```html
<script>
export default {
  data() {
    return {
      abc: 'alpha beta cappa',
      msg: 'Hello from the mounted ',
    }
  },
  mounted() {
    console.log(this.msg + this.$options.componentTag)
  }
}
</script>
```

---

### **Refs**

Refs are essentially a **reference** to a DOM element. Its basically Vue's equivalant to `document.getElementById()` where instead of targeting an element with the matching ID, Vue targets the element with the Ref attribute on it.

We can attach a ref to any element or component local to a specific Vue instance, we cannot target refs on other Vue instances. We use the special `ref=""` attribute on an element we want to target, and pass a reference name into the expression. Then we can easily target that DOM element using the `$refs` object on our Vue instance.

**Markup Syntax:** `<div ref="elem">Some Element</div>`

**Script Syntax:** `this.$refs.elem`

Now if we are to `console.log(this.$refs.elem)`, it will return that actual DOM element i.e. _`<div ref="elem">Some Element</div>`_ which can be very useful when needing access to an element or its potential children.

Being that it is a reference to a DOM element, we have the full power over that element like we would have using a vanilla document selector.

>_One thing to keep in mind when using this feature is that `$refs` are not evaluated fully until the `mounted()` lifecycle hook. Even though accessing `this.$refs` populates an object of element references, we cannot actually access them until the `mounted()` lifecycle occurs. Doing so before hand will return `undefined`._

Vue gives us this sweet shortcut, which is nice of them. :)

---
