<template>
  <div class="post">
    <div>
      <div><strong>ID: {{ post.id }}</strong></div>
      <div><strong>Title:</strong> {{ post.title }}</div>
      <div><strong>Description:</strong>{{ post.body }}</div>
      <div><strong>Likes:</strong>{{ $store.state.likes }}</div>
    </div>
    <div class="post__btns">
      <my-button @click="$router.push(`/post-page/${post.id}`)">Open</my-button>

      <my-button @click="$emit('remove', post)">Delete</my-button>
    </div>
  </div>
</template>
<script>
import MyButton from "@/components/UI/MyButton.vue";
export default {
  components: {
    MyButton,
  },
  props: {
    post: {
      type: Object,
    },
  },
};
</script>
<style scoped>
.post {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.post__btns {
  display: flex;
}
</style>
