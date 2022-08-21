<template>
    <Header1 class="header">
      <div slot="left" class="header-left" @click.stop="back"></div>
      <p slot="center" class="header-title">{{title}}</p>
      <div slot="right" class="header-right"></div>
    </Header1>
</template>

<script>
import Header1 from './Header1'
export default {
  name: 'SubHeader',
  components: {
    Header1
  },
  methods: {
    back () {
      window.history.back()
    }
  },
  props: {
    title: {
      type: String,
      default: '',
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable";
  @import "../../assets/css/mixin";
.header{
  .header-left{
    @include bg_img('../../assets/images/back');
  }
  .header-right{
    @include bg_img('../../assets/images/more')
  }
  .header-title{
    width: 60%;
    text-align: center;
    line-height: 100px;
    color: #fff;
    font-weight: bold;
    @include font_size($font_medium);
    @include no-wrap();
  }
}
</style>
