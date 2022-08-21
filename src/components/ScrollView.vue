<template>
  <div id="wrapper" ref="wrapper">
     <slot></slot>
  </div>
</template>

<script>
import IScroll from 'iscroll/build/iscroll-probe'
export default {
  name: 'ScrollView',
  // 生命周期方法
  mounted () {
    this.iscroll = new IScroll(this.$refs.wrapper, {
      mousewheel: true,
      scrollbars: false,//是否显示滚动条
      // 解决拖拽卡顿问题
      probeType: 3,
      scrollX: false,
      scrollY: true,
    //   disablePointer: true,
    //   disableTouch: false,
    //   disableMouse: true,
    //   preventDefault: false
    })

    // 重新计算，刷新
    // setTimeout(() => {
    //   console.log(this.iscroll.maxScrollY)
    //   this.iscroll.refresh()
    //   console.log(this.iscroll.maxScrollY)
    // }, 5000)


    /*
    * 1 创建一个观察者对象
    * MutationObserver构造函数只有监听元素有变化就会调用回调函数
    * mutationList：发生变化节点的数组
    * observer：观察者对象
    * */
    const observer = new MutationObserver((mutationList, observer) => {
      this.iscroll.refresh()
    })
    /*
    **2 告诉观察者对象观察什么内容
    */
    const config = {
      childList: true, // 观察目标子节点的变化，添加或删除
      subtree: true, // 默认为false 设置为true可以观察后代节点
      attributeFilter: ['height', 'offsetHeight'], // 观察特定属性

      attributes: true, // 观察属性变化
      characterData: true, // 节点内容或节点文本的变化
      attributeOldValue: true, // 观察attributes变动时，是否需要记录变动前的值
      characterDataOldValue: true// 观察characterData变动，是否需要记录变动前的值
    }
    /*
    **3 告诉观察者：观察谁，观察什么内容
    * 第一个参数：观察谁
    * 第二个参数：观察内容
    */

    observer.observe(this.$refs.wrapper, config)
  },
  methods:{
    // 监听滚动距离
    scrolling (fn) {
      this.iscroll.on('scroll', function () {
        fn(this.y)
      })
    },
    refresh(){
      setTimeout(()=>{
        this.iscroll.refresh()
      },100)  
    },
    scrollTo (x, y, time) {
      this.iscroll.scrollTo(x, y, time)
    }
  }
}
</script>

<style scoped lang="scss">
#wrapper{
  width: 100%;
  height: 100%;
  /*overflow: hidden;*/
}
</style>
