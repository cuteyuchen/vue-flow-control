<script setup lang="ts">
import information from './compoents/information.vue';
import paneForm from './paneForm.vue';
import lineForm from './lineForm.vue';

import {informationStore} from "../store.ts"


</script>

<template>
  <div class="f-form">
    <information />
    <!-- 面板配置表单 -->
    <paneForm v-show="informationStore.type === 'pane'" />
    <!-- 连接线配置表单 -->
    <lineForm v-if="informationStore.type === 'edge'" />
  </div>
</template>

<style lang="scss">
@import "./form.scss";
</style>