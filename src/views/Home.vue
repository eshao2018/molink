<template>
  <div class="home-page">
    <div class="name">断其章，取乎艺</div>
    <div class="slogan">
      AI智能改写，一键切换散文名家文风
    </div>
    <div class="label">文章列表
      <el-button class="btn" @click="router.push('/article')">写文章</el-button>
    </div>
    <div class="empty" v-if="!list.length">
      🖌️砚台待磨，墨池尚温
      <div class="explain">
        鄙站所为，不过将旧文翻新，绝不敢无中生有，强作解人。
        <div>文章之道，贵在真诚。若凭空捏造，徒惹人笑耳。</div>
      </div>
    </div>
    <div class="list">
      <div class="item-box" v-for="(item, index) in list">
        <div class="item" @click="router.push(`/article?id=${item.id}`)">
          <div class="title">{{ item.result.title }}</div>
          <div class="desc">{{ item.result.result[0].rewrite }}</div>
          <div class="bottom">
            <div class="style">{{ item.style.name }}</div>
            <div class="time">{{ new Date(item.result.savedTime).format('yyyy-M-d hh:mm:ss') }}</div>
          </div>
        </div>
        <el-button class="btn" @click.stop="handleDelete(item.id, index)" circle :icon="Delete"
          type="danger"></el-button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onActivated } from 'vue'
import { useRouter } from 'vue-router'
import { Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const router = useRouter()
const list = ref([])

onActivated(() => {
  getList()
})

function getList() {
  list.value = []
  Object.keys(localStorage).forEach(key => {
    if (key.includes('article-')) {
      try {
        let t = JSON.parse(localStorage[key])
        let firstResult = t.results[Object.keys(t.results)[0]]
        if (firstResult) {
          list.value.push({
            id: t.id,
            style: t.style,
            result: firstResult,
            count: Object.keys(t.results).length,
          })
        } else {
          localStorage.removeItem(key)
        }
      } catch (err) {
        console.log(err)
      }
    }
  })
  list.value = list.value.sort((a, b) => b.result.savedTime - a.result.savedTime)
}
function handleDelete(id, index) {
  localStorage.removeItem(`article-${id}`)
  list.value.splice(index, 1)
  ElMessage.success('删除成功')
}

</script>
<style lang="less" scoped>
.home-page {
  color: #fff;

  .name {
    margin-top: 60px;
    font-size: 60px;
    font-weight: bold;
    color: #fff;
    text-align: center;
  }

  .slogan {
    margin-top: 20px;
    font-size: 20px;
    color: #fff;
    opacity: 0.7;
    text-align: center;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 15px;
    margin-top: 60px;
    margin-bottom: 30px;
    border-top: 1px solid #ffffff10;
    padding-top: 30px;

    .btn {
      background-color: #FF9A3D;
      color: #fff;
      border: none;
    }
  }

  .empty {
    font-size: 30px;
    text-align: center;
    color: #ffffff80;
    margin-top: 60px;
  }

  .list {
    margin-bottom: 20vh;
    min-height: 40vh;

    .item-box {
      display: flex;
      align-items: center;

      .btn {
        pointer-events: none;
        opacity: 0;
        transition: all .3s;
      }

      &:hover {
        .btn {
          pointer-events: all;
          opacity: 1;
        }
      }
    }

    .item {
      flex: 1;
      overflow: hidden;
      word-break: break-all;
      padding: 15px;
      box-sizing: border-box;
      overflow: hidden;
      color: #fff;
      margin-bottom: 10px;
      border-bottom: 1px solid #ffffff20;
      cursor: pointer;

      &:last-child {
        border: none;
      }

      &:hover {
        opacity: 0.8;
      }

      .title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
      }

      .desc {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
        color: #999;
        white-space: nowrap;
        margin-bottom: 15px;
      }

      .bottom {
        display: flex;
        justify-content: space-between;
        font-size: 14px;

        .style {
          color: #FF9A3D;
          font-weight: bold;
        }

        .time {
          color: #fff;
          opacity: 0.5;
        }
      }
    }
  }

  .explain {
    text-align: center;
    font-size: 12px;
    color: #ffffff30;
    margin-top: 10px;
  }
}
</style>