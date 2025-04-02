<template>
  <div class="navbar">
    <div class="navbar-left">
      <img src="/icon.png" alt="logo" class="logo" />
      <span class="app-name">UHappyOK</span>
      <el-button class="settings-btn" @click="showSettings = true">
        <el-icon>
          <Setting />
        </el-icon>
      </el-button>
    </div>
    <div class="navbar-right">
      <div id="google_translate_element"></div>
    </div>

    <el-dialog v-model="showSettings" title="AI配置" width="100%" style="max-width:500px" append-to-body>
      <el-form label-width="120px">
        <el-form-item label="Base URL">
          <el-input v-model="aiConfigBackup.baseUrl" disabled placeholder="请输入API基础URL" />
        </el-form-item>
        <el-form-item label="模型">
          <el-select v-model="aiConfigBackup.model" placeholder="请选择模型">
            <el-option label="deepseek-ai/DeepSeek-V3" value="deepseek-ai/DeepSeek-V3" />
            <el-option label="deepseek-ai/DeepSeek-R1" value="deepseek-ai/DeepSeek-R1" />
          </el-select>
        </el-form-item>
        <el-form-item label="API Key">
          <el-input v-model="aiConfigBackup.apiKey" placeholder="请输入API Key" />
          <span>注册 <a href="https://cloud.siliconflow.cn/i/UmLqQHN0" target="_blank" style="color:#FF5722">
              硅基流动</a>平台API</span>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showSettings = false">取消</el-button>
          <el-button type="primary" @click="saveSettings">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Setting } from '@element-plus/icons-vue'
import { aiConfig } from '../store/index'

const showSettings = ref(false)
const aiConfigBackup = ref({ ...aiConfig.value })
console.log(aiConfig.value)

const saveSettings = () => {
  showSettings.value = false
  aiConfig.value = { ...aiConfigBackup.value }
}
</script>

<style scoped lang="less">
.navbar {
  position: sticky;
  z-index: 9;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  width: 32px;
  height: 32px;
}

.app-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
}

.settings-btn {
  background-color: rgba(255, 255, 255, 0.5);
}

@media (max-width: 480px) {
  .navbar {
    padding: 0 10px;
  }

  .app-name {
    font-size: 1rem;
  }

  .logo {
    width: 28px;
    height: 28px;
  }
}

#google_translate_element {
  position: relative;
  width: fit-content;
}
</style>