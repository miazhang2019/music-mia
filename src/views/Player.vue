<template>
  <div class="player">
    <!-- <NormalPlayer :totalTime="totalTime" ></NormalPlayer> -->
    <NormalPlayer
      :totalTime="totalTime"
      :currentTime="currentTime"
    ></NormalPlayer>

    <!-- 待补齐：另外两个播放页面 -->
    <MiniPlayer></MiniPlayer>
    <ListPlayer ref="listPlayer"></ListPlayer>

    <!-- <audio :src="currentSong.url" autoplay ref="audio"></audio> -->
    <audio
      :src="currentSong.url"
      autoplay
      ref="audio"
      @timeupdate="timeupdate"
      @ended="end"
    ></audio>
  </div>
</template>

<script>
import NormalPlayer from "../components/Player/NormalPlayer";
import MiniPlayer from "../components/Player/MiniPlayer";
import ListPlayer from "../components/Player/ListPlayer";
import { mapGetters, mapActions } from "vuex";
import modeType from "../store/modeType";
import { getRandomIntInclusive } from "../tools/tools";
export default {
  name: "Player",
  data() {
    return {
      totalTime: 0,
      currentTime: 0,
    };
  },
  components: {
    NormalPlayer,
    MiniPlayer,
    ListPlayer,
  },
  computed: {
    ...mapGetters([
      "currentSong",
      "isPlaying",
      "currentIndex",
      "curTime",
      "ModeType",
      "songs",
      "favoriteList",
      "historyList",
    ]),
  },

  watch: {
    isPlaying(newValue, oldValue) {
      if (newValue) {
        // console.log('加入历史');
        // this.setHistorySong(this.currentSong)

        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
      }
    },
    //
    currentIndex(newValue, oldValue) {
      this.setHistorySong(this.currentSong);
      this.$refs.audio.oncanplay = () => {
        this.totalTime = this.$refs.audio.duration;
        // console.log('---',this.isPlaying);

        if (this.isPlaying) {
          // 播放状态才播放音频
          this.$refs.audio.play();
        } else {
          // 暂停状态下一首也是暂停
          this.$refs.audio.pause();
        }
      };
    },
    curTime(newValue, oldValue) {
      this.$refs.audio.currentTime = newValue;
    },
  },
  mounted() {
    // 如果可以播放,计算总时长
    this.$refs.audio.oncanplay = () => {
      this.totalTime = this.$refs.audio.duration;
    };
    console.log("mounted");
  },
  methods: {
    ...mapActions([
      "setCurrentIndex",
      "setFavoriteList",
      "setHistorySong",
      "setHistoryList",
    ]),
    timeupdate(e) {
      // e.target可以拿到触发该事件的元素
      this.currentTime = e.target.currentTime;
    },
    end() {
      if (this.modeType === modeType.loop) {
        this.setCurrentIndex(this.currentIndex + 1);
      } else if (this.modeType === modeType.one) {
        this.$refs.audio.play();
        // console.log(1)
      } else if (this.modeType === modeType.random) {
        let index = getRandomIntInclusive(0, this.songs.length - 1);
        this.setCurrentIndex(index);
      }
    },
  },
};
</script>

<style scoped lang="scss">
// 调试单页面时候放开
// .player{
//   position:fixed;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
// //   background: pink;
// }
</style>
