import modeType from './modeType'
export default {
  // 是否显示播放页面
  isFullScreen: false,
  isShowMiniPlayer: false,
  isShowPlayer: false,
  isPlaying: false,

  // 播放模式
  modeType: modeType.loop,

  // 歌曲详情
  songs: [],
  currentSong: {},
  currentIndex: 0,
  
  // 歌词
  currentLyric: {},

  // 播放当前时间
  curTime: 0,

  // 收藏歌曲列表
  favoriteList: [],
  historyList: []
}
