<template>
  <a-layout-content :style="isContent">
    <div style="height:35px;text-align: left;margin-bottom: 30px;" @click="openBack ">
          <a-button icon="close">关闭</a-button>
    </div>
    <div class="userMain">
         <h3 style="margin-bottom: 30px;font-weight: bold">用户详情</h3>
      <a-tabs defaultActiveKey="1" :tabPosition="tabPosition">
        <a-tab-pane tab="个人信息" key="1">
          <div class="userDetail">
            <span style="display: flex;">
              <p>用户名：</p>
              <p>{{user.userName}}</p>
            </span>
            <span style="display: flex;">
              <p>邮箱：</p>
              <p>{{user.email}}</p>
            </span>
            <span style="display: flex;">
              <p>公司名称：</p>
              <p>{{user.company}}</p>
            </span>
            <span style="display: flex;">
              <p>用户状态：</p>
              <p>{{user.status}}</p>
            </span>
            <span style="display: flex;">
              <p>超级管理员：</p>
              <p>{{user.isAdministrator ? '是' : '否' }}</p>
            </span>
            <span style="display: flex;">
              <p>备注:</p>
              <p>{{user.remarks}}</p>
            </span>
            <span style="display: flex;">
              <p>创建时间：</p>
              <p>{{user.createdTime}}</p>
            </span>
          </div>
        </a-tab-pane>
        <a-tab-pane tab="基本设置" key="2">
          <div style="max-width: 600px;">
            <div class="item">
              <p>邮箱：</p><input v-model="user.email" type="text" :disabled="isdisable" :style="isClass"></input>
            </div>
            <div class="item">
              <p>公司名称：</p><input  v-model="user.company" type="text" :disabled="isdisable" :style="isClass"></input>
            </div>
            <div class="item">
              <p>备注：</p><textarea rows="3" cols="50" v-model="user.remarks" :disabled="isdisable" ></textarea>
            </div>
            <div class="item">
              <p>到期日：</p>
              <a-date-picker style="height:32px;width: 100%;" placeholder="请选择" @change="onChange" />
            </div>
            <div class="cancelBox">
              <a-button type="primary" @click="changeUser">确定更新</a-button>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>

  </a-layout-content>
</template>

<script>
  import {
    axiosPostAPI,
    axiosGetAPI,
    axiosPutAPI,
    axiosDeleteAPI
  } from "../../common/Axios";
  export default {
    data() {
      return {
        items: ['个人信息', '基本设置'],
        isShow: false,
        isdisable: false,
        isActive: '',
        id: '',
        isSelect: '0',
        isClass: {
          "background": "#ffffff",
          // 'border': '0',
          'border-radius': '3px',
          'height':'32px'
        },
        tabPosition: 'left',
        user: {
          id: '',
          userName: '',
          email: '',
          company: '',
          status: '',
          expired: '',
          isAdministrator: '',
          remarks: '',
          createdTime: '',
        },
        isContent:{
          "minHeight":'',
        }
      };
    },
    created() {
      if (this.$route.query.id) {
        this.id = this.$route.query.id;
      }
      var url = '/Users/' + this.id;
      axiosGetAPI(url).then(res => {
        if (res.result) {
          this.user = res.result;
        }
      })
      this.isContent.minHeight = window.innerHeight - 204 + 'px';
    },
    methods: {
      callback(val) {
        console.log(val)
      },
      openBack() {
        this.$router.back()
      },
      onChange(date, dateString) {
        this.user.expired = dateString;
        console.log(this.user.expired)
      },
      activeShow(index) {
        this.isActive = index;
        this.isSelect = index;
      },
      redact() {
        this.isdisable = false;
        this.isShow = true;
        this.isClass.border = "1px solid #eee"
      },
      changeUser() {
        var model = {
          "email": "",
          "remarks": "",
          "expired": "",
          "company": ""
        };
        model = this.user;
        console.log(model)
        var url = "/Users/" + this.id;
        axiosPutAPI(url, model).then(res => {
          if (res.result) {
            this.user = res.result;
            window.location.reload();
          }
        })
      },
    },
  };
</script>

<style scoped="scoped">
  .userMain {
    text-align: left;

  }

/* .isContent{
  min-height: 100%;
  } */

  .main-left {
    width: 224px;
    border-right: 1px solid #e8e8e8;
  }

  .main-left ul {
    margin: 0;
    padding: 0;
  }

  .main-left ul li {
    list-style: none;
    padding: 10px 24px;
    text-align: left;
  }

  .isActiveshow {
    background: #e6f7ff;
    color: #1890ff;
    border-right: 2px solid #1890FF;
    font-weight: 700;

  }

  .userDetail span {
    display: flex;

  }

  .userDetail span p:nth-child(1) {
    font-size: 14px;
    color: #333;

  }

  .userDetail span p:nth-child(2) {
    font-size: 14px;
    color: #a0a0a0;

  }

  .main-right {
    flex: 1;
    padding: 8px 40px;
    text-align: left;
    max-width: 550px;
  }

  .searchBox {
    float: right;
    display: flex;
    align-items: center;
  }

  .searchBox p {
    margin: 0;
    padding-right: 8px;
    font-size: 14px;
    color: #333;

  }

  .setStyle {
    background: #ffffff;
    border: 0;
  }

  .item {
    margin: 10px
  }

  .cancelBox {
    margin-top: 30px;
    text-align: center;
  }

  .userMain input,
  textarea {
    box-sizing: border-box;
    margin: 0;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    font-feature-settings: "tnum";
    position: relative;
    display: inline-block;
    width: 100%;
    /* height: 32px; */
    padding: 4px 11px;
    color: rgba(0, 0, 0, .65);
    font-size: 14px;
    line-height: 32px;
    background-color: #fff;
    background-image: none;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    transition: all .3s;
  }
</style>
