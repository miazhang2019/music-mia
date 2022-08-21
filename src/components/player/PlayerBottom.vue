<template>
  <div class="player-bottom">
    <div class="bottom-progress">
      <span ref="eleCurrentTime">00:00</span>
      <!-- <div class="progress-bar" ref="progressBar"> -->
      <div class="progress-bar" @click="progressClick" ref="progressBar">
        <div class="progress-line" ref="progressLine">
          <div class="progress-dot"></div>
        </div>
      </div>
      <span ref="eleTotalTime">00:00</span>
    </div>
    <div class="bottom-controll">
      <!-- 默认loop状态 -->
      <div class="mode loop" @click="mode" ref="mode"></div>
      <div class="prev" @click="prev"></div>
      <div class="play" @click.stop="play" ref="play"></div>
      <div class="next" @click="next"></div>
      <!-- <div class="favorite"  @click="favorite"></div> -->
      <div
        class="favorite"
        @click="favorite"
        :class="{ active: isFavorite(currentSong) }"
      ></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import modeType from "../../store/modeType";
import { formartTime } from "../../tools/tools";

export default {
  name: "PlayerBottom",
  components: "",
  data() {
    return {};
  },
  props: {
    totalTime: {
      type: Number,
      default: 0,
      required: true,
    },
    currentTime: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  computed: {
    ...mapGetters([
      "isPlaying",
      "ModeType",
      "currentIndex",
      "currentSong",
      "favoriteList",
      "historyList",
    ]),
  },
  methods: {
    ...mapActions([
      "setIsPlaying",
      "setModeType",
      "setCurrentIndex",
      "setCurTime",
      "setFavoriteSong",
    ]),
    // 修改播放状态
    play() {
      console.log("pause");
      this.setIsPlaying(!this.isPlaying);
    },
    // 修改播放模式
    mode() {
      console.log("change mode", this.ModeType);

      if (this.ModeType === modeType.loop) {
        this.setModeType(modeType.one);
      } else if (this.ModeType === modeType.one) {
        this.setModeType(modeType.random);
      } else if (this.ModeType === modeType.random) {
        this.setModeType(modeType.loop);
      }
    },
    prev() {
      this.setCurrentIndex(this.currentIndex - 1);
      console.log("prev=", this.currentIndex);
    },
    next() {
      this.setCurrentIndex(this.currentIndex + 1);
      console.log("next=", this.currentIndex);
    },
    progressClick(e) {
      //1 计算进度条的位置
      // let normalLeft = e.target.offsetLeft
      // 进度条距离左侧宽度
      let normalLeft = this.$refs.progressBar.offsetLeft;
      // 点击位置剧离左侧的坐标
      let eventLeft = e.pageX;
      // 点击的位置在进度条的位置
      let clickleft = eventLeft - normalLeft;
      // let progressWidth = e.target.offsetWidth
      let progressWidth = this.$refs.progressBar.offsetWidth;
      // 点击位置百分比
      let value = clickleft / progressWidth;
      this.$refs.progressLine.style.width = value * 100 + "%";
      // 2 计算当前应该从什么位置进行播放
      let currentTime = this.totalTime * value;
      // console.log('currentTime=',value);

      this.setCurTime(currentTime);
    },

    // 先在mapActions中映射取变量的方法
    favorite() {
      this.setFavoriteSong(this.currentSong);
    },

    // 判断是否在收藏歌单
    isFavorite(song) {
      let result = this.favoriteList.find(function (currentValue) {
        console.log("d=", currentValue.id);
        console.log("songs=", song.id);

        return currentValue.id === song.id;
      });
      //如果可以找到结果返回true，否则返回false
      return result !== undefined;
    },
    //  isFavorite (song) {
    //   let result = this.favoriteList.find(function (currentValue) {
    //     return currentValue.id === song.id
    //   })
    //   return result !== undefined
    // },
  },
  watch: {
    isPlaying(newValue, oldValue) {
      // 正在播放，添加样式类
      if (newValue) {
        this.$refs.play.classList.add("active");
      } else {
        this.$refs.play.classList.remove("active");
      }
    },
    ModeType(newValue, oldValue) {
      if (newValue === modeType.loop) {
        this.$refs.mode.classList.remove("random");
        this.$refs.mode.classList.add("loop");
      } else if (newValue === modeType.one) {
        this.$refs.mode.classList.remove("loop");
        this.$refs.mode.classList.add("one");
      } else if (newValue === modeType.random) {
        this.$refs.mode.classList.remove("one");
        this.$refs.mode.classList.add("random");
      }
    },
    totalTime(newValue, oldValue) {
      // formartTime方法在工具类中
      let time = formartTime(newValue);
      this.$refs.eleTotalTime.innerHTML = time.minute + ":" + time.second;
    },

    currentTime(newValue, oldValue) {
      // 1.格式化当前播放的时间
      let time = formartTime(newValue);
      this.$refs.eleCurrentTime.innerHTML = time.minute + ":" + time.second;

      // 2.根据当前播放的时间计算比例
      let value = (newValue / this.totalTime) * 100;
      this.$refs.progressLine.style.width = value + "%";
    },
    // 监听收藏列表数组变化，存入localStorage
    favoriteList(newValue, oldValue) {
      window.localStorage.setItem("favoriteList", JSON.stringify(newValue));
    },
    historyList(newValue, oldValue) {
      console.log("his change------------");
      window.localStorage.setItem("historyList", JSON.stringify(newValue));
    },
  },
};
</script>

<style scoped lang="scss">
@import "src/assets/css/mixin";
@import "src/assets/css/variable";
.player-bottom {
  @include font_size(30px);
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  .bottom-progress {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    span {
      @include font_color();
    }
    .progress-bar {
      width: 100%;
      margin: 0 10px;
      height: 10px;
      background: #fff;
      .progress-line {
        // width: 50%;
        width: 0%;
        height: 100%;
        // 小圆点的前景
        position: relative;
        background: #ccc;
        .progress-dot {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          position: absolute;
          // left: 50%;
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
  .bottom-controll {
    display: flex;
    width: 80%;
    margin: 0 auto;
    padding: 50px 100px;
    justify-content: space-around;
    align-items: center;
    div {
      width: 84px;
      height: 84px;
    }
    .mode {
      @include bg_img("../../assets/images/loop");
      &.loop {
        @include bg_img("../../assets/images/loop");
      }
      &.one {
        @include bg_img("../../assets/images/one");
      }
      &.random {
        @include bg_img("../../assets/images/shuffle");
      }
    }
    .prev {
      @include bg_img("../../assets/images/prev");
    }
    .play {
      @include bg_img("../../assets/images/play");
      &.active {
        @include bg_img("../../assets/images/pause");
      }
    }
    .next {
      @include bg_img("../../assets/images/next");
    }
    .favorite {
      @include bg_img("../../assets/images/un_favorite");
      &.active {
        @include bg_img("../../assets/images/favorite");
      }
    }
  }
}
</style>
