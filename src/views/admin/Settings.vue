<template>
  <div class="settings-container">
    <el-tabs v-model="activeTab">
      <!-- 基本设置 -->
      <el-tab-pane label="基本设置" name="basic">
        <el-form
          ref="basicFormRef"
          :model="basicForm"
          :rules="basicRules"
          label-width="120px"
        >
          <el-form-item label="网站标题" prop="siteTitle">
            <el-input v-model="basicForm.siteTitle" />
          </el-form-item>
          <el-form-item label="网站描述" prop="siteDescription">
            <el-input
              v-model="basicForm.siteDescription"
              type="textarea"
              :rows="3"
            />
          </el-form-item>
          <el-form-item label="网站关键词" prop="siteKeywords">
            <el-input
              v-model="basicForm.siteKeywords"
              placeholder="多个关键词用英文逗号分隔"
            />
          </el-form-item>
          <el-form-item label="备案信息" prop="icp">
            <el-input v-model="basicForm.icp" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleBasicSubmit">
              保存设置
            </el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <!-- 个人信息 -->
      <el-tab-pane label="个人信息" name="profile">
        <el-form
          ref="profileFormRef"
          :model="profileForm"
          :rules="profileRules"
          label-width="120px"
        >
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              action="/api/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="profileForm.avatar" :src="profileForm.avatar" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="profileForm.nickname" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="profileForm.email" />
          </el-form-item>
          <el-form-item label="个人简介" prop="bio">
            <el-input
              v-model="profileForm.bio"
              type="textarea"
              :rows="4"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleProfileSubmit">
              保存信息
            </el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <!-- 安全设置 -->
      <el-tab-pane label="安全设置" name="security">
        <el-form
          ref="securityFormRef"
          :model="securityForm"
          :rules="securityRules"
          label-width="120px"
        >
          <el-form-item label="原密码" prop="oldPassword">
            <el-input
              v-model="securityForm.oldPassword"
              type="password"
              show-password
            />
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input
              v-model="securityForm.newPassword"
              type="password"
              show-password
            />
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input
              v-model="securityForm.confirmPassword"
              type="password"
              show-password
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSecuritySubmit">
              修改密码
            </el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

// 当前激活的标签页
const activeTab = ref('basic')

// 基本设置表单
const basicFormRef = ref(null)
const basicForm = reactive({
  siteTitle: '我的个人博客',
  siteDescription: '分享技术、生活和摄影的个人空间',
  siteKeywords: '博客,技术,生活,摄影',
  icp: '粤ICP备XXXXXXXX号'
})

const basicRules = {
  siteTitle: [
    { required: true, message: '请输入网站标题', trigger: 'blur' },
    { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
  ],
  siteDescription: [
    { required: true, message: '请输入网站描述', trigger: 'blur' },
    { max: 200, message: '长度不能超过 200 个字符', trigger: 'blur' }
  ]
}

// 个人信息表单
const profileFormRef = ref(null)
const profileForm = reactive({
  avatar: '',
  nickname: '管理员',
  email: 'admin@example.com',
  bio: '热爱技术，热爱生活'
})

const profileRules = {
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ]
}

// 安全设置表单
const securityFormRef = ref(null)
const securityForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const securityRules = {
  oldPassword: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于 6 个字符', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于 6 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== securityForm.newPassword) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

// 头像上传
const handleAvatarSuccess = (response) => {
  profileForm.avatar = response.url
}

const beforeAvatarUpload = (file) => {
  const isJPG = file.type === 'image/jpeg'
  const isPNG = file.type === 'image/png'
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJPG && !isPNG) {
    ElMessage.error('上传头像图片只能是 JPG 或 PNG 格式!')
  }
  if (!isLt2M) {
    ElMessage.error('上传头像图片大小不能超过 2MB!')
  }
  return (isJPG || isPNG) && isLt2M
}

// 提交表单
const handleBasicSubmit = async () => {
  if (!basicFormRef.value) return
  
  try {
    await basicFormRef.value.validate()
    // TODO: 实现保存基本设置的逻辑
    ElMessage.success('基本设置保存成功')
  } catch (error) {
    console.error('Basic form error:', error)
  }
}

const handleProfileSubmit = async () => {
  if (!profileFormRef.value) return
  
  try {
    await profileFormRef.value.validate()
    // TODO: 实现保存个人信息的逻辑
    ElMessage.success('个人信息保存成功')
  } catch (error) {
    console.error('Profile form error:', error)
  }
}

const handleSecuritySubmit = async () => {
  if (!securityFormRef.value) return
  
  try {
    await securityFormRef.value.validate()
    // TODO: 实现修改密码的逻辑
    ElMessage.success('密码修改成功')
    securityForm.oldPassword = ''
    securityForm.newPassword = ''
    securityForm.confirmPassword = ''
  } catch (error) {
    console.error('Security form error:', error)
  }
}
</script>

<style scoped>
.settings-container {
  padding: 20px;
}

.avatar-uploader {
  text-align: center;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader:hover {
  border-color: var(--el-color-primary);
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
}

.avatar {
  width: 100px;
  height: 100px;
  display: block;
}

@media screen and (max-width: 768px) {
  .settings-container {
    padding: 10px;
  }
}
</style> 