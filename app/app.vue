<script setup lang="ts">
/**
 * 根组件
 *
 * 关键：useHead 给 <html> 加 dark class
 * 这样 main.css 里的 .dark 主题变量就生效了
 * 在服务端就渲染出来，避免主题闪烁（FOUC）
 */
useHead({
  htmlAttrs: { class: 'dark' },
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>