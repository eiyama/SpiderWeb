import axios from 'axios'
import Common from './common/common' /* 公共函数 */
import store from './store/store'
import * as types from './store/types'
import router from './router'

axios.defaults.timeout = 60000;
// axios.defaults.baseURL = process.env.API_ROOT;

axios.interceptors.request.use(
  config => {
    var  token;
    token = store.state.token;
    if (window.localStorage.getItem('token')) {
      token = window.localStorage.getItem('token');
    }
      config.headers["Authorization"] = token;
      return config;
  },
  err => {
    return Promise.reject(err);
  });


export default { axios};
// export default downloadService;
