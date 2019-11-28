<template>
  <!-- <p>创建用户</p> -->


  <a-layout-content class="isContent">
    <!-- <a-layout-header> -->
    <h3 style="font-weight: bold;text-align: left;">保险中介信息</h3>
    <div class="isBox">
      <div style="margin: 30px 0; border-radius: 5px;display: flex">
        <span class="searchBox" style="margin-right: 30px;">
          <input placeholder="按名称搜索" style="width: 200px;" v-model="searchValue" />
        </span>
        <span class="searchBox" style="margin-right: 30px;">
          <input placeholder="按编码搜索" style="width: 200px;" v-model="searchCode" />
        </span>
        <a-button style="margin-left:20px ;" type="primary" @click="onSearch">
          搜索
        </a-button>

        <a-button style="margin-left:20px ;" type="primary" @click="exportExcel">
          导出
        </a-button>
        <a-button style="margin-left:20px ;" @click="onReset">
          重置
        </a-button>
        <div>
          <a :style="{ marginLeft: '50px', fontSize: '14px',float:'right',marginTop:'8px' }" @click="isexpand">
            高级
            <a-icon :type="expand ? 'up' : 'down'" />
          </a>
        </div>
      </div>
      <div v-show="isShowSearch">
        <a-row type="flex" justify="start">
          <a-col :xs="24" :sm="3"><strong>成立年限:</strong></a-col>
          <a-col :xs="24" :sm="18">
            <a-col class="isItem" :xs="24" :sm="3" :class="{isActive:selected === index}" :key="index" @click="checkYear(index,item)"
              v-for=" (item , index) in yearRange">
              {{item.key}}
            </a-col>
          </a-col>
        </a-row>
        <a-row class="itemSet" type="flex" justify="start">
          <a-col :xs="24" :sm="3"><strong>注册资本（万元）:</strong></a-col>
          <a-col :xs="24" :sm="18">
            <a-col class="isItem" :xs="24" :sm="3" :class="{isActive:selectedReg === _index}" @click="checkItem(_index,_item)"
              v-for=" (_item , _index) in registeredRangeItem">
              {{_item.key}}
            </a-col>
          </a-col>
        </a-row>

		<a-row class="itemSet" type="flex" justify="start">
		  <a-col :xs="24" :sm="3"><strong>最新的投资人变更日期:</strong></a-col>
		  <a-col :xs="24" :sm="18">
		    <a-col class="isItem" :xs="24" :sm="3" :class="{isActive:latestInvestor === lastIndex}" @click="checklatestInvestor(lastIndex,lastItem)"
		      v-for=" (lastItem , lastIndex) in latestInvestorRangeItem">
		      {{lastItem}}
		    </a-col>
		  </a-col>
		</a-row>

        <a-row class="itemSet">
          <a-col :xs="24" :sm="3"><strong>机构分类:</strong></a-col>
          <a-col :xs="24" :sm="18">
            <a-col class="isItem" :xs="24" :sm="3" :class="{isActive:selectedorgCate === indexorgCate}" @click="checkOrgCate(indexorgCate,itemorgCate)"
              v-for=" (itemorgCate , indexorgCate) in orgCateItem">
              {{itemorgCate.key}}
            </a-col>
          </a-col>
        </a-row>
        <a-row class="itemSet">
          <a-col :xs="24" :sm="3"><strong>机构类型:</strong></a-col>
          <a-col :xs="24" :sm="18">
            <a-col class="isItem" :xs="24" :sm="3" :class="{isActive:selectedorgType === indexorgType}" @click="checkorgType(indexorgType,itemorgType)"
              v-for=" (itemorgType , indexorgType) in orgTypeItem">
              {{itemorgType.key}}
            </a-col>
          </a-col>
        </a-row>
        <a-row class="itemSet">
          <a-col :xs="24" :sm="3"><strong>区域性质:</strong></a-col>
          <a-col :xs="24" :sm="18">
            <a-col class="isItem" :xs="24" :sm="2" :class="{isActive:selectedisRegionage === indexisRegionage}" @click="checkisRegionage(indexisRegionage,itemisRegionage)"
              v-for=" (itemisRegionage , indexisRegionage) in isRegionageItem">
              {{itemisRegionage.key}}
            </a-col>
          </a-col>
        </a-row>
        <a-row class="itemSet">
          <a-col :xs="24" :sm="3"><strong>管辖区:</strong></a-col>
          <a-col :xs="12" :sm="18">
            <a-col class="isItem" :xs="24" :sm="2" :class="{isActive:selectedRegulatory === indexregulatory}" @click="checkRegulatory(indexregulatory,itemregulatory)"
              v-for=" (itemregulatory , indexregulatory) in regulatoryCodeItem">
              {{itemregulatory}}
            </a-col>
          </a-col>
        </a-row>
      </div>
    </div>
    <!-- </a-layout-header> -->
    <div class="agencyShow">
      <table class="table-ant ">
        <tr style="background: #fafafa;height: 53px;">
          <th>代理公司名称</th>
          <th>代理公司编码</th>
          <th>最新的投资人变更日期</th>
          <th>公司地址</th>
          <th>管辖区</th>
          <th>公司电话</th>
          <th>公司传真</th>
          <th>注册资本(万元)</th>
          <th>成立时间</th>
          <th>是否区域性</th>
          <th>许可证有效期</th>
          <th>业务范围 </th>
          <th>有效状态</th>
        </tr>
        <tr style="cursor:pointer" v-for="(item,index) in searchRes " @click="showPopupBox(item, index)">
          <td>{{item.agencyName}}</td>
          <td>{{item.agencyCode}}</td>
          <td>{{item.latestInvestorChangeDate}}</td>
          <td>{{item.compAddress}}</td>
          <td>{{item.regulatoryCode}}</td>
          <td>{{item.companyPhone}}</td>
          <td>{{item.companyFax}}</td>
          <td>{{item.registered}}</td>
          <td>{{item.registerTime}}</td>
          <td>{{item.isRegionage == '1' ? '是':'否' }}</td>
          <td>{{item.liceffStrDate }} - {{item.liceffEndDate }}</td>
          <td>{{item.busiScope}}</td>
          <td>{{item.validStatus}}</td>
        </tr>
      </table>
      <div class="loadingShow" v-show="isShow">
        <a-spin class="loadingImg" />
      </div>
    </div>
    <template>
      <a-pagination style="margin-top: 5px;" :pageSize.sync="pageSize" showSizeChanger @showSizeChange="onShowSizeChange"  :showTotal="total => `共 ${totalRows} 条`"
        showQuickJumper :total="totalRows" :current="pageNumber" @change="onpageChange" />
   
    </template>
  </a-layout-content>
</template>

<script>
  import {
    axiosPostAPI,
    axiosGetAPI,
    exportExcelAPI
  } from "../../common/Axios.js";
  import axios from 'axios';

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
        searchTotalRows:0,
        checkNick: false,
        expand: false,
        formItemLayout,
        formTailLayout,
        form: this.$form.createForm(this),
        search: '',
        searchRes: [],
        pageNumber: 1,
        searchValue: '',
        totalRows: 10,
        isShow: false,
        visible: false,
        offset: 0,
        limit: 10,
        showPopup: false,
        currentItem: {},
        searchCode: '',
        selected: '',
        yearRange: [{
            key: '成立1年内',
            value: '0-1'
          }, {
            key: '成立1-5年',
            value: '1-5'
          }, {
            key: '成立5-10年',
            value: '5-10'
          }, {
            key: '成立10-15年',
            value: '10-15'
          },
          {
            key: '成立15年以上',
            value: '15-n'
          }
        ],
		latestInvestorRangeItem:['近1个月','近3个月','近半年','近1年','近2年'],
		latestInvestorRange:'',
        registeredRangeItem: [{
          key: '0-100',
          value: '0-100'
        }, {
          key: '100-500',
          value: '100-500'
        }, {
          key: '500-1000',
          value: '500-1000'
        }, {
          key: '1000-5000',
          value: '100-500'
        }, {
          key: '5000以上',
          value: '5000-n'
        }],
        regulatoryCodeItem: ["北京", "天津", "河北", "山西", " 内蒙古", "辽宁", " 吉林", "黑龙江", "上海", "江苏", "浙江", "安徽", "福建", "江西",
          "山东", "河南", "湖北", "湖南", "广东", "广西", "海南", "重庆", "四川", "贵州", "云南", " 西藏",
          "陕西", "甘肃", "青海", "宁夏", "新疆", "大连", "宁波", "厦门", "青岛", "深圳"
        ],
        orgCateItem: [{
          key: "代理公司",
          value: "1"
        }, {
          key: "经纪公司",
          value: "2"
        }, {
          key: "公估公司",
          value: '3'
        }],
        orgTypeItem: [{
          key: "总公司",
          value: "1"
        }, {
          key: "分公司/营业部",
          value: "2"
        }],
        isRegionageItem: [{
          key: "全国性",
          value: "0"
        }, {
          key: "区域性",
          value: "1"
        }],
        selectedorgType: '',
        selectedTags: [],
        selectedisRegionage: '',
        selectedReg: '',
        selectedorgCate: "",
        expand: '',
        selectedRegulatory: '',
        isShowSearch: false,
        inceptionYearRange: '',
        registeredRange: '',
        regulatoryCode: '',
        isRegionage: '',
        orgCate: '',
        orgType: '',
        url: '',
        pageSize: 10,
        current: 4,
	    	latestInvestor:'',
      };
    },
    watch: {
      pageSize(val) {
        console.log('pageSize', val);
      },
      current(val) {
        console.log('current', val);
      }
    },
    created(){
      this.onSearch();
    },
    methods: {
      onShowSizeChange(current, pageSize) {
        // console.log(current, pageSize);
        var self = this;
        if(this.totalRows > 10){
          if (this.pageNumber) {
            this.offset = (this.pageNumber - 1) * pageSize
          }
          this.limit = pageSize
          var url = this.getUrl();
          self.isShow = true;
          axiosGetAPI(url)
            .then(res => {
              self.isShow = false;
              if (res.result) {
                self.searchRes = res.result;
                self.totalRows = res.page.totalRows;
              }
            })
        }
      },
      isexpand() {
        this.expand = !this.expand;
        this.isShowSearch = !this.isShowSearch;
      },
      showPopupBox(item) {
        this.$router.push({
          path: "detail?name=" + item.agencyName + "&id=" + item.id
        });
      },
      closePopup() {
        this.showPopup = false;
      },
      getUrl() {
        var url = '/Agencies' + '?offset=' + this.offset + '&limit=' + this.limit;
        var _url = "";
        if (this.searchValue) {
          url = url + '&agencyName=' + this.searchValue;
          _url = _url + '&agencyName=' + this.searchValue;
        };
        if (this.searchCode) {
          url = url + '&agencyCode=' + this.searchCode;
          _url = _url + '&agencyCode=' + this.searchCode;
        };
        if (this.inceptionYearRange) {
          url = url + '&inceptionYearRange=' + this.inceptionYearRange;
          _url = _url + '&inceptionYearRange=' + this.inceptionYearRange;
        };
        if (this.registeredRange) {
          url = url + '&registeredRange=' + this.registeredRange;
          _url = _url + '&registeredRange=' + this.registeredRange;
        };
		if(this.latestInvestorRange){
			 url = url + '&latestInvestorRange=' + this.latestInvestorRange;
			_url = _url + '&latestInvestorRange=' + this.latestInvestorRange;
		}
        if (this.regulatoryCode) {
          url = url + '&regulatoryCode=' + this.regulatoryCode;
          _url = _url + '&regulatoryCode=' + this.regulatoryCode;
        };
        if (this.isRegionage) {
          url = url + '&isRegionage=' + this.isRegionage;
          _url = _url + '&isRegionage=' + this.isRegionage;
        };
        if (this.orgCate) {
          url = url + '&orgCate=' + this.orgCate;
          _url = _url + '&orgCate=' + this.orgCate;
        };
        if (this.orgType) {
          url = url + '&orgType=' + this.orgType;
          _url = _url + '&orgType=' + this.orgType;
        };
        this.url = _url;
        return url;
      },
      getResult(pageNumber) {
        var self = this;
        console.log(this.pageSize);
        if (pageNumber) {
          this.offset = (pageNumber - 1) * this.pageSize
        }
        var url = this.getUrl();
        self.isShow = true;
        axiosGetAPI(url)
          .then(res => {
            self.isShow = false;
            if (res.result) {
              self.searchRes = res.result;
              self.totalRows = res.page.totalRows;
              this.searchTotalRows = res.page.totalRows;
            }
          })
      },
      onSearch() {
        this.getResult();
      },
      onReset() {
        this.inceptionYearRange = "";
        this.registeredRange = "";
        this.regulatoryCode = "";
        this.isRegionage = "";
        this.orgCate = "";
        this.orgType = "";
		this.latestInvestorRange = ''
        this.selected = "";
        this.selectedReg = "";
        this.selectedRegulatory = "";
        this.selectedorgCate = "";
        this.selectedisRegionage = "";
        this.selectedorgType = "";

		this.latestInvestor = "",
        this.searchRes = [];
        this.totalRows = 10;
      },
      onpageChange(pagination) {
        this.pageNumber = pagination;
        // if (this.searchValue) {
        this.getResult(pagination);
        // }
      },
      todetail(item) {
        this.$router.push({
          path: '/platform/detail?id=' + item.id
        })
      },
      toseekUser() {
        this.$router.push({
          path: '/platform/seekUser'
        })
      },
      checkYear(index, item) {
        if (this.selected === index) {
          this.selected = "";
          this.inceptionYearRange = "";
          this.searchRes = [];
          this.totalRows = 10;
        } else {
          this.selected = index;
          this.inceptionYearRange = item.value;
          this.onSearch();
        }
      },
	  checklatestInvestor(index, item){
		 var date = new Date();
		 var year = date.getFullYear();
		 var month = date.getMonth()+1;
		 var _month = month;
		 var _year = year;
		 if(index == 0){
			 if(month == 1){
				 _year = year - 1;
				 _month = 12 ;
			 }
			 else{
				 _month = month - 1
			 }
		 }
		 if(index == 1){
			 if(month <= 3){
				  _year = year - 1;
				 _month = month + 12 - 3;
			 }
			 else{
				 _month = month - 3
			 }
		 }
		 if(index == 2){
			 if(month <= 6 ){
				_year = year - 1;
				_month = month + 12 - 6;
			 }
			 else{
				 _month = month - 6
			 }
		 }
		 if(index == 3){
			 _year = year - 1;
		 }
     if(index == 4){
       _year = year - 1;
       _month = 1
     }
		 if(month<10){
			 month = '0' + month;
		 }
		 if(_month<10){
		 	 _month = '0' + _month;
		 }
		 var time = year + "" + month;
		 var _time = _year + "" + _month;
		  if (this.latestInvestor === index) {
		   this.latestInvestor = "";
		   this.latestInvestorRange = '';
		   this.searchRes = [];
		   this.totalRows = 10;
		 } else {
		   this.latestInvestorRange = _time + '-' + time
		   this.latestInvestor = index;
		   this.onSearch();
		 }
	  },
      checkItem(index, item) {
        if (this.selectedReg === index) {
          this.selectedReg = "";
          this.registeredRange = "";
          this.searchRes = [];
          this.totalRows = 10;
        } else {
          this.selectedReg = index;
          this.registeredRange = item.value;
          this.onSearch();
        }
      },
      checkRegulatory(index, item) {
        if (this.selectedRegulatory === index) {
          this.selectedRegulatory = "";
          this.regulatoryCode = "";
          this.searchRes = [];
          this.totalRows = 10;
        } else {
          this.selectedRegulatory = index;
          this.regulatoryCode = item;
          this.onSearch();
        }
      },
      checkOrgCate(index, item) {
        if (this.selectedorgCate === index) {
          this.selectedorgCate = "";
          this.orgCate = "";
          this.searchRes = [];
          this.totalRows = 10;
        } else {
          this.selectedorgCate = index;
          this.orgCate = item.value;
          this.onSearch();
        }
      },
      checkorgType(index, item) {
        if (this.selectedorgType === index) {
          this.selectedorgType = "";
          this.orgType = "";
          this.searchRes = [];
          this.totalRows = 10;
        } else {
          this.selectedorgType = index;
          this.orgType = item.value;
          this.onSearch();
        }
      },
      checkisRegionage(index, item) {
        if (this.selectedisRegionage === index) {
          this.selectedisRegionage = "";
          this.isRegionage = "";
          this.searchRes = [];
          this.totalRows = 10;
        } else {
          this.selectedisRegionage = index;
          this.isRegionage = item.value;
          this.onSearch();
        }
      },
      exportExcel() {
        this.getUrl();
        var ExportExcelModel = {
          "url": "",
          "titles": [
            "代理公司名称",
            "代理公司编码",
            "公司地址",
            "管辖区",
            "公司电话",
            "公司传真",
            "业务范围",
            "注册资本(万元)",
            "成立时间",
            "是否区域性",
            "许可证有效期始期",
            "许可证有效期止期",
            "有效状态"
          ],
          "fields": [
            "agencyName",
            "agencyCode",
            "compAddress",
            "regulatoryCode",
            "companyPhone",
            "companyFax",
            "busiScope",
            "registered",
            "registerTime",
            "isRegionage",
            "liceffStrDate",
            "liceffEndDate",
            "validStatus"
          ],
          "header": "保险中介信息"
        }
        if (this.url != '') {
          ExportExcelModel.url = '/Agencies?offset=0&limit=2147483647' + this.url;
          this.isShow = true;
         exportExcelAPI('/ExportExcel',ExportExcelModel).then(res => { // 处理返回的文件流
          this.isShow = false;
            const blob = new Blob([res.data]);
            const fileName = res.headers['content-disposition'].split('=')[1] ? decodeURI(res.headers['content-disposition'].split(
              '=')[1]) : '保险中介信息.xlsx';
            const elink = document.createElement('a');
            elink.download = fileName;
            elink.style.display = 'none';
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href); // 释放URL 对象
            document.body.removeChild(elink);
          })
        } else {
        //   this.$notification.open({
        //   message: '导出类型不能为空',
        //   description: '请先选择或输入需要导出的类别',
        //   bottom: '50px',
        //   duration: 2,
        // })
         this.$message.warning('请先选择或输入需要导出的类别');
          // this.$message('请先选择或输入需要导出的类别')
        }
      },

      toggle() {
        this.expand = !this.expand;
      },
    },
  };
</script>

<style scoped>
  /* xinzeng */
  .RangeBox {
    display: flex;
    align-items: center;
    margin: 20px 0;
  }

  .clear {
    clear: both;
  }

  .isYearRange {
    display: flex;
    list-style: none;
    max-width: 100%;
    overflow-x: auto;
    white-space: nowrap;
    margin: 0;
    padding: 0;
  }

  .isYearRange li {
    margin: 0 10px;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
  }

  .isItem {
    margin: 0 10px;
    text-align: center;
    padding: 6px 1px;
    border-radius: 5px;
    cursor: pointer;
  }

  .isActive {
    background-color: #1890ff;
    color: #FFFFFF;
  }

  .regulatory {
    list-style: none;
    /* margin-left: 90px; */
  }

  .regulatory li {
    float: left;
    margin: 0 10px;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;

  }

  .isBox {
    background: #FFFFFF;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #eee;
    text-align: left;
  }

  .itemSet {
    margin-top: 20px;
  }

  /* xinzeng */
  .agencyShow {
    margin-top: 30px;
    min-height: 600px;
    /* position: relative; */
    overflow-x: auto;
    white-space: nowrap;
  }

  .clear {
    clear: both;
  }

  .isContent input,
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
    /* float: right; */
    display: flex;
    align-items: center;

  }

  .searchBox p {
    margin: 0;
    padding-right: 8px;
    font-size: 14px;
    color: #333;

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

  /*
.isContent{
  position: relative;
} */


  .popupBox {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgb(38, 38, 38);
    z-index: 9;
  }

  .isPopup {
    position: absolute;
    top: 50%;
    height: 80%;
    width: 60%;
    padding: 15px;
    background: #FFFFFF;
    border-radius: 5px;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .isMain {
    text-align: left;
    /* width: 800px; */
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

  .isTitle {
    width: 10%;
    text-align: left;
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

  .mainBody {
    padding: 20px;
    background-color: #f9f9f9;
    color: #555;
    border-radius: 8px;
  }

  .isMain p {
    white-space: normal;
    width: 100%;
  }

  .cancelBox {
    margin-top: 30px;
    text-align: center;
  }
</style>
