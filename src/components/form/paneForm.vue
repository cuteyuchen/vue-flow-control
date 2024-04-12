<script setup lang="ts">
import VueFlowForm from "./compoents/vueFlowForm.vue";
import VueFlowFormItem from "./compoents/vueFlowFormItem.vue";
import {paneStore} from "../store.ts";
import useProcessCanvas from "../MyVueFlow.ts";

const {onDragStart} = useProcessCanvas();

const onClickBgType = (type: 'dots' | 'lines' | '') => {
  paneStore.value.variant = type;
}

</script>

<template>
  <VueFlowForm>
    <VueFlowFormItem title="选择图标">
      <div class="form-content__box">
<!--        <p class="form-label">背景类型：</p>-->
        <div class="form-content">
          <div class="vue-flow__node vue-flow__node-default" :draggable="true" @dragstart="onDragStart($event)">默认节点</div>

        </div>
      </div>
    </VueFlowFormItem>

    <VueFlowFormItem title="背景设置">
      <div class="form-content__box">
        <p class="form-label">背景类型：</p>
        <div class="form-content">
          <!-- html原生 radio 按钮 切换背景 -->
          <input class="vf-radio variant" type="radio" name="gbType" value="dots" id="dots" @change="onClickBgType('dots')"><label for="dots">点格</label>
          <input class="vf-radio variant" type="radio" name="gbType" value="lines" id="lines" @change="onClickBgType('lines')"><label for="lines">线格</label>
          <input class="vf-radio variant" type="radio" name="gbType" value="" id="null" @change="onClickBgType('')"><label for="null">空</label>
        </div>
      </div>
    </VueFlowFormItem>
  </VueFlowForm>
</template>

<style scoped lang="scss">
.vue-flow-form {
  padding: 16px;
}

.variant {
  margin-left: 20px;
  margin-right: 5px;
  &:first-child {
    margin-left: 0;
  }
}

.vue-flow__node {
  position: relative;
}
</style>