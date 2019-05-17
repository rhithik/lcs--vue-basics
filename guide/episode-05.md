# Vue Basics - Episode 05

## **Components and Props**

---

We have learned a lot about the fundamentals of Vue.js and are able to make some pretty neat things with it. (yes, 'things' is a technical term..) We are still missing some very important building blocks for building Vue.js apps, and those are **Components** and **Props**. Now we are going to learn all about building components, using props in components, and the **Parent-Child Data Relationship** that ties everything together!

---

### **COMPONENTS**

> **[Intro to Components](https://vuejs.org/v2/guide/components.html)**

Components are our javascript lego-pieces, our building blocks that we use to compose full apps by combining and structuring these pieces together in optimal and modular ways based on feature and application requirements. Vue.js gets its influence of Component/Prop concepts from _React.js_ and _Angular2_.

> **To get a better understanding of why we use components, we must first understand the structure of a website or application.**

Applications are usually quite large and have a number of many different features and views that make up the app. These different parts can be broken up to smaller, more efficient, and modular pieces that can help to abstract away levels of obstrusive layering. This also makes our code easier to read, reason about, and write. Lets take a look at what this might look like visually.

**PseudoStructure** - Source: Vue.js Docs
<img src="./Vue.js Component Tree Model (Adapted).png" />

In this example we have a basic webpage containing a few sections.
The top node of the diagram is the page container component. These components act as a top-level container for our app.

- This is often referred to as a `View` when building multi-page apps.
- A `View` is just a component but it acts as our page skeleton.
- Sometimes you will see a `/views` directory in larger projects.
- In Single-Page apps (SPA's), the `View` or page container component stays in tact, while it's child components update dynamically.
- We know a good example for this type of `root` level component quite well already, `App.vue`.

The next tier of components we have are our main sections. These are usually thought of as the top-level of a feature component-tree. These can also be reasoned about based on it's purpose in the layout of the app or webpage.

- **Header**  
  This component makes up the `app header`, a common part of layouts for housing visual branding and navigation components such as a `Navbar`.

- **Main Content**  
  Here we have a 'News Feed' type of component that has it's own set of **nested components** that make up our _feature_.  

  These nested components would be each News Item in the feed. We can make this child component reusable and combine it with our `v-for` directive to dynamically generate the content items, with minimal code as well.

- **Sidebar**  
  Much like the Main Content component tree, we have a Sidebar component tree. For instance, we have an Grid Gallery component. This grid also has nested components that make up the content, and again we can make these dynamic and reusable.


> This is just a simple example, but we can see how greatly improved our code becomes using these patterns of development. Whereas we would need each and every element hardcoded in HTML then updating the content with vanilla javascript, we can see where monolithic files and code-bases come from so quickly. Vue helps to keep our code clean, simple, and dry by utilizing its many ways to modularize and optimize our apps.
  
### **DECLARING/REGISTERING COMPONENTS**

There are two methods of declaring Vue components. We can either declare a component **globally**, or we can declare it **locally**. Each way has some benefits and draw backs...

#### Globally Declared/Registered Components

> **[Vue.component( ) API](https://vuejs.org/v2/api/#Vue-component)**  
**[Registering Components Globally](https://vuejs.org/v2/guide/components-registration.html#Global-Registration)**

- We can use the Vue api to declare and register comonents globally.
- All of our components will have access to these components
- Good for reuseable, generic components such as a `custom input`, or `user-alert`.
- This method takes two arguments to declare a component.
  - `String` | to be used as the component name - first argument.
  - `Object` | options object were we write our Vue instance options.
- Declaring components this way requires us to use the object property `template` for our markup, instead of having access to a template block like in SFC's.
  - This must be a String of markup that will be rendered on $mount.
- Data **must still** be a function that returns a new object.
- We alos **do not** get access to a style block, so style classes must live in a css file or inline.

> Check out the following example for a _global user message_ declared in our `main.js` file.

```js
Vue.component('component-name', {
  data() {
    return {
      msg: {
        type: 'error',
        text: 'An error has occured',
      }
    }
  },
  methods: {
    someMethod(){
      // ...
    }
  },
  template: `<div :class="[msg.type, 'msg--base']" v-if="msg.showMsg">{{msg.text}}</div>`,
})
```

_There are cases where a globally declared component is needed, but it is recommened best practice to declare components in their own `.vue` files and register them to parent components locally._

#### Locally Registered Components

> **[Registering Components Locally](https://vuejs.org/v2/guide/components-registration.html#Module-Systems)**

When we want to go the route of local component use, we go about it a little differently than globally registered components. We use our Vue Single File Components locally by first importing the desired component into another component, then registering it on the current component. After that is finsihed we can use our new child component in our template where ever and however many times we want!

**_But how is this done?_**

Our Vue Instance has a components object that we can use to register our imported components. There is a couple ways to register a component...

- PascalCase - register the component using PacalCase. Vue behind the scenes will convert this to the all-lowercase kebab-case that will be valid HTML for custom elements.
- Kebab-Case - register the component using kebab-case. This is what Vue does behind the scenes when using PascalCase by default, but using kebab-casing allows us to customize the name of the component when using it in the template.

```html
<template>
  <div>
    <component-name />
  </div>
</template>

<script>
// We use PascalCase when importing our components, which is recommended by Vue.
import ComponentName from './components/feature/feature-item/ComponentName';


// Using PascalCase and ES6 Obj. property shorthand.
export default {
  components: {
    ComponentName
  }
}
</script>
```

```html
<template>
  <div>
    <component--name />
    <whatever-we-want-it-named />
  </div>
</template>

<script>
import ComponentName from './components/feature/feature-item/ComponentName';
import ComponentDesc from './components/feature/feature-item2/ComponentDesc';

// Using a customized register name with Kebab-Case, if we need to follow naming conventions for instance.
export default {
  components: {
    'component--name': ComponentName
    'whatever-we-want-it-named': ComponentDesc
  }
}
</script>
```

> Importing and registering components this way is known as `modularization`. We are creating modules of components based on their functionality and feature set, which in turn helps to keep our code base clean and organized.

Components by themselves are good and we can build some cool features using them. But we are still missing a crucial piece to really be able to build off of eachother. Components aren't meant to be closed off to the rest of the app and often times we need to use our data throughout these components and component trees.

We communicate Vue instance data to child components on that Vue instance using what are known as **`PROPS`**.

---

### **PROPS**

> **[Passing Data with Props](https://vuejs.org/v2/guide/components-props.html)**

Props are like connections between parent and child components. We use `props` to pass `data` from a parent component, down to a child (nested) component. We utilize props as if they are custom `attributes` on an element. These `attributes` in turn pass their values into the Vue Instance (Component) they are attatched to.

There are two aspects to using `props` that we must stay aware of in Vue.

> **Sending Parent Component**

```html
<!-- we have our news-item component that we
     are passing props to from our data object -->
<!-- we use v-bind : to set the value dynamically 
     otherwise value gets treated as a string -->
<template>
  <news-item 
    :headline="newsItem.headline"
    :date="newsItem.date"
    :details="newsItem.details"
    hardcoded="this is a static prop"
  />
</template>

<script>
import NewsItem from './newsItem';

export default {
  data() {
    return {
      newsItem: {
        headline: 'Javascript takes over the world!',
        date: '2019-5-15',
        details: {
          source: 'The Daily Blabity',
          author: ['john', 'steve', 'bobby'],
          content: '...',
        },
      }
    }
  },
  components: {
    'news-item': NewsItem,
  }
}
</script>
```

> **Recieving Child Component**

```html
<template>
  <div class="news-item">
    <h1 class="headline">{{ headline }}</h1>
    <span class="date">{{ date }}</span>
    <div class="content">{{ details.content }}</div>
  </div>
</template>

<script>
export default {
  // for basic prop registration, we can use the array syntax, 

  props: ['headline', 'date', 'details'],
}
</script>

```

Props must be named the same on the sending parent component as they are on the recieving child component. When we send a `prop` to a child component via custom attributes, there are couple of things we should keep in mind.

- must be formatted in kebab-case for valid HTML
- can only be passed to child components. (one-way)
- are `read-only`, and should be treated as so.
- values can be either static. (hardcoded)
- will be dynamic most of the time. (`v-bind`)
- don't have a limit on how many can be passed.
- can accept any data type
  - `String`
  - `Number`
  - `Boolean`
  - `Array`
  - `Object`
  - `Function`
  - `Symbol`

_Inside the child component we can register our props on the Vue instance in one of two syntax conventions._

**Array Syntax**

```js
props: ['prop-one', 'prop-two', 'prop-three']
```

The array syntax is used for basic prop registration, where each expected prop is an entry in the Array as a `String`. Vue knows what types and values are contained inside these props which allows us to still target nested properties in a certain prop. This is good for simple uses but for more complex and finite control over our props being passed in, we are recommended to use the `object syntax`.

**Object Syntax**

```js
props: {
  propOne: {
    type: String,
    required: true,
    default: 'a default value',
  },
  propTwo: {
    type: [String, Number],
    default: 100,
  },
  propThree: {
    type: Object,
    default: function() {
      return {
        type: 'success',
        message: 'Hello World!',
      }
    }
  },
  propFour: {
    validate: function(val) {
      return ['valOne', 'valTwo', 'valThree'].indexOf(val) !== -1;
    }
  }
}
```
The object syntax is used for getting much more finite control and validation of our props. Instead of each prop being a string inside of an array, `props` becomes an object with each prop being a nested object.

Inside of each prop object are some properties we can set for validation.

- Type
  - Specify the data type that the prop should be
  - If prop can be multiple types, we can use an array of accepted types
- Required
  - Boolean value to specify that the prop is required.
  - Defaults to false when not being used
- Default
  - Sets a default fallback value if none is provided
  - Must be the same type as the prop type.
  - default Objects must be made using a factory function.
    - needs to return a new object, like the `data()` function
- Validation
  - Run a function to perform validation checks against the values being passed in.

Prop validation is mainly used for making sure that we are in fact recieving the proper data to our components and helps us to prevent breaking errors, as well as explicit control of the types and requirements of the values being passed in.

---

Next episode we will learn about some cool built in features we can utilize when working with components in Vue, such as slots, custom events, dynamic components and more.
