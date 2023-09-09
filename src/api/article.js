import request from '@/utils/request.js'

// 文章分类
export const artGetChannelService = () => request.get('my/cate/list')

// 添加分类
export const artAddChannelService = (data) => request.post('/my/cate/add', data)

// 编辑分类
export const artEditChannelService = (data) =>
  request.post('/my/cate/info', data)

// 删除分类
export const artDelChannelService = (id) => {
  return request.delete(`/my/cate/del`, {
    params: {
      id
    }
  })
}

// 获取文章
export const artGetListService = (params) =>
  request.get('/my/article/list', {
    params
  })

// 发布文章
export const artPublishService = (data) => request.post('/my/article/add', data)

// 获取文章详情
export const artGetDetailService = (id) =>
  request.get('/my/article/info', { params: { id } })

// 文章编辑
export const artEditService = (data) => {
  return request.put('/my/article/info', data)
}
