<template>
  <div class="dataMain">
    <div class="title">
      {{'Statistic Analysis' | translate}}
    </div>

    <div v-show="!pdata" class="nopie">{{'chardata' | translate}}</div>
    <div class="born">
      {{'born' | translate}}
    </div>
    <div class="chart2">
      <lchart ref =lchart :chart-data="ldata" :llegend="llegend"/>
    </div>
    <div class="engskill">
      {{'engskill' | translate}}
    </div>
    <div class="chart1">
      <lpie ref="pchart" :pdata="pdata" :plegend="plegend" :name="name"/>
    </div>
    <div class="culture">
      {{'culture' | translate}}
    </div>
    <div  class="chart3">
      <bchart ref="bchart" :chart-data="bdata" :blegend="blegend"/>
    </div>
  </div>
</template>
<i18n>
  born:
    zh-CN: 从这些2016年已公开的数据上来看，亚裔人口有一个明显的提升。
    en: These open data were released by the Australian Bureau of Statistics in 2016. Visualization shows that there was an obvious growth of the Asian-borned population.
  engskill:
    zh-CN: 根据这个饼图，我们看到有大多数的人口没有很好的英语技能。然而很多属于EAL能很好的理解墨尔本文化。
    en: Meanwhile, according to this pie chart, we can find that a large proportion of the population does not have good English skills. Many of them belong to the EAL group. Therefore, we provide a language switch to help EAL groups have a better understanding of Melbourne culture.
  culture:
    zh-CN: 从这个图可以看到维多利亚州儿童（5-14岁）喜欢选择什么样的文化。我们在这个游戏里选择了多种聚会形式。
    en: From this chart, we can clearly see that for Australian teenagers(Aged 5-14 years) in VIC,  what kinds of cultural venues and events are they preferred to select. According to this chart, we select several cultural venues as feature units in our game.
  chardata:
    zh-CN: 没取到数据
    en: No data!
  Statistic Analysis:
    zh-CN: 静态分析
    en: Statistic Analysis
  My Account:
    zh-CN: 我的账号
    en: My Account
</i18n>
<script>
  // import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux'
  import lchart from '../echart/lchart'
  import lpie from '../echart/lpie'
  import bchart from '../echart/bchart'
  import { getborn, getengskill, getculture } from '../../common/js/getdata'
  export default {
    name: 'showdata',
    components: {
      lchart,
      lpie,
      bchart
    },
    created () {
      getborn().then(response => {
        if (response.data.length > 0) {
          for (let i = 0; i < response.data.length; i++) {
            this.ldata.expectedData[i] = response.data[i]['asian_Born_Total']
            this.ldata.actualData[i] = response.data[i]['eu_Born_Total']
            this.ldata.axislabel[i] = response.data[i]['age_group']
          }
        } else {
          this.ldata.expectedData = []
          this.ldata.actualData = []
          this.ldata.axislabel = []
          this.ldata.expectedData[0] = 100
          this.ldata.actualData[0] = 100
          this.ldata.axislabel[0] = 'No real data'
          this.llegend[0] = 'No real legend'
          this.llegend[1] = 'No real legend'
        }
        this.$refs.lchart.setOptions(this.ldata, this.llegend)
        console.log(this.ldata)
        console.log('born: ' + JSON.stringify(response.data))
      })
      getengskill().then(response => {
        if (response.data.length > 0) {
          for (let i = 0; i < response.data.length; i++) {
            this.pdata[i].value = response.data[i].quantity
            this.pdata[i].name = response.data[i].proficiency
            this.plegend[i] = response.data[i].proficiency
            // this.pdata[i].value = response.data[i].quantity
          }
        } else {
          this.pdata = []
          this.plegend = []
          this.pdata = [{name: 'No real data', value: 100}]
          this.plegend = ['No real data']
        }
        // this.$refs.pchart.initChart();
        this.$refs.pchart.setOptions(this.pdata, this.plegend)
        console.log(this.pdata)
        console.log('skill: ' + JSON.stringify(response.data))
      })
      getculture().then(response => {
        if (response.data.length > 0) {
          for (let i = 0; i < response.data.length; i++) {
            this.bdata.expectedData[i] = response.data[i]['quantity']
            this.bdata.axislabel[i] = response.data[i]['name']
          }
        } else {
          this.bdata.expectedData = []
          this.bdata.axislabel = []
          this.bdata.expectedData[0] = 10
          this.bdata.axislabel = ['No real data']
        }
        this.$refs.bchart.setOptions(this.bdata, this.blegend)
        console.log('culture: ' + JSON.stringify(response.data))
      })
    },
    data () {
      return {
        ldata: {
          expectedData: [714, 632, 739, 2644, 4998, 1468, 7435, 7014, 1344, 150],
          actualData: [928, 304, 55, 89, 259, 134, 872, 390, 417, 660],
          axislabel: ['0-4years', '5-9years', '10-14years', '15-19years', '20-24years', '25-29years', '30-34years', '35-39years', '40-44years', '45-49years']
        },
        bdata: {
          expectedData: [0.8, 0.9, 0.6, 0.8, 0.1, 0.8, 1.0, 0.2, 2.0],
          actualData: [0, 0, 0, 0, 0, 0, 0, 0, 0],
          axislabel: ['Art galleries', 'Museums', 'Libraries and archives', 'Live music concerts and performances', 'Theatre performances', 'Dance performances', 'Musicals and operas', 'Other performing arts', 'Cinemas and drive-ins']
        },
        pdata1: [],
        pdata: [
          { value: 109, name: 'Very well' },
          { value: 511, name: 'Well' },
          { value: 135, name: 'Not well' },
          { value: 432, name: 'Not at all' },
          { value: 985, name: 'Not stated' },
          { value: 716, name: 'ENGP Not Stated' }
        ],
        plegend: ['Very well', 'Well', 'Not well', 'Not at all', 'Not stated', 'ENGP Not Stated'],
        llegend: ['Asian-Born Populations', 'European-Born Populations'],
        blegend: ['Culture', ''],
        img1: require('./ana1.jpg'),
        img2: require('./ana2.jpg'),
        name: ''
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../styles/1px.less';
  @import '../../styles/center.less';
  @import url('https://fonts.googleapis.com/css?family=Baloo+Tammudu+2|Grandstander|Roboto+Condensed|Lobster|Montserrat|Cabin|Herr+Von+Muellerhoff|Source+Sans+Pro:400,900&display=swap');
  .dataMain {
    text-align: center;
    .title {
      font-family: 'Baloo Tammudu 2', sans-serif;
      font-weight: 700;
      font-size: 2.0rem;
      text-align: center;
      margin-top: 30px;
    }
    .engskill {
      font-family: 'Baloo Tammudu 2', sans-serif;
      font-weight: 600;
      text-align: center;
      width: 90%;
      margin: auto auto;
    }
    .born {
      font-family: 'Baloo Tammudu 2', sans-serif;
      font-weight: 600;
      text-align: center;
      width: 90%;
      margin: auto auto;
    }
    .culture {
      font-family: 'Baloo Tammudu 2', sans-serif;
      font-weight: 600;
      text-align: center;
      width: 90%;
      margin: auto auto;
    }
    .img1 {
      display: block;
      margin: 20px auto;
      width: 360px;
      height: 280px;
    }
    .img2 {
      display: block;
      margin: 20px auto;
      width: 360px;
      height: 280px;
    }
    .chart1 {
      margin: 0px auto;
    }
    .chart2 {
      margin: 0px auto 30px;
    }
    @media (max-width: 320px) {
      .img1 {
        display: block;
        width: 300px;
        height: 200px;
      }
      .img2 {
        display: block;
        width: 300px;
        height: 200px;
      }
    }
  }
</style>
