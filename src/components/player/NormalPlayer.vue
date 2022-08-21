<template>
  <div class="normal-player">
    <div class="player-warpper">
      <PlayerHeader></PlayerHeader>
      <PlayerMiddle></PlayerMiddle>
      <PlayerBottom></PlayerBottom>
    </div>
    <div class="player-bg">
      <!-- <img src="@/assets/images/singer.jpg" alt="" /> -->
      <img :src="currentSong.picUrl" alt="" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PlayerHeader from './PlayerHeader.vue'
import PlayerMiddle from './PlayerMiddle.vue'
import PlayerBottom from './PlayerBottom.vue'
export default {
  name: 'NormalPlayer',
    components: {
      PlayerHeader,
      PlayerMiddle,
      PlayerBottom
    },
    data() {
        return {

        };
    },
    created() {

    },
    mounted() {

    },
    methods: {

    },
    computed:{
      ...mapGetters([
        'isPlaying',
        'currentSong'
      ])
    },
};
</script>

<style scoped lang="scss">
@import '@/assets/css/mixin';
@import '@/assets/css/variable';
.normal-player{
  position: fixed;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000;
  z-index: 999;
  .player-bg{
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    img{
      height: 100%;
      position:absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      filter: blur(10px);
    }
  }
}
</style>
