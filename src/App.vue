<template>
  <div class="app">
    <h1>Page with posts</h1>
    <my-input v-model="searchQuery" placeholder="Search..."></my-input>
    <div class="app__btns">

      <my-button @click="showDialog">Create post</my-button>
      <my-select v-model="selectedSort" :options="sortOptions"></my-select>
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"></post-form>
    </my-dialog>
    <post-list v-if="!isPostsLoading" @remove="removeItem" :posts="sortedAndSearchedPosts"></post-list>
    <div v-else>Loading...</div>
    <div class="page__wrapper">
      <div class="page" :class="{ 'current-page': page === pageNumber }" v-for="pageNumber in totalPages"
        :key="pageNumber" @click="changePage(pageNumber)">
        {{ pageNumber }}</div>
    </div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostsList.vue";
import axios from "axios";
import MyButton from './components/UI/MyButton.vue';
import MySelect from '@/components/UI/MySelect.vue'
import MyInput from './components/UI/MyInput.vue';
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
      posts: [
      ],
      dialogVisible: false,
      modificatorTrain: "",
      isPostsLoading: false,
      selectedSort: '',
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        { value: 'title', name: 'For name' },
        { value: 'body', name: 'For body' }

      ],
      searchQuery: '',
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
    async fetchPosts() {
      this.isPostsLoading = true;
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
          params: {
            _page: this.page,
            _limit: this.limit,
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = response.data
      } catch (e) {
        alert('Error')
      } finally {
        this.isPostsLoading = false
      }

    },
    changePage(pageNumber) {
      this.page = pageNumber;
    }
  },
  mounted() {
    this.fetchPosts()
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((post) => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
  watch: {
    // selectedSort(newValue) {
    //   this.posts.sort((post1, post2) => {
    //     return post1[newValue]?.localeCompare(post2[newValue])
    //   })
    // }
    page() {
      this.fetchPosts();
    }
  }

};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.app__btns {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}

.app {
  padding: 20px;
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
</style>
