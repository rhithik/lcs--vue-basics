# Vue Basics - _Episode 10_

## Intro to Vuex | Vuex Store

Awesome! We have gotten to the point where we run into the problems of trying to manage our app state across a barrage of component trees and app features. In doing so, we have more-than-likely overused `props` to pass state down to child components, and in turn, `custom events` if need be to pass data back upwards..

Now, as we've discussed previously, there is nothing wrong with using `props` in tandem with `custom events`. Within reason, and assuming we are keeping our logic **maintainable**. We as Vue.js developers come to a point where working with internal app state alone, just isn't cutting it.

### _How do we fix this maintainability problem?_

## One Word. **VUEX!**

Vuex in a nutshell, allows us to extract all of our app state to a single source, also known as our ++single source of truth++.

This means that instead of holding various sections of state inside multiple components as their root home, this same state gets moved to the **Store** and can be accessed using a number of different methods and logic chains.

---

## Introducing Vuex

When we use Vuex, the majority of our state logic gets extracted to our **`Store`**. The Vuex Store gives us an `object-based` api in which we can use to

- contains our app data as reactive object properties **(state)**
- retrieve our data via functions that return the value **(getters)**
- perform async and/or preliminary data-change operations **(actions)**
- perform business logic and commit updated changes to our data **(mutations)**

### Vuex Core Concepts

- `state`
- `getters`
- `actions`
- `mutations`

These are the four fundamental operation objects that we can use while working with `Vuex`.

### **STATE**

State is where all of our data will live. This can essentially be thought of as a culmination of all of our apps data objects throughout our components. All of the properties stored inside the `state` object are reactive in the same way as they would be inside a VUe instance.

```js
state: {
  user: {
    first: 'Sean'
    last: 'imNotGivingMyNameToAMachine',
    ref: {
      show: 'futurama',
      character: 'Bender',
    },
    age: 27,
    isAwesome: true,
  },
  content: {
    faveBands: [
      'system of a down',
      'incubus',
      'tool',
      'linkin park (pre M2M)',
      'korn',
      'children of bodom (with roope)',
    ],
    tagline: 'Keep Coding and Stay Awesome',
  }
}
```

### **GETTERS**

The Getters object is where we write functions that we can call inside of our Vue instances. The returned value of these fuctions are the values of the properties we are accessing. Getters automatically recieve the `state` object as the first parameter, access a specified property inside `state` and returns that value to be used inside Vue.

> By default, getters are read-only properties, although we can change that for more in-depth examples, which we will cover soon.  
<sub>_we will be using es6 arrow Fn syntax and implicit returns in the following examples_</sub>

```js
getters: {
  getUserInfo: state => state.user,
  getFaveBands: state => state.content.faveBands,
}
```

So what if we need more parameters like an index or ID?

We can pass in additional arguements to our getter functions quite easily. We simply need to add an additional arrow parameter.

```js
getters: {
  getFaveBand: state => index => state.content.faveBands[index],
  //... [additional getters]
}
```

> This would be the same as writing...

```js
getters: {
  function(state, index) {
    return state.content.faveBands[index]
  }
  //... [additional getters]
}
```

### **ACTIONS**

Actions are functions that we can write for performing async tasks using the data being passed into the action method from wherever it's being called from, inside a Vue component. Actions are a great place to fetch external resources from other servers, asyncronously. This is also where we can perform cetain business logic depending on the nature of the action, although its best practice to keep our business logic inside of our `mutations`.

Vuex automatically passes in the `context` object into out actions as the first arguement. This context object gives us access to a number of methods we can call. The most common property of the context object that we will use is the `commit` function. The `commit` function is how we call mutations. We commit a mutation to state, in other wordsm we call an action to perform changes on data passed through from Vue, to be commited to our Vuex state.

_we commit mutations to state via actions_

Actions only accept 2 parameters with the first parameter being the context object and the second param being our payload.

Our `payload` is either a single variable or an object that gets passed into an action via a Vue instance.

The way we go about calling `mutations` from actions is by using the `commit()` method inside the `context` object. The first arguement we pass into this method is a string of the name of the mutation we want to call. We can pass our `payload` through to mutations by adding it as a second argument to the `context.commit` method on our actions.

```js
actions: {
  saveUpdatedName(context, payload) {
    context.commit('saveUpdatedName', payload)
  },
  //... [ADDITIONAL ACTIONS]
}
```

We can take advantage of es6 object destructuring to make our code even cleaner. Therefore being able to call `commit1 directly versus as an object method. This doesn't affect our code in any way other than improving performance and readability.

```js
actions: {
  saveUpdatedName({commit}, payload) {
    commit('saveUpdatedName', payload)
  },
  //... [ADDITIONAL ACTIONS]
}
```

> <sub><sup>If we want to explore the context object a bit more to see what's all available to us inside it, we can simply `console.log(context)`. Inside the context object there are number of properties, most of which we wont need unless for specific advanced use cases, but it's good to be aware of what else is avaiable inside it.</sup></sub>

### **MUTATIONS**

Mutations are functions that we call via actions and which commit changes to our state. Mutations can be called on their own from Vue using the `this.$store.commit()` function, but for the time being, its best practice to call a mutation from an action versus directly inside a Vue instance.

Calling a mutation from an action gives us a clear cut historical log inside the Vue devTools for tracking every single change to our Vuex state. We can `time-travel` to different state-change points that are logged inside the Vue devtools. We can see each and every change that occurs and we can even commit these mutation histories to state as the current model.

Much like `getters`, mutations also get implicit access to the state object passed into each funtion as the first arguement. We can utlize this state object to update and save new info to the targeted properties.

Also, much like `actions`, we are only allowed 2 parameters for each function, with the ifrst arguement being the implicit state object, the sencond arguement is where and how we pass our `payload` object into the mutation function.

```js
mutations: {
  saveUpdatedName(state, payload) {
    state.user.first = payload.firstName;
  }
}
```

---

## Getting Up and Running With Vuex

Adding Vuex to a project is fairly straight forward. We have the option to either include Vuex from project initialization, or if we need it after the fact, we can easily install **Vuex** at any time and begin using it immediately.

**[ At Project Initialization ]**  
If we think back to episode 04 when we learned about using the `Vue CLI`, we happened across a feature option for using Vuex.

Simply select the `Vuex` option when brought to the selection menu.

**Vue** will automatically create a `store.js` file inside the the top level of our `src/` folder. If we open up this new file, we can see that Vue has auto-generated a boilerplate store setup for us, which should look something like this.

**_ONE THING TO KEEP IN MIND:_** Because Vuex is in fact a Vue plugin, we need to use the `Vue.use()` api in order to properly register Vuex into Vue.

> If we are using the CLI this is handled for us, but if bringing in Vuex manually, don't forget this crucial step or Vuex will not work)

```js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {

  },
  getters: {

  },
  mutations: {

  },
  actions: {

  }
});

export default store;
```

In addition to generating us a `store.js` file, Vue CLI also imports our store to our `main.js` file and registers it onto our main vue instance.

**[ After Project Initialization ]**  
If we are bringing in Vuex at any point after the project initialization, we need to go about it a bit differently, although quite the same. We just need to do it manually.

> We can also use the Vue UI if desired, which will auto generate the appropriate files and code.

To bring in Vuex manually we simply need to..

- Install Vuex to our project - `npm install vuex`
- Create a `store.js` file in the `src` folder
- Code up the Vuex Store object
  - import `vue`
  - import `vuex`
  - register `vuex` as a plugin via `Vue.use(Vuex)`
  - code out the store
  - export the store
- Import our `store.js` into our `main.js` file
- Pass our store into the main Vue instance

There we go! Now we have full access to using Vuex as our primary state management.
