<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useUserStore } from './store/user'
import { 
  ArrowDown, 
  Setting, 
  SwitchButton,
  Message,
  Location,
  User,
  Document,
  Picture,
  VideoPlay
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const handleLogout = async () => {
  try {
    await userStore.logout()
    ElMessage.success('退出登录成功')
  } catch (error) {
    ElMessage.error('退出登录失败')
  }
}

// const friendLinks = [
//   {
//     avatar: 'https://img1.imgtp.com/2023/07/16/1Qw1Qw1Qw1.png',
//     title: '莱卡云',
//     desc: '提供稳定可靠、安全可信、可持续创新的云服务'
//   },
//   {
//     avatar: 'https://img1.imgtp.com/2023/07/16/2Qw2Qw2Qw2.png',
//     title: 'Kiwi2333\' Blog',
//     desc: '一个正在学习的独立开发者'
//   },
//   {
//     avatar: 'https://img1.imgtp.com/2023/07/16/3Qw3Qw3Qw3.png',
//     title: 'ZLX STUDIO',
//     desc: '为音乐创作发电！'
//   }
// ]
</script>

<template>
  <div class="app-container">
    <!-- 顶部导航栏 -->
    <el-header class="header" :class="{ 'header-scrolled': isScrolled }">
      <div class="container header-content">
        <div class="logo">
          <router-link to="/">
            <span class="logo-text">CWJ</span>
          </router-link>
        </div>
        <el-menu
          mode="horizontal"
          :router="true"
          class="nav-menu"
          :ellipsis="false"
        >
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/blog">博客</el-menu-item>
          <el-menu-item index="/photos">照片墙</el-menu-item>
          <el-menu-item index="/message">留言墙</el-menu-item>
          <el-menu-item index="/games">小游戏</el-menu-item>
        </el-menu>
        <div class="user-actions">
          <template v-if="userStore.isLoggedIn">
            <el-dropdown trigger="click">
              <div class="user-info">
                <el-avatar :size="32" :src="userStore.userInfo?.avatar || '/default-avatar.png'" />
                <span class="username">{{ userStore.userInfo?.username }}</span>
                <el-icon><arrow-down /></el-icon>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item v-if="userStore.isAdmin" @click="$router.push('/admin')">
                    <el-icon><setting /></el-icon>
                    管理后台
                  </el-dropdown-item>
                  <el-dropdown-item @click="handleLogout">
                    <el-icon><switch-button /></el-icon>
                    退出登录
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
          <!-- <template v-else>
            <el-button type="primary" class="login-btn" @click="$router.push('/login')">
              登录
            </el-button>
          </template> -->
        </div>
      </div>
    </el-header>

    <!-- 主要内容区域 -->
    <el-main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </el-main>

    <!-- 页脚 -->
    <el-footer class="footer">
      <div class="footer-container">
        <!-- 友情链接与信息区 -->
        <div class="friend-links-section">
          <!-- <h2 class="friend-title">
            <el-icon><user /></el-icon>
            友情链接
          </h2>
          <div class="friend-links">
            <div class="friend-card" v-for="link in friendLinks" :key="link.title">
              <img class="friend-avatar" :src="link.avatar" :alt="link.title" />
              <div class="friend-info">
                <div class="friend-title-main">{{ link.title }}</div>
                <div class="friend-desc">{{ link.desc }}</div>
              </div>
            </div>
          </div> -->
          <div class="footer-info-row">
            <div class="footer-icons">
              <el-icon size="40"><document /></el-icon>
              <!-- <el-icon size="40"><picture /></el-icon> -->
              <el-icon size="40"><video-play /></el-icon>
            </div>
            <div class="footer-contact">
              <div>微信：--</div>
              <div>QQ：1599838698@qq.com</div>
              <div>邮箱：chenhuofire@163.com</div>
            </div>
            <div class="footer-qr">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=weixin://wxpay/bizpayurl?pr=xxxx" alt="二维码" />
            </div>
          </div>
          <div class="footer-bottom-bar">
            备案/许可证 粤ICP备19012866号
          </div>
        </div>
      </div>
    </el-footer>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
}

.header {
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}

.header-scrolled {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.logo {
  font-size: 24px;
  font-weight: bold;
}

.logo-text {
  background: linear-gradient(45deg, #409EFF, #36D1DC);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-decoration: none;
}

.nav-menu {
  border-bottom: none;
  background: transparent;
}

.nav-menu :deep(.el-menu-item) {
  font-size: 16px;
  height: 64px;
  line-height: 64px;
  color: #333;
}

.nav-menu :deep(.el-menu-item.is-active) {
  color: #409EFF;
  font-weight: 500;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 20px;
  transition: background-color 0.3s;
}

.user-info:hover {
  background-color: #f5f7fa;
}

.username {
  font-size: 14px;
  color: #333;
}

.login-btn {
  border-radius: 20px;
  padding: 8px 24px;
  font-weight: 500;
}

.main-content {
  margin-top: 64px;
  flex: 1;
  padding: 0;
}

.footer {
  background-color: #fff;
  padding: 60px 0 20px;
  margin-top: 60px;
  box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.1);
}

.footer-container {
  background: #fff;
  padding: 40px 0 -40px 0;
  min-height: 260px;
}

.friend-links-section {
  background: #fff;
  border-radius: 18px;
  margin: 0 auto 32px auto;
  max-width: 900px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.06);
  padding: 36px 32px 18px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-info-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 18px 0;
  width: 100%;
  flex-wrap: wrap;
}

.footer-icons {
  display: flex;
  gap: 32px;
}

.footer-contact {
  font-size: 1em;
  color: #333;
  line-height: 2;
  min-width: 180px;
  text-align: left;
}

.footer-qr img {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  background: #fff;
  border: 1px solid #fff;
}

.footer-bottom-bar {
  text-align: center;
  color: #888;
  font-size: 0.95em;
  margin: 18px 0 0 0;
  padding-bottom: 8px;
  width: 100%;
}

@media (max-width: 900px) {
  .friend-links-section {
    padding: 24px 8px 12px 8px;
    max-width: 98vw;
  }
  .footer-info-row {
    flex-direction: column;
    gap: 24px;
    align-items: flex-start;
  }
  .footer-contact {
    text-align: left;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media screen and (max-width: 768px) {
  .header-content {
    flex-direction: column;
    height: auto;
    padding: 10px 0;
  }

  .nav-menu {
    width: 100%;
    margin: 10px 0;
  }

  .main-content {
    margin-top: 120px;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .footer {
    padding: 40px 0 20px;
  }
}
</style>
