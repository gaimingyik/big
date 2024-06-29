<script setup>
import { ref } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import ChannelSelect from '@/views/article/components/ChannelSelect.vue'
import { artGatListService, artDelService } from '@/api/article'
import ArticleEdit from './components/ArticleEdit.vue'
const articleEditRef = ref('')
const total = ref(0)
const onDrawer = () => {
  articleEditRef.value.open({})
}
const articleList = ref([])
const artStateList = ref(['已发布', '草稿'])
const onEditArticle = (row) => {
  articleEditRef.value.open(row)
}
const onDeleteArticle = async (row) => {
  await ElMessageBox.confirm('你确认删除该文章信息吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await artDelService(row.id)
  ElMessage({ type: 'success', message: '删除成功' })
  getArtList()
}
const acceptId = ref('')
const getId = (id) => {
  acceptId.value = id
}
getId()
const item = ref('已发布')
const artData = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: acceptId.value,
  state: item.value
})
// 封装一个函数，用函数调用接口
const getArtList = async () => {
  const res = await artGatListService(artData.value)
  articleList.value = res.data.data
  total.value = res.data.total
}
getArtList()
const handleSizeChange = (size) => {
  artData.value.pagenum = 1
  artData.value.pagesize = size
  getArtList()
}
const handleCurrentChange = (page) => {
  artData.value.pagenum = page
  getArtList()
}
// 添加修改成功
const onSuccess = (type) => {
  if (type === 'add') {
    // 如果是添加，需要跳转渲染最后一页，编辑直接渲染当前页
    const lastPage = Math.ceil((total.value + 1) / articleList.value.pagesize)
    articleList.value.pagenum = lastPage
  }
  getArtList()
}
</script>
<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onDrawer">添加文章</el-button>
    </template>
    <el-form inline>
      <ChannelSelect @id="getId"></ChannelSelect>
      <el-form-item label="发布状态：">
        <el-select style="width: 240px" v-model="item">
          <el-option
            v-for="item in artStateList"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="articleList" style="width: 100%">
      <el-table-column label="文章标题" width="400">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date"> </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDeleteArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <el-pagination
      :v-model:current-page="artData.pagenum"
      :page-size="artData.pagesize"
      layout="total, prev, pager, next"
      :total="1000"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- 这里封装一个抽屉组件，为啥呢，因为这个组件添加和编辑都要用 -->
    <ArticleEdit ref="articleEditRef" @success="onSuccess"></ArticleEdit>
  </page-container>
</template>

<style lang="scss" scoped></style>
