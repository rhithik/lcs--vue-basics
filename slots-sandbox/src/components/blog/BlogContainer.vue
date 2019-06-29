<template>
  <div class="container--outer" ref="container">
    <BlogPost 
      v-for="post in blogData"
      :key="post.id"
    >
    <template v-slot:title>
      <div class="post--title">{{ post.title | lowercase }}</div>
    </template>

    <template v-slot:content>
      <div class="post--content">{{ post.content }}</div>
    </template>

    </BlogPost>
  </div>
</template>


<!-- <template>
  <div class="container--outer">
    <BlogPost 
      v-for="post in blogData"
      :key="post.id"
    >
    <template v-slot:title>
      <div class="post--title">{{ post.title }}</div>
    </template>
    </BlogPost>
  </div>
</template> -->

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
    content: 'Wow! A week has passed since I dove head first into Vue.js. Its pretty incredible. Building full feature apps and websites seems to be such a breeze with this framework! Ive only just scratched the surface on this rabbithole... and Im ready for more!'
  },
  {
    id: 3,
    title: 'The Joys of Reactivity',
    content: 'Reactivity. The art of making instantly interactive UI/UX experiences. Well, thats not the exactly definition, but it works for me. It really is all about creating seemless and instant user experiences. Change one data property and in updates everywhere thats dependant on that data propety, instantly and automatically.'
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
  },
  mounted() {
    console.log(this.$refs.container)
  }
}
</script>

<style scoped>
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
.post--title {
  font-size: 1.75rem;
  margin-bottom: .25rem;
  padding-bottom: .25rem;
  border-bottom: 1px solid #000;
}
.post--content {
  flex: 1;
  display: flex;
  align-items: center;
}
</style>
