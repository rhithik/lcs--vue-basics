<!-- <template>
  <div class="blog-post--outer">
    <slot name="title" />
    <slot name="content" />
  </div>
</template> -->

<template>
  <div class="blog-post--outer">
    <PostTitle>
      {{ title }}
    </PostTitle>
    <PostContent>
      {{ content }}
    </PostContent>
  </div>
</template>



<script>
import PostTitle from './PostTitle.vue';
import PostContent from './PostContent.vue';

export default {
  components: {
    PostTitle,
    PostContent,
  },
  props: ['title', 'content']
}
</script>

<style scoped>
.blog-post--outer {
  background-color: rgb(44, 206, 130);
  padding: 1rem;
  display: flex;
  flex-direction: column;
}
.blog-post--outer:hover {
  background-color: rgb(51, 172, 115);
  cursor: pointer;
}
.blog-post--outer:active {
  background-color: rgb(62, 241, 158);
}
</style>
