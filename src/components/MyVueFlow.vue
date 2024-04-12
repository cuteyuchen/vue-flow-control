<script setup lang="ts">
/**
 *@description:MyVueFlow
 *@author:yuchen
 *@createdTime:2024/4/11 13:54
 */
import { MarkerType, VueFlow } from '@vue-flow/core'
import type { Node, Edge } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { ref } from "vue";
import NodeControl from "./node/nodeControl.vue";
import EdgeControl from "./edge/edgeControl.vue";

const nodeList = ref<Node[]>([
  {
    id: '1', label: 'Node 1', position: { x: 250, y: 0 }, class: 'light', style: {
      borderColor: 'transparent'
    }
  },
  { id: '2', label: 'Node 2', position: { x: 100, y: 100 }, class: 'light' },
  { id: '3', label: 'Node 3', position: { x: 400, y: 100 }, class: 'light' },
  { id: '4', label: 'Node 4', position: { x: 150, y: 200 }, class: 'light' },
  { id: '5', label: 'Node 5', position: { x: 300, y: 300 }, class: 'light' },
])

const edgeList = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', label: 'edge with arrowhead', source: '1', target: '3', markerEnd: MarkerType.ArrowClosed },
  {
    id: 'e4-5',
    type: 'step',
    label: 'step-edge',
    source: '4',
    target: '5',
    style: { stroke: 'orange' },
    labelBgStyle: { fill: 'orange' },
  },
  { id: 'e3-4', type: 'smoothstep', label: 'smoothstep-edge', source: '3', target: '4' },
])

</script>

<template>
  <VueFlow v-model:nodes="nodeList" v-model:edges="edgeList" fit-view-on-init>
    <Background type="dots"/>
    <node-control></node-control>
    <edge-control></edge-control>
  </VueFlow>
</template>

<style>
/* import the necessary styles for Vue Flow to work */
@import '@vue-flow/core/dist/style.css';
/* import the default theme, this is optional but generally recommended */
@import '@vue-flow/core/dist/theme-default.css';

.vue-flow__node {
  --vf-box-shadow: #1879FF;
}
.vue-flow__node.selected{
  box-shadow: 0 0 2px 0 var(--vf-box-shadow);
}
</style>
