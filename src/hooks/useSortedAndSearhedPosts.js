import { computed, ref } from "vue";

export default function useSortedAndSearchedPosts(sortedPosts) {
  const searchQuery = ref("");
  const sortedAndSearchPosts = computed(() => {
    sortedPosts.value.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
  return { searchQuery, sortedAndSearchPosts };
}
