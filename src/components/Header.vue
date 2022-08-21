<template>
  <div class="header" @click="changeTheme">
    <div class="header-left"></div>
    <p class="header-title">网易云音乐</p>
    <div class="header-right" @click.stop="user"></div>
  </div>
</template>
<script>
export default {
  name: 'Header',
//   主题定义在数据中
  data () {
    return {
      themes: ['theme', 'theme1', 'theme2'],
      index: 0
    }
  },

  components: {},

  methods: {
    changeTheme () {
      this.index++
      if (this.index >= this.themes.length) { this.index = 0 }
      document.documentElement.setAttribute('data-theme', this.themes[this.index])
    },
    // 个人中心
    user () {
      this.$router.push('/user')
    }
  }
}
</script>

<style scoped lang="scss">
// 在vue项目中通常会给style标签加上scope属性，以此来实现样式的私有化，避免全局污染。
@import "../assets/css/variable";
@import "../assets/css/mixin";
.header{
    width:100%;
    height: 100%;
    // background: #f00;
    // @include bg_color($background-color-theme);
    // 防止被遮挡
    // position: relative;
    // z-index: 999;

    @include bg_color();
    display: flex;
    justify-content: space-between;
    .header-left,.header-right{
        width: 84px; //图片高度宽度
        height: 84px;
        // background: #000;//随便一个背景色
        margin-top: 8px;//垂直居中头部（100-84）/2 ==mt8
    }
    .header-left{
        @include bg_img('../assets/images/logo')//会自动加入后缀
    }
    .header-right{
        @include bg_img('../assets/images/account')//会自动加入后缀
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
