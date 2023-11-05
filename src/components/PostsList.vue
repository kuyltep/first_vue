<template>
  <div v-if="posts.length > 0">
    <h3>Posts list</h3>
    <post-item
      @remove="$emit('remove', post)"
      :post="post"
      v-for="post in posts"
      :key="post.id"
    ></post-item>
  </div>
  <h3 v-else style="color: red">Posts list is empty</h3>
</template>

<script>
import PostItem from "@/components/PostItem.vue";
export default {
  components: {
    PostItem,
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style scoped></style>
