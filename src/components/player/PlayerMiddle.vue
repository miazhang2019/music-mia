<template>
<div class="player-middle">
  <swiper :options="swiperOptions" class="banner">
    <swiper-slide class="cd">
      <div class="cd-warpper" ref="cdWarpper">
        <img :src="currentSong.picUrl" alt="">
      </div>
      <p>{{getFirstLyric()}}</p>
    </swiper-slide>
    <swiper-slide class="lyric" ref="lyric">
      <ScrollView ref="scrollView">
        <ul>
            <!-- <li v-for="(item, index) in currentLyric" :key="index" > -->
            <li v-for="(item, index) in currentLyric" :key="index" :class="{'active' : index === currentLineNum }">
               {{index}} -- {{item}}
            </li>
        </ul>
    </ScrollView>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</div>
</template>

<script>
import 'swiper/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import ScrollView from '../ScrollView'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PlayerMiddle',
  components: {
    swiper,
    swiperSlide,
    ScrollView
  },
  props: {
    currentTime: {
      type: Number,
      default: 0,
      required: true
    }
  },
  data () {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
          bulletClass: 'my-bullet',
          bulletActiveClass: 'my-bullet-active'
        },
        observer: true,
        observeSlideChildren: true,
        observeParents: true
      },
      currentLineNum: '0'
    }
  },

  computed: {
    ...mapGetters(['isPlaying', 'currentSong','currentLyric','currentIndex'])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.cdWarpper.classList.add('active')
      } else {
        this.$refs.cdWarpper.classList.remove('active')
      }
    },
    currentSong (newValur, oldValue) {
      console.log('playerMiddle song changed',newValur.id);
      
      this.getSongLyric(newValur.id)
    },
    currentTime (newValue, oldValue) {
      // console.log(newValue);
      
      // // 改造前
      // // 1 歌词高亮
      // let lineNum = Math.floor(newValue) + ''
      // let result = this.currentLyric[lineNum]
      // // 如果有对应的歌词,或者歌词不为空时,才重新设置当前行号
      // if (result !== undefined && result !== '') {
      //    this.currentLineNum = lineNum

      //   //  2歌词滚动
      //   let currentLyricTop = document.querySelector('li.active').offsetTop
      //   // 整个歌词容器的高度（此处是组件，高度需要.$el后才能拿到）
      //   let lyric = this.$refs.lyric.$el.offsetHeight
      //   // 如果高亮歌词距离顶部距离超过歌词组件高度一半，需要滚动
      //   if (currentLyricTop > lyric / 2) {
      //     console.log('开始滚动');   
      //     this.$refs.scrollView.scrollTo(0, lyric / 2 - currentLyricTop, 100)
      //   }
      // }

      // 改造后
      let lineNum = Math.floor(newValue) + ''
      this.currentLineNum = this.getActiveLineNum(lineNum)
     if (document.querySelector('li.active')){
        let currentLyricTop = document.querySelector('li.active').offsetTop
        let lyric = this.$refs.lyric.$el.offsetHeight
        // 大于一半往上滚
        if (currentLyricTop > lyric / 2) {
          this.$refs.scrollView.scrollTo(0, lyric / 2 - currentLyricTop, 100)
        } else {
          // 不大于一半，滚回最初的位置（进度条点击到前面的时候）
          this.$refs.scrollView.scrollTo(0, 0, 100)
        }   
     }
      
         
    },


    // 有些歌曲起始歌词行号不是0
    currentLyric (newValue, oldValue) {
      for (let key in newValue) {
        // 找到第一个key并返回
        this.currentLineNum = key
        return
      }
    }

 },
  methods: {
    ...mapActions([
      'getSongLyric'
    ]),
    // 在滚动条点击后时间没有对应歌词时候，高亮上一行歌词（递归）
    getActiveLineNum (lineNum) {
      if (lineNum < 0) {
        return this.currentLineNum
      }
      let result = this.currentLyric[lineNum + '']
      if (result === undefined || result === '') {
        lineNum--
        return this.getActiveLineNum(lineNum)
      } else {
        return lineNum + ''
      }
    },
    getFirstLyric () {
      // console.log('歌词=',this.currentLyric); 
      for (let key in this.currentLyric) {
        return this.currentLyric[key]
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import "src/assets/css/mixin";
@import "src/assets/css/variable";
.banner{
  position: fixed;
  top: 150px;
  left: 0;
  right: 0;
  bottom: 250px;
  .cd{
    .cd-warpper{
      display: flex;
      margin: 0 auto;
      text-align: center;
      justify-content: center;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      border: 30px solid #FFFFFF;
      overflow: hidden;
      animation: sport 5s linear infinite;
      animation-play-state: paused;
      &.active{
        animation-play-state: running;
      }
      img{
        width: 100%;
        height: 100%;
      }
    }
    p{
      @include font_size($font_medium);
      @include font_color();
      margin-top: 50px;
      text-align: center;
    }
  }
  .lyric{
    li{
      text-align: center;
      @include font_size($font_large);
      @include font_color();
      margin: 10px 0;
      &:nth-last-child(1){
        padding-bottom: 60%;
      }
      &.active{
        color: #fff;
      }
    }
}
// 实现关键帧sport方法
  @keyframes sport {
    from{
      transform: rotate(0deg);
    }
    to{
      transform: rotate(360deg);
    }
  }

}
</style>
<style lang="scss">
@import "src/assets/css/mixin";
@import "src/assets/css/variable";
.my-bullet{
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 40%;
  background: #fff;
  margin:  0 20px;
}
.my-bullet-active{
  width: 60px;
  @include bg_color();
}
</style>
