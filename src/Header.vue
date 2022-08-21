<template>
  <div class="header" @click="changeTheme">
    <div class="header-left"></div>
    <p class="header-title">我的云音乐</p>
    <div class="header-right"></div>
  </div>
</template>

<script>
export default {
  name: 'Header',
    components: '',
    data() {
        return {
          index: 0,
          themes:['theme', 'theme1','theme2']
        };
    },
    created() {

    },
    mounted() {

    },
    methods: {
      changeTheme(){
        this.index++
        if(this.index>=this.themes.length){this.index = 0}
        document.documentElement.setAttribute('data-theme',this.themes[this.index])

      }

    }
};
</script>

<style scoped lang="scss">
@import '../assets/css/variable.scss';
@import '../assets/css/mixin.scss';
.header{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  // background-color: red;
  // 改为混合设置背景色
  @include bg_color;
  .header-left,.header-right{
    width: 84px;
    height: 84px;
    margin-top: 8px;
  }
  .header-left{
    @include bg_img('../assets/images/logo');
    // background: url('../assets/images/logo_163@2x.png') no-repeat ;
  }
  .header-right{
    @include bg_img('../assets/images/account');
    // background: url('../assets/images/account_163.png') no-repeat;

  }
  .header-title{
    text-align: center;
    line-height: 100px;
    color: #fff;
    font-weight: bold;
    @include font_size($font_medium)
  }

}
</style>
