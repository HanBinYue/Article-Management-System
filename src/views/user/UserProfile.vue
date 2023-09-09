<script setup>
import PageContainer from '../../components/PageContainer.vue'
import { ref } from 'vue'
import { useUserStore } from '../../stores'
import { userUpdateInfoService } from '../../api/user'

const formRef = ref()
const {
  user: { email, id, nickname, username },
  getUser
} = useUserStore()
const form = ref({
  id,
  username,
  nickname,
  email
})

const rules = ref({
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    {
      min: 2,
      max: 10,
      message: '昵称长度在 2 到 10 个字符之间',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ]
})

const submitForm = async () => {
  await formRef.value.validate()
  await userUpdateInfoService(form.value)

  getUser()
  ElMessage.success('修改成功')
}
</script>

<template>
  <PageContainer title="基本资料">
    <template #default>
      <el-form
        :model="form"
        :rules="rules"
        ref="formRef"
        label-width="100px"
        class="demo-form"
      >
        <el-form-item label="登录名称">
          <el-input v-model="form.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickname">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交修改</el-button>
        </el-form-item>
      </el-form>
    </template>
  </PageContainer>
</template>
