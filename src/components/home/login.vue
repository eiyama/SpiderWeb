<template>
  <div class="components-input-demo-size">
    <div class="loginBox">
      <div class="title">
        <span>信息采集平台</span>
        <p>welcome</p>
      </div>
      <a-form-item>
        <a-input v-model="username" placeholder="用户名">
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input v-model="password" type="password" placeholder="密码">
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <!-- <a-alert type="error" v-show="isUserName" message="账号或密码错误" banner /> -->
      <a-button type="primary" block html-type="submit" @click="isSubmit" class="login-form-button">
        登录
      </a-button>

    </div>

  </div>

</template>

<script>
  import axios from 'axios';
  import * as types from './../../store/types';
  import * as store from './../../store/store';
  import {
    axiosPostAPI,
    axiosGetAPI,
    axiosPutAPI,
    axiosDeleteAPI
  } from "../../common/Axios";
  import router from './../../router';
  export default {
    data() {
      return {
        isUserName: false,
        password: '',
        username: '',
      };
    },
    created() {
      // this.getApi( 'GET','/apis/InsuranceAgent?pageNumber=1&fromLocal=true&agencyName=%E6%B7%B1%E5%9C%B3');
    },
    mounted() {

    },
    watch: {
      username(val, oldVal) { //watch监听
        if (val) {
          this.isUserName = false;
        }
      },
      password(val, oldVal) { //watch监听
        if (val) {
          this.isUserName = false;
        }
      }
    },
    methods: {
      isSubmit() {
        var self = this;
        var url = '/Token';
        var params = {
          username: "",
          password: ""
        };
        if (this.password != '' && this.username != '') {
          params.password = this.password;
          params.username = this.username;
        }
        // console.log(params)
        axiosPostAPI(url, params).then(res => {
          if (res.status == '200') {
            localStorage.setItem('token', res.result.token);
            localStorage.setItem('userId', res.result.userId);
            self.$store.commit(types.LOGIN, res.result.token);
            this.$router.push({
              name: 'search'
            });
          } else {
            // this.isUserName = true
             this.$message.error(res.errMsg);
          }
        })

      },
    },
  };
</script>

<style scoped>
  .components-input-demo-size {
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 368px;

  }

  .components-input-demo-size .ant-input {
    width: 200px;
    margin: 0 8px 8px 0;
  }

  .loginBox {
    width: 368px;
    margin: 0 auto;

  }

  .title {
    margin-bottom: 30px;
  }

  .title span {
    color: #323c4d;
    font-size: 22px;
    line-height: 30px;
    font-weight: 400;
    margin-top: 46px;
  }

  .title p {
    opacity: .51;
    font-style: italic;
    font-size: 18px;
    color: #757e97;
    letter-spacing: 0;
  }
</style>
