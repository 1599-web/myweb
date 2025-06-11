<template>
  <div class="blog-container">
    <div class="container">
      <!-- 搜索和筛选区域 -->
      <div class="filter-section">
        <el-input
          v-model="searchQuery"
          placeholder="搜索文章..."
          class="search-input"
          clearable
          @clear="handleSearch"
        >
          <template #prefix>
            <el-icon><search /></el-icon>
          </template>
        </el-input>
        
        <el-select
          v-model="selectedCategory"
          placeholder="选择分类"
          clearable
          @change="handleSearch"
        >
          <el-option
            v-for="category in categories"
            :key="category.value"
            :label="category.label"
            :value="category.value"
          />
        </el-select>
        
        <el-select
          v-model="selectedTag"
          placeholder="选择标签"
          clearable
          @change="handleSearch"
        >
          <el-option
            v-for="tag in tags"
            :key="tag.value"
            :label="tag.label"
            :value="tag.value"
          />
        </el-select>
      </div>

      <!-- 文章列表 -->
      <div class="posts-section">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :md="8" v-for="post in posts" :key="post.id">
            <el-card class="post-card" :body-style="{ padding: '20px' }">
              <template #header>
                <div class="post-header">
                  <h3 class="post-title">{{ post.title }}</h3>
                  <div class="post-meta">
                    <span>
                      <el-icon><calendar /></el-icon>
                      {{ post.date }}
                    </span>
                    <span>
                      <el-icon><view /></el-icon>
                      {{ post.views }}
                    </span>
                  </div>
                </div>
              </template>
              
              <p class="post-excerpt">{{ post.excerpt }}</p>
              
              <div class="post-footer">
                <div class="post-tags">
                  <el-tag
                    v-for="tag in post.tags"
                    :key="tag"
                    size="small"
                    class="post-tag"
                  >
                    {{ tag }}
                  </el-tag>
                </div>
                
                <el-button
                  text
                  type="primary"
                  @click="$router.push(`/blog/${post.id}`)"
                >
                  阅读全文
                  <el-icon class="el-icon--right"><arrow-right /></el-icon>
                </el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <!-- 分页 -->
      <div class="pagination-section">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[9, 18, 27, 36]"
          layout="total, sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Search, Calendar, View, ArrowRight } from '@element-plus/icons-vue'

// 搜索和筛选
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedTag = ref('')

// 分页
const currentPage = ref(1)
const pageSize = ref(9)
const total = ref(100)

// 分类和标签数据（示例）
const categories = ref([
  { value: 'tech', label: '技术' },
  { value: 'life', label: '生活' },
  { value: 'travel', label: '旅行' }
])

const tags = ref([
  { value: 'vue', label: 'Vue' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'css', label: 'CSS' }
])

// 文章数据（示例）
const posts = ref([
  {
    id: 1,
    title: 'Vue3 组合式 API 实践',
    date: '2024-03-15',
    views: 1234,
    excerpt: '探索 Vue3 组合式 API 的使用方法和最佳实践...',
    tags: ['Vue', 'JavaScript']
  },
  {
    id: 2,
    title: '前端性能优化技巧',
    date: '2024-03-10',
    views: 856,
    excerpt: '分享一些实用的前端性能优化方法和工具...',
    tags: ['性能优化', 'JavaScript']
  },
  {
    id: 3,
    title: '我的摄影之旅',
    date: '2024-03-05',
    views: 567,
    excerpt: '记录我的摄影学习历程和心得体会...',
    tags: ['摄影', '生活']
  }
])

// 搜索处理
const handleSearch = () => {
  // TODO: 实现搜索逻辑
  console.log('Search:', {
    query: searchQuery.value,
    category: selectedCategory.value,
    tag: selectedTag.value
  })
}

// 分页处理
const handleSizeChange = (val) => {
  pageSize.value = val
  // TODO: 重新加载数据
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  // TODO: 重新加载数据
}

onMounted(() => {
  // TODO: 加载初始数据
})
</script>

<style scoped>
.blog-container {
  padding: 40px 0;
}

.filter-section {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.search-input {
  width: 300px;
}

.posts-section {
  margin-bottom: 30px;
}

.post-card {
  margin-bottom: 20px;
  transition: transform 0.3s;
}

.post-card:hover {
  transform: translateY(-5px);
}

.post-header {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.post-title {
  margin: 0;
  font-size: 1.2em;
  color: #333;
}

.post-meta {
  display: flex;
  gap: 20px;
  color: #999;
  font-size: 0.9em;
}

.post-meta span {
  display: flex;
  align-items: center;
  gap: 4px;
}

.post-excerpt {
  color: #666;
  margin: 15px 0;
  line-height: 1.6;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}

.post-tags {
  display: flex;
  gap: 8px;
}

.pagination-section {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

@media screen and (max-width: 768px) {
  .filter-section {
    flex-direction: column;
  }
  
  .search-input {
    width: 100%;
  }
  
  .post-card {
    margin-bottom: 15px;
  }
}
</style> 