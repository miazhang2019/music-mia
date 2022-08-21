<template>
  <div class="recommend">
    <!-- 使用组件 -->
    <ScrollView>
      <div>
        <Banner :banners="banners"></Banner>
        <Personalized :personalized="personalized" :title="'推荐歌单'"  @select="fatherSelectItem" :type="'personalized'"></Personalized>
        <Personalized :personalized="album" :title="'最新专辑'" @select="fatherSelectItem" :type="'album'"></Personalized>
        <SongList :songs="songs"></SongList>
      </div>
    </ScrollView>

    <transition>
      <router-view></router-view>
    </transition>

  </div>
</template>

<script>
// 1 通过接口获取banner中数据
// import { getBanner } from '../api/index'

import { getBanner, getPersonalized, getNewAlbum, getNewSong} from '../api/index'
// 导入组件
import Banner from '../components/Recommend/Banner'
import Personalized from '../components/Recommend/Personalized'
import SongList from '../components/Recommend/SongList.vue'

import ScrollView from '../components/ScrollView'
import MetaInfo from '../../vue-meta-info'

export default {
  name:'Recommend',
  metaInfo: MetaInfo.recommend,
  // 2
  data () {
    return {
    banners: [],
    personalized: [],
    album: [],
    songs: []
    }
  },
  // 3
  async created () {
    // banner
    //const { data } = await getBanner()
    //this.banners = data.banners
    // console.log(this.banners);

    // 最新歌单
    const res = await getPersonalized()
    this.personalized = res.data.result
    // console.log(res)

    // 最新专辑
    getNewAlbum().then(res => {
      // res.data.albums.length = 6
      this.album = res.data.albums.splice(0, 6)
      // console.log(this.album)
    })

    // 最新音乐
    getNewSong().then(res => {
      // res.data.albums.length = 6
      // this.album = res.data.albums.splice(0, 6)
      // this.songs = res.data.result
      // console.log('newsongs=',res.data.result)
      this.songs = res.data.result
    })


  },
  components: {
    // 注册组件
    Banner,
    Personalized,
    SongList,
    ScrollView
  },

// type区分推荐歌单/最新专辑
  methods: {
    fatherSelectItem (id, type) {
      // console.log('fatherSelectItem');
      this.$router.push({
        path: `/recommend/detail/${id}/${type}`
      })
    }
  }
}
</script>

<style scoped lang="scss">
// 设置可视区域的大小，距离顶部184px
  .recommend{
      position: fixed;
      top: 184px;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
  }
.v-enter{
  transform: translateX(100%);
}
.v-enter-to{
  transform: translateX(0%);
}
.v-enter-active{
  transition: transform 1s;
}
.v-leave{
  transform: translateX(0%);
}
.v-leave-to{
  transform: translateX(100%);
}
.v-leave-active{
  transition: transform 1s;
}
</style>
