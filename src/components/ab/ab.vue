<template>
  <div>
    <div>
      <swiper auto :list="list1" v-model="swiper1_index" @on-index-change="onIndexChange"></swiper>
      <tab :line-width=2 active-color='#fc378c' v-model="index">
        <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
      </tab>
      <swiper v-model="index" height="600px" :show-dots="false">
        <swiper-item class="swiperTab" v-for="(item, index) in list2" :key="index">
          <div class="tab-swiper vux-center">{{item}} Container</div>
          <div>aaaaaaaaaaaaaaaaaaaaaaaa</div>
          <div>bbbbbbbbbbbbbbbbbbb</div>
          <div>aaaaaaaaaaaaaaaaaaaa</div>
          <div>aaaaaaaaaaaaaaaaaaaaa</div>
          <div>aaaaaaaaaaaaaaaaaaaaa</div>
          <div>aaaaaaaaaaaaaaaaaaaaa</div>
          <div>aaaaaaaaaaaaaaaaaaaaa</div>
          <div>aaaaaaaaaaaaaaaaaaaa</div>
          <div>aaaaaaaaaaaaaaaaaaaaa</div>
          <div>aaaaaaaaaaaaaaaaaaaaaa</div>
          <div>aaaaaaaaaaaaaaaaaaaaaaaa</div>
          <div>aaaaaaaaaaaaaaaaaaaaaaaaa</div>
          <div>aaaaaaaaaaaaaaaaaaaaaaaaaa</div>
          <div>aaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
          <div>aaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
          <div>aaaaaaaaaaaaaaaaaaaaaaaaa</div>
          <div>ccccccccccccccccccccccccc</div>
        </swiper-item>
      </swiper>
    </div>
    <br/>
    <br/>
    <x-button class="btn" @click.native="goBack">Go back to Game!</x-button>
  </div>
</template>

<script>
  // import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux'
  import { Tab, TabItem } from '../../components/tab'
  import Sticky from '../../components/sticky'
  import Divider from '../../components/divider'
  import XButton from '../../components/x-button'
  import { Swiper, SwiperItem } from '../../components/swiper'
  const list = () => ['精选', '美食', '电影']
  const baseList = [{
    url: 'javascript:',
    img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
    title: '送你一朵fua'
  }, {
    url: 'javascript:',
    img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
    title: '送你一辆车'
  }, {
    url: 'javascript:',
    img: 'https://static.vux.li/demo/5.jpg', // 404
    title: '送你一次旅行',
    fallbackImg: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'
  }]

  export default {
    components: {
      Tab,
      TabItem,
      Sticky,
      Divider,
      XButton,
      Swiper,
      SwiperItem
    },
    data () {
      return {
        list1: baseList,
        list2: list(),
        demo2: '美食',
        index: 0,
        swiper1_index: 0,
        getBarWidth: function (index) {
          return (index + 1) * 22 + 'px'
        }
      }
    },
    methods: {
      onIndexChange (index) {
        this.swiper1_index = index
      },
      goBack () {
        this.$router.back();
      },
      onItemClick (index) {
        console.log('on item click:', index)
      },
      next () {
        if (this.index === this.list2.length - 1) {
          this.index = 0
        } else {
          ++this.index
        }
      },
      prev () {
        if (this.index === 0) {
          this.index = this.list2.length - 1
        } else {
          --this.index
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../styles/1px.less';
  @import '../../styles/center.less';

  .box {
    padding: 15px;
  }
  .tab-swiper {
    background-color: #fff;
    height: 100px;
  }
  .swiperTab {
    overflow-y: auto
  }
  .btn {
    position: absolute;
    bottom: 0px
  }
</style>
