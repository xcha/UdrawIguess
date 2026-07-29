import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // 全局引入 Tailwind CSS（包含 shadcn-vue 主题变量）
  css: ['~/assets/css/main.css'],

  vite: {
    // Tailwind v4 用 Vite 插件方式集成（不再是 PostCSS 插件）
    plugins: [tailwindcss()],
  },

  components: [
    /**
     * 组件自动导入配置
     *
     * extensions: ['.vue'] —— 只扫描 .vue 文件
     * 为什么？因为 shadcn-vue 的每个组件目录下有 index.ts（导出 variant 函数），
     * 如果不限制，Nuxt 可能把 index.ts 也当组件处理，导致命名冲突。
     * 限制为 .vue 后，index.ts 只能手动 import，组件正常自动导入。
     *
     * 命名规则：路径段拼接 + 去重
     *   ui/button/Button.vue  → <UiButton>  （button/Button 去重）
     *   ui/card/CardHeader.vue → <UiCardHeader>
     */
    { path: '~/components', extensions: ['.vue'] },
  ],
})