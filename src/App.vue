<template>
  <div class="app">
    <h1>Page with posts</h1>
    <input type="text" v-model.trim="modificatorTrain" />
    <my-button style="margin: 15px 0" @click="showDialog"
      >Create post</my-button
    >
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"></post-form>
    </my-dialog>
    <post-list @remove="removeItem" :posts="posts"></post-list>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostsList.vue";

export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      posts: [
        { id: 1, title: "JavaScript", body: "Post description" },
        {
          id: 2,
          title: "JavaScript 2",
          body: "Post description 2",
        },
        {
          id: 3,
          title: "JavaScript 3",
          body: "Post description 3",
        },
        {
          id: 4,
          title: "JavaScript 4",
          body: "Post description 4",
        },
      ],
      dialogVisible: false,
      modificatorTrain: "",
    };
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removeItem(post) {
      this.posts = this.posts.filter((post1) => post1.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.app {
  padding: 20px;
}
</style>
