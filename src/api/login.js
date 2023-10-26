import service from '../request'
import axios from 'axios'

export function get(url,params) {
  const config={
    method: "get",
    url
  }
  if(params){
    config.params = params;
  }
  return service(config);
}

export function post(url,data) {
  const config={
    method: "post",
    url
  }
  if(data){
    config.data = data;
  }
  return service(config);
}

export function downloadFile(url,data) {
  return axios({
      url: url,
      method: 'get',
      responseType: 'blob',
      headers:{ 'Content-Type': 'application/json; application/octet-stream'},
      params: data
  })
}
