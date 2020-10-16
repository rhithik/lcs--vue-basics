# Vue Basics - Episode 02

## **Vue Data Object**

> **[Vue.js Data API Reference](https://vuejs.org/v2/api/#data)**

- Holds the Data for the Vue Instance
  - Data object must be _plain_ and native objects/prototype props are ignored.
  - Should not contain any stateful behavior.

- When **Created**, Vue under-the-hood converts these Data properties to:
  - **Getter** properties
  - **Setter** properties

- After Vue observes the instance data at creation, we are unable to add additional reactive properties to it.
  - Its best to declare all your reactive properties upfront, before creating the Vue instance.
  - After being created, the original Data object can be accessed as `vm.$data`.
  - Using `Vue.set()` we are able to add new reactive properties after being observed (more advanced).

- The **`$`** refers to built-in properties of the Vue instance such as:
  - `vm.$data`
  - `vm.$el`
  - `vm.$children`

- Vue proxies all the user-defined properties on our instance (except those starting with `_` or `$`, and that _aren't_ built into Vue).
  - `vm.$data.a === vm.a`

- **WHEN DEFINING A COMPONENT**
  - The data object must be changed to a **Function** that immediately returns a new Object with the data properties contained in it.
  - This is to seperate the Data object if we are using this **Vue Component** more than once. _i.e. reusable components_, otherwise changes made on one of those renders of the vue component would reflect in all the renders of that component.
  - This also applies if we are creating a component via `Vue.extend()`.
  - We will talk more about this when we get to **Building Vue Components**.

---

## **Computed Properties**

> **[Computed Properties?!](aVideoLink.soon)**

- Essentially properties that get computed based on our **reactive** data properties and returns the computed value as a new data property.
  - Good for doing computations and processing data for the vue instance.
  - Computed properties also cache their returned values, which significantly reduces computational expenses.
- Computed properties can be bound using _Vue Directives_ just the same as properties in our Data object (we will talk about directives shortly).
- A computed property will only re-evaluate when Vue detects that one of the computed properties dependants has changed.
- Why Computed?
  - Because it optimizes and improves performance and proficiency automatically and under-the-hood.

---

## **Methods**

> **[Vue.js Methods API Reference](https://vuejs.org/v2/api/#methods)**

- Functions that we define on our Vue instance to be used anywhere throughout the instance.
  - these functions run every time the instance has a re-render, unless otherwise specified.
  - we can set up the same logic that we have in our computed properties, but because computed properties cache their return values and normal methods don't, it's best to use computed properties whenever possible.
  - Methods can be used in our text-interpolation expressions, as long as they are invoked as such with `()`.

---

## **Watchers**

> **[Watchers Explained...?](https://flaviocopes.com/vue-watchers/)**

- Watch functions need to be named the name of the property they are _watching_
  - i.e. `data.name` watcher would need to be called `name(){...}`
  - watch functions have 2 parameters avaiable to access, the new value and the old value
    - i.e. `name(newValue, oldValue){...}`
    - `newValue` - the first parameter passed in by vue, consists of the updated value of the watched data property after some sort of value-changing event.
    - `oldValue` - the second parameter passed in by vue, consists of the old value of the watched data property after some sort of value-changing event.
    - these can be named anything, `newValue oldValue` is a standard convention.

- When we need to use a more generic type of watching-then-updating for our data, we can use Vue **Watchers**
  - Watchers are best used for performing **Ascynronous** tasks such as an API Call, or loading a large dataset into the vue instance.
  - Not recommended for most cases because the watch functions always run on any change or render.
  - Watchers are not optimized and are not very performant for handling computational tasks.
  - Setting up a watcher on a data property that is an object requires a bit more set up.
    - We need to set the watcher as `deep:`**`true`** so that Vue knows to 'deep watch' that property.
    - If any of the nested properties change, it will trigger the watch function.
    - This will also require a `handler()` function where we sit the function body.

---

## **Vue Directives**

- Directives are what gives Vue some of it's most awesome power.
- Vue Directives are best thought of as **micro-functions** that perform certain tasks to help build out and render dynamic content much easier.
- Vue comes with a number of baked in directives, and we can also create our own _custom directives_ as well.
- We can bind values from our Data object using `v-bind` for instance, to any element, attribute or component/prop in the vue instance to dynamically insert the bound data value to the bound-to item.

_Here are a number of the most common vue directives we will always reach for when working with Vue._

---

### **Content Updaters**

- **`v-text`**
  - Targets the attached-to elements `textContent` and sets its value to the value passed into the directive params
  - Vue by default - escapes all HTML when rendering text, for uses requiring the opposite action, we use `v-html`

```html
  <h1 v-text="name.first"></h1> -> <h1>John</h1>
```

```js
  const app = new Vue({
    data: {
      name: {
        first: 'John',
        last: 'Doe'
      }
    }
  })
```

- **`v-html`** 
  - Targets the attached-to elements `innerHTML` and sets its value as the HTML
  - Parses full HTML and renders it as it normally would render HTML
  - If HTML is provided to anything other than `v-html`, it will render as a plain text string
    - !!CAREFUL - `v-html` can leave your code open to XSS attacks (cross site scripting)

```html
  <li v-html="url"></li> -> <li>Click to visit Vue</li>
```

```js
  const app = new Vue({
    data: {
      url: '<a href="https://vuejs.org">Click to visit Vue!</a>'
    }
  })
```

---

### **Conditional Display**

- **`v-show`**
  - Targets the attatched-to elements CSS display property as `display:block` / `display:none` based on the truthyness of the provided value, or evaluated expression
  - Works well when adding transitions or animations to the display change

```html
  <span v-show="elementIsShown"> Now you See Me </span> -> will display element
  <span v-show="secondElementShown"> Now you dont! </span> -> will NOT display element
  <span v-show="5 + 5"> Or do you? </span> -> will display element
  <span v-show="0 || zeroValue"> false, it should be false </span> -> will NOT display element
```

```js
  const app = new Vue({
    data: {
      elementIsShown: true,
      secondElementShown: false,
      zeroValue: 0
    }
  })
```

---

### **Conditional Rendering**

- **`v-if`**
  - used to conditionally render/remove elements to/from the DOM when the provided expression evaluates to a truthy/falsy value.
  - can be used by itself or in conjunction with other directives `v-else-if` or `v-else` as a common conditional statement would.
  - requires a condition or value passed into it as an arguement.

- **`v-else-if`**
  - as with vanilla JS conditionals, `else-if` is the optional secondary part of a conditional statement, which Vue has harnessed in its own way.
  - available in Vue 2.6.0+, provides additional conditional logic sets to potentially be met.
  - can only be used in between a `v-if` and `v-else` statement.
  - requires a condition or value passed into it as an arguement.
  
- **`v-else`**
  - used to set an element or component as the `else` conditional in a `v-if` statement.
  - can only be used in conjunction between the `v-if` and `v-else-if` directives.
  - `v-else` is an **empty** directive, which means it doesn't require or accept any arguements.

```html
<h1 v-if="!isNewUser && isAdmin">Welcome Back, Boss</h1>
<h1 v-else-if="!isNewUser && !isAdmin">Welcome Back, User</h1>
<h1 v-else>Welcome New User</h1>
```

```js
const app = new Vue({
  data: {
    isNewUser: false,
    isAdmin: true
  }
})
```

- **`v-for`**
  - Vue's handle on `for` loops. i.e. `v-for="item in items"`
  - dynamically renders an element or component multiple times depending on the data passed into it.
  - `v-for` works like a `forEach` higher order function.
    - the first implicit parameter is the item currently being iterated over.
    - the second implicit parameter is the current `index` of the iteration.
  - flexible in rendering based on the provided data.
    - it accepts hardcoded values as well as data sets.
    - `v-for="number in 5"` will render an element or component `5` times.
  - inside each rendered item, we have access to the properties on that specific iteration, just like a normal `forEach` or `map` would have.

```html
<ul>
  <li v-for="(friend, index) in friends">
    <span>{{ index }}</span>
    <span>{{ friend.name }}</span>
  </li>
</ul>
```

```js
const app = new Vue({
  data: {
    friends: [
      { name: 'JoshuaFerr1s' },
      { name: 'Saahti Maati' },
      { name: 'javascript_love' },
    ]
}})
```
**- - - WILL RENDER AS - - -**

```html
<ul>
  <li>
    <span>0</span>
    <span>JoshuaFerr1s</span>
  </li>
  <li>
    <span>1</span>
    <span>Saahti Maati</span>
  </li>
  <li>
    <span>2</span>
    <span>javascript_love</span>
  </li>
</ul>
```

---

### **Dynamically Bound Data**

- **`v-bind`**
  - This directive has a full syntax `v-bind:class="..."` and shorthand syntax `:class="..."`
  - We can bind our data and computed properties on a vue instance to html attributes in our markup(template).
    - We can even pass a method into the attribute, as long as whatever we pass into it evaluates out to a **string**.
  - This allows us to dynamically update the values passed into the attributes whenever that data changes or function runs.
  - **The HTML attribute `class` for applying CSS classes, and `style` for applying inline styles have special enhancements when `v-bind`ing to them.**
  - These attributes accept not only _strings_, but also **Arrays** and **Objects**.
    - When passing in an _Array_, we can use a combination of _strings_, _data properties_, _methods_, and even _objects_ as long as they evaluate out to a singular _string_ per array entry.
      - We can also use **Ternary** statements inside of the array to conditionally apply a specific class or not, or a different class altogether.
      - Multiple ternary statements inside the array can become overly-verbose so its best to use only one, and switch to an _Object_ where the classes are being applied based on the truthyness of the value assigned to that property.
      - In the example below we have a normal **string[0]**, **data property[1]**, **conditional object[2]**, **ternary statement[3]**.
      - These are all valid array entries for `v-bind`ing to the _class_ attribute.

      ```html
      <div v-bind:class="['user', levelClass, { active: isActive}, isMod ? modClass : '']"
      ```

      ```js
      const app = new Vue({
        data: {
          levelClass: 'beginner',
          modClass: 'moderator',
          isActive: true,
          isMod: false,
        }
      })
      ```

    - When passing in an _Object_, we can use `key-value` object syntax to conditionally apply classes based on the values of the keys.
      - Creating a `classObject` as a computed property you can update the values when the dependant data updates
      - We can them just apply the `classObject` as a singular entry in the bound class attribute.
      - Classes that have a dash in them need to be enclosed in quotes to signify its a key string.

      ```html
      <div v-bind:class="{ active: isActive, moderator: isMod, 'text-success': isActive }"></div>
      ```

      ```js
      const app = new Vue({
        data: {
          levelClass: 'beginner',
          modClass: 'moderatehare',
          isActive: true,
          isMod: false,
        }
      })
      ```

      **- - - EXTRACTED TO - - -**

      ```html
      <div :class="classObject"></div>
      ```

      ```js
      const app = new Vue({
        data: {
          levelClass: 'beginner',
          modClass: 'moderatehare',
          isActive: true,
          isMod: false,
        },
        computed: {
          classObject() {
            return {
              active: isActive,
              moderator: isMod,
              'text-success': isActive
            }
          }
        }
      })
      ```

    - When `v-bind`ing to the **style** attribute, it follows very similar syntax as binding to _class_.
    - Instead of class names, we use data and inline styles that evaluate to a `key-value` css property.
      - Both the `key` and the `value` can be hardcoded or dynamic, as long as the end result is a valid CSS property.
    - `v-bind`ing to the style attribute gives us the ability to adjust styles that would not be practical to adjust using classes.
      - Some examples would be `width/height`, `flex amounts`, `positioning`, and more.

    ```html
    <div :style="{ flex: userSetFlex, height: userSetHieght }">
    ```

    ```js
    const app = new Vue({
      data: {
        userSetFlex: 4,
        userSetHeight: 300
      }
    })
    ```

---

### **Events and Inputs** [next week]

- **`v-on`**
- **`v-model`**

---

## **Vue.js Developer Tools**
> **[Vue Devtools - Chrome](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en)**
A Vue tailored version of the chrome devtools for debugging and developing Vue applications.

- Shows your app structure and design with a components and elements tree, much like the html inspector.
- Shows the details of a selected Vue Instance.
- Displays Vuex state management and app state
  - Can rewind and commit each state change to the DOM
- Event tracker for viewing event handler actions
- Shows application routes and browse mode
- Summarizes appliction performance
- Settings tabs for further customization
