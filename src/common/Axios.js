import axios from 'axios'
import store from './../store/store'
import * as types from './../store/types'
import router from './../router'

//配置API地址
var root = process.env.API_ROOT

// 自定义判断元素类型JS
function toType(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

// 参数过滤函数
function filterNull(o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}

function apiAxios(method, url, params) {
  return new Promise((resolve, reject) => {
    // if (params) {
    //   params = filterNull(params)
    // }
    axios({
        method: method,
        url: url,
        data: method === 'POST' || method === 'PUT' ? params : null,
        params: method === 'GET' || method === 'DELETE' ? params : null,
        baseURL: root,
        withCredentials: false
      })
      .then(function(res) {
        if (res.data) {
          resolve(res.data);
        }
      }, err => {
        // Indicator.close();
        reject(err)
      })
      .catch(function(error) {
        // Indicator.close();
        reject(error.message);
        // console.log(error)
      })

  })
}

   function exportExcel(method, url, params) {
        return  new Promise((resolve, reject) => {
       axios({
        method: method,
        url: url,
        data: method === 'POST' || method === 'PUT' ? params : null,
        params: method === 'GET' || method === 'DELETE' ? params : null,
        baseURL: root,
        // withCredentials: false
          responseType: 'blob', // 表明返回服务器返回的数据类型
          headers: {
            'Content-Type': 'application/json'
          }
        }) .then(function(res) {
        if (res) {
          resolve(res);
        }
      }, err => {
        // Indicator.close();
        reject(err)
      })
      .catch(function(error) {
        // Indicator.close();
        reject(error.message);
        // console.log(error)
      })

  })
      }


//post API
export function axiosPostAPI(url, params) {
  return apiAxios('POST', url, params);
}

export function exportExcelAPI(url, params) {
  return exportExcel('POST', url, params);
}


//get API
export function axiosGetAPI(url, params = {}) {
  return apiAxios('GET', url, params);
}

//put API
export function axiosPutAPI(url, params = {}) {
  return apiAxios('PUT', url, params);
}

//delete API
export function axiosDeleteAPI(url, params = {}) {
  return apiAxios('DELETE', url, params);
}
