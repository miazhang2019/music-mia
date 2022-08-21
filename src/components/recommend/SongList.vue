<template>
  <div class="songs">
    <div class="songs-top">
    <h3>最新音乐</h3></div>
    <ul class="songs-list">
        <li class="item" v-for="(item, index) in songs" :key="index" @click="selectMusic(item.id)">
            <!-- <img :src="item.song.album.picUrl" alt=""> -->
            <img v-lazy="item.song.album.picUrl" alt="">
            <div>
                <h3>{{item.name}}</h3>
                <p>{{item.song.artists[0].name}}</p>
            </div>
        </li>
    </ul>
    </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  props: {
    songs: {
      type: Array,
      default: () => []
    }
  },
  name: 'SongList',
  methods: {
    ...mapActions([
      'setFullScreen',
      // mini和list播放器可在此处补充
    ]),
    selectMusic (id) {
      console.log(id)
      this.setFullScreen(true)
      // mini和list播放器可在此处补充
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.songs{
  @include bg_sub_color();
  .songs-top{
    width: 94%;
    height: 84px;
    line-height: 84px;
    @include bg_sub_color();
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
  .songs-list{
    width: 100%;
    overflow: hidden;
    .item{
        height: 200px;
        display: flex;
        align-items: center;
        padding: 0 20px;
        margin-bottom: 20px;
        border-bottom: 1px solid #ccc;
        img{
            width: 150px;
            height: 150px;
            border-radius: 20px;
            // padding-right: 20px;
        }
        div{
            padding-left: 20px;
            h3{
                @include font_color()
            }
             p {
                // @include font_size(25px);
                padding-top: 20px;
                @include font_color();
            }
        }
    }
  }
}
</style>