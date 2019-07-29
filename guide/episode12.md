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

Inside of our components, we can `push` new routes to the `router` to be loaded. There are a variety of ways to provide the route, easiest being a hardcoded string, all the way up to an object containing the route info, params, and query data.

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

---

## **Router-View Tag**

So now that we have a **Router** set up and we have some inital routes created, its time to employ it inside our app. To do so, we use the `<router-view>` tag.

The `<router-view>` tag can be self closing or open/close. This tag is what the **Router** looks and dynamically updates the content of that tag to instead be the component we speciefy for a given route. This works quite similarly to _Dynamic Components_ because we are in fact updating components dynamically. We just have a lot more capability specific to route navigation built into the **Router**. Lets look at an example...

```html
<template>
  <div id="app">
    <router-view>
  </div>
<template>
```

This is all that is required of the `router-view` tag, and Vue will update that tag to be rendered as the component specified for the route.

Now in addition to the `router-view` tag, we also get another special tag for navigating between routes. These are useful for navigation menus and other link-heavy items.

The `router-link` tag gets a `to` attribute that we can specify which route we want to be loaded when we click on the router-link. We can hardcode this value or dynamically bind to it.

```html
<template>
  <ul clas="nav-menu">
    <router-link to="home" tag="li" />
    <router-link :to="user" tag="li" />
  </ul>
<template>
```

Using the `tag` attribute, we can specify which type of HTML tag the `router-link` will be rendered as.

--

This is a basic use of the Vue Router and we can get much more complex and granular with our routing, if need be.
