<template>
  <form action="" class="form" @submit.prevent>
    <h4>Create post</h4>
    <my-input v-focus v-model="post.title" placeholder="Title" />
    <my-input v-model="post.body" placeholder="Description" />
    <my-button style="align-items: flex-end; margin-top: 10px" @click="createPost">Create</my-button>
  </form>
</template>

<script>
import MyButton from "@/components/UI/MyButton";
export default {
  components: {
    MyButton,
  },
  data() {
    return {
      post: {
        title: "",
        body: "",
      },
    };
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit("create", this.post);
      this.post = {
        title: "",
        body: "",
      };
    },
  },
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
}
</style>
