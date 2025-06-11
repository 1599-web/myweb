<template>
  <div class="message-container">
    <div class="container">
      <!-- 留言表单 -->
      <div class="message-form-section">
        <el-card class="message-form-card">
          <template #header>
            <div class="card-header">
              <h3>发表留言</h3>
            </div>
          </template>
          
          <el-form
            ref="messageForm"
            :model="formData"
            :rules="rules"
            label-position="top"
          >
            <el-form-item label="昵称" prop="nickname">
              <el-input
                v-model="formData.nickname"
                placeholder="请输入您的昵称"
              />
            </el-form-item>
            
            <el-form-item label="邮箱" prop="email">
              <el-input
                v-model="formData.email"
                placeholder="请输入您的邮箱（选填）"
              />
            </el-form-item>
            
            <el-form-item label="留言内容" prop="content">
              <el-input
                v-model="formData.content"
                type="textarea"
                :rows="4"
                placeholder="请输入留言内容"
                maxlength="500"
                show-word-limit
              />
            </el-form-item>
            
            <el-form-item>
              <el-button
                type="primary"
                :loading="submitting"
                @click="handleSubmit"
              >
                发表留言
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>

      <!-- 留言列表 -->
      <div class="messages-section">
        <h3 class="section-title">留言列表</h3>
        
        <div class="message-list">
          <el-card
            v-for="message in messages"
            :key="message.id"
            class="message-card"
          >
            <div class="message-header">
              <div class="message-info">
                <span class="nickname">{{ message.nickname }}</span>
                <span class="time">{{ message.time }}</span>
              </div>
              <el-button
                v-if="message.reply"
                text
                type="primary"
                @click="message.showReply = !message.showReply"
              >
                {{ message.showReply ? '收起回复' : '查看回复' }}
              </el-button>
            </div>
            
            <div class="message-content">
              {{ message.content }}
            </div>
            
            <div
              v-if="message.reply && message.showReply"
              class="message-reply"
            >
              <div class="reply-header">
                <el-icon><chat-dot-round /></el-icon>
                <span>站长回复</span>
              </div>
              <div class="reply-content">
                {{ message.reply }}
              </div>
            </div>
          </el-card>
        </div>

        <!-- 分页 -->
        <div class="pagination-section">
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { ChatDotRound } from '@element-plus/icons-vue'

// 表单数据
const messageForm = ref(null)
const formData = reactive({
  nickname: '',
  email: '',
  content: ''
})

// 表单验证规则
const rules = {
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  email: [
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  content: [
    { required: true, message: '请输入留言内容', trigger: 'blur' },
    { min: 5, max: 500, message: '长度在 5 到 500 个字符', trigger: 'blur' }
  ]
}

// 提交状态
const submitting = ref(false)

// 分页
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

// 留言数据（示例）
const messages = ref([
  {
    id: 1,
    nickname: '访客1',
    time: '2024-03-15 14:30',
    content: '网站设计得很漂亮，内容也很丰富！',
    reply: '谢谢您的支持，我们会继续努力！',
    showReply: false
  },
  {
    id: 2,
    nickname: '访客2',
    time: '2024-03-14 16:45',
    content: '照片拍得真不错，请问是用什么相机拍的？',
    reply: '我用的是 Sony A7III，搭配 24-70mm f/2.8 镜头。',
    showReply: false
  },
  {
    id: 3,
    nickname: '访客3',
    time: '2024-03-13 09:20',
    content: '博客文章写得很好，学到了很多！',
    showReply: false
  }
])

// 提交留言
const handleSubmit = async () => {
  if (!messageForm.value) return
  
  try {
    await messageForm.value.validate()
    submitting.value = true
    
    // TODO: 调用提交留言 API
    // 模拟提交成功
    setTimeout(() => {
      ElMessage.success('留言发表成功')
      formData.nickname = ''
      formData.email = ''
      formData.content = ''
    }, 1000)
  } catch (error) {
    console.error('Submit error:', error)
  } finally {
    submitting.value = false
  }
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
.message-container {
  padding: 40px 0;
}

.message-form-section {
  margin-bottom: 40px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  margin: 0;
  color: #333;
}

.messages-section {
  margin-bottom: 30px;
}

.section-title {
  margin-bottom: 20px;
  color: #333;
}

.message-card {
  margin-bottom: 20px;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.message-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.nickname {
  font-weight: bold;
  color: #333;
}

.time {
  color: #999;
  font-size: 0.9em;
}

.message-content {
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
}

.message-reply {
  background: #f5f7fa;
  padding: 15px;
  border-radius: 4px;
  margin-top: 15px;
}

.reply-header {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #409EFF;
  margin-bottom: 10px;
}

.reply-content {
  color: #666;
  line-height: 1.6;
}

.pagination-section {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

@media screen and (max-width: 768px) {
  .message-container {
    padding: 20px 0;
  }
  
  .message-form-section {
    margin-bottom: 30px;
  }
  
  .message-card {
    margin-bottom: 15px;
  }
  
  .message-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
}
</style> 