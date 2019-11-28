<template>
  <a-layout-content class="isContent">
    <h3 style="margin-bottom: 30px;font-weight: bold">用户管理</h3>
    <div style="margin-bottom: 30px;min-height: 100%;">
      <div class="search_Box" >
        <div class="clear">
        </div>
        <div :style="isStyle">
          <span class="searchBox">
            <p>用户名</p>
            <input placeholder="请输入" style="width: 200px;" v-model="userName" />
          </span>
          <span class="searchBox">
            <p>邮箱</p>
            <input placeholder="请输入" style="width: 200px;" v-model="email" />
          </span>
          <span class="searchBox">
            <p>公司名称</p>
            <input placeholder="请输入" style="width: 200px;" v-model="company" />
          </span>
          <span class="searchBox">
            <!--            <p>用户状态</p>
            <input placeholder="请输入" style="width: 200px;" v-model="status" /> -->
            <p>用户状态</p>
            <a-tree-select style="width: 200px" :value="status" allowClear :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
              placeholder='请选择' @change="onChange">
              <a-tree-select-node value='Enabled' title='激活'>
              </a-tree-select-node>
              <a-tree-select-node value='Disabled' title='未激活'>
              </a-tree-select-node>
              <a-tree-select-node value='Expired' title='失效'>
              </a-tree-select-node>
            </a-tree-select>
          </span>
          <div class="clear"></div>
        </div>

        <a-col :span="24" style="textAlign: left;margin-bottom:15px;padding-left: 30px;">
          <a-button type="primary" @click="onSearch">
            搜索
          </a-button>
          <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
            清除
          </a-button>
          <!--          <a :style="{ marginLeft: '8px', fontSize: '12px' }" @click="toggle">
            展开
            <a-icon :type="expand ? 'up' : 'down'" />
          </a> -->
        </a-col>
        <div class="clear"></div>
      </div>
    </div>
    <span style="float: left;margin-bottom: 30px;">
      <a-button type="primary" @click="showModal">创建用户</a-button>
    </span>
    <a-modal title="创建用户" :maskClosable=false v-model="visible" @ok="addUser" @cancel="closePopup">
      <div>
        <div class="setUserBox" v-show="successAdd">
          <div class="item"><label>用户名：</label><input style="width: 200px;height: 32px;" v-model="user.userName"
              type="text" @change="userNameChange" class="isClass"></input></div>
          <a-alert type="error" v-show="isUserName" message="请输入用户名" banner />
          <div class="item"><label>用户密码：</label><input style="width: 200px;    height: 32px;" v-model="user.password"
              @change="userpasChange" type="password" class="isClass"></input></div>
          <a-alert type="error" v-show="isPassword" message="请输入密码" banner />
          <div class="item"><label>邮箱：</label><input style="width: 200px;    height: 32px;" v-model="user.email" type="text"
              class="isClass"></input></div>
          <div class="item"><label>公司名称：</label><input style="width: 200px;    height: 32px;" v-model="user.company"
              type="text" class="isClass"></input></div>
          <div class="item"><label>备注：</label><input style="width: 200px;    height: 32px;" v-model="user.remarks" type="text"
              class="isClass"></input></div>
          <!-- <div class="item"><label>到期日：</label><input v-model="user.expired" type="text" class="isClass"></input></div> -->
          <div class="item">
            <p>到期日：</p>
            <a-date-picker style="width: 200px;" placeholder="请选择" @change="onChangeTime" />
          </div>
        </div>
      </div>
    </a-modal>
    <div class="agencyShow">
      <table class="table-ant">
        <tr style="background: #fafafa;height: 53px;">
          <th>用户名</th>
          <th>公司名称</th>
          <th>邮箱</th>
          <th>创建时间</th>
          <th>超级管理员</th>
          <th>状态</th>
          <th>备注</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item,index) in allUser" :key="index">
          <td>{{item.userName}}</td>
          <td>{{item.company}}</td>
          <td>{{item.email}}</td>
          <td>{{item.createdTime}}</td>
          <td>{{item.isAdministrator ? '是' : '否'}}</td>
          <td>{{item.status}}</td>
          <td>{{item.remarks}}</td>
          <td  style="cursor:pointer;color:#40a9ff">
            <span style="display: flex;align-items: center;">
                <p @click="toManageuser(item)" style="margin-right:10px;">查看</p>
                <p @click="removeItem(item)" >删除</p>
            </span>

            </td>
        </tr>
      </table>
      <div class="loadingShow" v-show="isShow">
        <a-spin class="loadingImg" />
      </div>
    </div>

    <!--    <template>
      <a-pagination style="margin-top: 15px;" :defaultCurrent="1" :total="totalRows" :current="pageNumber" @change="onpageChange" />
    </template> -->

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
        allUser: [],
        search: '',
        searchRes: [],
        pageNumber: 1,
        searchValue: '',
        totalRows: 10,
        isShow: false,
        visible: false,
        offset: 0,
        limit: 10,
        userName: '',
        email: '',
        company: '',
        status: '',
        expand: false,
        isStyle: {
          "margin": "15px",
        },
        showMore: false,
        url: '',
        visible: false,
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
      this.isShow = true;
      var url = '/Users';
      axiosGetAPI(url).then(res => {
        this.isShow = false;
        if (res.result) {
          this.allUser = res.result;
        }
      })
    },
    methods: {
      onChangeTime(date, dateString) {
        this.user.expired = dateString;
        console.log(this.user.expired)
      },
      removeItem(item){
        var id = item.id;
          axiosDeleteAPI('/Users/' + id).then(res=>{
            if(res.status=='200'){

              this.$notification.open({
                 message: '删除成功',
               });
              this.isShow = true;
              var url = '/Users';
              axiosGetAPI(url).then(res => {
                this.isShow = false;
                if (res.result) {
                  this.allUser = res.result;
                }
              })
            }
          })
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
      addUser() {
       console.log(this.user);
        if (this.user.userName == '') {
          this.isUserName = true;
        }
        if (this.user.password == '') {
          this.isPassword = true;
        }
       	  if(this.user.userName && this.user.password){
       			  var url = "/Users/";
       			 axiosPostAPI(url, this.user).then(res => {
       			   if (res.result) {

       			     this.visible = false;
                 this.$notification.open({
                    message: '创建成功',
                  });
                     this.isShow = true;
                  var url = '/Users';
                  axiosGetAPI(url).then(res => {
                    this.isShow = false;
                    if (res.result) {
                      this.allUser = res.result;
                    }
                  })
       			   }
       			 })
       }
      },
      showModal() {
        this.visible = true
      },
      closePopup() {
        this.visible = false;
		 this.isPassword = false;
		  this.isUserName = false;
      //   this.user = {
      //   "userName": "",
      //   "password": "",
      //   "email": "",
      //   "remarks": "",
      //   "expired": "",
      //   "company": ""
      // }
      },
      getResult(pageNumber) {
        var self = this;
        self.isShow = true;
        if (pageNumber) {
          this.offset = (pageNumber - 1) * 10
        }
        // '/Users?userName=' + this.searchValue
        var url = this.url + '&offset=' + this.offset + '&limit=' + this.limit;
        axiosGetAPI(url)
          .then(res => {
            self.isShow = false;
            // console.log(res.result)
            if (res.result) {
              self.allUser = res.result;
              self.totalRows = res.page.totalRows;
            }
          })
      },
      toggle() {

        this.expand = !this.expand;
        if (this.showMore) {
          this.showMore = false;
        } else {
          this.showMore = true;
        }
      },

      onpageChange(pagination) {
        this.pageNumber = pagination;
        if (this.searchValue) {
          this.getResult(pagination);
        }
      },
      handleReset() {
        this.userName = '';
        this.email = '';
        this.company = '';
        this.status = '';
      },
      onChange(value) {
        console.log(value)
        this.status = value
      },
      onSearch() {
        var url = '/Users';
        var beginIndex;
        if (this.userName) {
          url = url + '?userName=' + this.userName;
        }
        if (this.email) {
          if (url.length > 6) {
            url = url + "&"
          } else {
            url = url + "?"
          }
          url = url + 'email=' + this.email;
        }
        if (this.company) {
          if (url.length > 6) {
            url = url + "&"
          } else {
            url = url + "?"
          }
          url = url + 'company=' + this.company;
        }
        if (this.status) {
          if (url.length > 6) {
            url = url + "&"
          } else {
            url = url + "?"
          }
          url = url + 'status=' + this.status;
        }
        this.url = url;
        this.isShow = true;
        axiosGetAPI(url).then(res => {
          this.isShow = false;
          if (res.result) {
            this.allUser = res.result;
          }
        })
      },

      toManageuser(item) {
        this.$router.push({
          path: 'userManage?id=' + item.id
        })
      },
      toaddUser() {
        this.$router.push({
          path: 'addUser'
        })
      }

    },
  };
</script>

<style scoped>
  .isContent{
    text-align: left;
  }

  .agencyShow {
    min-height: 600px;
    /* position: relative; */
    overflow-x: auto;
    white-space: nowrap;
    text-align: left;
    width: 100%;
  }

  .searchBox {
    float: left;
    display: flex;
    align-items: center;
    margin: 15px;
  }

  .searchBox p {
    margin: 0;
    padding-right: 8px;
    font-size: 14px;
    color: #333;
  }
.search_Box{
  margin-bottom: 30px;
  min-height: 100%;
  border: 1px solid #eee;
  background: #f9f9f9;
  border-radius: 5px;
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

  .clear {
    clear: both;
  }

  .searchBox input {
    box-sizing: border-box;
    margin: 0;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    font-feature-settings: "tnum";
    position: relative;
    display: inline-block;
    width: 100%;
    height: 32px;
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

  .loadingShow {
    position: absolute;
    top: 0;
    left: 0;
    background: #f9f9f9;
    opacity: 0.7;
    height: 100%;
    width: 100%;
    /* transform: translate(-50%,-50%); */
  }

  .loadingImg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .agencyShow {
    min-height: 600px;
    /* position: relative; */
    overflow-x: auto;
    white-space: nowrap;
    text-align: left;
  }

  .setUserBox {
    width: 392px;
    /* background: #f9f9f9; */
    border-radius: 6px;
    padding: 30px;
    /* margin: 0 auto */
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
