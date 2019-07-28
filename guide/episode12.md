# Vue Basics - _Episode 11_

## **Vue Router | Router-View Tag**

At certain points, our apps get to the size where we need multiple pages. These 'pages' are also referred to as **views** or sometimes **screens**. Inside of our App, the only actual html page that gets served is the `index.html`. In fact, switching between `views` is as simple as swapping out components. It works quite similarly to how `dynamic components` render.

Lets take a look at how we can use **Vue Router** to expand our apps considerably. The Vue Router is again, just a Vue plugin and we use it as such. During project init, we have the option for Vue to scaffold out the Router into our project automatically. But if we find that we need to bring in **Vue Router** later on in development, we can add it to any project quite easily by adding it via _VueCLI 3_.

> `vue add vue-router`  
to have Vue CLI handle the install and project integration.

> `npm install vue-router`  
to manually install and handle project integration.

Now we should have some changes that have been applied to some of our core files, like `main.js`. We have a new `router.js` file that our **Vue Router** lives in. It is here where we can start writing out our app routes.

```js
import Vue from 'vue';
import VueRouter from 'vue-router';

// import our view components to be used as route components
import Home from '../views/Home.vue';
import Home from '../views/Home.vue';
import User from '../views/User.vue';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainOpen,
    }
    {
      path: 'home',
      name: 'home',
      component: Home,
    },
    {
      path: 'user',
      name: 'user',
      component: User,
    },
  ]
})
```

### Dynamic Routing
With Vue Router we get access to a params object we can pass inside the route object being pushed to the router. This gives use the ability to pass data along to route changes very easily.

```js
const routes = [
  // dynamic routes
  {
    // :id comes from the params object inside the route object passed to router.push({ name: 'user', params: { id: '123' } })
    // access via $route.params.id
    path: '/user/:id',
    name: 'single-user',
    component: User,
  }
]
```


```js
// literal string path
router.push('home')

// object based routing push
router.push({ path: 'home' })

// named route with params to be used for dynamic routing
router.push({ name: 'user', params: { id: '123' } })

// with query, resulting in /register?plan=private
router.push({ path: 'register', query: { plan: 'private' } })
```
