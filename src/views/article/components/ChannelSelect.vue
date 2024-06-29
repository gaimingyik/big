<script setup>
import { ref } from 'vue'
import { artGetChannelsService } from '@/api/article'
const channelList = ref([])
const getChannelList = async () => {
  const res = await artGetChannelsService()
  channelList.value = res.data.data
}
getChannelList()
const id = ref(21413)
const emit = defineEmits(['id'])
const transmission = () => {
  emit('id', id.value)
}
transmission()
</script>
<template>
  <el-form-item label="文章分类：">
    <el-select v-model="id" style="width: 240px">
      <el-option
        v-for="item in channelList"
        :key="item.id"
        :label="item.cate_name"
        :value="item.id"
      ></el-option>
    </el-select>
  </el-form-item>
</template>
