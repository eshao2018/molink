<template>
  <div class="home-page">
    <h3 class="tag">🤖你的AI回复私人裁缝💬</h3>
    <h1 class="title">UHappyOK 你开心就好</h1>
    <h3 class="subtitle">一键生成降维打击话术，让每个杠精都哭着说"你开心就好"</h3>
    <InputArea />
    <ControlPanel />
    <ResultArea />
    <el-button round block :class="['btn', (!inputText && !inputImg) && 'disabled']" @click="getReply"
      :loading="loading">
      生成回复
    </el-button>
    <div class="ad"></div>
    <UseCases />
  </div>
</template>
<script setup>
import InputArea from './components/InputArea.vue';
import ControlPanel from './components/ControlPanel.vue';
import ResultArea from './components/ResultArea.vue';
import UseCases from './components/UseCases.vue';

import { getReply, inputText, inputImg, loading } from './store'
</script>
<style lang="less" scoped>
.home-page {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 1rem;
  max-width: 1080px;
  margin: 0 auto;

  .tag {
    background-color: #FF572220;
    color: #FF5722;
    font-weight: normal;
    border-radius: 30px;
    font-size: 14px;
    width: fit-content;
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 15px;
    padding: 4px 15px;
  }

  .title {
    font-weight: bold;
    font-size: 60px;
    margin: 0;
    text-align: center;
    background: linear-gradient(45deg, #FF9800, #FF5722);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent;
    margin-bottom: 30px;
  }

  .subtitle {
    text-align: center;
    margin-top: 0;
    margin-bottom: 50px;
    font-weight: normal;
    color: #555;
  }

  .btn {
    width: 100%;
    margin: 30px auto;
    border-radius: 10px;
    padding: 25px;
    box-sizing: border-box;
    background: linear-gradient(45deg, #FF9800, #FF5722);
    text-align: center;
    font-size: 16px;
    color: #fff;
    transition: all .3s;
    cursor: pointer;
    user-select: none;
    border: none;
    box-shadow: none;

    &:hover {
      opacity: 0.8;
    }

    &:active {
      box-shadow: none;
    }

    &.disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  .ad {
    width: 100%;
    height: 25vh;
  }

  @media (min-width: 768px) {
    padding: 2rem;
  }

  @media (min-width: 1024px) {
    padding: 3rem;
  }
}
</style>