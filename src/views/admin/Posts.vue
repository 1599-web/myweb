<template>
  <div class="posts-container">
    <!-- 工具栏 -->
    <div class="toolbar">
      <el-button type="primary" @click="handleAdd">
        <el-icon><plus /></el-icon>
        新建文章
      </el-button>
      <div class="search-box">
        <el-input
          v-model="searchQuery"
          placeholder="搜索文章标题"
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

    <!-- 文章列表 -->
    <el-table
      :data="posts"
      style="width: 100%"
      v-loading="loading"
    >
      <el-table-column prop="title" label="标题" min-width="200" />
      <el-table-column prop="category" label="分类" width="120" />
      <el-table-column prop="date" label="发布时间" width="180" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="row.status === '已发布' ? 'success' : 'info'">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" fixed="right">
        <template #default="{ row }">
          <el-button-group>
            <el-button
              type="primary"
              link
              @click="handleEdit(row)"
            >
              编辑
            </el-button>
            <el-button
              type="primary"
              link
              @click="handlePreview(row)"
            >
              预览
            </el-button>
            <el-button
              type="danger"
              link
              @click="handleDelete(row)"
            >
              删除
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        :page-sizes="[10, 20, 30, 50]"
        layout="total, sizes, prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogType === 'add' ? '新建文章' : '编辑文章'"
      width="80%"
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
        <el-form-item label="分类" prop="category">
          <el-select v-model="form.category">
            <el-option
              v-for="item in categories"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="标签" prop="tags">
          <el-select
            v-model="form.tags"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择或输入标签"
          >
            <el-option
              v-for="item in tags"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input
            v-model="form.content"
            type="textarea"
            :rows="10"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio label="已发布">发布</el-radio>
            <el-radio label="草稿">保存为草稿</el-radio>
          </el-radio-group>
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
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Search } from '@element-plus/icons-vue'

// 搜索和分页
const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)
const loading = ref(false)

// 文章数据（示例）
const posts = ref([
  {
    id: 1,
    title: '如何使用Vue 3开发一个博客系统',
    category: '前端开发',
    date: '2024-03-15 14:30',
    status: '已发布'
  },
  {
    id: 2,
    title: 'Element Plus组件库使用指南',
    category: '前端开发',
    date: '2024-03-14 16:45',
    status: '已发布'
  },
  {
    id: 3,
    title: '前端性能优化实践',
    category: '性能优化',
    date: '2024-03-13 09:20',
    status: '草稿'
  }
])

// 分类和标签（示例）
const categories = [
  { value: '前端开发', label: '前端开发' },
  { value: '后端开发', label: '后端开发' },
  { value: '性能优化', label: '性能优化' }
]

const tags = [
  { value: 'Vue', label: 'Vue' },
  { value: 'React', label: 'React' },
  { value: 'JavaScript', label: 'JavaScript' }
]

// 表单相关
const dialogVisible = ref(false)
const dialogType = ref('add')
const formRef = ref(null)
const form = reactive({
  title: '',
  category: '',
  tags: [],
  content: '',
  status: '草稿'
})

const rules = {
  title: [
    { required: true, message: '请输入文章标题', trigger: 'blur' },
    { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
  ],
  category: [
    { required: true, message: '请选择文章分类', trigger: 'change' }
  ],
  content: [
    { required: true, message: '请输入文章内容', trigger: 'blur' }
  ]
}

// 搜索
const handleSearch = () => {
  // TODO: 实现搜索逻辑
  console.log('Search:', searchQuery.value)
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

// 新建文章
const handleAdd = () => {
  dialogType.value = 'add'
  dialogVisible.value = true
  form.title = ''
  form.category = ''
  form.tags = []
  form.content = ''
  form.status = '草稿'
}

// 编辑文章
const handleEdit = (row) => {
  dialogType.value = 'edit'
  dialogVisible.value = true
  Object.assign(form, row)
}

// 预览文章
const handlePreview = (row) => {
  // TODO: 实现预览逻辑
  console.log('Preview:', row)
}

// 删除文章
const handleDelete = (row) => {
  ElMessageBox.confirm(
    '确定要删除这篇文章吗？',
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
    ElMessage.success(dialogType.value === 'add' ? '创建成功' : '更新成功')
    dialogVisible.value = false
  } catch (error) {
    console.error('Submit error:', error)
  }
}
</script>

<style scoped>
.posts-container {
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

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

@media screen and (max-width: 768px) {
  .posts-container {
    padding: 10px;
  }
  
  .toolbar {
    flex-direction: column;
    gap: 10px;
  }
  
  .search-box {
    width: 100%;
  }
}
</style> 