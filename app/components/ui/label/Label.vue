<script setup lang="ts">
/**
 * Label 组件
 *
 * 用 reka-ui 的 Label 原语——它给原生 <label> 加了无障碍特性
 * （点击 label 能聚焦关联的 input，键盘可达性等）
 *
 * reka-ui 的角色：提供"无样式、行为正确"的基础组件
 * shadcn-vue 的角色：在 reka-ui 上加 Tailwind 样式
 * 这种分层是 shadcn 体系的精髓
 */
import type { HTMLAttributes } from 'vue'
import { Label as LabelPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  for?: string
}>()
</script>

<template>
  <LabelPrimitive
    :for="props.for"
    :class="cn(
      'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
      props.class,
    )"
  >
    <slot />
  </LabelPrimitive>
</template>