/**
 * useSocket - Socket.IO 客户端 Composable
 *
 * 什么是 composable？
 * Vue 3 的 composable 是一种"组合式函数"，把有状态逻辑抽出来复用。
 * 类似 React 的 hooks，但更灵活。
 *
 * 这个 composable 封装了 socket.io-client 的连接逻辑：
 * - 自动连接服务端
 * - 提供响应式的连接状态
 * - 统一的接口，方便组件使用
 */

import { io, Socket } from 'socket.io-client'

// 连接状态枚举——比布尔值更清晰
export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'error'

/**
 * 单例模式：整个应用只用一个 Socket 连接
 *
 * 为什么要用单例？因为：
 * 1. 每个页面（大厅、房间）都共用同一个连接
 * 2. 避免重复创建连接，浪费资源
 * 3. Socket.IO 自动管理频道（room），不需要多连接
 */
let socket: Socket | null = null
let connectionStatus: ConnectionStatus = 'disconnected'
const listeners = new Set<() => void>()

function notify() {
  listeners.forEach(fn => fn())
}

/**
 * 获取 Socket 实例（如果尚未连接则自动连接）
 *
 * 这里用到了"惰性初始化"模式：
 * - 第一次调用时才真正建立连接
 * - 后续调用返回同一个实例
 */
export function getSocket(): Socket {
  if (!socket?.connected) {
    /**
     * io() 做了什么？
     * 1. 向 http://localhost:3001 发起 HTTP 请求（初始握手）
     * 2. 服务端返回 sid（session ID）
     * 3. 自动升级到 WebSocket 连接
     * 4. 如果 WebSocket 失败，降级到 HTTP 长轮询
     *
     * 这一切对开发者是透明的——你只需要 emit 和 on
     */
    socket = io('http://localhost:3001', {
      autoConnect: true,     // 自动连接（默认就是 true）
      reconnection: true,    // 断线自动重连
      reconnectionAttempts: 5,  // 最多重试 5 次
      reconnectionDelay: 1000,  // 每次重试间隔 1 秒
    })

    // 监听连接事件，更新状态
    socket.on('connect', () => {
      connectionStatus = 'connected'
      notify()
      console.log('🟢 Socket 已连接:', socket?.id)
    })

    socket.on('disconnect', (reason) => {
      connectionStatus = 'disconnected'
      notify()
      console.log('🔴 Socket 已断开:', reason)
    })

    socket.on('connect_error', (err) => {
      connectionStatus = 'error'
      notify()
      console.error('❌ Socket 连接失败:', err.message)
    })

    // 初始状态是 connecting
    connectionStatus = 'connecting'
    notify()
  }

  return socket
}

/**
 * 响应式的连接状态
 *
 * 在 Vue 组件中可以用：
 * const status = useSocketStatus()
 * watch(status, (newStatus) => { ... })
 *
 * 或者直接在模板中：{{ status }}
 */
export function useSocketStatus() {
  const status = ref<ConnectionStatus>(connectionStatus)

  onMounted(() => {
    const update = () => {
      status.value = connectionStatus
    }
    listeners.add(update)
    update() // 立即同步一次
    onUnmounted(() => listeners.delete(update))
  })

  return status
}

/**
 * 发送事件
 *
 * 调用方式：emit('event_name', data)
 * 服务端用 socket.on('event_name', (data) => {}) 接收
 */
export function emit(event: string, ...args: any[]) {
  const s = getSocket()
  s.emit(event, ...args)
}

/**
 * 监听事件（自动清理）
 *
 * 在 Vue 组件中：
 * onEvent('message', (data) => { ... })
 *
 * 组件卸载时自动取消监听，防止内存泄漏
 */
export function onEvent(event: string, handler: (...args: any[]) => void) {
  const s = getSocket()
  s.on(event, handler)

  // 组件卸载时自动清理
  try {
    onUnmounted(() => {
      s.off(event, handler)
    })
  } catch {
    // 不在组件上下文时，手动调用
  }

  // 返回取消监听的函数
  return () => s.off(event, handler)
}

/**
 * 一次性监听——只处理一次事件就取消
 */
export function onceEvent(event: string, handler: (...args: any[]) => void) {
  const s = getSocket()
  s.once(event, handler)
}