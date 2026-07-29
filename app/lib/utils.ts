/**
 * cn —— shadcn-vue 的核心工具函数
 *
 * 作用：智能合并 Tailwind 类名
 *
 * 为什么需要它？看这个例子：
 *   cn('px-2 py-1', 'px-4')  →  'py-1 px-4'
 *
 * - clsx：处理条件类名（传对象、数组都行）
 *   clsx('a', { b: true, c: false }, ['d'])  →  'a b d'
 *
 * - tailwind-merge：解决 Tailwind 类冲突
 *   'px-2 px-4' → 'px-4'（后面的覆盖前面的，而不是两个都生效）
 *
 * 组合起来就是 cn：先用 clsx 拼接，再用 tailwind-merge 去重
 *
 * 放在 lib/ 而不是 utils/ 是因为 shadcn-vue 的约定
 * （这样将来用 shadcn CLI 加组件时路径能对上）
 */

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}