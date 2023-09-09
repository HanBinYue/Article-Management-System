<script setup>
import { ref } from 'vue'
import {
  artEditChannelService,
  artAddChannelService
} from '../../../api/article'

const dialogVisible = ref(false)
const formModel = ref({
  id: 0,
  cate_name: '',
  cate_alias: ''
})
const formRef = ref()

const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    { pattern: /^\S{1,10}$/, message: 'regex', trigger: 'blur' }
  ],
  cate_alias: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{1,10}$/, message: 'regex', trigger: 'blur' }
  ]
}

const emit = defineEmits(['success'])
const onSubmit = async () => {
  console.log(formRef.value)
  await formRef.value.validate()
  const isEdit = formModel.value.id
  if (isEdit) {
    await artEditChannelService(formModel.value)
    ElMessage.success('编辑成功')
  } else {
    await artAddChannelService(formModel.value)
    ElMessage.success('添加成功')
  }

  dialogVisible.value = false
  emit('success')
}

const open = (row) => {
  dialogVisible.value = true
  formModel.value = { ...row.row }
}

defineExpose({
  open
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.id ? 'Edit' : 'Add'"
    width="30%"
  >
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="rules"
      label-width="100px"
      style="padding-right: 30px"
    >
      <el-form-item prop="cate_name" label="分类名称">
        <el-input
          v-model="formModel.cate_name"
          placeholder="请输入分类名称"
        ></el-input>
      </el-form-item>
      <el-form-item prop="cate_alias" label="分类别名">
        <el-input
          v-model="formModel.cate_alias"
          placeholder="请输入分类别名"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
