import { ref } from 'vue';
import type {ElementData} from "@vue-flow/core"

interface paneStoreInterface {
  variant: 'dots' | 'lines' | '';
  gap: number;
  size: number;
  patternColor: string;
  bgColor: string;
  height: number;
  width: number;
  x: number;
  y: number;
}

interface informationStoreInterface {
  id: string,
  label: string,
  type: string,
  typeText: string,
}

/**
 * 信息
 */
export const informationStore = ref<informationStoreInterface>({
  id: '',
  label: '',
  type: '',
  typeText: ''
})

/**
 * 背景配置
 */
export const paneStore = ref<paneStoreInterface>({
  variant: 'dots',
  gap: 10,
  size: 0.4,
  patternColor: "#81818a",
  bgColor: "#fff",
  height: 100,
  width: 100,
  x: 0,
  y: 0
});

export const edgeStore = ref<ElementData>();
