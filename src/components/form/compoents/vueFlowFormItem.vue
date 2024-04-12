<script setup lang="ts">

const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})

</script>

<template>
<div class="form-item">
  <div class="form-item-title">
    <img class="form-item-title__icon" src="../image/form_title_icon.svg" alt="标题图标">{{ props.title }}
  </div>
  <div class="form-item-context">
    <slot />
  </div>
</div>
</template>

<style scoped lang="scss">

</style>