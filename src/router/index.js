import Vue from 'vue'
import VueRouter from 'vue-router'
  import * as types from './../store/types';
  import * as store from './../store/store';

//import Home from '@/pages/home/Home'
// import Main from '@/pages/main/Main'
//import Detail from '@/components/management/Detail'
//import Foundapp from '@/components/management/Foundapp'
//import Personal from '@/components/user/Personal'
//import Usercenter from '@/components/user/Usercenter'
//import Manage from '@/components/user/Manage'
//import Usecontrol from '@/components/user/Usecontrol'
//import Center from '@/components/management/Center'
//import Changepassword from '@/components/user/Changepassword'
//const Home = resolve => require.ensure(['./pages/home/Home.vue'], ()=> resolve(require('./pages/home/Home.vue')));
Vue.use(VueRouter);
const routes = [

  {
    path: '/',
    name: 'home',
    component: resolve => require(['../components/home/home.vue'], resolve),
     meta: {
      title: '',
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
    children: [{
        path: '/platform/search',
        name: 'search',
        component: resolve => require(['../components/platform/search.vue'], resolve),
          meta: {
            keepAlive: true, //此组件不需要被缓存
        }
      },
      {
        path: '/platform/detail',
        name: 'detail',
        component: resolve => require(['../components/platform/detail.vue'], resolve)
      },
      {
            path: '/platform/istest',
            name: 'istest',
            component: resolve => require(['../components/platform/istest.vue'], resolve)
      },
      {
        path: '/collect/seek',
        name: 'seek',
        component: resolve => require(['../components/collect/seek.vue'], resolve)
      },
      {
        path: '/collect/export',
        name: 'export',
        component: resolve => require(['../components/collect/export.vue'], resolve)
      },
      {
        path: '/userManage/addUser',
        name: 'addUser',
        component: resolve => require(['../components/userManage/addUser.vue'], resolve)
      },
      {
        path: '/userManage/userManage',
        name: 'userManage',
        component: resolve => require(['../components/userManage/userManage.vue'], resolve)
      },
      {
        path: '/userManage/seekUser',
        name: 'seekUser',
        component: resolve => require(['../components/userManage/seekUser.vue'], resolve)
      },
      {
        path: '/userManage/redactUser',
        name: 'redactUser',
        component: resolve => require(['../components/userManage/redactUser.vue'], resolve)
      },
      {
        path: '/userManage/updataUser',
        name: 'updataUser',
        component: resolve => require(['../components/userManage/updataUser.vue'], resolve)
      }

    ]
  },
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['../components/home/login.vue'], resolve)
  },
  {
    path: '*',
    redirect: '/platform/search'
  }
]
var __dirname = process.env.DIR_NAME;

const router = new VueRouter({
  base: __dirname,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
    var token;
    // token = store.state.token;
    if (localStorage.getItem('token')) {
      token = localStorage.getItem('token');
    }
    if (token) { // 判断当前的token是否存在
      next();
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next();
  }
});

// router.afterEach((to,from)=>{
//     if(from.path == '/login' && from.path != '/' && to.path == '/platform/search'){
//         window.location.reload();
//     }
// })


// router.beforeEach((to, from, next) => {
//   const agent = navigator.userAgent
//   const isiOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
//   var url = window.location.protocol + '//' + window.location.host + '/#' + to.fullPath;
//   if (isiOS && to.path !== window.location.pathname) {
//     var hash = window.location.hash;
//     if (hash && hash.indexOf(to.fullPath) < 0) {
//       window.location.assign(url)
//     };
//   }
//   if (to.matched.some(r => r.meta.requireAuth)) {
//     if (store.state.token) {
//       next();
//     }
//   } else {
//     next();
//   }
// })

export default router;
