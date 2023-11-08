import axios from "axios";

export const postModule = {
  state() {
    return {
      posts: [],
      modificatorTrain: "",
      isPostsLoading: false,
      selectedSort: "",
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        { value: "title", name: "For name" },
        { value: "body", name: "For body" },
      ],
      searchQuery: "",
    };
  },
  getters: {
    sortedPosts(state) {
      return [...state.posts].sort((post1, post2) =>
        post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
      );
    },
    sortedAndSearchedPosts(state, getters) {
      return getters.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setModificatorTrain(state, modificatorTrain) {
      state.modificatorTrain = modificatorTrain;
    },
    setLoading(state, bool) {
      state.isPostsLoading = bool;
    },
    setSelectedSort(state, sort) {
      state.selectedSort = sort;
    },
    setPage(state, page) {
      state.page = page;
    },

    setTotalPages(state, pages) {
      state.totalPages = pages;
    },
    setSortOptions(state, options) {
      state.sortOptions = options;
    },
    setSearchQuery(state, query) {
      state.searchQuery = query;
    },
  },
  actions: {
    async loadMorePosts({ state, commit }) {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts`,
          {
            params: {
              _page: state.page,
              _limit: state.limit,
            },
          }
        );
        commit(
          "setTotalPages",
          Math.ceil(response.headers["x-total-count"] / state.limit)
        );
        commit("setPosts", [...state.posts, ...response.data]);
        commit("setPage", (state.page += 1));
      } catch (e) {
        console.log(e);
      }
    },
  },
  namespaced: true,
};
