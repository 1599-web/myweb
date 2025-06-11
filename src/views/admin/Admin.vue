<template>
  <div class="admin-container">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px" class="admin-aside">
        <div class="logo">
          <router-link to="/">My Blog</router-link>
        </div>
        <el-menu
          :router="true"
          :default-active="$route.path"
          class="admin-menu"
        >
          <el-menu-item index="/admin/dashboard">
            <el-icon><data-line /></el-icon>
            <span>仪表盘</span>
          </el-menu-item>
          <el-menu-item index="/admin/posts">
            <el-icon><document /></el-icon>
            <span>文章管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/photos">
            <el-icon><picture /></el-icon>
            <span>照片管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/messages">
            <el-icon><chat-dot-round /></el-icon>
            <span>留言管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/settings">
            <el-icon><setting /></el-icon>
            <span>系统设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 主要内容区域 -->
      <el-container>
        <el-header class="admin-header">
          <div class="header-left">
            <el-icon class="collapse-btn" @click="isCollapse = !isCollapse">
              <fold v-if="!isCollapse" />
              <expand v-else />
            </el-icon>
            <breadcrumb />
          </div>
          <div class="header-right">
            <el-dropdown>
              <span class="user-info">
                {{ userStore.userInfo?.username }}
                <el-icon><arrow-down /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>

        <el-main class="admin-main">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import {
  DataLine,
  Document,
  Picture,
  ChatDotRound,
  Setting,
  Fold,
  Expand,
  ArrowDown
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()
const isCollapse = ref(false)

// 退出登录
const handleLogout = async () => {
  try {
    await userStore.logout()
    ElMessage.success('退出成功')
    router.push('/login')
  } catch (error) {
    console.error('Logout error:', error)
  }
}
</script>

<style scoped>
.admin-container {
  min-height: 100vh;
  background-color: #f5f7fa;
}

.admin-aside {
  background-color: #304156;
  color: #fff;
  transition: width 0.3s;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #1f2d3d;
}

.logo a {
  color: #fff;
  text-decoration: none;
}

.admin-menu {
  border-right: none;
  background-color: transparent;
}

.admin-menu :deep(.el-menu-item) {
  color: #bfcbd9;
}

.admin-menu :deep(.el-menu-item.is-active) {
  color: #409EFF;
  background-color: #263445;
}

.admin-menu :deep(.el-menu-item:hover) {
  background-color: #263445;
}

.admin-header {
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.collapse-btn {
  font-size: 20px;
  cursor: pointer;
}

.header-right {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}

.admin-main {
  padding: 20px;
}

@media screen and (max-width: 768px) {
  .admin-aside {
    position: fixed;
    z-index: 1000;
    height: 100vh;
    transform: translateX(0);
    transition: transform 0.3s;
  }

  .admin-aside.collapsed {
    transform: translateX(-200px);
  }

  .admin-main {
    padding: 10px;
  }
}
</style> 