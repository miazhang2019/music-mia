module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 100, // 根元素字体大小
      // 只有宽度高度需要转rem，其他不需要转换
      // propList: ['width', 'height']
      propList: ['*']
    }
  }
}
