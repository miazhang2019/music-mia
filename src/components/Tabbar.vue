<template>
  <div>
      <div class="tabbar">
          <router-link tag="div" class="item" to="/recommend">
              <span>推荐</span>
          </router-link>
          <router-link tag="div" class="item" to="/singer">
              <span>歌手</span>
          </router-link>
          <router-link tag="div" class="item" to="/rank">
              <span>排行</span>
          </router-link>
          <router-link tag="div" class="item" to="/search">
              <span>搜索</span>
          </router-link>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang='scss'>
@import '../assets/css/variable';
@import '../assets/css/mixin';
.tabbar{
    width: 100%;
    height: 84px;
    // @include bg_sub_color();
    display: flex;//水平排版
    justify-content: space-around;//两边会留出一定间隙
    // 防止被遮挡
    // position: relative;
    // z-index: 999;
    .item{
        span{
            line-height: 84px;
            // 
            @include font_size($font_medium);
            // 根据主题更改颜色
            @include font_color();
        }
        // router-link的默认激活类名
        &.router-link-active{
            span{
                @include font_active_color();
            }
            // 底部下划线
            border-bottom: 5px solid #000;
            @include border_color();
        }
    }
}
</style>
