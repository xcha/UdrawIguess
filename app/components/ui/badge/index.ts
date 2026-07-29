/**
 * Badge 变体定义
 * 跟 Button 一样用 cva，但样式更轻量
 */
import { cva, type VariantProps } from 'class-variance-authority'

export { default as Badge } from './Badge.vue'

export const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        destructive: 'border-transparent bg-destructive text-white',
        outline: 'text-foreground',
        // 自定义：连接状态用
        success: 'border-transparent bg-green-500/20 text-green-500',
        warning: 'border-transparent bg-yellow-500/20 text-yellow-500',
        error: 'border-transparent bg-red-500/20 text-red-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type BadgeVariants = VariantProps<typeof badgeVariants>