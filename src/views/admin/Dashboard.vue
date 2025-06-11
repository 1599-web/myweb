<template>
  <div class="dashboard-container">
    <!-- 数据概览卡片 -->
    <el-row :gutter="20" class="data-overview">
      <el-col :span="6" :xs="12">
        <el-card shadow="hover" class="data-card">
          <template #header>
            <div class="card-header">
              <span>文章总数</span>
              <el-icon><document /></el-icon>
            </div>
          </template>
          <div class="card-value">{{ statistics.posts }}</div>
        </el-card>
      </el-col>
      <el-col :span="6" :xs="12">
        <el-card shadow="hover" class="data-card">
          <template #header>
            <div class="card-header">
              <span>照片总数</span>
              <el-icon><picture /></el-icon>
            </div>
          </template>
          <div class="card-value">{{ statistics.photos }}</div>
        </el-card>
      </el-col>
      <el-col :span="6" :xs="12">
        <el-card shadow="hover" class="data-card">
          <template #header>
            <div class="card-header">
              <span>留言总数</span>
              <el-icon><chat-dot-round /></el-icon>
            </div>
          </template>
          <div class="card-value">{{ statistics.messages }}</div>
        </el-card>
      </el-col>
      <el-col :span="6" :xs="12">
        <el-card shadow="hover" class="data-card">
          <template #header>
            <div class="card-header">
              <span>访问量</span>
              <el-icon><view /></el-icon>
            </div>
          </template>
          <div class="card-value">{{ statistics.views }}</div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 最近动态 -->
    <el-row :gutter="20" class="recent-activities">
      <el-col :span="12" :xs="24">
        <el-card class="activity-card">
          <template #header>
            <div class="card-header">
              <span>最近文章</span>
              <el-button text @click="$router.push('/admin/posts')">
                查看全部
              </el-button>
            </div>
          </template>
          <el-table :data="recentPosts" style="width: 100%">
            <el-table-column prop="title" label="标题" />
            <el-table-column prop="date" label="发布时间" width="180" />
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="12" :xs="24">
        <el-card class="activity-card">
          <template #header>
            <div class="card-header">
              <span>最近留言</span>
              <el-button text @click="$router.push('/admin/messages')">
                查看全部
              </el-button>
            </div>
          </template>
          <el-table :data="recentMessages" style="width: 100%">
            <el-table-column prop="content" label="内容" show-overflow-tooltip />
            <el-table-column prop="date" label="时间" width="180" />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  Document,
  Picture,
  ChatDotRound,
  View
} from '@element-plus/icons-vue'

// 统计数据（示例）
const statistics = ref({
  posts: 25,
  photos: 156,
  messages: 89,
  views: 1234
})

// 最近文章（示例）
const recentPosts = ref([
  {
    title: '如何使用Vue 3开发一个博客系统',
    date: '2024-03-15 14:30'
  },
  {
    title: 'Element Plus组件库使用指南',
    date: '2024-03-14 16:45'
  },
  {
    title: '前端性能优化实践',
    date: '2024-03-13 09:20'
  }
])

// 最近留言（示例）
const recentMessages = ref([
  {
    content: '网站设计得很漂亮，内容也很丰富！',
    date: '2024-03-15 14:30'
  },
  {
    content: '照片拍得真不错，请问是用什么相机拍的？',
    date: '2024-03-14 16:45'
  },
  {
    content: '博客文章写得很好，学到了很多！',
    date: '2024-03-13 09:20'
  }
])
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
}

.data-overview {
  margin-bottom: 20px;
}

.data-card {
  height: 120px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-value {
  font-size: 24px;
  font-weight: bold;
  color: #409EFF;
  text-align: center;
  margin-top: 10px;
}

.recent-activities {
  margin-top: 20px;
}

.activity-card {
  margin-bottom: 20px;
}

@media screen and (max-width: 768px) {
  .dashboard-container {
    padding: 10px;
  }
  
  .data-card {
    margin-bottom: 10px;
  }
}
</style> 