<script setup lang="ts">

/**
 *@description:nodeControl
 *@author:yuchen
 *@createdTime:2024/4/11 15:14
 */
import { computed, ref } from "vue";
import { useVueFlow } from "@vue-flow/core"
import type { Node } from '@vue-flow/core'
import { RequiredKeys } from "../../type.ts";

const {
  onNodeClick, onEdgeClick, updateNode, getNodeTypes, onPaneClick
} = useVueFlow();

const NodeTypes = computed<string[]>(() => Object.keys(getNodeTypes.value))

const node = ref<RequiredKeys<Node, 'style'>>({
  id: '',
  label: '',
  position: { x: 0, y: 0 },
  style: {
    borderColor: 'transparent'
  }
})

const showNodeControl = ref(false)
// 选中节点
onNodeClick((event) => {
  console.log(event.node)
  node.value = formatNode(event.node)
  showNodeControl.value = true
})
// 选中线条
onEdgeClick(() => {
  showNodeControl.value = false
})

onPaneClick(() => {
  showNodeControl.value = false
})

const formatNode = (node: Node) => {
  return {
    ...node,
    style: {
      borderColor: node.style?.borderColor || 'transparent',
      backgroundColor: node.style?.background || 'transparent'
    }
  }
}


const nodeChange = () => {
  if (!node.value) return
  updateNode(node.value.id, node.value)
}

</script>

<template>
  <div class="nodeControl" v-show="showNodeControl">
    <ul>
      <li>
        <label for="label">节点名称</label>
        <input type="text" v-model="node.label" @input="nodeChange">
      </li>
      <li>
        <label for="width">长宽</label>
        <input type="number" v-model="node.width" @input="nodeChange" style="width: 100px">
        <input type="number" v-model="node.height" @input="nodeChange" style="width: 100px">
      </li>
      <li>
        <label for="type">类型</label>
        <select v-model="node.type" @change="nodeChange">
          <option v-for="(type,index) in NodeTypes" :key="index" :value="type">{{ type }}</option>
        </select>
      </li>
      <li>
        <label for="class">边框颜色</label>
        <input type="color" v-model="node.style.borderColor" @input="nodeChange">
      </li>
      <li>
        <label for="class">背景颜色</label>
        <input type="color" v-model="node.style.backgroundColor" @input="nodeChange">
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.nodeControl {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 999;
}
</style>
