<template>
  <div class="navbar">
    <div class="navbar-left">
      <img src="/icon.png" alt="logo" class="logo" />
      <span class="app-name">UHappyOK</span>
    </div>
    <div id="google_translate_element"></div>
  </div>
</template>

<script setup lang="ts">
// 导航栏组件
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