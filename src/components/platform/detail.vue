<template>
   <a-layout-content>
    <div>
      <div style="height:35px;text-align: left;margin-bottom: 30px;">
        <a-button  @click="openBack " icon="close">关闭</a-button>
          <a-button icon="sync" style="float: right;" @click="RefreshBtn">更新</a-button>
      </div>
      <div v-if="!isShow" class="isMain">
        <h1 class="title">{{searchRes.agencyName}}</h1>
        <div class="busiScope"><span style="font-weight: bold;">服务范围:</span>
          <p> {{searchRes.busiScope}}</p>
        </div>
        <div class="mainBody">
          <span style="display: flex;">
            <p style="font-weight: bold; width: 80px;"> 公司电话 :</p>
            <p>{{searchRes.companyPhone}}</p>
          </span>
          <span style="display: flex;">
            <p style="font-weight: bold; width: 80px;"> 公司地址:</p>
            <p>{{searchRes.compAddress}}</p>
          </span>
          <span style="display: flex;">
            <p style="font-weight: bold; width: 80px;"> 公司传真:</p>
            <p>{{searchRes.companyFax}}</p>
          </span>
          <span style="display: flex;">
            <p style="font-weight: bold; width: 80px;"> 有效状态:</p>
            <p>{{searchRes.validStatus }}</p>
          </span>
          <span style="display: flex;">
            <p style="font-weight: bold; width: 80px;"> 成立日期:</p>
            <p>{{searchRes.registerTime}}</p>
          </span>
          <span style="display: flex;">
            <p style="font-weight: bold; width: 80px;"> 管辖区:</p>
            <p>{{searchRes.regulatoryCode}}</p>
          </span>
        </div>
      </div>
      <div v-if="!isShow" class="isMain" style="margin-top:20px">
        <h3 class="istitleBox">工商注册：</h3>
        <table class="table-ant-Box">
         <tr>
            <td>注册资本</td>
            <td>{{Corporation.basic.regCapital}}</td>
            <td>实缴资本</td>
            <td>{{Corporation.basic.realCapital}}</td>
          </tr>
          <tr>
            <td>法定代表人 </td>
            <td>{{Corporation.basic.legalPerson}}</td>
            <td>经营状态</td>
            <td>{{Corporation.basic.openStatus}}</td>
          </tr>
          <tr>
            <td>曾用名</td>
            <td>{{Corporation.basic.prevEntName}}</td>
            <td>所属行业</td>
            <td>{{Corporation.basic.industry}}</td>
          </tr>

          <tr>
            <td>统一社会信用代码 </td>
            <td>{{Corporation.basic.regNo}}</td>
            <td>纳税人识别号</td>
            <td>{{Corporation.basic.taxNo}}</td>
          </tr>
          <tr>
            <td>工商注册号</td>
            <td>{{Corporation.basic.licenseNumber}}</td>
            <td>组织机构代码</td>
            <td>{{Corporation.basic.orgNo}}</td>
          </tr>
          <tr>
            <td>登记机关 </td>
            <td>{{Corporation.basic.authority}}</td>
            <td>成立日期</td>
            <td>{{Corporation.basic.startDate}}</td>
          </tr>
          <tr>
            <td>企业类型</td>
            <td>{{Corporation.basic.entType}}</td>
            <td>营业期限</td>
            <td>{{Corporation.basic.openTime}}</td>
          </tr>
          <tr>
            <td>行政区划 </td>
            <td>{{Corporation.basic.district}}</td>
            <td> 审核/年检日期</td>
            <td>{{Corporation.basic.annualDate}}</td>
          </tr>
          <tr>
            <td>注册地址 </td>
            <td colspan="3">{{Corporation.basic.regAddr}}</td>
          </tr>
          <tr>
            <td>经营范围 </td>
            <td colspan="3">{{Corporation.basic.scope}}</td>
          </tr>
        </table>
        <h3 class="istitleBox" v-if="isShowItem">股东信息：</h3>
        <table v-if="isShowItem" class="table-ant-Box">
          <tr v-for="_item in Corporation.dataAnalysis.sections.structure.investor">
            <td>发起人/股东</td>
            <td>{{_item.name}}</td>
            <td>持股比例</td>
            <td>{{_item.amountPercent ? _item.amountPercent : '-' }}</td>
          </tr>
        </table>

        <h3 class="istitleBox" v-if="isShowItem">主要人员：</h3>
        <table v-if="isShowItem" class="table-ant-Box">
          <tr v-if="isShowkeyPersonnel" v-for="item in Corporation.dataAnalysis.sections.structure.keyPersonnel">
            <td>姓名</td>
            <td>{{item.name}}</td>
            <td>职务</td>
            <td>{{item.title}}</td>
          </tr>
        </table>
        <h3 class="istitleBox">变更记录(共{{changeRecordTotalNum ? changeRecordTotalNum : 0 }}条)：</h3>
         <a-table  style="margin-left: 30px;" :columns="columns" bordered
          :loading="loading"
        :dataSource="changeRecord">
        </a-table>

        <h3 class="istitleBox">分支机构(共{{branchTotalNum ? branchTotalNum : 0}}条)：</h3>
         <a-table  style="margin-left: 30px;" :columns="branchColumns" bordered
          :loading="loading"
        :dataSource="branchList">
        </a-table>
      </div>
      <!-- 序号	变更日期	变更项目	变更前	变更后 -->
     <div class="loadingShow"  v-show="isShow">
        <a-spin class="loadingImg" />
      </div>
    </div>

  </a-layout-content>

</template>

<script>
  import {
    axiosPostAPI,
    axiosGetAPI,
    axiosPutAPI
  } from "../../common/Axios.js";
  import axios from 'axios';
  import router from './../../router';
  export default {
    data() {
      return {
        checkNick: false,
        search: '',
        searchRes: {},
        Corporation: {},
        changeRecord:[],
        changeRecordTotalNum:'',
        branchTotalNum:'',
        uid:[],
        loading: false,
        searchValue: '',
        totalRows: 10,
        pagination:1,
        isShow: false,
        id: '',
        branchList:[],
        isShowItem: false,
        isShowkeyPersonnel: false,
        name:'',
        columns:[
          {
            title: '变更日期',
           dataIndex: 'date',
           width: '15%',
          },
           {
            title: '变更项目',
           dataIndex: 'fieldName',
           width: '15%',
          },
           {
            title: '变更前',
           dataIndex: 'oldValue',
           width: '35%',
          },
           {
            title: '变更后',
           dataIndex: 'newValue',
           width: '35%',
          }
        ],
         branchColumns:[
          {
            title: '企业名称',
           dataIndex: 'entName',
           width: '35%',
          },
           {
            title: '负责人',
           dataIndex: 'legalPerson',
           width: '15%',
          },
           {
            title: '成立日期',
           dataIndex: 'startDate',
           width: '35%',
          },
           {
            title: '状态',
           dataIndex: 'openStatus',
           width: '15%',
          }
        ]
      };
    },
    created() {
      var self = this;
      if (this.$route.query.id) {
        this.id = this.$route.query.id;
        console.log(this.id);
        this.getResult(this.id);
      }
      if (this.$route.query.name){
        var name = this.$route.query.name;
        this.name = this.$route.query.name;
        self.isShow = true;
        axiosGetAPI("/Corporations/" + name).then(res => {
          self.isShow = false;
          if (res.result) {
            self.Corporation = res.result.content;
            if (res.result.content.dataAnalysis && res.result.content.dataAnalysis.sections &&
              res.result.content.dataAnalysis.sections.structure) {
              if (res.result.content.dataAnalysis.sections.structure.investor) {
                self.isShowItem = true;
              }
              if (res.result.content.dataAnalysis.sections.structure.keyPersonnel) {
                self.isShowkeyPersonnel = true;
              }
            } else {
              self.isShowItem = false;
            };
            if(self.Corporation.changeRecord){
              self.changeRecord = []
              self.changeRecordTotalNum = self.Corporation.changeRecord[0].totalNum
              self.Corporation.changeRecord.map(itemList=>{
                itemList.list.map(_itemList =>{
                  self.changeRecord.push(_itemList);
                  self.uid.push(self.changeRecord.length);
                })
              })
            };
            if(self.Corporation.branchList){
              self.branchList = []
              self.branchTotalNum = self.Corporation.branchList[0].totalNum
              self.Corporation.branchList.map(itemBranch =>{
                itemBranch.list.map(_itemBranch=>{
                  self.branchList.push(_itemBranch);
                })
              })
            }
          }
        }, err => {
        self.isShow = false;
        reject(err)
      }).catch(function(error) {
         self.isShow = false;
        // reject(error)
        console.log(error)
      })
      }
    },
    mounted() {
    },
    methods: {
      RefreshBtn(){
        var self = this;
         self.isShow = true;
        axiosPutAPI('/Corporations/'+ this.name + '/Refresh').then(res=>{
          self.isShow = false;
          if (res.result) {
            self.Corporation = res.result.content;
            if (res.result.content.dataAnalysis && res.result.content.dataAnalysis.sections &&
              res.result.content.dataAnalysis.sections.structure) {
              if (res.result.content.dataAnalysis.sections.structure.investor) {
                self.isShowItem = true;
              }
              if (res.result.content.dataAnalysis.sections.structure.keyPersonnel) {
                self.isShowkeyPersonnel = true;
              }
            } else {
              self.isShowItem = false;
            };
            if(self.Corporation.changeRecord){
              self.changeRecord = [];
              self.changeRecordTotalNum = self.Corporation.changeRecord[0].totalNum
              self.Corporation.changeRecord.map(itemList=>{
                itemList.list.map(_itemList =>{
                  self.changeRecord.push(_itemList);
                  self.uid.push(self.changeRecord.length);
                })
              })
            };
            if(self.Corporation.branchList){
               self.branchList =[];
              self.branchTotalNum = self.Corporation.branchList[0].totalNum
              self.Corporation.branchList.map(itemBranch =>{
                itemBranch.list.map(_itemBranch=>{
                  self.branchList.push(_itemBranch);
                })
              })
            }

          }
        })
      },
      openBack() {
        this.$router.back()
      },
      onpageChange(){},
      getResult(id) {
        var self = this;
        self.isShow = true;
        axiosGetAPI('/Agencies/' + id)
          .then(res => {
            self.isShow = false;
            if (res.result) {
              self.searchRes = res.result;
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
        this.pageNumber = pagination;
        if (this.searchValue) {
          this.getResult();
        }
      },
      todetail(item) {
        this.push({
          path: '/detail'
        })
      },
      toseekUser() {
        this.$router.push({
          path: '/platform/seekUser'
        })
      },

    },
  };
</script>

<style scoped>
  .agencyShow {
    min-height: 600px;
    position: relative;
  }

  .isMain {
    text-align: left;
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


  .title {
    border-left: 6px solid #4072f7;
    padding-left: 10px;
    margin-left: 5px;
    margin-bottom: 30px;
  }

  .busiScope {
    padding: 20px;
    border-radius: 8px;
    color: #525252;
    margin-bottom: 20px;
    background-color: #ecf4ff;
  }

  .clear {
    clear: both;
  }

  .mainBody {
    padding: 20px;
    background-color: #f9f9f9;
    color: #555;
    border-radius: 8px;
  }

  .table-ant-Box td:nth-child(2n-1) {
    width: 220px;
    background: #f5f9ff;
  }

  .table-ant-Box td:nth-child(2n) {
    width: 350px;
  }

  .table-ant-Box td {
    border: 1px solid #e5ebf5;
    color: #333;
    font-size: 14px;
    padding: 11px 14px;
    box-sizing: border-box;
    line-height: 24px;
  }

  .updataList thead {
    background: #f5f9ff;
  }

  .updataList td:nth-child(1) {
    width: 60px;
  }

  .updataList td:nth-child(2) {
    width: 100px;
  }

  .updataList td:nth-child(3) {
    width: 116px;
  }

  .updataList td:nth-child(4) {
    width: 286px;
  }

  .updataList td:nth-child(5) {
    width: 286px;
  }

  .updataList td {
    border: 1px solid #e5ebf5;
    color: #333;
    font-size: 14px;
    padding: 11px 14px;
    box-sizing: border-box;
    line-height: 24px;
  }

  .table-ant-Box {
    margin-left:30px ;
  }

  .updataList {
    margin: auto;
  }


  .isMain h3 {
    margin-top: 30px;
  }

  .istitleBox {
    font-weight: bold;
    color: #333;
    margin-left: 20px;
  }
</style>
