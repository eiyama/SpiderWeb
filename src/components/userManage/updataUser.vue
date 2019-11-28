<template>
  <a-layout-content class="isContent">
    <div style="height:35px;margin-bottom: 30px;">
      <div style="float: right;margin-left: 30px;" @click="toupdata">
        <a-button>编辑</a-button>
      </div>

    </div>
    <div class="agencyShow">
      <!--<h3>用户名：{{user.userName}}</h3>
      <p>邮箱：{{user.email}}</p>
      <p>公司名称：{{user.company}}</p>
      <p>用户状态：{{user.status}}</p>
      <p>超级管理员：{{user.isAdministrator}}</p>
      <p>备注：{{user.remarks}}</p>
      <p>创建时间：{{user.createdTime}}</p>
      -->
      <div class="item"><label>用户名：</label><input v-model="user.userName" type="text" disabled="true" class="setStyle"></input></div>
      <div class="item"><label>邮箱：</label><input v-model="user.email" type="text" :disabled="isdisable" :style="isClass"></input></div>
      <div class="item"><label>公司名称：</label><input v-model="user.company" type="text" :disabled="isdisable" :style="isClass"></input></div>
      <div class="item"><label>用户状态：</label><input v-model="user.status" type="text" disabled="true" class="setStyle"></input></div>
      <div class="item"><label>超级管理员：</label><input v-model="user.isAdministrator" type="text" disabled="true" class="setStyle"></input></div>
      <div class="item"><label>备注：</label><input v-model="user.remarks" type="text" :disabled="isdisable" :style="isClass"></input></div>
      <div class="item"><label>创建时间：</label><input v-model="user.createdTime" type="text" disabled="true" class="setStyle"></input></div>
<!--      <div v-show="isShow" class="item"><label>新密码：</label><input v-model="user.password" type="text" :disabled="isdisable"
          :style="isClass"></input></div> -->
      <div v-show="isShow" class="item"><label>到期日：</label><input v-model="user.expired" type="text" :disabled="isdisable"
          :style="isClass"></input></div>

      <!-- {
        "userName": "string",
        "password": "string",
        "email": "string",
        "remarks": "string",
        "expired": "2019-08-12T05:49:17.051Z",
        "company": "string"
      } -->
      <div class="cancelBox" v-show="isShow">
        <a-button type="primary" @click="changeUser">确定</a-button>
      </div>
    </div>

    <div>

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
        isShow: false,
        isdisable: true,
        isActive: true,
        id:'',
        isClass: {
          "background": "#ffffff",
          'border': '0',
          'border-radius': '3px',
          'padding': '5px 10px',
        },
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


    },
    methods: {
      toupdata() {
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
        var url = "/Users/"+ this.id;
        axiosPutAPI(url,model).then(res=>{
          if(res.result){
           this.user = res.result;
             window.location.reload();
          }
        })
      },
    },
  };
</script>

<style scoped="scoped">
  .agencyShow {
    min-height: 600px;
    /* position: relative; */
    overflow-x: auto;
    white-space: nowrap;
    text-align: left;
  }

  .agencyShow {
    min-height: 600px;
    /* position: relative; */
    overflow-x: auto;
    white-space: nowrap;
  }

  .table-ant {
    width: 100%;
  }

  .table-ant tr {
    height: 53px;
    border-bottom: 1px solid #f0f0f0;
  }

  .table-ant tr th {
    text-align: left;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
    padding: 16px;

  }

  .table-ant tr td {
    text-align: left;
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    padding: 16px;
    color: rgba(0, 0, 0, 0.65);

  }

  .table-ant tr:hover {
    background: #e6f7ff;
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
</style>
