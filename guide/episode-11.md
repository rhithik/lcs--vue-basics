# Vue Basics - _Episode 11_

## **Vuex In Depth**

Now that we have a basic understanding of **`Vuex`**, what it is and what it does, we can see how greatly improved our application _state management_ has become. We looked at some basic examples already, so lets dive into Vuex further!

> _This episode will focus partly on using Vuex inside our Vue Components._

When we bring **`Vuex`** into our projects, we use the `Vue.use(Vuex)` plugin code and then we pass the `store` into the root Vue instance inside the `main.js`, this adds the `store` onto the Vue prototype accessible via `this.$store`.

### **STATE**

As we talked about previously, our `state` object contains all of our reactive data stored inside Vuex. We can typically access these propertys using a `getter` function, but we can also target state directly from inside our Vue component using either a `computed` property much like getters use, or with the `mapState()` helper function.

```js
// Vuex.Store
export default new Vuex.Store({
  state: {
    colorData: {
      hex: '#3ea21a',
      name: 'Some Kewl Color',
    },
    timesUpdated: 32,
  }
})


// Vue Component
export default {
  data() {
    return {
      // local component state
      // ...
    }
  },
  computed: {
    // pull in Vuex state via computed properties
    // this process is synonymous with using Vuex getters as well
    colorData() {
      return this.$store.state.colorData;
    },
    timesUpdated() {
      return this.$store.state.timesUpdated;
    }
  }
}
```

Now we have access to those state properties from our store, inside our Vue component. If we `console.log(this.colorData)`, it will log out that full object from Vuex. We can use an individual property in the object by simply logging `console.log(colorData.hex)` which will return that corresponding value. We can use the same tactics inside of our HTML template as well.

Notice however that if we want to use multiple properties, having a seperate computed property can get verbose. Vuex gives us a number of helper functions to import multiple values.

### **Vuex** gives us four helper functions.

- `mapState()`
- `mapGetters()`
- `mapMutations()`
- `mapActions()`

And to use these helper functions we simply need to import them from `Vuex` into the Vue component.

`import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';`

Using `mapState()` we can pull multiple values from the store in one function. We can then call it as computed with an options object passed in as an arguement. Inside this object is where we can map to our state properties. 

```js
import { mapState } from 'vuex';

export default {
  data() {
    return {
      namePhrase: 'Your favorite color is called ',
    }
  },
  computed: mapState({
    // as a string value
    colorData: 'colorData',
    // as an arrow function
    hex: state => state.colorData.hex,
    name: state => state.colorData.name,

    // we can use`this.` to access local state
    // while using `state.` to access the Vuex state
    fullPhrase(state) {
      return this.namePhrase + state.colorData.name;
      // -> 'Your favorite color is called Some Kewl Color'
    }
  })
}
```

We can also use the Array Syntax where instead of an object passed to `mapState`, we pass in an Array of Strings with the values being the names of the properties in state we want to use.

`computed: mapState(['hex', 'name', 'timesUpdated'])`

> These syntax concepts apply to all the helper functions.

We can also take advantage of the `object spread` operator, so as to not tie up the entire computed property block.

```js
import { mapState } from 'vuex';

export default {
  computed: {
    localComputed() {
      // a local computed property
      // ...
    },
    ...mapState({
      // store state access
      // ...
    })
  }
}
```

---

### **GETTERS**

Getters act quite similarily to just targeting `state`, the key difference begin is that `getters` are essentially **`Vuex Computed Properties`** meaning that they can compute a value based on dependancies in our `state`, cache the result and send it to the Vue components calling that getter. Like computed properties, if any of the dependants values change, the getter will be re-evaluated and return the new value.

> Remember that when we use `getters` we automatically get access to state as the first arguement.

```js
export default new Vuex.Store({
  state: {
    tasks: [
      { title: 'Write Guide for Epsiode 11', complete: true },
      { title: 'Livestream Ep11 - Vuex in Depth', complete: false },
      { title: 'Dont take no for an answer!', complete: true },
    ],
  },
  getters: {
    getCompletedTasks(state) {
      // we can have any business logic in here as long as the getter returns an evaluated expression
      const completedTasks = state.tasks.filter(task => task.complete)
      console.log(completedTasks)
      
      // or
      return state.tasks.filter(task => task.complete);
    },
    getTasks: state => state.tasks;
  },
})
```

Now that we have `getters` on the Vuex side of things, it's time to access those `getters` on the Vue side.

We use computed properties to access `getters`, much like using `state`. Those computed properties as we know, are essentially data properties to be used in our template.

```html
<template>
  <div>
    <ul class="task-list">
      <li v-for="task in taskList" class="task-item">
        <h3>{{ task.title }}</h3>
        <p v-if="task.completed">
          Complete!
        </p>
        <p v-else>
          Unfinished!
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    // we can use the same name as the getter and we can also alias then name if need be as well.
    taskList() {
      return this.$store.getters.getTasks;
    },
    completedTasks() {
      return this.$store.getters.getCompletedTasks;
    },
  }
}
</script>
```

Getters also have a **helper function** we can use to bring in multiple `getters` with less code. using the spread operator and `mapGetters` with either the `Array` syntax or `Object` syntax for aliasing via properties.

> **ARRAY BASED**

```js
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'getTasks',
      'getCompletedTasks',
    ]),
    // local computed properties ...
  }
}
```
> **OBJECT BASED**

```js
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      taskList: 'getTasks',
      completedTasks: 'getCompletedTasks',
    }),
    // local computed properties ...
  }
}
```

---

### **MUTATIONS**

As we learned in the previous episode, we use **`mutations`** to **commit** updates to `state`. Again as a reminder, best practice in **Vuex** suggests using the `ACTION -> MUTATION` pattern. 

One of the main reasons for this is that `mutations` are **synchronous**, meaning the code will run right away. We won't go into too much detail about synchronous vs. asynchronous in this series, but just to give us a a high level overview.

> **Synchronous:**  
Code that will run immediately. This is typically how most of our code is due to the nature of `javascript`. The browser parses our code from top to bottom. Evaluating each statement and only running one block of code at a time.

> **Asynchronous:**  
Code that will pause the code block until an operation has finished. Such as an Ajax request to an external resource, or a `setTimeout` method. During this time, no code will run, until the asynchronous task resolves (successfully or in-error)

> **[More on Sync vs. Async](https://www.hongkiat.com/blog/synchronous-asynchronous-javascript/)**

We can call mutations directly by using `this.$store.commit('someMutation')`, although as explained, this is an anti-pattern and should be avoided. Its best to dispatch an `action` to commit a `mutation`.

`<button @click="this.$store.commit(increaseCount)">Increase</button>`

Again, we get a helper function called `mapMutations` that we can use to map multiple mutations. This helper will rarely get used but works identically to the other mapHelper functions.

---

### **ACTIONS**

Excellent! The final core building block for Vuex. Actions are our primary means of triggering state mutations. We can perform arbitrary code including asynchronous calls and methods inside of mutations.

We learned the basics of writing and using `actions` in conjunction with `mutations` last epsiode. So lets take a closer look at the different ways to call these actions from inside our Vue components.

```js
export default new Vuex.Store({
  actions: {
    requestRemoteData_ACTION(context, payload) {
      const userID = payload.userID;
      fetch(`https://www.getdata.com/api/v1/resources?id=${userID}`, { 
        // additional options
      })
      .then(response = response.json())
      .then(data => context.commit('requestRemoteData_MUTA', data))
    },
    increaseAsyncCount_ACTION({ commit }) {
      setTimeout(() => {
        commit('increaseAsyncCount_MUTA');
      }, 1000)
    }
    // action that sends payload (Number) to mulitplier mutation to multiply count by the payload
    asyncCountMultiplier_ACTION({ commit }, payload) {
      setTimeout(() => {
        commit('asyncCountMultiplier_MUTA', payload);
      }, payload * 500);
    }
  }
})
```

Now we can use these `actions` inside of our Vue components by calling them via `this.$store.dispatch()`. We will usually house these dispatch methods inside our Vue component methods. We can even dispatch an action inline.

> Remember, we pass in the name of the `mutation` we want to call.

```html
<template>
  <button 
    @click="this.$store.dispatch('increaseAsyncCount_ACTION')"
    >Increase Count
  </button>
  <button 
    @click="multiplyCount"
    >Multiply Count
  </button>
  <button 
    @click="getRemoteData"
    >Get Data
  </button>
</template>

<script>
export default {
  data() {
    return {
      multiplyBy: 4,
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    multiplyCount() {
      this.$store.dispatch('asyncCountMultiplier_ACTION', this.multiplyBy);
    },
    getRemoteData() {
      const payload = this.user;
      this.$store.dispatch('requestRemoteData_ACTION', payload);
    },
  }
}
</script>
```

Multiple actions needing to be pulled in from **Vuex** can also make use of the `mapActions` helper function. In the same way that the other mapHelper functions work, we can use `mapActions()` in either the `Array` syntax or the `Object` syntax for custom naming.

Once registered we can call these functions like normal methods on our Vue instance. We can also pass in our `payload` to the function as well, just like a normal `action`.

`this.callAction(payload)`

---
