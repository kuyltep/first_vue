<template>
  <div class="navbar">
    <div @click="$router.push('/')">Vue 3</div>
    <div class="navbar__btns">
      <my-button @click="$router.push('/about')">
        About
      </my-button>
      <my-button @click="$router.push('/post-page')" style="margin-left: 20px;">
        Post List
      </my-button>
      <my-button @click="$router.push('/store')" style="margin-left: 20px;">
        Post List with store
      </my-button>
    </div>
  </div>
</template>

<script>
import MyButton from '@/components/UI/MyButton.vue';

export default {
  components: {
    MyButton,
  }
}
</script>

<style>
.navbar {
  height: 50px;
  background-color: lightgray;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}

.navbar__btns {
  margin-left: auto;
}
</style>