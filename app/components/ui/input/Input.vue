<script setup lang="ts">
/**
 * Input 组件
 *
 * 相比 Button 简单很多——就是个带样式的原生 <input>
 *
 * 关键点：
 * - v-model 绑定：用 defineModel() （Vue 3.4+ 语法）
 *   父组件 v-model="x" 时，这里 modelValue 自动同步
 * - class 合并：外部 class 覆盖默认样式
 */
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
}>()

// emits 'update:modelValue' 让 v-model 工作
const emits = defineEmits<{
  'update:modelValue': [payload: string | number]
}>()

function handleInput(e: Event) {
  emits('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<template>
  <input
    :value="modelValue ?? defaultValue"
    @input="handleInput"
    :class="cn(
      'flex h-10 w-full rounded-md border border-input bg-input/30 px-3 py-2 text-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50',
      props.class,
    )"
  />
</template>