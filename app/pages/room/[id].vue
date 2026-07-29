<script setup lang="ts">
/**
 * 游戏房间页
 *
 * 用 shadcn-vue 的 Card、Badge、Button 重写
 * Badge 的 variant 根据连接状态动态切换
 */
import { ArrowLeft } from 'lucide-vue-next'
import type { BadgeVariants } from '@/components/ui/badge'

const route = useRoute()
const roomId = computed(() => route.params.id as string)

const playerName = ref('')
const socketStatus = useSocketStatus()

onMounted(() => {
  const name = localStorage.getItem('playerName')
  if (!name) {
    navigateTo('/')
    return
  }
  playerName.value = name
})

// 根据连接状态算出 Badge 的样式变体
const statusVariant = computed<BadgeVariants['variant']>(() => {
  switch (socketStatus.value) {
    case 'connected': return 'success'
    case 'connecting': return 'warning'
    default: return 'error'
  }
})

const statusText = computed(() => {
  switch (socketStatus.value) {
    case 'connected': return '已连接'
    case 'connecting': return '连接中...'
    default: return '未连接'
  }
})

function backToLobby() {
  navigateTo('/')
}
</script>

<template>
  <!-- h-dvh 是动态视口高度，解决移动端 Safari 的 100vh bug -->
  <div class="flex h-dvh flex-col">
    <header class="flex items-center justify-between border-b bg-card/50 px-4 py-3">
      <UiButton variant="ghost" size="sm" @click="backToLobby">
        <ArrowLeft class="size-4" />
        返回
      </UiButton>

      <div class="text-center">
        <div class="text-xs text-muted-foreground">房间号</div>
        <div class="text-lg font-bold tracking-wider text-primary">{{ roomId }}</div>
      </div>

      <UiBadge :variant="statusVariant">{{ statusText }}</UiBadge>
    </header>

    <main class="flex flex-1 items-center justify-center p-5">
      <UiCard class="w-full max-w-md text-center">
        <UiCardHeader>
          <div class="text-6xl">🎨</div>
          <UiCardTitle class="text-xl">游戏房间已就绪</UiCardTitle>
        </UiCardHeader>

        <UiCardContent class="space-y-2">
          <p class="text-sm text-muted-foreground">
            房间号 <span class="font-semibold text-foreground">{{ roomId }}</span>
          </p>
          <p class="text-sm text-muted-foreground">
            玩家 <span class="font-semibold text-foreground">{{ playerName }}</span>
          </p>
          <p class="text-xs text-muted-foreground mt-4">
            下一步：在这里加入画板和猜词功能
          </p>

          <UiButton class="mt-2" @click="socketEmit('ping')">
            发送 ping 测试
          </UiButton>

          <p v-if="socketStatus === 'connected'" class="text-xs text-muted-foreground mt-2">
            ✅ 已连接服务器，点击按钮看控制台输出
          </p>
        </UiCardContent>
      </UiCard>
    </main>
  </div>
</template>