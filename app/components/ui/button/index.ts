/**
 * Button 组件的变体定义
 *
 * cva（class-variance-authority）是 shadcn-vue 的"变体工厂"：
 * 给定基础类名 + 变体映射，生成一个函数。
 * 调用 buttonVariants({ variant: 'outline', size: 'sm' }) 得到对应类名。
 *
 * 这种模式的好处：
 * - 变体定义集中在一处，类型安全
 * - 使用方只需传 variant='xxx'，不用记一长串类名
 * - VariantProps 自动推导出 TS 类型
 */

import { cva, type VariantProps } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  // 基础类名——所有变体共享
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
  {
    variants: {
      // 视觉风格变体
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-white hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      // 尺寸变体
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

// 自动推导变体类型，供 Button.vue 的 props 使用
export type ButtonVariants = VariantProps<typeof buttonVariants>