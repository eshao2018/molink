<template>
  <div class="input-area">
    <div class="input-box" @dragover.prevent @drop.prevent="handleDrop">
      <div v-if="inputImg" class="img-box">
        <img :src="inputImg" />
        <div class="delete" @click="inputImg = ''">
          <el-icon>
            <Close />
          </el-icon>
        </div>
      </div>
      <div v-else class="input-content">
        <textarea v-model="inputText" placeholder="粘贴对方内容或拖放图片到此处..." @input="analyzeEmotion"
          @paste="handlePaste"></textarea>
        <el-button v-if="!inputText" class="upload-btn" @click="triggerUpload">
          <el-icon>
            <Picture />
          </el-icon>
          上传图片
        </el-button>
        <input ref="fileInput" type="file" accept="image/*" style="display: none" @change="handleFileSelect" />
      </div>
    </div>
  </div>
  <el-dialog v-model="dialogVisible" fullscreen append-to-body style="padding:0;border:none">
    <div style="height: 100vh;width:100vw;display: flex;align-items: center;justify-content: center;">
      <Cropper :src="inputImg" @change="({ canvas }) => cropperedImgCanvas = canvas" :aspectRatio="1" :crop="true" />
      <div @click="inputImg = cropperedImgCanvas.toDataURL('image/png'); dialogVisible = false"
        style="z-index:9;padding:10px 30px;border-radius: 5px;background:#FF9800;color: #fff;font-size: 14px;position: absolute;bottom: 15px;right: 30px;cursor: pointer; ">
        确定
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { inputText, inputImg } from '../store'
import { Close, Picture } from '@element-plus/icons-vue'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';

const fileInput = ref(null)
const dialogVisible = ref(false)
let cropperedImgCanvas = ''

// 将文件转换为URL
const fileToUrl = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target.result)
    reader.readAsDataURL(file)
  })
}

// 处理粘贴事件
const handlePaste = async (event) => {
  const items = event.clipboardData.items
  for (let item of items) {
    if (item.type.startsWith('image/')) {
      event.preventDefault()
      const file = item.getAsFile()
      handleInputImg(file)
      break
    }
  }
}

// 处理文件拖放
const handleDrop = async (event) => {
  const files = event.dataTransfer.files;
  if (files.length === 0) return;
  const file = files[0];
  if (file.type.startsWith('image/')) {
    handleInputImg(file)
  } else if (file.type === 'text/plain') {
    const text = await file.text();
    inputText.value = text;
  }
};

const triggerUpload = () => {
  fileInput.value.click()
}

//选择图片
const handleFileSelect = async (event) => {
  const file = event.target.files[0]
  handleInputImg(file)
  event.target.value = ''
}
async function handleInputImg(file) {
  if (file && file.type.startsWith('image/')) {
    const url = await fileToUrl(file)
    inputImg.value = url
    dialogVisible.value = true
    inputText.value = ''
  }
}
</script>

<style lang="less" scoped>
.input-area {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 15px;

  .input-box {
    border-radius: 12px;
    padding: 20px;
    background-color: #fff;

    textarea {
      width: 100%;
      min-height: 200px;
      border: none;
      outline: none;
      resize: vertical;
      font-size: 1rem;
      line-height: 1.5;
      background-color: transparent;

      &::placeholder {
        color: #999;
      }
    }

    .img-box {
      position: relative;
      margin: 0 auto;
      width: 250px;
      height: 250px;
      border-radius: 10px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .delete {
        position: absolute;
        z-index: 2;
        top: 0;
        right: 0;
        padding: 5px 10px;
        padding-bottom: 2px;
        font-size: 25px;
        color: #fff;
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(10px);
        border-bottom-left-radius: 20px;
      }
    }
  }

  .emotion-spectrum {
    height: 8px;
    border-radius: 4px;
    transition: background 0.3s ease;
  }
}
</style>