<template>
  <div class="detail">
    <DetailTop :title="playlist.name"></DetailTop>
    <DetailMain :path="playlist.coverImgUrl" ref="top"></DetailMain>
    <div class="bottom">
      <ScrollView ref="scrollview">
        <DetailBottom :playlist="playlist.tracks"></DetailBottom>
      </ScrollView>
    </div>
  </div>
</template>

<script>

import {getPlaylist, getAlbum} from '../api/index'
import DetailTop from '../components/detail/DetailTop'
import DetailMain from '../components/detail/DetailBody'
import DetailBottom from '../components/detail/DetailBottom'
import ScrollView from '../components/ScrollView'

export default {
  name: 'Detail',
    components: {
      DetailTop,
      DetailMain,
      DetailBottom,
      ScrollView
    },
    data() {
        return {
          playlist:{}
        }
    },
    created() {
      console.log(this.$route);
      // 推荐歌单
      if(this.$route.params.type === 'personalized'){
      // axios拉取数据，赋值给本地data数据
        getPlaylist({id:this.$route.params.id}).then(res=>{
          // console.log('-----',res);
          this.playlist = res.data.playlist
        })
      // 最新专辑
      } else if (this.$route.params.type === 'album'){
        getAlbum({id:this.$route.params.id}).then(res=>{
          // console.log('====',res);
          // 只解析需要的数据
          this.playlist = {
            name: res.data.album.name,
            coverImgUrl: res.data.album.picUrl,
            tracks:res.data.songs
          }

        })
      }



    },
    mounted() {
      let defaultHeight = this.$refs.top.$el.offsetHeight
      this.$refs.scrollview.scrolling((offsetY)=>{
        if(offsetY <1){
          let scale = Math.abs(offsetY)/defaultHeight
          // this.$refs.top.changMask(scale)
          this.$refs.top.$el.style.filter = `blur(0px)`

        }else {
          let scale = 1+ offsetY/defaultHeight
          this.$refs.top.$el.style.transform = `scale(${scale})`
          this.$refs.top.$el.style.filter = `blur(${scale*10}px)`
        }
      })

    },
    methods: {

    }
};
</script>

<style scoped lang="scss">
.detail{
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  .bottom{
    position: fixed;
    top: 500px;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
