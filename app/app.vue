<template>
  <div class="app">
    <NuxtPage />
  </div>
</template>

<style>
/* 全局基础样式 - 所有页面共用 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  background: #1a1a2e;
  color: #eee;
  min-height: 100vh;
  overflow-x: hidden;
}

/* 移动端触摸优化 */
button, input {
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>