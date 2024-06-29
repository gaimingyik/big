<script setup>
import { ref } from 'vue'
import { artGetChannelsService, artDelChannelsService } from '@/api/article'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelEdit from './components/ChannelEdit.vue'
const channelList = ref([])

const getChannlList = async () => {
  const res = await artGetChannelsService()
  channelList.value = res.data.data
}
getChannlList()
const dialog = ref()
const onAddChannel = () => {
  dialog.value.open({})
}
const onDelChannel = async (row) => {
  await artDelChannelsService(row.id)
  getChannlList()
}
const onEditChannel = (row) => {
  dialog.value.open(row)
}
const success = () => {
  getChannlList()
}
</script>
<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary" @click="onAddChannel()">添加分类</el-button>
    </template>
    <el-table :data="channelList" style="width: 100%">
      <el-table-column label="序号" width="100" type="index"> </el-table-column>
      <el-table-column label="分类名称" prop="cate_name"></el-table-column>
      <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditChannel(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDelChannel(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <ChannelEdit ref="dialog" @success="success"></ChannelEdit>
  </page-container>
</template>

<style lang="scss" scoped></style>
