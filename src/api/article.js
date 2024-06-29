import request from '@/utils/request'

// 获取文章分类
export const artGetChannelsService = () => request.get('/my/cate/list')

// 增加文章分类
export const artAddChannelsService = (data) => request.post('/my/cate/add', data)

// 更新文章分类
export const artNewChannelsService = (data) => request.put('/my/cate/info', data)

// 删除文章分类
export const artDelChannelsService = (id) => {
  return request.delete('/my/cate/del', {
    params: {
      id
    }
  })
}

// 获取文章列表
export const artGatListService = (params) => {
  return request.get('/my/article/list', {
    params
  })
}
// 添加文章
export const artPublishService = (data) => request.post('/my/article/add', data)
export const artGetDetailService = (id) => request.get('my/article/info', { params: { id } })

export const artEditService = (data) => request.put('my/article/info', data)

export const artDelService = (id) => request.delete('my/article/info', { params: { id } })
