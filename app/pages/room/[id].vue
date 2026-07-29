<script setup lang="ts">
/**
 * 游戏房间页
 *
 * 路由：/room/:id
 * 这个 :id 会通过 useRoute().params.id 取到
 *
 * 当前是"占位版本"——先验证路由跳转和 Socket 连接
 * 后面会逐步加入：画板、猜词输入、玩家列表、计分
 */

// useRoute() 是 Nuxt 自动导入的，获取当前路由信息
const route = useRoute()
const roomId = computed(() => route.params.id as string)

// 从 localStorage 读取昵称（首页存的）
const playerName = ref(localStorage.getItem('playerName') || '玩家')

// 如果没有昵称（比如直接访问 URL），回首页
if (!localStorage.getItem('playerName')) {
  navigateTo('/')
}

/**
 * 这里调用 useSocketStatus() 触发连接
 *
 * 当前是占位阶段，先验证连接是否成功
 */
const socketStatus = useSocketStatus()

// 返回大厅
function backToLobby() {
  navigateTo('/')
}
</script>

<template>
  <div class="room">
    <header class="room-header">
      <button class="back-btn" @click="backToLobby">← 返回</button>
      <div class="room-info">
        <span class="room-label">房间号</span>
        <span class="room-id">{{ roomId }}</span>
      </div>
      <div class="status" :class="socketStatus">
        {{ socketStatus === 'connected' ? '已连接' : socketStatus === 'connecting' ? '连接中...' : '未连接' }}
      </div>
    </header>

    <main class="room-body">
      <div class="placeholder">
        <div class="emoji-large">🎨</div>
        <h2>游戏房间已就绪</h2>
        <p>房间号：<strong>{{ roomId }}</strong></p>
        <p>玩家：<strong>{{ playerName }}</strong></p>
        <p class="hint">下一步：在这里加入画板和猜词功能</p>

        <!-- 测试 Socket 连通性 -->
        <button class="test-btn" @click="socketEmit('ping')">
          发送 ping 测试
        </button>
        <p class="hint" v-if="socketStatus === 'connected'">
          ✅ 已连接服务器，点击按钮看控制台输出
        </p>
      </div>
    </main>
  </div>
</template>

<style scoped>
.room {
  display: flex;
  flex-direction: column;
  height: 100vh;
  /* 防止移动端 Safari 的 100vh bug */
  height: 100dvh;
}

.room-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.back-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ddd;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}

.room-info {
  text-align: center;
}

.room-label {
  display: block;
  font-size: 11px;
  color: #888;
}

.room-id {
  font-size: 18px;
  font-weight: 700;
  color: #667eea;
  letter-spacing: 1px;
}

.status {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
}

.status.connected {
  background: rgba(76, 175, 80, 0.2);
  color: #4caf50;
}

.status.connecting {
  background: rgba(255, 193, 7, 0.2);
  color: #ffc107;
}

.status.disconnected,
.status.error {
  background: rgba(244, 67, 54, 0.2);
  color: #f44336;
}

.room-body {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow: auto;
}

.placeholder {
  text-align: center;
  color: #ccc;
}

.emoji-large {
  font-size: 64px;
  margin-bottom: 16px;
}

.placeholder h2 {
  margin-bottom: 12px;
  color: #fff;
}

.placeholder p {
  margin: 6px 0;
  font-size: 15px;
}

.hint {
  color: #666 !important;
  font-size: 13px !important;
  margin-top: 20px !important;
}

.test-btn {
  margin-top: 16px;
  padding: 10px 24px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}
</style>