<template>
  <div class="layout">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" class="page" />
      </keep-alive>
    </router-view>
    <div class="version">v1.0.0</div>
  </div>
</template>
<script setup lang="ts">

</script>
<style lang="less" scoped>
.layout {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background-image: url('./assets/bg.png');
  background-repeat: repeat;

  .version {
    position: fixed;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 14px;
    color: #fff;
    z-index: 1;
  }
}
</style>
