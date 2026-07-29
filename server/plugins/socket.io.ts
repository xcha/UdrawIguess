/**
 * Socket.IO 服务端插件
 *
 * 这个文件是 Nuxt 4 的 Nitro 插件，在服务端启动时运行。
 * 它创建一个独立的 Socket.IO 服务器，处理实时通信。
 *
 * 为什么用插件而不是 API 路由？
 * - Socket.IO 需要长期维持的 WebSocket 连接
 * - API 路由是"请求-响应"模式，不适合实时通信
 * - 插件可以在 Nitro 启动时初始化，独立于 HTTP 请求生命周期
 */

import { Server as SocketIOServer } from 'socket.io'

// defineNitroPlugin 在 Nuxt 4 中是自动导入的，无需手动 import
export default defineNitroPlugin(() => {
  // 防止热重载时重复创建（端口占用 EADDRINUSE）
  if ((globalThis as any).__io) {
    return
  }

  /**
   * 创建 Socket.IO 服务端实例
   *
   * Socket.IO 底层原理：
   * 1. 客户端先尝试用 WebSocket 连接
   * 2. 如果 WebSocket 被防火墙阻断，自动降级为 HTTP 长轮询
   * 3. 这就是 Socket.IO 相比原生 WebSocket 的优势——自动降级
   *
   * 端口 3001：独立于 Nuxt 的 3000 端口运行
   */
  const io = new SocketIOServer(3001, {
    cors: {
      origin: '*', // 开发阶段允许所有来源
      methods: ['GET', 'POST']
    }
  })

  // 把 io 实例挂到全局，方便其他 API 路由访问
  ;(globalThis as any).__io = io

  console.log('🔌 Socket.IO 服务器已启动 (端口 3001)')

  /**
   * connection 事件——这是 Socket.IO 最核心的事件
   *
   * 每当有客户端连接时触发，socket 参数代表这个客户端
   * 每个 socket 都有一个唯一的 id（socket.id）
   *
   * 这里的思路是 "事件驱动"：
   * - 不需要轮询，也不需要手动管理连接池
   * - 客户端和服务端之间通过事件名称来通信
   */
  io.on('connection', (socket) => {
    console.log(`🟢 客户端已连接: ${socket.id}`)

    /**
     * 测试用：客户端发送 ping，服务端回复 pong
     * 后面我们会替换成真正的游戏事件
     */
    socket.on('ping', () => {
      socket.emit('pong', { message: '来自服务器的 pong！' })
    })

    /**
     * disconnect 事件——客户端断开连接
     *
     * 注意：断开可能是暂时的（网络波动）或永久的（关闭页面）
     * Socket.IO 内置了自动重连机制
     */
    socket.on('disconnect', (reason) => {
      console.log(`🔴 客户端已断开: ${socket.id}, 原因: ${reason}`)
    })
  })
})