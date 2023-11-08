<template lang="">
  <div class="dialog" v-if="show"  @click.stop="hideDialog">
    <div @click.stop class="dialog__content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import toggleMixin from '@/components/mixins/toggleMixin'
export default {
  name: "my-dialog",
  mixins: [toggleMixin]
};
</script>
<style scoped>
.dialog {
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
}

.dialog__content {
  background: white;
  border-radius: 12px;
  margin: auto;
  min-height: 50px;
  min-width: 300px;
  padding: 20px;
}
</style>
