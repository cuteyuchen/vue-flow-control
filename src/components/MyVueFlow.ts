import { MarkerType, useVueFlow } from "@vue-flow/core";
import { edgeStore, informationStore } from "./store.ts";
import type { Element, Elements } from '@vue-flow/core'
import { ref, Ref } from "vue"; // 类型 VueFlow核心

const dragNodeStartXY = { x: 0, y: 0 };
let id: number = 0;

export default function myVueFlow(initEdgesData?: Elements) {

  const edges = ref<Elements>(initEdges(initEdgesData ?? []))
  const {
    onNodeClick,
    onEdgeClick,
    onEdgeDoubleClick,
    onPaneClick,
    screenToFlowCoordinate,
    addNodes
  }
    = useVueFlow();

  /**
   * 点击节点
   */
  onNodeClick((event) => {
    console.log("点击节点", event.node)
    informationStore.value.id = event.node.id
    informationStore.value.label = <string>event.node.label;
    informationStore.value.type = "node";
    informationStore.value.typeText = "节点";
  })

  /**
   * 点击连接线
   */
  onEdgeClick((event) => {
    console.log("点击连接线", event.edge)
    informationStore.value.id = event.edge.id;
    informationStore.value.label = <string>event.edge.label;
    informationStore.value.type = "edge";
    informationStore.value.typeText = "连接线";

    edgeStore.value = edges.value.find((edge: Element) => edge.id === event.edge.id);
  })

  /**
   * 双击连接线
   */
  onEdgeDoubleClick(() => {
    console.log("双击连接线")
  })

  /**
   * 点击面板
   */
  onPaneClick(() => {
    informationStore.value.id = "";
    informationStore.value.label = "vue-flow";
    informationStore.value.type = "pane";
    informationStore.value.typeText = "面板";
  })

// ==================== 节点、连接线初始化
  /**
   * 初始化edge
   * @param edge
   */
  function initEdge(edge: Element): Element {
    const color = '#b1b1b7';

    // 默认连线数据
    const defEdgeData: any = {
      type: "bezier",
      label: "",
      style: { strokeWidth: 1, stroke: color },
      markerEnd: {
        color: color,
        type: ""
      },
      labelStyle: {
        fill: color,
        fontSize: 20,
        fontWeight: 800
      },
      labelBgStyle: {
        fill: "#FFFFFF"
      },
      labelBgPadding: [1, 1], // 左右,上下
      labelBgBorderRadius: 2
    }

    let newEdge = { ...defEdgeData, ...edge };

    // 判断edge下的style是否有stroke参，无责添加，处理警告问题
    if (newEdge.style && newEdge.style.stroke === undefined) newEdge.style.stroke = color;
    // 判断edge下的markerEnd
    if (newEdge.markerEnd) {
      if (typeof newEdge.markerEnd === "string") { // string情况，设置默认色彩，若无类型则设为空
        newEdge.markerEnd = {
          color: newEdge.style.stroke,
          type: newEdge.markerEnd || ""
        }
      } else if (typeof newEdge.markerEnd === "object") {
        if (!newEdge.markerEnd.color) newEdge.markerEnd.color = newEdge.style.stroke;
        if (!newEdge.markerEnd.type) newEdge.markerEnd.type = "";
      }
    }

    // 判断edge下的label样式
    if (newEdge.labelStyle.fill) newEdge.labelStyle.fill = newEdge.style.stroke;

    return newEdge;
  }

  /**
   * 初始化edges
   * @param edges
   */
  function initEdges(edgesData: Elements): Elements {
    console.log("初始化edges", edgesData)
    return edgesData.map((ele: Element) => {
      return initEdge(ele)
    })
  }

// ==================== 拖拽
  /**
   * 拖拽事件开始（拖转节点）
   * @param event
   */
  function onDragStart(event: DragEvent): void {
    // 获取在节点所点击的坐标
    dragNodeStartXY.x = event.offsetX;
    dragNodeStartXY.y = event.offsetY;
  }

  /**
   * 拖拽事件
   * 拖入后修改鼠标状态
   * @param event
   */
  function onDragOver(event: DragEvent): void {
    event.preventDefault()

    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move'
    }
  }

  /**
   * 拖拽完成事件
   * 鼠标放开后的事件
   * @param event
   */
  function onDrop(event: DragEvent): void {
    // 获取拖拽的坐标 并居中
    const position = screenToFlowCoordinate({
      x: event.clientX - dragNodeStartXY.x,
      y: event.clientY - dragNodeStartXY.y,
    });

    const nodeId = `node_id_${ id++ }`;

    const newNode = {
      id: nodeId,
      type: "default",
      position,
      label: `[${ nodeId }]`,
    };

    addNodes(newNode);
  }

  return {
    edges,
    initEdge,
    onDragStart,
    onDragOver,
    onDrop
  }
}