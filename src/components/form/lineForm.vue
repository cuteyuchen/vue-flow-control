<script setup lang="ts">

import VueFlowFormItem from "./compoents/vueFlowFormItem.vue";
import VueFlowForm from "./compoents/vueFlowForm.vue";
import {edgeStore} from "../store.ts";

/**
 * 修改连接线颜色
 */
function onChangeEdgeColor() {
  edgeStore.value.markerEnd.color = edgeStore.value.style.stroke
}

/**
 * 复制到剪切板操作
 * @param val
 */
function onCopy(val: string) {
  navigator.clipboard.writeText(val).then(() => {
    console.log("复制成功")
  })
}

</script>

<template>
  <VueFlowForm>
    <VueFlowFormItem title="线条设置">
      <div class="form-content__box">
        <p class="form-label">线条尺寸：</p>
        <div class="form-content">
          <input v-model="edgeStore.style.strokeWidth" class="vf-input" type="number" :min="1" placeholder="请设置线条尺寸">
        </div>
      </div>
      <div class="form-content__box">
        <p class="form-label">线条类型：</p>
        <div class="form-content">
            <select v-model="edgeStore.type" class="vf-select">
              <option value="bezier">贝塞尔曲线</option>
              <option value="step">阶梯</option>
              <option value="smoothstep">圆形台阶</option>
              <option value="straight">直线</option>
            </select>
        </div>
      </div>
      <div class="form-content__box">
        <p class="form-label">线条剪头：</p>
        <div class="form-content">
          <select v-model="edgeStore.markerEnd.type" class="vf-select">
            <option value="">无</option>
            <option value="arrow">箭头</option>
            <option value="arrowclosed">实体箭头</option>
          </select>
        </div>
      </div>
      <div class="form-content__box">
        <p class="form-label">线条动画：</p>
        <div class="form-content">
          <input v-model="edgeStore.animated" class="vf-switch " type="checkbox">
        </div>
      </div>
      <div class="form-content__box">
        <p class="form-label">线条颜色：</p>
        <div class="form-content">
          <div class="vf-color">
            <input v-model="edgeStore.style.stroke"  type="color"
                   @input="onChangeEdgeColor" />
            <!-- click 点击复制 -->
            <span title="点击复制" @click="onCopy(edgeStore.style.stroke)">{{ edgeStore.style.stroke }}</span>
          </div>
        </div>
      </div>
    </VueFlowFormItem>

    <VueFlowFormItem title="线条文本">
      <div class="form-content__box">
        <p class="form-label">文本内容：</p>
        <div class="form-content">
          <input v-model="edgeStore.label" class="vf-input" type="text" placeholder="请输入文本内容">
        </div>
      </div>
      <div class="form-content__box">
        <p class="form-label">文本大小：</p>
        <div class="form-content">
          <input v-model="edgeStore.label" class="vf-input" type="text" placeholder="请输入文本内容">
        </div>
      </div>
      <div class="form-content__box">
        <p class="form-label">文本颜色：</p>
        <div class="form-content">
          <input v-model="edgeStore.label" class="vf-input" type="text" placeholder="请输入文本内容">
        </div>
      </div>
      <div class="form-content__box">
        <p class="form-label">文本：</p>
        <div class="form-content">
          <input v-model="edgeStore.label" class="vf-input" type="text" placeholder="请输入文本内容">
        </div>
      </div>
      <div class="form-content__box">
        <p class="form-label">文本背景：</p>
        <div class="form-content">
          <input v-model="edgeStore.labelShowBg" class="vf-switch " type="checkbox">
        </div>
      </div>
      <!-- 文本背景 -->
      <div>
      </div>

    </VueFlowFormItem>
    <VueFlowFormItem title="线条文本背景">
      <div class="form-content__box">
        <p class="form-label">文本尺寸：</p>
        <div class="form-content">
          <input v-model="edgeStore.style.strokeWidth" class="vf-input" type="number" :min="1">
        </div>
      </div>
    </VueFlowFormItem>
  </VueFlowForm>
</template>

<style scoped lang="scss">
.vue-flow-form {
  padding: 16px;
}
</style>