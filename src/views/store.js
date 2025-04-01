import { ref, watch } from 'vue'
import OpenAI from 'openai'

export const inputText = ref('')
export const inputImg = ref('')
export const inputImgText = ref('')
export const options = ref({
  humor: "偶尔玩梗",
  style: "阴阳怪气"
  // breakdown_strategy: ""
})

export const result = ref([])
export const resultText = ref('')
export const loading = ref(false)

watch(inputImg, () => {
  inputImgText.value = ''
})

const openai = new OpenAI({
  baseURL: "https://api.siliconflow.cn/v1",
  apiKey: "sk-ofektpulcecotamdkrvzxbvopvpwvxumyjjhjuoggvmxksyj",
  dangerouslyAllowBrowser: true
})

export async function getTextOfImg(img) {
  img = await compressImage(img)
  const completion = await openai.chat.completions.create({
    model: 'deepseek-ai/deepseek-vl2',
    temperature: 0.7,
    top_k: 50,
    top_p: 0.7,
    frequency_penalty: 0,
    messages: [{
      role: 'user',
      content: [
        {
          type: 'image_url',
          image_url: {
            url: await blobToBase64(img)
          }
        },
        {
          "type": "text",
          "text": "识别图片所有文字，以及内容类型"
        }
      ]
    }]
  })
  return completion.choices[0]?.message?.content
}

export async function getReply() {
  if (!inputText.value && !inputImg.value) {
    throw new Error('请输入内容')
  }
  try {
    loading.value = true
    let input = inputText.value || inputImgText.value
    if (inputImg.value && !input) {
      input = await getTextOfImg(inputImg.value)
      inputImgText.value = input
    }
    console.log(input)

    resultText.value = ''
    result.value = []
    const completion = await openai.chat.completions.create({
      model: 'deepseek-ai/DeepSeek-V3',
      messages: [{
        role: 'user',
        content: `
          [角色设定]
          你是一个精通【${options.value.style}】风格的对话专家，擅长用${options.value.humor || '正常'}的语气进行交流;
          当前时间：${new Date().toLocaleString()}

          [安全限制]
          - 禁止人身攻击、诽谤；

          [输出格式]
          - 输出格式为JSON数组，数组元素为字符串，每个字符串为一条回复；

          [当前任务]
          基于以下对方的内容，用第一人称生成3条符合要求的回复：
          ${input}
          `
      }],
      stream: true
    })

    let resultStr = ''

    for await (const chunk of completion) {
      const content = chunk.choices[0]?.delta?.content || ''
      resultText.value += content.replace(/[^\u4e00-\u9fa5，:。]/g, '')
      resultStr += content
    }
    result.value = JSON.parse(resultStr.replace('```json', '').replace('```', ''))
  } catch (err) {
    throw new Error(err?.message || '获取回复失败')
  } finally {
    loading.value = false
  }
}

export async function urlToBase64(url) {
  try {
    const response = await fetch(url)
    const blob = await response.blob()
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  } catch (err) {
    throw new Error('URL转Base64失败')
  }
}

export async function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

export async function compressImage(input, maxWidth = 750, quality = 0.8) {
  let file;
  if (typeof input === 'string') {
    const response = await fetch(input);
    file = await response.blob();
  } else {
    // 处理File输入
    file = input;
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      const img = new Image()
      img.src = e.target.result
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        let width = img.width
        let height = img.height

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width)
          width = maxWidth
        }

        canvas.width = width
        canvas.height = height
        ctx.drawImage(img, 0, 0, width, height)

        canvas.toBlob(
          (blob) => {
            resolve(blob)
          },
          'image/jpeg',
          quality
        )
      }
      img.onerror = reject
    }
    reader.onerror = reject
  })
}
