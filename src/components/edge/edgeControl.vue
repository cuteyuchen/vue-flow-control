<script setup lang="ts">

/**
 *@description:nodeControl
 *@author:yuchen
 *@createdTime:2024/4/11 15:14
 */
import { computed, ref } from "vue";
import { useVueFlow } from "@vue-flow/core"
import type { Edge } from '@vue-flow/core'

const { onEdgeClick, findEdge, onNodeClick, onPaneClick, getEdgeTypes } = useVueFlow();

const EdgeTypes = computed<string[]>(() => Object.keys(getEdgeTypes.value))
const edge = ref<Edge>({ id: 'e1-2', source: '1', target: '2', animated: true },)

const showEdgeControl = ref(false)

// 选中节点
onNodeClick(() => {
  showEdgeControl.value = false
})
// 选中线条
onEdgeClick((event) => {
  edge.value = findEdge(event.edge.id)
  console.log(edge.value)
  edge.value.style = formatEdge(edge.value)
  showEdgeControl.value = true
})
onPaneClick(() => {
  showEdgeControl.value = false
})

const edgeChange = () => {
  if (!edge.value) return
  // updateEdge(node.value, node.value)
}

const formatEdge = (edge: Edge) => {
  return {
    stroke: edge.style?.stroke || '#b1b1b7',
    strokeWidth: edge.style?.strokeWidth || 1
  }
}
</script>

<template>
  <ul class="edge-control" v-if="showEdgeControl">
    <li>
      <label>线条名称</label>
      <input type="text" v-model="edge.label" @input="edgeChange">
    </li>
    <li>
      <label for="type">类型</label>
      <select v-model="edge.type" @change="edgeChange">
        <option v-for="(type,index) in EdgeTypes" :key="index" :value="type">{{ type }}</option>
      </select>
    </li>
    <li>
      <label for="class">颜色</label>
      <input type="color" v-model="edge.style.stroke" @input="edgeChange">
    </li>
    <li>
      <label for="class">宽度</label>
      <input type="number" v-model="edge.style.strokeWidth" @input="edgeChange">
    </li>
  </ul>
</template>

<style scoped lang="scss">
.edge-control {
  position: absolute;
  right: 0;
  z-index: 999;
  list-style: none;
}
</style>
