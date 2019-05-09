# Vue Basics - Episode 03

## **Vue Directives** _(continued)_

## Events and Input

---

## `V-On`

_Vue's built-in Event Handler_
> **[All About Events in Vue.js](https://alligator.io/vuejs/events/)**

- This directive has a full syntax `v-on:event="runFn($event)"` and shorthand syntax `@event="runFn($event)"`
- Allows us to listen for **DOM EVENTS** on our Vue instance.
- We can run inline evaluations, or call a more complex **method** whenever a listened-to event is fired.
- Vue proxies the `event` / `(e)` object from the **DOM EVENT** that was fired via our directive.
- We can access the **proxied event object** by passing **`$event`**
into the method being called.
  - We can even access the **`$event`** object inline as well!
  - i.e. `v-on:change="name.first = $event.target.value"`.
- Although we have access to the event object, it isn't required to use the directive. We can simply run a parameterless function if we want.
- **NOTE:** We must pass the proxied event object into the function as **`$event`** to get access to it. In the function we can call the parameter whatever we want. i.e. `$event -> (e)`
- You may have noticed that the **`v-on`** directive is a bit more complex looking than the previous directive we've looked at. Thats because there are a number of chainable enhancements that we get to use with this directive that make working with events in Vue, a breeze. Its really quite simple once you understand whats going on. So lets break it down a bit.

---

## **`v-on:keypress.prevent.enter="runFunction($event)"`**  

## **_v-directive_:_eventType_._eventModifier_._keyModifier_="_function_(_event object_)"**

---

**1. `v-on:`** [ DIRECTIVE ] _required_  
  This is the directive handler, the function caller that tells Vue that we are listening for an event on an element in the Vue Instance. -- _Also denoted as **@** for shorthand syntax_

**2. `keypress`**  [ DOM EVENT ] _required_  
  Here we can specify what type of event to listen for. We can listen to any of the native DOM events that are normally available to us.  
  **- - - SYNTAX EXAMPLES - - -**

- `v-on:click="..."`
- `v-on:dblclick.self="..."`
- `v-on:mousemove.shift="..."`
- `v-on:keydown.enter="..."`
- `v-on:input.ctrl="..."`
- `v-on:change="..."`
  
> _(by the way, whenever we see a _`...`_ in between some sort of bracket in documentation, it just means "DO SOMETHING HERE", unless its a `rest` or `spread` operator)_

---

**3. `.prevent`** [ EVENT MODIFIER ] _optional_  
  Often times when working with events, we need to _modify_ certain default behaviors for that event when they get fired. For instance, the **SUBMIT** event inheritly reloads the browser page when this event gets fired. This is clearly not the behavior we want in our applications though, and in Vanilla Javascript we would call the event method **event.preventDefault()** to stop the page from reloading.  
  **Event Modifiers** are built into the `v-on` directive in Vue and allow us to easily negate these behaviors like calling their origin functions.
    - [Learn more about Javascript DOM Events](https://eloquentjavascript.net/15_event.html)

- `.prevent === e.preventDefault()`  
  _stops the default behavior of the event being fired._
- `.stop === e.stopPropagation()`  
  _prevents the event from bubbling up the DOM tree. (event-upwards)_
- `.capture === capture: true`  
  _sets the event listener mode to **Capture** (top-downwards)_
- `.self`  
  _this modifier will prevent the event from firing unless the `$event.target` is the exact element the directive was placed on._  
  > _For example, imagine a `<button>` with a `v-on:click` attatched to it, and an inner `<span>` of text. The event will only fire when the outer `button` tag is clicked, and **will not** fire if the text span is clicked._
- `.once`  
  _sets the event specified to only be allowed to fire once, then the event listener gets destroyed by Vue_

---

**4. `.shift`** [ KEY MODIFIER ] _optional_  
When listening for **KEY** events, we will sometimes have to check what key is being pressed then based on that value do something or not. We might only want the _enter_ key to trigger a keypress event, instead of all of the keys. Vue again makes it super easy to listen for specific keys and has a number of built-in key modifiers already. Plus, if you need to add any, its quite simple using `Vue.config.keyCodes = keyCodeToEnable;`
Here is a list of Key Modifiers that come built into Vue.

| **KEY MODIFIER** | Key Code |
|--------------|----------|
| `.enter` | 13 |
| `.tab` | 9 |
| `.delete/bkspc` | 8 |
| `.esc` | 27 |
| `.space` | 32 |
| `.up` | 38 |
| `.down` | 40 |
| `.left` | 37 |
| `.right` | 39 |
|**SYSTEM MODIFIER KEYS** |
| `.ctrl` | 17 |
| `.alt` | 18 |
| `.shift` | 16 |
| `.meta` | 91 |
|**MOUSE MODIFIER KEYS** | _limits trigger to_ |
| `.left` | left mouse click
| `.middle` | middle mouse click
| `.right` | right mouse click
| **LIMITING** |
| `.exact` | _see below_

> _We can limit an event to be fired only when the **EXACT** key/mouse modifier condition is met, and will not fire anything elsewise._

**- - - FULL EXAMPLE - - -**

```html
<button v-on="sayHello($event)">Say Hey!</button>
<input type="text" @keypress="searchData($event.target.value)">
```

```js
const app = new Vue({
  data: {
    ourFunData: [
      //...
    ],
  },
  methods: {
    sayHello($event) {
      alert(`Hello World from the ${$event.target.tagName}!`)
    },
    searchData(e) {
      //...
    }
  }
})
```

> _Button is clicked, alert to the user "Hello World from the BUTTON!"_  

> _Text field receives input, run the search function with the value of the input as the parameter._

---

**5. `...="runFunction($event)"`** [ ARGUEMENT BODY ] _required - with exceptions_  
This final part can be thought of as the _callback_ for the directive. The code that will run when an event is fired. We can run a single evaluation inline here, or bind to a method on our Vue Instance that we want to run.

- We can pass in the `$event` object, or omit it.
- We can pass in multiple arguments to the function, if the function allows it.
- We can pass in static and dynamic variables as arguements as well.
- In special cases, we can even omit the **ARGUEMENT BODY** altogether and just make use of the **EVENT MODIFIERS**.
  - i.e. `<input type="submit" @submit.prevent>Sign Me Up!</input>`
  - If we were listening for the **submit** event another way, this will still prevent the default behavior of the event, even though we aren't running any code with the directive.
  - This is helpful since we aren't accessing the event object but still need to call `event.preventDefault()` essentially.

All of the talked about events and modifiers can more or less be chained together in any way possible to achieve the exact event listener we want to use.

---

## `V-Model`

Inspired by AngularJS, **`v-model`** is Vue's directive for **TWO WAY DATA BINDING**.  
> **[V-model in depth!](https://vuejs.org/v2/guide/forms.html)**

- Syntax: **`<input type="text" v-model="name.first">`**
- This essentially means that not only can we **`bind`** values to our template and attributes.
- We can also update that bound value if the input element receives input from a user.
- This is where it gets its _two way data binding_ name from:
  - outbound - binding data to an input.
  - inbound - updating that bound data when the input value updates.
- Vue handles what to do with the different types of inputs, behind the scenes.
- We are **not** limited in the types of inputs we can use either, and `v-model` works nicely with all of them.
  - Text
  - Password
  - Date
  - Textarea
  - Checkbox
  - Radio Button
  - Select
  - Color Picker
  - Tel
  - Search
  - Submit
  - and more...

> _When working with `v-model`, a hardcoded default value such as a `placeholder` or `selected` attribute in our HTML template will be ignored and will render as a blank value. To properly select our default value in Vue, we need to set the default value in our placeholder/selected attribute to exactly match the initial value in our data object that we are v-modeling.  

> _Vue will always treat the Vue instance data as the 'source of truth'. Meaning that we should declare the initial value via our data object._

### Lets take a look at a few of the more common inputs we will `v-model`

  | TYPE | PROP | EVENT |
  |------|------|-------|
  | text | value | `input` |
  | textarea | value | `input` |
  | checkbox | checked | `change` |
  | radio button | checked | `change` |
  | select | value | `change` |

- As a rough rule of thumb, we can assume that Vue will listen to either the `input` or `change` event for the rest of the inputs we can `v-model`.

### `V-Model Modifiers`

- Much like `v-on`, we have a couple on **modifiers** that we can chain onto our directive to help with processsing the inputs.
  - **`.lazy`** - using this will force Vue to listen to the `change` event versus the `input` event. This means it will only update the data property once the user input has ended.

## **Lifecycle Hooks**

> **[Vue.js Lifecycle Hooks Guide](https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks)**  
> **[Vue.js Lifecycle Hooks API Reference](https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks)**  
> **[Vue.js Lifecycle Hooks Diagram](https://vuejs.org/images/lifecycle.png)**

Lifecycle hooks are pre-defined methods that don't have any functionality to them, per se. They are essenetially functions that we can hook into at various points throughout the Vue instance's lifecycle.

- These functions don't have any logic on their own. _empty functions_
- They give us a place to run functions, make requests and more.
- There are **lifecycle hooks** throughout the entire lifecycle of a Vue instance.

| Lifecycle Hook | Called At |
|----------------|--------------|
| `beforeCreate()` | Immediately after the Instance has been initialized |
| `created()` | Immediately after the Instance has been created |
| `beforeMount()` | Right before the mounting begins, before calling `render` |
| `mounted()` | Right after the instance is mounted in at the entry point |
| `beforeUpdate()` | When data changes but before the DOM has been updated |
| `updated()` | Right after the DOM has been updated from a data change |
| `beforeDestroy()` | Right before the Vue instance is destroyed, still functional |
| `destroyed()` | Once the Vue instance has been completely disassembled |
| **Keep Alive Lifecycle Hooks** | _for use with `keep-alive` wrapper component_ |
| `deactivated()` | When the instance is deactivated but not destroyed |
| `activated()` | When the instance is activated but not created |
