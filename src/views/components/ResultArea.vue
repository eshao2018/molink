<template>
  <div class="result-area" v-if="resultText">
    <div class="result-card">
      <div class="actions">
        <div class="title">回复结果</div>
        <div class="action-btn" @click="getReply" v-loading="loading">
          <el-icon>
            <Refresh />
          </el-icon>
        </div>
      </div>
      <div class="content">
        <div v-if="!result.length">
          {{ resultText }}
        </div>
        <div v-for="(result, index) in result" :key="index" class="result-item">
          <div class="text">
            {{ result }}
          </div>
          <div class="copy-btn" @click="copyText(result)">
            <el-icon>
              <CopyDocument />
            </el-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CopyDocument, Refresh } from '@element-plus/icons-vue'
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { resultText, result, getReply, loading } from '../store'

const results = ref(['你开心就好，我支持你继续保持这种心态。', '保持乐观积极的心态是很好的。', '希望你永远开心快乐！']);

const copyText = (text) => {
  navigator.clipboard.writeText(text);
  ElMessage({
    message: '复制成功',
    type: 'success',
    duration: 2000
  });
};
</script>

<style lang="less" scoped>
.result-area {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin: 0 auto;
  margin-top: 15px;

  .result-card {
    position: relative;
    background: #fff;
    border-radius: 12px;
    padding: 20px;

    .actions {
      top: 10px;
      right: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;

      .title {
        font-size: 16px;
        font-weight: 600;
        color: #2c3e50;
        letter-spacing: 0.5px;
      }

      .action-btn {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #f5f5f5;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s;
        background: linear-gradient(45deg, #FF9800, #FF5722);
        color: #fff;

        &:hover {
          opacity: 0.8;
        }
      }
    }

    .content {
      font-size: 16px;
      line-height: 1.6;
      color: #333;

      .result-item {
        padding: 20px 0;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        border-top: 1px solid #FF980020;

        .text {
          flex: 1;
          overflow: hidden;
        }

        .copy-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #f5f5f5;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
          color: #999;

          &:hover {
            background: #e0e0e0;
          }
        }
      }

      .divider {
        height: 1px;
        background: #eee;
        margin: 8px 0;
      }
    }
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(100px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>