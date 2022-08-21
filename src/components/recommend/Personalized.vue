<template>
 <div class="personalized">
    <div class="personalized-top">
      <h3>{{title}}</h3> 
      <!-- <h3>推荐歌单</h3> -->
    </div>
    <div class="personalized-list">
      <div class="item" v-for="item in personalized" :key="item.id" @click="selectItem(item.id)">
        <!-- <img :src="item.picUrl" alt=""> -->
        <img v-lazy="item.picUrl" alt="">
        <p>{{ item.name }}</p>

      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'Personalized',
  props: {
    personalized: {
      type: Array,
      default: () => [],
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    type: String
  },
  methods: {
    selectItem (id) {
      console.log(id)
      this.$emit('select', id, this.type)
    }
  }
}
</script>

<style scoped lang='scss'>
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.personalized{
  // 换肤2
  @include bg_sub_color();
  overflow: hidden;
  .personalized-top{
    width: 100%;
    height: 84px;
    // line-height: 84px;
    @include bg_sub_color();
    // title和列表的分割
    border-bottom: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding: 0 20px;
    overflow: hidden;
    h3{
      margin-top: 20px;
      height: 50px;
      @include font_size($font_large);
      font-weight: bold;
      @include font_color();
      padding-top: 10px;
      border-left: 5px solid #000000;
      padding-left: 20px;
      @include border_color()
    }
  }
  .personalized-list{
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 20px 0;
    .item{
      width:200px;
      img{
        width: 200px;
        height: 200px;
        border-radius: 10px;
      }
      p{
        // @include font_size(25Px);
        @include clamp(2);
        padding: 20px 0;

        
        // 换肤1
        @include font_color();
        text-align: center;
      }
    }
  }
}
</style>
