<template>
  <div>
    <div>
      <swiper auto :list="list1" v-model="swiper1_index" @on-index-change="onIndexChange"></swiper>
      <!--<swiper auto>
        <swiper-item  @click.native="onItemClick(0)" class="black" style='background-image:url(./mel01.jpg); background-size:100% 100%;opacity: 0.7;'>
        </swiper-item>
        <swiper-item  @click.native="onItemClick(0)" class="black" style='background-image:url(./mel02.jpg); background-size:100% 100%;opacity: 0.7;'>
        </swiper-item>
        <swiper-item  @click.native="onItemClick(0)" class="black" style='background-image:url(./mel03.jpg); background-size:100% 100%;opacity: 0.7;'>
        </swiper-item>
      </swiper> -->
      <tab :line-width=2 active-color='#fc378c' v-model="index">
        <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
      </tab>
      <swiper v-model="index" height="700px" :show-dots="false">
        <swiper-item class="swiperTab"  :key="0">
          <div class="tab-swiper vux-center">电影 Container {{paramId}}</div>
          <div>aaaaaaaaaaaaaaaaaaaaaaaa</div>
          <div>aaaaaaaaaaaaaaaaaaaaa</div>
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
          <div>aaaaaaaaaaaaaaaaaaaa</div>
        </swiper-item>
        <swiper-item class="swiperTab"  :key="1">
          <div class="tab-swiper vux-center">花絮 Container {{paramId}}</div>
          <div>bbbbbbbbbbbbbb</div>
          <div>bbbbbbbbbbbbbbbbbbb</div>
          <div>bbbbbbbbbbb</div>
          <div>bbbbbbbbbbbbbbbbb</div>
          <div>bbbbbbbbbbbbbbbbbbbb</div>
          <div>bbbbbbbbbbbbbbbbbbbbb</div>
          <div>bbbbbbbbbbbbbbbbb</div>
          <div>bbbbbbbbbbbbbbbbbbbbb</div>
          <div>bbbbbbbbbbbbbbbbbbbbbbbbbbb</div>
          <div>bbbbbbbbbbbbbbbbbbbbb</div>
          <div>bbbbbbbbbbbbbbbbbbbbbbbbb</div>
          <div>bbbbbbbbbbbbbbbbbbb</div>
          <div>bbbbbbbbbbbbbbbbbb</div>
          <div>bbbbbbbbbbbbbbbbbbbbb</div>
          <div>bbbbbbbbbbbbbbbbbb</div>
          <div>bbbbbbbbbbbbbbbbbb</div>
          <div>bbbbbbbbbbbbbbbbbbbbbb</div>
        </swiper-item>
        <swiper-item class="swiperTab"  :key="2">
          <div class="tab-swiper vux-center">购物 Container {{paramId}}</div>
          <div>ccccccccc</div>
          <div>ccccccccccccccccccc</div>
          <div>cccccccccccccccccccccc</div>
          <div>ccccccccccccccccccccccc</div>
          <div>ccccccccccccccccccccccc</div>
          <div>ccccccccccccccccccccc</div>
          <div>ccccccccccccccccccccccccc</div>
          <div>ccccccccccccccccccccccc</div>
          <div>cccccccccccccccccccccccc</div>
          <div>cccccccccccccccccccccccccccc</div>
          <div>cccccccccccccccccccccccccccc</div>
          <div>ccccccccccccccccccccccccccccccc</div>
          <div>cccccccccccccccccccccccccccccc</div>
          <div>ccccccccccccccccccccccccccccc</div>
          <div>cccccccccccccccccccccccccccccc</div>
          <div>ccccccccccccccccccccccc</div>
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
    img: 'http://39.98.194.195/hotme/pics/mel01.png',
    title: '送你一朵fua'
  }, {
    url: 'javascript:',
    img: 'http://39.98.194.195/hotme/pics/mel02.png',
    title: '送你一辆车'
  }, {
    url: 'javascript:',
    img: 'http://39.98.194.195/hotme/pics/mel03.png', // 404
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
    computed: {
      paramId () {
        return this.$route.params.data
      }
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
