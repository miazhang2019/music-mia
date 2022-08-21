<template>
  <div class="detail-body">
    <img :src="path" alt="" />
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: 'Detailbody',
    components: '',
    data() {
        return {

        };
    },
    props:{
      path:{
        type:String
      }
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
.detail-body{
  width: 100%;
  height: 500px;
  overflow: hidden;
  position: relative;
  img{
    width: 100%;
    box-sizing: border-box;
  }
  .mask{
    position: absolute;
    background: #000;
    width: 100%;
    height: 100%;
    left: 0;top: 0;
    opacity: 0;
  }
}
</style>
