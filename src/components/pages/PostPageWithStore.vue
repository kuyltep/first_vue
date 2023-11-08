<template>
  <div>
    <h1>Page with posts</h1>
    <my-input v-focus :model-value="searchQuery" @update:model-value="setSearchQuery" placeholder="Search..."></my-input>
    <div class="app__btns">
      <my-button @click="showDialog">Create post</my-button>
      <my-select :model-value="selectedSort" @update:model-value="setSelectedSort" :options="sortOptions"></my-select>
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"></post-form>
    </my-dialog>
    <post-list v-if="!isPostsLoading" @remove="removeItem" :posts="sortedAndSearchedPosts"></post-list>
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
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
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
    };
  },
  methods: {
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts'
    }),
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort',
    }),
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
    // async fetchPosts() {
    //   this.isPostsLoading = true;
    //   try {
    //     const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
    //       params: {
    //         _page: this.page,
    //         _limit: this.limit,
    //       }
    //     })
    //     this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
    //     this.posts = response.data
    //   } catch (e) {
    //     alert('Error')
    //   } finally {
    //     this.isPostsLoading = false
    //   }

    // },
    // async loadMorePosts() {
    //   try {
    //     const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
    //       params: {
    //         _page: this.page,
    //         _limit: this.limit,
    //       }
    //     })
    //     this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
    //     this.posts = [...this.posts, ...response.data];
    //     this.page += 1;

    //   } catch (e) {
    //     alert('Error')
    //   }

    // },

    // changePage(pageNumber) {
    //   this.page = pageNumber;
    // }
  },
  mounted() {
    // this.fetchPosts()

  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      modificatorTrain: state => state.post.modificatorTrain,
      isPostsLoading: state => state.post.isPostsLoading,
      selectedSort: state => state.post.selectedSort,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
      sortOptions: state => state.post.sortOptions,
      searchQuery: state => state.post.searchQuery,
    }),
    ...mapGetters({
      sortedPost: 'post/sortedPost',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts',
    })
  },
  watch: {
    // selectedSort(newValue) {
    //   this.posts.sort((post1, post2) => {
    //     return post1[newValue]?.localeCompare(post2[newValue])
    //   })
    // }
    // page() {
    //   this.fetchPosts();
    // }
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
