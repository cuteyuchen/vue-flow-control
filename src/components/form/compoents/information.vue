<script setup lang="ts">
import {informationStore} from "../../store.ts"
</script>

<template>
  <div class="info">
    <div class="node">{{informationStore.label || 'null'}}</div>
    <div class="node-type">{{informationStore.typeText}}</div>
  </div>
</template>

<style scoped lang="scss">
.info {
  font-weight: 600;
  font-size: 13px;
  padding: 8px 16px 16px;
  border-bottom: 1px solid #e6e6e6;
  .node {
    margin-bottom: 6px;
    padding: 7px 0;
  }
  .node-type {
    color: #00000080;
    font-size: 11px;
  }
}
</style>