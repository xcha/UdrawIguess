<script setup lang="ts">
/**
 * Button 组件
 *
 * 核心设计：
 * 1. 用 reka-ui 的 Primitive 做"多态渲染"
 *    - as="button" 渲染 <button>（默认）
 *    - as="a" 渲染 <a>，as="div" 渲染 <div>...
 *    - asChild=true 时，把样式传给子元素（组合模式）
 *    这样一个组件能当按钮、链接、任意元素用
 *
 * 2. cn() 合并：内部类名（buttonVariants）+ 外部传入的 class
 *    外部 class 永远能覆盖内部样式 → 高度可定制
 */
import type { HTMLAttributes } from 'vue'
import { Primitive, type PrimitiveProps } from 'reka-ui'
import { type ButtonVariants, buttonVariants } from '.'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<
  PrimitiveProps & {
    variant?: ButtonVariants['variant']
    size?: ButtonVariants['size']
    class?: HTMLAttributes['class']
  }
>(), {
  as: 'button',
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <slot />
  </Primitive>
</template>