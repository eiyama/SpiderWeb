<template>
  <a-layout-content class="isContent">
    <div style="height:35px;margin-bottom: 30px;text-align: left;">
      <a-button type="primary" @click="openBack">返回</a-button>
    </div>
    <div class="agencyShow">
      <div class="setUserBox" v-show="successAdd">
        <div class="item"><label>用户名：</label><input v-model="user.userName" type="text" @change="userNameChange" class="isClass"></input></div>
        <a-alert type="error" v-show="isUserName" message="请输入用户名" banner />
        <div class="item"><label>用户密码：</label><input v-model="user.password" @change="userpasChange" type="text" class="isClass"></input></div>
        <a-alert type="error" v-show="isPassword" message="请输入密码" banner />
        <div class="item"><label>邮箱：</label><input v-model="user.email" type="text" class="isClass"></input></div>
        <div class="item"><label>公司名称：</label><input v-model="user.company" type="text" class="isClass"></input></div>
        <div class="item"><label>备注：</label><input v-model="user.remarks" type="text" class="isClass"></input></div>
        <!-- <div class="item"><label>到期日：</label><input v-model="user.expired" type="text" class="isClass"></input></div> -->
        <div class="item">
          <p>到期日：</p>
          <a-date-picker placeholder="请选择" @change="onChange" />
        </div>
        <div class="cancelBox">
          <a-button type="primary" @click="addUser">确定</a-button>
        </div>
      </div>
      <div v-show="!successAdd" style="text-align: center; color: #333;font-size: 18px;">
        创建成功
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
        isUserName: false,
        isPassword: false,
        successAdd: true,
        count: "",
        user: {
          "userName": "",
          "password": "",
          "email": "",
          "remarks": "",
          "expired": "",
          "company": ""
        }
      };
    },
    created() {

    },
    methods: {
      onChange(date, dateString) {
        this.user.expired = dateString;
        // console.log(this.user.expired)
      },
      openBack() {
        this.$router.back()
      },
      userNameChange(value) {
        if (value != '') {
          this.isUserName = false;
        }
      },
      userpasChange(value) {
        if (value != '') {
          this.isPassword = false;
        }
      },
      startDivi() {
        const TIME_COUNT = 2;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
              //跳转的页面写在此处
              this.$router.push({
                path: 'redactUser'
              });
            }
          }, 1000)
        }
      },

      addUser() {
        if (this.user.userName == '') {
          this.isUserName = true;
        }
        if (this.user.password == '') {
          this.isPassword = true;
        }
        var url = "/Users/";
        axiosPostAPI(url, this.user).then(res => {
          if (res.result) {
            this.successAdd = false;
            this.startDivi();

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

  .setUserBox {
    width: 392px;
    background: #f9f9f9;
    border-radius: 6px;
    padding: 30px;
    margin: 0 auto
  }

  .item {
    margin: 15px;
    display: flex;
    justify-content: space-between;

  }

  .item label {
    font-size: 16px;
  }

  .item input {
    width: 200px;
    border-radius: 4px;
  }


  .cancelBox {
    margin-top: 30px;
    text-align: center;
  }

  .isClass {
    border: 1px solid #eee;
  }
</style>
