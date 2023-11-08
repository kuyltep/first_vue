<template>
  <div>

    <h1>Page with posts</h1>
    <my-input v-focus v-model="searchQuery" placeholder="Search..."></my-input>
    <div class="app__btns">

      <!-- <my-button @click="showDialog">Create post</my-button> -->
      <my-select v-model="selectedSort" :options="sortOptions"></my-select>
    </div>
    <!-- <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"></post-form>
    </my-dialog> -->
    <post-list v-if="!isPostLoading" @remove="removeItem" :posts="sortedAndSearchPosts"></post-list>
    <div v-else>Loading...</div>
    <div v-intersection="{ loadMorePosts }" class="observer"></div>

  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostsList.vue";
import MyButton from '@/components/UI/MyButton.vue';
import MySelect from '@/components/UI/MySelect.vue'
import MyInput from '@/components/UI/MyInput.vue';
import usePosts from '@/hooks/usePosts';
import useSortedPosts from '@/hooks/useSortedPosts';
import useSortedAndSearchedPosts from '@/hooks/useSortedAndSearhedPosts';
export default {
  components: {
    PostForm,
    PostList,
    MyButton,
    MySelect,
    MyInput
  },
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        { value: 'title', name: 'For name' },
        { value: 'body', name: 'For body' }

      ],
    };
  },
  methods: {
  },
  setup(props) {
    const { posts, isPostLoading, totalPages } = usePosts(10);
    // const { posts, isPostLoading, totalPages } = usePosts(10)
    const { selectedSort, sortedPosts } = useSortedPosts(posts);
    const { searchQuery, sortedAndSearchPosts } = useSortedAndSearchedPosts(sortedPosts)
    return {
      posts, isPostLoading, totalPages, selectedSort, sortedPosts, searchQuery, sortedAndSearchPosts
    }
  }
};
</script>

<style>
.app__btns {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}


.page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;
}

.current-page {
  border: 2px solid teal;
}

.observer {
  height: 30px;
}
</style>
