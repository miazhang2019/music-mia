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
      
      // // ?????????
      // // 1 ????????????
      // let lineNum = Math.floor(newValue) + ''
      // let result = this.currentLyric[lineNum]
      // // ????????????????????????,????????????????????????,???????????????????????????
      // if (result !== undefined && result !== '') {
      //    this.currentLineNum = lineNum

      //   //  2????????????
      //   let currentLyricTop = document.querySelector('li.active').offsetTop
      //   // ????????????????????????????????????????????????????????????.$el??????????????????
      //   let lyric = this.$refs.lyric.$el.offsetHeight
      //   // ?????????????????????????????????????????????????????????????????????????????????
      //   if (currentLyricTop > lyric / 2) {
      //     console.log('????????????');   
      //     this.$refs.scrollView.scrollTo(0, lyric / 2 - currentLyricTop, 100)
      //   }
      // }

      // ?????????
      let lineNum = Math.floor(newValue) + ''
      this.currentLineNum = this.getActiveLineNum(lineNum)
     if (document.querySelector('li.active')){
        let currentLyricTop = document.querySelector('li.active').offsetTop
        let lyric = this.$refs.lyric.$el.offsetHeight
        // ?????????????????????
        if (currentLyricTop > lyric / 2) {
          this.$refs.scrollView.scrollTo(0, lyric / 2 - currentLyricTop, 100)
        } else {
          // ??????????????????????????????????????????????????????????????????????????????
          this.$refs.scrollView.scrollTo(0, 0, 100)
        }   
     }
      
         
    },


    // ????????????????????????????????????0
    currentLyric (newValue, oldValue) {
      for (let key in newValue) {
        // ???????????????key?????????
        this.currentLineNum = key
        return
      }
    }

 },
  methods: {
    ...mapActions([
      'getSongLyric'
    ]),
    // ???????????????????????????????????????????????????????????????????????????????????????
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
      // console.log('??????=',this.currentLyric); 
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
// ???????????????sport??????
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
