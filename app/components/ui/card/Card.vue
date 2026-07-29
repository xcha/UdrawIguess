<script setup lang="ts">
/**
 * Card 容器组件
 * 就是个带圆角、边框、阴影的 div
 */
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <div
    :class="cn(
      'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm',
      props.class,
    )"
  >
    <slot />
  </div>
</template>