
import { ref, watch } from 'vue'

let aiConfigStorage;
try {
  aiConfigStorage = JSON.parse(localStorage['aiConfig'])
} catch { }
export const aiConfig = ref(aiConfigStorage || {
  baseUrl: "https://api.siliconflow.cn/v1",
  apiKey: "",
  model: "deepseek-ai/DeepSeek-V3"
})

watch(aiConfig, (val) => {
  localStorage['aiConfig'] = JSON.stringify(val)
}, { deep: true })