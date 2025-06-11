<template>
  <div class="messages-container">
    <!-- 工具栏 -->
    <div class="toolbar">
      <div class="search-box">
        <el-input
          v-model="searchQuery"
          placeholder="搜索留言内容"
          clearable
          @clear="handleSearch"
          @keyup.enter="handleSearch"
        >
          <template #prefix>
            <el-icon><search /></el-icon>
          </template>
        </el-input>
      </div>
      <el-select
        v-model="statusFilter"
        placeholder="状态筛选"
        clearable
        @change="handleStatusChange"
      >
        <el-option label="全部" value="" />
        <el-option label="已回复" value="replied" />
        <el-option label="未回复" value="unreplied" />
      </el-select>
    </div>

    <!-- 留言列表 -->
    <el-table
      :data="messages"
      style="width: 100%"
      v-loading="loading"
    >
      <el-table-column prop="nickname" label="昵称" width="120" />
      <el-table-column prop="email" label="邮箱" width="180" />
      <el-table-column prop="content" label="内容" min-width="300" show-overflow-tooltip />
      <el-table-column prop="date" label="时间" width="180" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="row.status === '已回复' ? 'success' : 'info'">
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
              @click="handleReply(row)"
            >
              回复
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

    <!-- 回复对话框 -->
    <el-dialog
      v-model="dialogVisible"
      title="回复留言"
      width="600px"
    >
      <div class="message-detail">
        <div class="message-info">
          <p><strong>昵称：</strong>{{ currentMessage.nickname }}</p>
          <p><strong>邮箱：</strong>{{ currentMessage.email }}</p>
          <p><strong>时间：</strong>{{ currentMessage.date }}</p>
          <p><strong>内容：</strong>{{ currentMessage.content }}</p>
        </div>
        <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          label-width="80px"
        >
          <el-form-item label="回复内容" prop="reply">
            <el-input
              v-model="form.reply"
              type="textarea"
              :rows="4"
              placeholder="请输入回复内容"
            />
          </el-form-item>
        </el-form>
      </div>
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
import { Search } from '@element-plus/icons-vue'

// 搜索和分页
const searchQuery = ref('')
const statusFilter = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)
const loading = ref(false)

// 留言数据（示例）
const messages = ref([
  {
    id: 1,
    nickname: '访客1',
    email: 'visitor1@example.com',
    content: '网站设计得很漂亮，内容也很丰富！',
    date: '2024-03-15 14:30',
    status: '已回复',
    reply: '谢谢您的支持，我们会继续努力！'
  },
  {
    id: 2,
    nickname: '访客2',
    email: 'visitor2@example.com',
    content: '照片拍得真不错，请问是用什么相机拍的？',
    date: '2024-03-14 16:45',
    status: '已回复',
    reply: '我用的是 Sony A7III，搭配 24-70mm f/2.8 镜头。'
  },
  {
    id: 3,
    nickname: '访客3',
    email: 'visitor3@example.com',
    content: '博客文章写得很好，学到了很多！',
    date: '2024-03-13 09:20',
    status: '未回复'
  }
])

// 表单相关
const dialogVisible = ref(false)
const formRef = ref(null)
const currentMessage = ref({})
const form = reactive({
  reply: ''
})

const rules = {
  reply: [
    { required: true, message: '请输入回复内容', trigger: 'blur' },
    { min: 2, max: 500, message: '长度在 2 到 500 个字符', trigger: 'blur' }
  ]
}

// 搜索
const handleSearch = () => {
  // TODO: 实现搜索逻辑
  console.log('Search:', searchQuery.value)
}

// 状态筛选
const handleStatusChange = (value) => {
  // TODO: 根据状态筛选留言
  console.log('Status changed:', value)
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

// 回复留言
const handleReply = (message) => {
  currentMessage.value = message
  form.reply = message.reply || ''
  dialogVisible.value = true
}

// 删除留言
const handleDelete = (message) => {
  ElMessageBox.confirm(
    '确定要删除这条留言吗？',
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

// 提交回复
const handleSubmit = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    // TODO: 实现提交逻辑
    ElMessage.success('回复成功')
    dialogVisible.value = false
  } catch (error) {
    console.error('Submit error:', error)
  }
}
</script>

<style scoped>
.messages-container {
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

.message-detail {
  margin-bottom: 20px;
}

.message-info {
  background-color: #f5f7fa;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.message-info p {
  margin: 5px 0;
  color: #666;
}

@media screen and (max-width: 768px) {
  .messages-container {
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