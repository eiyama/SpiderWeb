<template>
    <a-locale-provider :locale="zh_CN">
  <div id="app">
     <keep-alive>
     <router-view v-if="isRouterAlive"></router-view>
   </keep-alive>
  </div>

  </a-locale-provider>
</template>

<script>
  import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
export default {
  name: 'App',
 provide(){
       return{
      reload:this.reload,
       }
   },
 data() {
       return {
          zh_CN,
           isRouterAlive:true,
     }
    },
  methods:{
      reload(){
         this.isRouterAlive = false ;
        this.$nextTick(function(){
          this.isRouterAlive = true ;
        })
     }

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  /* margin-top: 60px; */
}
</style>
