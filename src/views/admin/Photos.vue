<template>
  <div class="photos-container">
    <!-- 工具栏 -->
    <div class="toolbar">
      <el-button type="primary" @click="handleUpload">
        <el-icon><upload /></el-icon>
        上传照片
      </el-button>
      <div class="search-box">
        <el-input
          v-model="searchQuery"
          placeholder="搜索照片描述"
          clearable
          @clear="handleSearch"
          @keyup.enter="handleSearch"
        >
          <template #prefix>
            <el-icon><search /></el-icon>
          </template>
        </el-input>
      </div>
    </div>

    <!-- 相册选择 -->
    <div class="album-filter">
      <el-select
        v-model="selectedAlbum"
        placeholder="选择相册"
        clearable
        @change="handleAlbumChange"
      >
        <el-option
          v-for="album in albums"
          :key="album.id"
          :label="album.name"
          :value="album.id"
        />
      </el-select>
    </div>

    <!-- 照片网格 -->
    <div class="photo-grid">
      <el-card
        v-for="photo in photos"
        :key="photo.id"
        class="photo-card"
        :body-style="{ padding: '0px' }"
      >
        <div class="photo-image">
          <el-image
            :src="photo.url"
            fit="cover"
            :preview-src-list="[photo.url]"
          />
          <div class="photo-overlay">
            <el-button-group>
              <el-button
                type="primary"
                link
                @click="handleEdit(photo)"
              >
                编辑
              </el-button>
              <el-button
                type="danger"
                link
                @click="handleDelete(photo)"
              >
                删除
              </el-button>
            </el-button-group>
          </div>
        </div>
        <div class="photo-info">
          <p class="photo-title">{{ photo.title }}</p>
          <p class="photo-date">{{ photo.date }}</p>
        </div>
      </el-card>
    </div>

    <!-- 分页 -->
    <div class="pagination">
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

    <!-- 编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      title="编辑照片信息"
      width="500px"
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input
            v-model="form.description"
            type="textarea"
            :rows="3"
          />
        </el-form-item>
        <el-form-item label="相册" prop="albumId">
          <el-select v-model="form.albumId">
            <el-option
              v-for="album in albums"
              :key="album.id"
              :label="album.name"
              :value="album.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="拍摄地点" prop="location">
          <el-input v-model="form.location" />
        </el-form-item>
        <el-form-item label="拍摄时间" prop="date">
          <el-date-picker
            v-model="form.date"
            type="datetime"
            placeholder="选择日期时间"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 上传对话框 -->
    <el-dialog
      v-model="uploadDialogVisible"
      title="上传照片"
      width="500px"
    >
      <el-upload
        class="upload-area"
        drag
        action="/api/upload"
        multiple
        :on-success="handleUploadSuccess"
        :on-error="handleUploadError"
        :before-upload="beforeUpload"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          将文件拖到此处，或<em>点击上传</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            支持 jpg/png 文件，且不超过 5MB
          </div>
        </template>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Upload,
  UploadFilled,
  Search
} from '@element-plus/icons-vue'

// 搜索和分页
const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = ref(12)
const total = ref(100)

// 相册数据（示例）
const albums = ref([
  { id: 1, name: '风景' },
  { id: 2, name: '人像' },
  { id: 3, name: '美食' }
])

const selectedAlbum = ref('')

// 照片数据（示例）
const photos = ref([
  {
    id: 1,
    title: '日落',
    url: 'https://via.placeholder.com/300x200?text=Sunset',
    date: '2024-03-15 14:30',
    albumId: 1
  },
  {
    id: 2,
    title: '海滩',
    url: 'https://via.placeholder.com/300x200?text=Beach',
    date: '2024-03-14 16:45',
    albumId: 1
  },
  {
    id: 3,
    title: '美食',
    url: 'https://via.placeholder.com/300x200?text=Food',
    date: '2024-03-13 09:20',
    albumId: 3
  }
])

// 表单相关
const dialogVisible = ref(false)
const formRef = ref(null)
const form = reactive({
  title: '',
  description: '',
  albumId: '',
  location: '',
  date: ''
})

const rules = {
  title: [
    { required: true, message: '请输入照片标题', trigger: 'blur' }
  ],
  albumId: [
    { required: true, message: '请选择相册', trigger: 'change' }
  ]
}

// 上传相关
const uploadDialogVisible = ref(false)

// 搜索
const handleSearch = () => {
  // TODO: 实现搜索逻辑
  console.log('Search:', searchQuery.value)
}

// 相册切换
const handleAlbumChange = (value) => {
  // TODO: 根据相册筛选照片
  console.log('Album changed:', value)
}

// 分页
const handleSizeChange = (val) => {
  pageSize.value = val
  // TODO: 重新加载数据
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  // TODO: 重新加载数据
}

// 上传照片
const handleUpload = () => {
  uploadDialogVisible.value = true
}

const beforeUpload = (file) => {
  const isImage = file.type.startsWith('image/')
  const isLt5M = file.size / 1024 / 1024 < 5

  if (!isImage) {
    ElMessage.error('只能上传图片文件！')
    return false
  }
  if (!isLt5M) {
    ElMessage.error('图片大小不能超过 5MB！')
    return false
  }
  return true
}

const handleUploadSuccess = (response) => {
  ElMessage.success('上传成功')
  // TODO: 刷新照片列表
}

const handleUploadError = () => {
  ElMessage.error('上传失败')
}

// 编辑照片
const handleEdit = (photo) => {
  dialogVisible.value = true
  Object.assign(form, photo)
}

// 删除照片
const handleDelete = (photo) => {
  ElMessageBox.confirm(
    '确定要删除这张照片吗？',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    // TODO: 实现删除逻辑
    ElMessage.success('删除成功')
  }).catch(() => {})
}

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    // TODO: 实现提交逻辑
    ElMessage.success('更新成功')
    dialogVisible.value = false
  } catch (error) {
    console.error('Submit error:', error)
  }
}
</script>

<style scoped>
.photos-container {
  padding: 20px;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.search-box {
  width: 300px;
}

.album-filter {
  margin-bottom: 20px;
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.photo-card {
  transition: transform 0.3s ease;
}

.photo-card:hover {
  transform: translateY(-5px);
}

.photo-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.photo-image :deep(.el-image) {
  width: 100%;
  height: 100%;
}

.photo-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.photo-card:hover .photo-overlay {
  opacity: 1;
}

.photo-info {
  padding: 10px;
}

.photo-title {
  margin: 0;
  font-weight: bold;
  color: #333;
}

.photo-date {
  margin: 5px 0 0;
  font-size: 0.9em;
  color: #999;
}

.pagination {
  display: flex;
  justify-content: flex-end;
}

.upload-area {
  width: 100%;
}

@media screen and (max-width: 768px) {
  .photos-container {
    padding: 10px;
  }
  
  .toolbar {
    flex-direction: column;
    gap: 10px;
  }
  
  .search-box {
    width: 100%;
  }
  
  .photo-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
  }
}
</style> 