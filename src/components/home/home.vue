<template>
  <div>
    <a-layout style="height: 100%;" id="components-layout-demo-custom-trigger">
      <!-- <a-layout-sider collapsible v-model="collapsed"> -->
      <a-layout-sider :trigger="null" style="text-align: left;" collapsible v-model="collapsed">
        <div class="logo">
          <!-- <img src="../../assets/images/logo.png" /> -->
          <h1>信息采集平台</h1>
        </div>
        <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']">
          <!-- <a-sub-menu key="sub1">
            <span slot="title">
              <a-icon type="file-search" />
              <span>平台管理</span>
            </span>
            <a-menu-item key="1" @click="toSearch">保险中介信息</a-menu-item>
          </a-sub-menu> -->
          <a-menu-item @click="toSearch" key="1">
            <a-icon type="file-search" />
            <span>保险中介信息</span>
          </a-menu-item>
          <a-menu-item v-show="isAdministrator"  @click="toredactUser" key="2">
            <a-icon type="user" />
            <span>用户管理</span>
          </a-menu-item>
          <!-- <a-menu-item key="1" @click="toSearch">保险中介信息</a-menu-item> -->
          <!-- <a-menu-item @click="toredactUser" key="3">用户管理</a-menu-item>  -->
          <!--  <a-sub-menu key="sub2">
            <span slot="title">
              <a-icon type="user" /><span>用户管理</span></span>
            <a-menu-item @click="toredactUser" key="3">用户管理</a-menu-item>
          </a-sub-menu> -->
        </a-menu>

      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="()=> collapsed = !collapsed" />
          <div class="header-right">
            <span>
              <a-icon type="home" @click="toSearch" />
            </span>
            <span>
              <a-popover>
                <template slot="content">
                  <!-- <router-link to="/userManage/redactUser" class="tab"> -->
                  <p class="p-hover" style="cursor:pointer" @click="touserManage">个人中心</p>
                  <!-- </router-link> -->
                  <p class="p-hover" style="cursor:pointer" @click="outUser">退出登录</p>
                </template>
                <!-- <a-button> -->
                <a-icon type="user" />
                <!-- </a-button> -->
              </a-popover>
            </span>
          </div>
        </a-layout-header>
        <a-layout-content :style="main" class="maincontent">
          <!-- <router-view></router-view> -->
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive">
            </router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive">
          </router-view>
        </a-layout-content>
        <a-layout-footer class="fooer" style="textAlign: center">
          ©2019
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>

</template>

<script>
  import * as types from './../../store/types';
  import store from './../../store/store';
  import {
    axiosPostAPI,
    axiosGetAPI,
    axiosPutAPI,
    axiosDeleteAPI
  } from "../../common/Axios";
  import search from '../platform/search.vue';
  import exportinf from '../collect/export.vue';
  import istest from '../platform/istest.vue'
  import seek from '../collect/seek.vue';
  import addUser from '../userManage/addUser.vue';
  import userManage from '../userManage/userManage.vue';
  import redactUser from '../userManage/redactUser.vue';
  import seekUser from '../userManage/seekUser.vue';
  import updataUser from "../userManage/updataUser";
  import detail from '../platform/detail.vue';
  export default {
    data() {
      return {
        collapsed: false,
        userId:'',
        isAdministrator:false,
        main: {
          "minHeight": '',
        }
      }
    },
    created() {
      this.main.minHeight = window.innerHeight - 144 + 'px';
      this.userId = localStorage.getItem('userId');
       axiosGetAPI('/Users/' + this.userId).then(res=>{
        if(res.result){
          this.isAdministrator = res.result.isAdministrator;
          console.log(this.isAdministrator)
        }
       })
    },
    mounted() {
      this.browserRedirect();
        // window.onload(){
        //  window.location.reload();
        // },
    },
    methods: {

      browserRedirect() {
        var sUserAgent = navigator.userAgent.toLowerCase();
        console.log(sUserAgent);
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
          this.collapsed = true
        } else {
          this.collapsed = false
        }
      },
      toSearch() {
        this.$router.push({
          name: 'search'
        })
      },
      tocollectSeek() {
        this.$router.push({
          path: '/collect/seek'
        })
      },
      tocollectExport() {
        this.$router.push({
          path: '/collect/export'
        })
      },
      touserManage() {
        this.$router.push({
          path: '../userManage/userManage?id=' + this.userId
        })
      },
      toredactUser() {
        this.$router.push({
          path: '/userManage/redactUser'
        })
      },
      toseekUser() {
        this.$router.push({
          path: '/userManage/seekUser'
        })
      },
      outUser() {
        var self = this;
        store.commit(types.LOGOUT);
        localStorage.removeItem('token');
        if (localStorage.getItem('userId')) {
          localStorage.removeItem('userId');
        }

        this.$router.push({
          path: "/login"
        });
      },
      onCollapse(collapsed, type) {
        console.log(collapsed, type);
      },
      onBreakpoint(broken) {
        console.log(broken);
      },
    }
  }
</script>

<style scoped>
  .main {
    /* height: 100%; */
  }

  .maincontent {
    margin: 23px 16px 0px;
    background: #fff;
    padding: 24px;
    position: relative;
    /* min-height: 100%; */
  }

  .logo {
    position: relative;
    height: 64px;
    padding-left: 24px;
    overflow: hidden;
    line-height: 64px;
    background: #001529;
    transition: all .3s;
  }

  .logo h1 {
    display: inline-block;
    margin: 0 0 0 12px;
    color: #fff;
    font-weight: 600;
    font-size: 16px;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    vertical-align: middle;
  }

  #components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color .3s;
    float: left;
  }

  #components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
  }

  /*  .ant-layout-content {
    min-height: 100%;
  } */



  .header-right {
    float: right;
    height: 100%;
    overflow: hidden;
    margin-right: 30px;
  }

  .header-right span {
    display: inline-block;
    height: 100%;
    padding: 0 12px;
    cursor: pointer;
    transition: all .3s
  }

  .p-hover:hover {
    color: #4072F7;
  }


  .fooer {}
</style>
