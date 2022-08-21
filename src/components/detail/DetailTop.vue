<template>
    <div class="detail-top">
        <div class="img-container">
            <img :src="path" alt="">
        </div>
    </div>
</template>

<script>
export default {
  name: 'DetailTop',
  props: {
    path: {
      type: String,
      default: '',
      required: true
    }
  },
  data () {
    return {

    }
  },
  created () {

  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
    .detail-top{
        width: 100%;
        height: 500px;
        overflow: hidden;
        position: relative;
        img{
            width: 100%;
            box-sizing: border-box;
        }
    }
</style>
