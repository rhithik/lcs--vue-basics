<template>
  <div class="container--outer">
    <BlogPost 
      v-for="post in blogData"
      :key="post.id"
      :title="post.title"
      :content="post.content"
    />

  </div>
</template>

<script>
import BlogPost from './blog-post/BlogPost.vue';

const blogData = [
  {
    id: 0,
    title: 'My First Blog Post!',
    content: 'This is my first ever blog post! Thank you for reading it! I love programming and i love JavaScript even more so. In this blog I will be writing about all the wonderful things I am working on and learning about. I hope you enjoy!'
  },
  {
    id: 1,
    title: 'Jumping Into Vue.js Headfirst',
    content: 'Checked out Vue.js for the first time today hooooolleeey bud! Such a good concept. Simple, intuitive, and incredibly powerful. An incrementally adaptable framework that is changing the web development world as we know it. Angular and React have been the main two goliaths in the production, until now!'
  },
  {
    id: 2,
    title: 'A Week with a New Vue',
    content: 'This is my first ever blog post! Thank you for reading it! I love programming and i love JavaScript even more so. In this blog I will be writing about all the wonderful things I am working on and learning about. I hope you enjoy!'
  },
  {
    id: 3,
    title: 'The Joys of Reactivity',
    content: 'Checked out Vue.js for the first time today hooooolleeey bud! Such a good concept. Simple, intuitive, and incredibly powerful. An incrementally adaptable framework that is changing the web development world as we know it. Angular and React have been the main two goliaths in the production, until now!'
  },
  

]

export default {
  components: {
    BlogPost,
  },
  data() {
    return {
      blogData
    }
  }
}
</script>

<style>
.container--outer {
  background-color: rgb(215, 230, 223);
  width: 80vw;
  min-height: 70vh;
  margin-bottom: 1rem;
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 1rem;
}
</style>
