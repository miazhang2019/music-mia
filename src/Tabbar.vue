<template>
  <div class="tabbar">
    <router-link to="/recommend" tag="div" class="item">
      <span>推荐</span>
    </router-link>
    <router-link to="/singer" tag="div" class="item">
      <span>歌手</span>
    </router-link>
    <router-link to="/rank" tag="div" class="item">
      <span>排行</span>
    </router-link>
    <router-link to="/search" tag="div" class="item">
      <span>搜索</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Tabbar',
    components: '',
    data() {
        return {

        };
    },
    created() {

    },
    mounted() {

    },
    methods: {

    }
};
</script>

<style scoped lang="scss">
@import '../assets/css/variable';
@import '../assets/css/mixin';
.tabbar{
  width: 100%;
  height: 84px;
  // 换肤
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  .item{
    span{
      line-height: 84px;
      // huanfu
      @include font_size($font_medium_s);
      color:black;
    }
  }
}
</style>
