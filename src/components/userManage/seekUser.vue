<template>
  <!-- <p>创建用户</p> -->

  <a-layout-content>
    <div style="height:35px;margin-bottom: 30px;">
      <span class="searchBox">
        <p>搜索内容</p>
        <a-input-search placeholder="请输入" style="width: 200px;" enterButton="查询" @search="onSearch" />
      </span>
    </div>

      <a-table :columns="columns"
       :rowKey="searchRes.agencyCode"
        @change="onpageChange"
        :loading="loading"
       :pagination="pagination"
      :dataSource="searchRes">
      </a-table>
<!--       <div class="loadingShow" v-show="isShow">

        <a-spin class="loadingImg" />

      </div> -->
<!--    <template>
      <a-pagination :defaultCurrent="6" :total="totalRows" :current="pageNumber" @change="onpageChange" />
    </template> -->
  </a-layout-content>
</template>

<script>
  import {
    axiosPostAPI,
    axiosGetAPI,
  } from "../../common/Axios.js";
  import axios from 'axios';
  import router from './../../router';
  const formItemLayout = {
    labelCol: {
      span: 4
    },
    wrapperCol: {
      span: 8
    },
  };
  const formTailLayout = {
    labelCol: {
      span: 4
    },
    wrapperCol: {
      span: 8,
      offset: 4
    },
  };

  export default {
    data() {
      return {
        checkNick: false,
        formItemLayout,
        formTailLayout,
        form: this.$form.createForm(this),
        search: '',
        searchRes: [],
        pageNumber: 1,
        searchValue: '',
        totalRows: 10,
        pagination:{},
           isShow:false,
          loading:false,
        columns:[{
        title: '代理公司名称',
        dataIndex: 'agencyCode',
        width: '30%',
        },
        {
          title: '代理公司编码',
          dataIndex: 'agencyName',

          width: '30%',
        }, {
          title: '代理公司地区',
          dataIndex: 'regulatoryCode',
        }],
      };
    },
    created() {
      // this.searchRes =  this.getApi( 'GET','/apis/InsuranceAgent?pageNumber=1&fromLocal=true&agencyName=' + this.search );//.then(res => {
      //  //   console.log(res.result)
      //  // })
      //  console.log(this.searchRes)
    },
    methods: {
      getApi(method, url, params) {
        return new Promise((resolve, reject) => {
          axios({
              method: method,
              url: url,
              data: method === 'POST' || method === 'PUT' ? params : null,
              params: method === 'GET' || method === 'DELETE' ? params : null,
              // baseURL: 'http://192.168.6.7:8001/',
              withCredentials: false
            })
            .then(function(res) {
              if (res.data.status === 200) {
                resolve(res.data);
              } else {
                // Indicator.close();

              }
            }, err => {
              // Indicator.close();
              reject(err)
            })
        })
      },
      getResult() {

         this.loading = true;
          // this.isShow = true;
        this.getApi('GET', '/apis/InsuranceAgent?pageNumber=' + this.pageNumber + '&fromLocal=true&agencyName=' + this.searchValue)
          .then(res => {
            this.loading = false;
            // this.isShow = false;
            console.log(res.result)
            if (res.result) {
              this.searchRes = res.result;
              this.totalRows = res.page.totalRows;
              // console.log(this.totalRows);
              const pagination = { ...this.pagination };
              pagination.total = res.page.totalRows;
              this.pagination = pagination;
            }
          })
      },
      onSearch(value) {
        this.searchValue = value;
        this.getResult();
      },
      onSearchBtn() {
        console.log(this.searchValue)
        this.onSearch();
      },
      onpageChange(pagination) {
        const pager = { ...this.pagination };

        pager.current = pagination.current;
        this.pagination = pager;
        this.pageNumber = pagination.current;
          console.log(pagination)
        if (this.searchValue) {
          this.getResult();
        }
      }

    },
  };
</script>

<style>
  .agencyShow {
    min-height: 600px;
    position: relative;
  }

  .agencyShow li {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  /* .agencyShow li p:nth-child(1) {
    width: 33%;
  }

  .agencyShow li p:nth-child(2) {
    width: 33%;
  }

  .agencyShow li p:nth-child(3) {
    width: 33%;
  }
 */
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
/*
  .loadingShow{
    position: absolute;
        top: 0;
    left: 0;
    background: #f9f9f9;
    opacity: 0.5;
    height: 100%;
    width: 100%;
  }
.loadingImg{
     position: absolute;
  top: 50%;
  left: 50%;
     transform: translate(-50%,-50%);
} */


</style>
