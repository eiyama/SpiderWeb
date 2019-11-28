<template>
  <div>
      <div class="loadingShow" v-show="isShow">
      <a-spin class="loadingImg" />
    </div>
  </div>
</template>
<script>
export default {
  data() {


    return {
     isShow: true,
    }
  },
  mounted(){
      this.toDetail()

  },
  methods:{
    toDetail(){
        const TIME_COUNT = 1;
        if(!this.timer){
            this.count = TIME_COUNT;
            this.show = false;
            this.timer = setInterval(()=>{
            if(this.count > 0 && this.count <= TIME_COUNT){
                this.count--;
            }else{
                this.show = true;
                clearInterval(this.timer);
                this.timer = null;
                //跳转的页面写在此处
                this.$router.replace({ path: 'detail' })
            }
          },500)
        }

    }
  }
}

</script>

<style scoped="scoped">
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
</style>
