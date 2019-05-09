# Vue Basics - Episode 04

## **Vue CLI and Overview**

---

So far, we have looked at some of the core fundementals of Vue.js and already, we can see how powerful and flexible this awesome framework is. Vue truly is incrementally adoptable which makes it incredibly versatile! But we have only just scratched the surface, so let's dive in deeper!

> _progress past this point will require `node.js`, a javascript runtime built on Chrome's V8 engine_  
<sup><sub>download the latest version of [node.js](https://nodejs.org/en/)</sub></sup>

---

## **Introducing the Vue CLI**

> **[Vue CLI Official Guide and Documentation](https://cli.vuejs.org/)**

The Vue CLI gives the us the ability to decrease our development time of Vue applications exponentially. We gain access to a number of features that aren't available using Vue as a plugin, such as...

- Easily scaffold out Vue projects with presets.
- Set project defaults such as
  - Babel
  - Eslint
  - CSS Preprocessor
- Pull in Vue Ecosystem resources
  - Vue Router
  - Vuex State Management
  - Typescript Support
  - Progressive Web App Support
  - Unit Testing
    - Jest Support
    - Mocha Support
  - E2E Testing
- Extendable via plugins
- Built in script commands
  - `run serve` - run the development server with hot reloading
  - `run build` - compiles and builds app into optimized code bundle
- Access to commonJS modules
- Full syntax highlighting

To get started, we first need to install the Vue CLI. We can do so using `npm` or `yarn`.

> `npm install -g @vue/cli`  
or  
`yarn global add @vue/cli`

When that finishes, it's best to check that it installed properly by running `vue -v`

**Lets start a new Vue project!**

- Run the Vue CLI via `vue create [project-name]`
- Select a project preset, or manually select features
  - To keep things simple for now, let's just choose `Babel` and `Linting/Formatting` 
  - **Babel** for compiling down to ES5 code - so we can use es6+ features of Javascript without the support limitations.
  - **Linting** for syntax error checking / code quality - Vue has a few industry standard rule sets to choose from, and we can always modify them if need be.
- Go ahead and save that as a preset for future projects if you like.

- Vue CLI also has a **GUI** available to use for starting new projects as well, this can be an easier approach than using the command line for some people. So make sure to check it out via command `vue ui`.

- Once Vue CLI has done it's thing, we should have a brand new, fully scaffolded out Vue.js project to start working in.

> <sup><sub>_Now it may look intimidating and overwhelming at first, seeing so many folders and files tha you've probably not had much or any experience with, thats okay. A lot of these generated files are strictly there for configuration and settings for Vue's functionality. In most cases, we won't ever have to touch them. So don't worry!_</sub></sup>

---

## **Vue.js Overview** - _via Vue CLI_

Developing in this workflow also us to build much larger and more complex applications by creating modularity, reusability, and optimization.

> Now that we have our project initialized, we can begin building looking around at how a full blown Vue application works and is set up. Right away we can `CD` into our new Vue project folder, and run `npm run serve`. This will spin up the integrated _webpack-dev-server_ and load our app in `development mode` at `localhost:8080`.

**Welcome to the Vue.js Hello World Example!**

Inside our project we can see that there are two folders that get created - `public`, and `src`. Along-side those we have our `node_modules`, `package.json/package-lock.json` or `yarn.lock` depending on our package manager, our `.gitignore` file, babel `config` file since we selected babel, and a `README.md`.

- **PUBLIC** - contains our public facing app files
  - `index.html` - our root html file, this is where Vue.js will be mounted
  - `/dist` - when we compile our app using `run build`, this folder will be generated containing our bundle chunks.
  - `favicon.ico` - An included Vue favicon, which we can swap out at any time. _But who doesn't want to use an awesome Vue favicon?_
- **SRC** - contains the source code files of our project
  - **`/assets`** - contains all of our static assets such as **CSS Files, Images, Custom Fonts, Datasets, etc...** and will typically be scaffolded out additionally as:

  ```fx
  /assets
    /css
      main.css
      utility.css
    /img
      logo.jpg
      hero_image.jpg
    /custom
  ```

  - **`/components`** - contains our **Vue Components**, we will have many components in our projects so further scaffold of the folder structure is reccomended over keeping everything at the top level. An example would look like:
  
  ```fx
  /components
    /navbar
      /navbar-brand
        Navbar_Brand.vue
      /navbar-item
        Navbar_Item.vue
      Navbar.vue
    /hero
      Hero.vue
    /blog-grid
      /blog-item
        Blog_Item.vue
      Blog_Grid.vue
  ```

  - **`App.vue`** - our main Vue Instance, the root component that we build out from. We can think of this as our **index.vue** file, since everything will live inside this component. The App.vue file is special in that it has the `el` property to specify the mounting-point element inside **/public/index.html**. When we run our development server, or compile (build) our production bundle, this is where Vue.js gets injected into the index.html via JavaScript.

  - **`main.js`** - the connection point between the `App.vue` and the `index.html`. Here we import `Vue`, import `App.vue`, and run Vue's **render** function that takes our Vue app, and renders it then injects it into the specified entrypoint native Javascript. This is also where we can set `Vue.config` settings, declare global Vue instances, components, directives, filters, etc.

> Now that we have a bit of familiarity with the overall structure of our new Vue project, lets take a closer look at the heart of the beast! **Single File Components**! App.vue is an SFC although being a special case since it is treated as the **root** Vue instance. But beyond that, we have powerful and fully functional Vue components to create amazing and optimized apps!

---

## **A Breakdown of Vue Single File Components**

> **[Introduction to Vue Single File Components](https://vuejs.org/v2/guide/single-file-components.html)**

Vue.js Single File Components (`*.vue`) are a special custom file type built for Vue. We can build our components and keep everything contained inside each vue file. When we build apps, we will usually have a feature, a main component for that feature, which can contain any number of child components inside it. They are all just Vue components, no distinction other than their DOM heirarchy.  

Vue.js and modern frameworks in general have a bit of a different approach to the concept of **seperation of concerns**, where-as tradionally it was thought of as keeping our _html_, _css_, and _js_ seperate from each other and in their own files. With **reactive** frameworks and the increasing complexity of apps being developed, this is not practical approach and can cause huge maintainability issues when trying to work this way in Vue. Thats why we need to **shift our thinking** from seperating the languages, over to seperating the components.

### **Anatomy of a Vue.js Single File Component**

There are 3 sections that make up a Vue Component, a template, script and style tag. Although the style tag is technically not required if not needed. and the basic build of a black Vue SFC will look like this..

```html
<template>

</templete>

<script>

</script>

<style>

</style>
```

---

### **TEMPLATE**

```html
<template>
  <div class="blog-post">
    <span class="post-title">{{ title }}</span>
    <span class="post-date" v-if="date">{{ date }}</span>
    <div class="post-content">{{ content }}
    </div>
    <ul>
      <li v-for="item in list">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
```

the section where we write the **HTML** of our component, and use Vue.js to enhance and make it dynamic.

- the `<template>` tag does not get rendered in the DOM and essentially acts as a wrapper for our component markup.
- the `<template>` tag is **required** when using the Vue templating system.
- each Vue instance can only contain **ONE** root element.

```html
<template>
  <div>Content Item 1</div>
  <div>Content Item 2</div>
</template>
```

**This is not valid Vue syntax***

```html
<template>
  <div>
    <div>Content Item 1</div>
    <div>Content Item 2</div>
  </div>
</template>
```

Instead, wrap the desired root elements in a div wrapper that will act as the new singular root element. Not ideal an ideal solution. Also, using `v-for` in **not** valid on the root element, since it will render multiple elements. We can, in theory have multiple root nodes if using `v-if`, as long as it renders out to a singular root node.*

> ***This will be changing in Vue.js 3.0, and we will be allowed to have multiple root elements!**

- The template can take a `lang` attribute passed in to use other template languages such as `pug`
  - i.e. `<template lang="pug"></template>`

---

### **SCRIPT**

```html
<script>
export default {
  data() {
    return {
      //...
    },
  }
  components: {
    'component-name': ComponentName,
    'another-component': AnotherComponent,
  },
  props: ['firstProp', 'secondProp'],
  computed: {
    computeSomething() {
      //...
    }
  },
  methods: {
    makeRequest() {
      //...
    }
  },
  watch: {
    //...
  },
  created() {
    console.log('instance created');
  },
  mounted() {
    console.log('instance mounted');
  },
};
</script>

```

this section is essentially our Vue instance. The `export default {}` is our instance object. Inside of this object we will write all of our Vue instance code such as our data and computed properties, methods, watchers, lifecycle hooks, and a couple of new features that we haven't really touched on much yet, **Components and Props**.


**Don't worry, we will come back to these **crucial** aspects of Vue very soon!**

---

### **STYLE**

```html
<style scoped>
.blog-post {
  /*...*/
}
.post-title {
  /*...*/
}
.post-date {
  /*...*/
}
.post-content {
  /*...*/
}
</style>

```

We work with CSS in Vue just like we normally would. Vue also has support for the major **CSS Preprocessors / Style Languages** and we can set that either globally when initializing a project, or in the `style` tag by applying a `lang` attribute.

`<style lang="sass">...</style>`

There is a major benefit that we get built into Vue that we get to utilize when working with CSS in Vue, we get truly **SCOPED CSS!** By adding the `scoped` attribute to our opening `style` tag, Vue will behind-the-scenes literally scope the styles of that SFC to only be applied to elements in that SFC.

`<style scoped>...</style>`

Yes, this means that in multiple components, we can have the same css class names in our style sections. As long as we remember to **scope** the style section of our SFC, the styles won't interfere with each other and we dont have to worry about namespace collisions either!

---

I encourage you to explore this new work flow and try making some changes, adding some elements, data, directives, and anything else we've learned about so far. Venture into the docs and keep going if you're feeling adventurous!

Although we have learned about Vue Single File Components, we have yet to put all the pieces together and see how **Components and Props** work in Vue.js to create an awesome application! We will look at this **next!**
