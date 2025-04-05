<template>
  <div class="layout">
    <div class="bg">
      <!-- <div class="halo-core"></div> -->
      <div class="halo-core halo-core-2"></div>
    </div>
    <Navbar />
    <div class="container">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" class="page" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
import Navbar from './components/Navbar.vue';
</script>
<style lang="less" scoped>
.layout {
  width: 100vw;
  height: 100vh;
  overflow: auto;

  .container {
    position: relative;
    z-index: 1;
    max-width: 1080px;
    margin: 0 auto;
    padding: 0 1rem;

    @media (min-width: 768px) {
      padding: 0 2rem;
    }

    @media (min-width: 1024px) {
      padding: 0 3rem;
    }
  }
}

.bg {
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #0B0D1C;
  backdrop-filter: blur(10px);

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
  }

  .halo-core {
    position: absolute;
    top: 100%;
    left: 0%;
    width: 50vw;
    height: 50vw;
    max-width: 700px;
    max-height: 700px;
    border-radius: 50%;
    background: radial-gradient(circle at 50% 50%, #C658E890 0%, transparent 70%);
    position: fixed;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;

    &.halo-core-2 {
      max-width: 500px;
      max-height: 500px;
      top: 5%;
      left: 95%;
      background: radial-gradient(circle at 50% 50%, #FF408190 0%, transparent 70%);
    }
  }
}
</style>
