<template>
  <div class="home-container">
    <!-- 欢迎区域 -->
    <section class="welcome-section">
      <div class="welcome-bg" :style="{ backgroundImage: `url(${homeback})` }"></div>
      <div class="welcome-content">
        <div class="typewriter-box">
          <span class="typewriter-text">{{ displayText }}</span>
          <span class="typewriter-cursor">|</span>
        </div>
      </div>
      <div class="wave-wrapper">
        <svg class="wave wave1" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path :d="wavePath1" fill="rgba(255,255,255,0.7)" />
        </svg>
        <svg class="wave wave2" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path :d="wavePath2" fill="rgba(255,255,255,0.5)" />
        </svg>
        <svg class="wave wave3" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path :d="wavePath3" fill="rgba(255,255,255,0.3)" />
        </svg>
      </div>



    </section>

    <!-- 特色内容区域 -->
    <section class="features-section">
      <div class="container">
        <h2 class="section-title">功能导航</h2>
        <el-row :gutter="30">
          <el-col :xs="24" :sm="12" :md="6" v-for="feature in features" :key="feature.title">
            <div class="feature-card" @click="$router.push(feature.link)">
              <el-icon class="feature-icon" :size="40">
                <component :is="feature.icon" />
              </el-icon>
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.description }}</p>
            </div>
          </el-col>
        </el-row>
      </div>
    </section>

    <!-- 最新博客预览 -->
    <!-- <section class="latest-posts-section">
      <div class="container">
        <h2 class="section-title">最新博客</h2>
        <el-row :gutter="30">
          <el-col :xs="24" :sm="12" :md="8" v-for="post in latestPosts" :key="post.id">
            <el-card class="post-card" :body-style="{ padding: '0' }">
              <div class="post-image">
                <el-image :src="post.cover" fit="cover" />
              </div>
              <div class="post-content">
                <h3>{{ post.title }}</h3>
                <p class="post-meta">
                  <el-icon><calendar /></el-icon>
                  {{ post.date }}
                  <el-icon class="ml-3"><view /></el-icon>
                  {{ post.views }} 阅读
                </p>
                <p class="post-excerpt">{{ post.excerpt }}</p>
                <el-button text class="read-more" @click="$router.push(`/blog/${post.id}`)">
                  阅读全文
                  <el-icon class="el-icon--right"><arrow-right /></el-icon>
                </el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </section> -->

    <!-- 照片墙预览 -->
    <section class="photo-preview-section">
      <div class="container">
        <h2 class="section-title">精选照片</h2>
        <el-row :gutter="20">
          <el-col :xs="12" :sm="8" :md="6" v-for="photo in featuredPhotos" :key="photo.id">
            <div class="photo-card" @click="$router.push('/photos')">
              <el-image
                :src="photo.url"
                :alt="photo.title"
                fit="cover"
                class="photo-image"
              />
              <div class="photo-overlay">
                <h3>{{ photo.title }}</h3>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  Document,
  Picture,
  ChatDotRound,
  VideoPlay,
  Calendar,
  View,
  ArrowRight
} from '@element-plus/icons-vue'

import homeback from '../assets/homeback.jpg';

// 特色内容数据
const features = ref([
  {
    title: '博客文章',
    description: '分享技术心得、生活感悟和有趣的故事',
    icon: 'Document',
    link: '/blog'
  },
  {
    title: '照片墙',
    description: '记录生活中的精彩瞬间和美好回忆',
    icon: 'Picture',
    link: '/photos'
  },
  {
    title: '留言墙',
    description: '与访客互动，分享想法和建议',
    icon: 'ChatDotRound',
    link: '/message'
  },
  {
    title: '小游戏',
    description: '休闲娱乐，放松心情',
    icon: 'VideoPlay',
    link: '/games'
  }
])

// 最新博客数据（示例）
const latestPosts = ref([
  {
    id: 1,
    title: 'Vue3 组合式 API 实践',
    date: '2024-03-15',
    views: 1234,
    excerpt: '探索 Vue3 组合式 API 的使用方法和最佳实践...',
    cover: 'https://picsum.photos/400/200?random=1'
  },
  {
    id: 2,
    title: '前端性能优化技巧',
    date: '2024-03-10',
    views: 856,
    excerpt: '分享一些实用的前端性能优化方法和工具...',
    cover: 'https://picsum.photos/400/200?random=2'
  },
  {
    id: 3,
    title: '我的摄影之旅',
    date: '2024-03-05',
    views: 567,
    excerpt: '记录我的摄影学习历程和心得体会...',
    cover: 'https://picsum.photos/400/200?random=3'
  }
])

// 精选照片数据（示例）
const featuredPhotos = ref([
  {
    id: 1,
    url: 'https://picsum.photos/300/300?random=1',
    title: '风景照片1'
  },
  {
    id: 2,
    url: 'https://picsum.photos/300/300?random=2',
    title: '风景照片2'
  },
  {
    id: 3,
    url: 'https://picsum.photos/300/300?random=3',
    title: '风景照片3'
  },
  {
    id: 4,
    url: 'https://picsum.photos/300/300?random=4',
    title: '风景照片4'
  }
])

const fullText = '童话---'
const displayText = ref('')
let index = 0
let typingTimer = null
let resetTimer = null

const wavePath1 = ref('')
const wavePath2 = ref('')
const wavePath3 = ref('')

function generateWavePath(amplitude, frequency, phase) {
  const width = 1440
  const height = 100
  let d = `M 0 ${height / 2}`
  for (let x = 0; x <= width; x++) {
    const y = amplitude * Math.sin((x / frequency) + phase) + height / 2
    d += ` L ${x} ${y}`
  }
  d += ` L ${width} ${height} L 0 ${height} Z`
  return d
}

function animateWaves() {
  let phase1 = 0
  let phase2 = 0
  let phase3 = 0
  function update() {
    phase1 += 0.03
    phase2 += 0.02
    phase3 += 0.015
    wavePath1.value = generateWavePath(20, 200, phase1)
    wavePath2.value = generateWavePath(25, 300, phase2)
    wavePath3.value = generateWavePath(15, 150, phase3)
    requestAnimationFrame(update)
  }
  update()
}

onMounted(() => {
  animateWaves()
})

function startTyping() {
  displayText.value = ''
  index = 0
  typingTimer = setInterval(() => {
    if (index < fullText.length) {
      displayText.value += fullText[index]
      index++
    } else {
      clearInterval(typingTimer)
      // 停顿1.5秒后清空再重新打字
      resetTimer = setTimeout(() => {
        startTyping()
      }, 1500)
    }
  }, 300)
}

onMounted(() => {
  startTyping()
})
</script>

<style scoped>
.home-container {
  padding-bottom: 60px;
}

.welcome-section {
  position: relative;
  background: url('https://img2.imgtp.com/2024/05/10/1Qw1Qw1Qw1.jpg') center/cover no-repeat;
  min-height: 420px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
}

.welcome-bg {
  /* background-image: url('@/assets/homeback.jpg'); */
  position: absolute;
  inset: 0;
  /* background: rgba(0,0,0,0.15); */
  z-index: 1;
  background-repeat: repeat;
  background-size: contain;
  /* background-position: center; */
}

.welcome-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 120px;
  margin-bottom: 60px;
}

.typewriter-box {
  background: rgba(255,255,255,0.85);
  border-radius: 12px;
  padding: 18px 48px;
  font-size: 2.2em;
  font-weight: bold;
  color: #222;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
  display: flex;
  align-items: center;
  min-width: 180px;
  min-height: 56px;
}

.typewriter-text {
  letter-spacing: 2px;
}

.typewriter-cursor {
  color: #409EFF;
  margin-left: 2px;
  animation: blink 1s steps(1) infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.wave-wrapper {
  position: relative;
  width: 100%;
  height: 100px;
  overflow: hidden;
  z-index: 2;
}

.wave {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  left: 0;
}


.section-title {
  text-align: center;
  font-size: 2em;
  margin-bottom: 40px;
  color: #333;
  font-weight: 600;
}

.features-section {
  padding: 60px 0;
}

.feature-card {
  background: white;
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  color: #409EFF;
  margin-bottom: 20px;
}

.feature-card h3 {
  font-size: 1.2em;
  margin-bottom: 15px;
  color: #333;
}

.feature-card p {
  color: #666;
  font-size: 0.9em;
  line-height: 1.6;
}

.latest-posts-section {
  padding: 60px 0;
  background-color: #f8f9fa;
}

.post-card {
  margin-bottom: 30px;
  transition: all 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.post-image {
  height: 200px;
  overflow: hidden;
}

.post-image .el-image {
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
}

.post-card:hover .post-image .el-image {
  transform: scale(1.05);
}

.post-content {
  padding: 20px;
}

.post-content h3 {
  font-size: 1.2em;
  margin-bottom: 15px;
  color: #333;
}

.post-meta {
  color: #999;
  font-size: 0.9em;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.post-excerpt {
  color: #666;
  font-size: 0.9em;
  line-height: 1.6;
  margin-bottom: 20px;
}

.read-more {
  color: #409EFF;
  font-weight: 500;
}

.photo-preview-section {
  padding: 60px 0;
}

.photo-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
  cursor: pointer;
}

.photo-image {
  width: 100%;
  height: 300px;
  transition: transform 0.3s ease;
}

.photo-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.photo-card:hover .photo-image {
  transform: scale(1.05);
}

.photo-card:hover .photo-overlay {
  opacity: 1;
}

.photo-overlay h3 {
  font-size: 1.1em;
  margin: 0;
}

.ml-3 {
  margin-left: 12px;
}

@media screen and (max-width: 768px) {
  .welcome-content {
    margin-top: 60px;
    margin-bottom: 30px;
  }

  .typewriter-box {
    font-size: 1.2em;
    padding: 12px 18px;
    min-width: 100px;
    min-height: 36px;
  }

  .section-title {
    font-size: 1.5em;
  }

  .feature-card {
    margin-bottom: 20px;
  }

  .post-image {
    height: 180px;
  }
}
</style> 