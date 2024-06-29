<script setup>
import { ref } from 'vue'
const dialogVisible = ref(false)
const open = (row) => {
  console.log(fromModel.value)
  fromModel.value = { ...row }
  dialogVisible.value = true
}

defineExpose({
  open
})
const fromModel = ref({
  cate_name: '',
  cate_alias: ''
})
const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类必须是1-10位的字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^\S{1,15}$/,
      message: '分类必须是1-15位的字符',
      trigger: 'blur'
    }
  ]
}
const emit = defineEmits(['success'])
import { artNewChannelsService, artAddChannelsService } from '@/api/article'
const onsubmit = async () => {
  if (fromModel.value.id) {
    await artNewChannelsService(fromModel.value)
  } else {
    await artAddChannelsService(fromModel.value)
  }
  dialogVisible.value = false
  emit('success')
}
</script>
<template>
  <el-dialog v-model="dialogVisible" :title="fromModel.id ? '编辑分类' : '添加分类'" width="500">
    <el-form :model="fromModel" :rules="rules">
      <el-form-item label="分类名称" prop="cate_name">
        <el-input placeholder="请输入分类名称" v-model="fromModel.cate_name"></el-input>
      </el-form-item>
      <el-form-item label="分类名称" prop="cate_alias">
        <el-input placeholder="请输入分类名称" v-model="fromModel.cate_alias"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onsubmit">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>
