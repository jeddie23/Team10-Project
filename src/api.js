import {$get, $post} from './request'

export function getTableList(param) {
  return $get({
    url: 'https://cdn.jsdelivr.net/gh/baimingxuan/media-store/mock-data/table-list.json',
    param
  })
}
// 列表
export function getDiseasesList(param){
  return $get({
    url: '/api/disease/getDiseases',
    param
  })
}
// 详情
export function getDisease(param){
  return $get({
    url: '/api/disease/getDiseaseById',
    param
  })
}
// 新增
export function addDiseases(param){
  return $post({
    url: '/api/disease/addDisease',
    param
  })
}
// 编辑
export function updateDiseases(param){
  return $post({
    url: '/api/disease/updateDiseaseById',
    param
  })
}
// 上传图片
export function uploadPic(param){
  return $post({
    url: '/api/data/uploadPhotos',
    param
  })
}
// 上传视频
export function uploadVid(param){
  return $post({
    url: '/api/data/uploadVideos',
    param
  })
}
// 删除
export function delDiseases(param){
  console.log('param: ', param)
  return $post({
    url: '/api/disease/deleteDiseaseById',
    param
  })
}
