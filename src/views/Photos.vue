<template>
  <div class="photos-container">
    <div class="container">
      <!-- 相册选择 -->
      <div class="album-section">
        <el-tabs v-model="activeAlbum" @tab-click="handleAlbumChange">
          <el-tab-pane
            v-for="album in albums"
            :key="album.id"
            :label="album.name"
            :name="album.id"
          >
            <div class="album-description">{{ album.description }}</div>
          </el-tab-pane>
        </el-tabs>
      </div>

      <!-- 照片网格 -->
      <div class="photos-grid">
        <el-row :gutter="20">
          <el-col
            :xs="12"
            :sm="8"
            :md="6"
            v-for="photo in currentPhotos"
            :key="photo.id"
          >
            <div class="photo-item" @click="handlePhotoClick(photo)">
              <el-image
                :src="photo.url"
                :alt="photo.title"
                fit="cover"
                class="photo-image"
                loading="lazy"
              />
              <div class="photo-info">
                <h4>{{ photo.title }}</h4>
                <p>{{ photo.description }}</p>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <!-- 分页 -->
      <div class="pagination-section">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[12, 24, 36, 48]"
          layout="total, sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>

    <!-- 照片预览对话框 -->
    <el-dialog
      v-model="previewVisible"
      :title="selectedPhoto?.title"
      width="80%"
      class="photo-preview-dialog"
    >
      <div class="preview-content">
        <el-image
          :src="selectedPhoto?.url"
          :alt="selectedPhoto?.title"
          fit="contain"
          class="preview-image"
        />
        <div class="preview-info">
          <h3>{{ selectedPhoto?.title }}</h3>
          <p>{{ selectedPhoto?.description }}</p>
          <div class="preview-meta">
            <span>
              <el-icon><calendar /></el-icon>
              {{ selectedPhoto?.date }}
            </span>
            <span>
              <el-icon><location /></el-icon>
              {{ selectedPhoto?.location }}
            </span>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Calendar, Location } from '@element-plus/icons-vue'

// 相册数据（示例）
const albums = ref([
  {
    id: 'nature',
    name: '自然风光',
    description: '记录大自然的美丽瞬间'
  },
  {
    id: 'city',
    name: '城市掠影',
    description: '捕捉城市的独特魅力'
  },
  {
    id: 'life',
    name: '生活随记',
    description: '记录生活中的点点滴滴'
  }
])

// 当前选中的相册
const activeAlbum = ref('nature')

// 分页
const currentPage = ref(1)
const pageSize = ref(12)
const total = ref(100)

// 照片数据（示例）
const photos = ref({
  nature: [
    {
      id: 1,
      title: '山水之间',
      description: '清晨的山间云雾缭绕',
      url: 'https://picsum.photos/400/300?random=1',
      date: '2024-03-15',
      location: '黄山'
    },
    {
      id: 2,
      title: '湖光山色',
      description: '夕阳下的湖面波光粼粼',
      url: 'https://picsum.photos/400/300?random=2',
      date: '2024-03-10',
      location: '西湖'
    }
  ],
  city: [
    {
      id: 3,
      title: '城市夜景',
      description: '霓虹灯下的城市剪影',
      url: 'https://picsum.photos/400/300?random=3',
      date: '2024-03-05',
      location: '上海'
    },
    {
      id: 4,
      title: '老街风情',
      description: '充满历史气息的街道',
      url: 'https://picsum.photos/400/300?random=4',
      date: '2024-03-01',
      location: '北京'
    }
  ],
  life: [
    {
      id: 5,
      title: '午后时光',
      description: '悠闲的下午茶时光',
      url: 'https://picsum.photos/400/300?random=5',
      date: '2024-02-28',
      location: '家中'
    },
    {
      id: 6,
      title: '美食记录',
      description: '美味的家常菜',
      url: 'https://picsum.photos/400/300?random=6',
      date: '2024-02-25',
      location: '厨房'
    }
  ]
})

// 当前相册的照片
const currentPhotos = computed(() => {
  return photos.value[activeAlbum.value] || []
})

// 照片预览
const previewVisible = ref(false)
const selectedPhoto = ref(null)

// 相册切换
const handleAlbumChange = () => {
  currentPage.value = 1
  // TODO: 加载新相册的照片
}

// 照片点击
const handlePhotoClick = (photo) => {
  selectedPhoto.value = photo
  previewVisible.value = true
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
</script>

<style scoped>
.photos-container {
  padding: 40px 0;
}

.album-section {
  margin-bottom: 30px;
}

.album-description {
  color: #666;
  margin-top: 10px;
}

.photos-grid {
  margin-bottom: 30px;
}

.photo-item {
  margin-bottom: 20px;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.photo-item:hover {
  transform: translateY(-5px);
}

.photo-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.photo-info {
  padding: 15px;
  background: white;
}

.photo-info h4 {
  margin: 0 0 10px;
  color: #333;
}

.photo-info p {
  margin: 0;
  color: #666;
  font-size: 0.9em;
}

.pagination-section {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.photo-preview-dialog :deep(.el-dialog__body) {
  padding: 0;
}

.preview-content {
  display: flex;
  flex-direction: column;
}

.preview-image {
  width: 100%;
  max-height: 70vh;
}

.preview-info {
  padding: 20px;
  background: white;
}

.preview-info h3 {
  margin: 0 0 10px;
  color: #333;
}

.preview-info p {
  margin: 0 0 15px;
  color: #666;
}

.preview-meta {
  display: flex;
  gap: 20px;
  color: #999;
  font-size: 0.9em;
}

.preview-meta span {
  display: flex;
  align-items: center;
  gap: 4px;
}

@media screen and (max-width: 768px) {
  .photo-item {
    margin-bottom: 15px;
  }
  
  .preview-content {
    flex-direction: column;
  }
  
  .preview-image {
    max-height: 50vh;
  }
}
</style> 