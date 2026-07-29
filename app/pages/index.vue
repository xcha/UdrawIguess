<script setup lang="ts">
/**
 * 首页 / 大厅
 *
 * 这个页面负责：
 * 1. 输入玩家昵称
 * 2. 创建新房间（生成随机房间号）
 * 3. 加入已有房间（输入房间号）
 *
 * 注意：这里暂时只做前端跳转，Socket.IO 的房间逻辑后面再加
 * 现在先把"用户流程"跑通，这是"先骨架后血肉"的开发思路
 */

// 玩家昵称
const playerName = ref('')

// 要加入的房间号
const joinRoomId = ref('')

// 创建房间——生成 6 位随机码
function createRoom() {
  if (!playerName.value.trim()) {
    alert('请先输入昵称')
    return
  }

  // 生成 6 位随机房间号
  const roomId = Math.random().toString(36).substring(2, 8)

  // 暂存昵称到 localStorage，进入房间页时读取
  // 为什么用 localStorage 而不是 URL 参数？
  // - URL 参数会暴露在地址栏，不够优雅
  // - localStorage 跨页面持久化，刷新不丢失
  localStorage.setItem('playerName', playerName.value.trim())

  // 跳转到房间页
  // useRouter() 是 Nuxt 自动导入的路由实例
  navigateTo(`/room/${roomId}`)
}

// 加入房间
function joinRoom() {
  if (!playerName.value.trim()) {
    alert('请先输入昵称')
    return
  }
  if (!joinRoomId.value.trim()) {
    alert('请输入房间号')
    return
  }

  localStorage.setItem('playerName', playerName.value.trim())
  navigateTo(`/room/${joinRoomId.value.trim()}`)
}
</script>

<template>
  <div class="lobby">
    <div class="lobby-card">
      <h1 class="title">
        <span class="emoji">🎨</span>
        你画我猜
        <span class="emoji">🤔</span>
      </h1>
      <p class="subtitle">支持移动端 & Web 端 · 实时联机</p>

      <!-- 昵称输入 -->
      <div class="field">
        <label class="label">你的昵称</label>
        <input
          v-model="playerName"
          type="text"
          class="input"
          placeholder="输入昵称..."
          maxlength="12"
          @keyup.enter="createRoom"
        />
      </div>

      <!-- 创建房间 -->
      <button class="btn btn-primary" @click="createRoom">
        🚀 创建房间
      </button>

      <!-- 分隔线 -->
      <div class="divider">
        <span>或者</span>
      </div>

      <!-- 加入房间 -->
      <div class="field">
        <label class="label">房间号</label>
        <input
          v-model="joinRoomId"
          type="text"
          class="input"
          placeholder="输入 6 位房间号..."
          maxlength="6"
        />
      </div>

      <button class="btn btn-secondary" @click="joinRoom">
        🚪 加入房间
      </button>
    </div>
  </div>
</template>

<style scoped>
/* scoped 样式只作用于当前组件 */
.lobby {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  /* 响应式关键：min-height 让小屏也能滚动 */
  min-height: 100vh;
}

.lobby-card {
  width: 100%;
  max-width: 380px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 32px 24px;
  backdrop-filter: blur(10px);
}

.title {
  text-align: center;
  font-size: 28px;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.emoji {
  -webkit-text-fill-color: initial;
}

.subtitle {
  text-align: center;
  color: #888;
  font-size: 13px;
  margin-bottom: 28px;
}

.field {
  margin-bottom: 16px;
}

.label {
  display: block;
  font-size: 13px;
  color: #aaa;
  margin-bottom: 6px;
}

.input {
  width: 100%;
  padding: 12px 14px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: #fff;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s;
}

.input:focus {
  border-color: #667eea;
}

.btn {
  width: 100%;
  padding: 13px;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.1s, opacity 0.2s;
}

.btn:active {
  transform: scale(0.98);
}

.btn-primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.15);
}

.divider {
  text-align: center;
  margin: 20px 0;
  position: relative;
  color: #666;
  font-size: 13px;
}

.divider::before,
.divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 38%;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
}

.divider::before { left: 0; }
.divider::after { right: 0; }
</style>