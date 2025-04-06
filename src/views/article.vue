<template>
  <div class="article-page">
    <div class="label">文章风格</div>
    <div class="style" @click="showStyleDialog = true">
      <div class="name">{{ style.name }}</div>
      <div class="introduce">{{ style.introduce }}</div>
      <div class="desc">{{ style.style }}</div>
    </div>
    <div class="label">写作
      <div class="actions">
        <el-button v-if="Object.keys(savedResults).length" class="btn" type="info" @click="showHistoryDialog = true">{{
      Object.keys(savedResults).length }}个版本</el-button>
        <el-button v-if="result.length" @click="handleCopy" class="btn copy-btn" type="success">复制</el-button>
        <el-button v-if="result.length" type="danger" class="btn" :loading="loading" :disabled="!inputText"
          @click="showClearDialog = true">
          净笔洗砚
        </el-button>
        <el-button v-else class="btn" type="primary" :loading="loading" @click="handleProcess" :disabled="!inputText">
          开始风格淬炼
        </el-button>
      </div>
    </div>
    <div class="article-title" v-if="result.length">
      <el-button :loading="titleLoading" class="btn" @click="handleGetTitle">生成标题</el-button>
      <el-input v-model="title" class="input" maxlength="50" placeholder="文章标题"></el-input>
    </div>
    <comInputArea />
    <el-dialog v-model="showStyleDialog" append-to-body title="选择文章风格" width="80%" align-center>
      <div class="choose-style-list">
        <div v-for="(item, index) in styleList" :key="index" class="style-item" @click="selectStyle(item)">
          <div class="name">{{ item.name }}</div>
          <div class="introduce">{{ item.introduce }}</div>
          <div class="desc">{{ item.style }}</div>
        </div>
      </div>
    </el-dialog>
    <el-dialog v-model="showClearDialog" title="确认清除" width="30%" align-center>
      <span>确定要清除当前结果吗？未保存的结果无法恢复!</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showClearDialog = false">取消</el-button>
          <el-button type="primary" @click="handleClear">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog append-to-body v-model="showHistoryDialog" title="历史保存" width="80%" align-center>
      <div class="history-list">
        <div v-for="(item, index) in savedResults" @click="showHistoryDialog = false; handleChooseResult(item.id)"
          :key="index" class="history-item">
          <div class="content">
            <div class="title" v-if="item.title">{{ item.title }}</div>
            <div class="text">{{ item.result[0].rewrite }}</div>
            <div class="time">
              {{ new Date(item.savedTime).format('yyyy.MM.dd hh:mm:ss') }}
              <span>{{ item.style?.name }}</span>
            </div>
          </div>
          <div class="actions">
            <el-button class="btn" circle type="danger" @click.stop="handleRemove(item.id)" :icon="Delete"></el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, onActivated } from 'vue'
import styleList from '@/store/style.js'
import comInputArea from './components/inputArea.vue'
import {
  title, titleLoading, inputText,
  handleGetTitle, resultPureText, loading,
  handleProcess, style, result, init,
  savedResults, handleRemove, handleChooseResult
} from './store'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import ClipboardJS from 'clipboard'
import { Delete } from '@element-plus/icons-vue'

const route = useRoute()
onActivated(() => {
  init(route.query.id)
})

const showStyleDialog = ref(false)
const showClearDialog = ref(false)
const showHistoryDialog = ref(false)

const selectStyle = (item) => {
  style.value = item
  showStyleDialog.value = false
}

const handleClear = () => {
  result.value = []
  showClearDialog.value = false
}

const handleCopy = async () => {
  try {
    const clipboard = new ClipboardJS('.copy-btn', {
      text: () => resultPureText.value,
    })
    clipboard.on('success', () => {
      ElMessage.success('复制成功')
    })
    clipboard.on('error', () => {
      ElMessage.error('复制失败')
    })
    // await navigator.clipboard.writeText(resultPureText.value)
  } catch (error) {
    ElMessage.error('复制失败')
  }
}
</script>
<style lang="less" scoped>
.article-page {
  padding-bottom: 20vh;

  .label {
    color: #fff;
    font-size: 14px;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;

    .actions {
      display: flex;
      align-items: center;

      .btn {
        background-color: rgba(255, 255, 255, 0.2);
        color: #fff;
        border-radius: 5px;

        &.is-disabled {
          opacity: 0.5;
        }
      }
    }
  }

  .style {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: fit-content;
    max-width: 750px;
    min-width: 200px;
    background-color: rgba(255, 255, 255, 0.1);
    margin-right: 10px;
    overflow: hidden;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 10px;
    cursor: pointer;
    user-select: none;
    transition: all .3s;
    margin-bottom: 30px;

    &:hover {
      opacity: 0.8;
    }

    @media (max-width: 750px) {
      width: 100%;
    }

    .name {
      font-size: 18px;
      font-weight: bold;
      color: #fff;
    }

    .introduce {
      margin: 10px 0;
      font-size: 14px;
      color: #fff;
      opacity: 0.6;
    }

    .desc {
      width: fit-content;
      font-size: 12px;
      background-color: #FF9A3D20;
      color: #FF9A3D;
      padding: 4px 15px;
      border-radius: 30px;
    }
  }

  .article-title {
    display: flex;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 10px;
    border-top: 1px solid #ffffff10;
    padding-top: 20px;

    .input {
      flex: 1;
      margin-left: 10px;

      &:deep(.el-input__wrapper) {
        background-color: rgba(255, 255, 255, 0.1);
        border: none;
        box-shadow: none;
        border-radius: 10px;
        padding: 5px 10px;

        .el-input__inner {
          color: #fff;
        }
      }
    }

    .btn {
      background-color: rgba(255, 255, 255, 0.1);
      color: #fff;
      border-radius: 5px;
    }
  }
}
</style>

<style lang="less">
.history-list {
  height: 75vh;
  overflow: auto;

  .history-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    transition: all 0.3s;

    &:active {
      opacity: 0.8;
    }

    .content {
      flex: 1;
      margin-right: 20px;

      .title {
        font-size: 16px;
        font-weight: bold;
        color: #fff;
        margin-bottom: 10px;
      }

      .text {
        font-size: 14px;
        color: #fff;
        opacity: 0.8;
        white-space: pre-wrap;
      }

      .time {
        margin-top: 5px;
        display: flex;
        font-size: 13px;

        span {
          margin-left: 10px;
        }
      }
    }

    .actions {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .btn {}
    }
  }
}

.choose-style-list {
  height: 75vh;
  overflow: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
  border-radius: 10px;

  .style-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 15px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }

    .name {
      font-size: 18px;
      font-weight: bold;
      color: #fff;
    }

    .introduce {
      margin: 10px 0;
      font-size: 14px;
      color: #fff;
      opacity: 0.6;
    }

    .desc {
      width: fit-content;
      font-size: 12px;
      background-color: #FF9A3D20;
      color: #FF9A3D;
      padding: 4px 15px;
      border-radius: 30px;
    }
  }
}
</style>