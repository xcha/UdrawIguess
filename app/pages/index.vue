<script setup lang="ts">
/**
 * 首页 / 大厅
 *
 * 用 shadcn-vue 组件 + Tailwind 工具类重写
 * 对比之前的 scoped CSS 版本，现在更声明式、更简洁
 */
import { Rocket, DoorOpen } from 'lucide-vue-next'

const playerName = ref('')
const joinRoomId = ref('')

function createRoom() {
  if (!playerName.value.trim()) return
  const roomId = Math.random().toString(36).substring(2, 8)
  localStorage.setItem('playerName', playerName.value.trim())
  navigateTo(`/room/${roomId}`)
}

function joinRoom() {
  if (!playerName.value.trim() || !joinRoomId.value.trim()) return
  localStorage.setItem('playerName', playerName.value.trim())
  navigateTo(`/room/${joinRoomId.value.trim()}`)
}
</script>

<template>
  <!-- min-h-screen 撑满屏幕，flex 居中 -->
  <div class="flex min-h-screen items-center justify-center p-5">
    <UiCard class="w-full max-w-sm">
      <UiCardHeader class="text-center">
        <UiCardTitle class="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-2xl text-transparent">
          🎨 你画我猜 🤔
        </UiCardTitle>
        <UiCardDescription>支持移动端 &amp; Web 端 · 实时联机</UiCardDescription>
      </UiCardHeader>

      <UiCardContent class="space-y-4">
        <!-- 昵称 -->
        <div class="space-y-2">
          <UiLabel for="name">你的昵称</UiLabel>
          <UiInput
            id="name"
            v-model="playerName"
            placeholder="输入昵称..."
            maxlength="12"
            @keyup.enter="createRoom"
          />
        </div>

        <!-- 创建房间 -->
        <UiButton class="w-full" @click="createRoom">
          <Rocket class="size-4" />
          创建房间
        </UiButton>

        <!-- 分隔线 -->
        <div class="relative py-1">
          <div class="absolute inset-0 flex items-center">
            <span class="w-full border-t border-border" />
          </div>
          <div class="relative flex justify-center text-xs uppercase">
            <span class="bg-card px-2 text-muted-foreground">或者</span>
          </div>
        </div>

        <!-- 加入房间 -->
        <div class="space-y-2">
          <UiLabel for="roomId">房间号</UiLabel>
          <UiInput
            id="roomId"
            v-model="joinRoomId"
            placeholder="输入 6 位房间号..."
            maxlength="6"
          />
        </div>

        <UiButton variant="secondary" class="w-full" @click="joinRoom">
          <DoorOpen class="size-4" />
          加入房间
        </UiButton>
      </UiCardContent>
    </UiCard>
  </div>
</template>