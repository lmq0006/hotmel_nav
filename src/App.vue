<template>
  <div style="height:100%;">
    <div v-transfer-dom>
      <loading v-model="isLoading"></loading>
    </div>
    <div v-transfer-dom>
      <actionsheet :menus="menus" v-model="showMenu" @on-click-menu="changeLocale"></actionsheet>
    </div>
    <!--<div class="icon-Games_btn_off" style="color:#f00;font-size:40px;"></div>-->
    <drawer
    width="200px;"
    :show.sync="drawerVisibility"
    :show-mode="showModeValue"
    :placement="showPlacementValue"
    :drawer-style="{'background-color':'#ff0', width: '100%'}">

      <!-- drawer content -->
      <div slot="drawer">
        <!--<group title="Hotmel" style="margin-top:20px;color:#000;">
          <cell :title="`${game}`" link="/game" @click.native="drawerVisibility = false">
          </cell>

          <cell title="X" link="/a" @click.native="drawerVisibility = false">
          </cell>
          <cell title="X" link="/ab" @click.native="drawerVisibility = false">
          </cell>

        </group>  -->
        <div class="drawer-main">
          <!--<div @click="drawClick" class="draw-title">Hotmel</div>-->
          <div @click="drawClick" class="draw-title">
            <img class="img" src="./rhotmel.png">
          </div>
          <div @click="gameClick" class="draw-content"> Game</div>
        </div>
      </div>

      <!-- main content -->
      <view-box ref="viewBox" :body-padding-top="isShowNav ? '46px' : '0'" body-padding-bottom="55px">

        <x-header
          v-if="isShowNav"
          slot="header"
          style="width:100%;position:absolute;left:0;top:0;z-index:100;color:#fff;background-color: #fff;"
          :left-options="leftOptions"
          :right-options="rightOptions"
          :title="title"
          :transition="headerTransition"
          @on-click-more="onClickMore">
          <span v-if="route.path === '/' || route.path === '/component/drawer'" slot="overwrite-left" @click="drawerVisibility = !drawerVisibility">
            <x-icon type="navicon" size="35" style="fill:#000;position:relative;top:-8px;left:-3px;"></x-icon>
          </span>
        </x-header>

        <!-- remember to import BusPlugin in main.js if you use components: x-img and sticky -->

        <transition
        @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')"
        :name="viewTransition" :css="!!direction">
          <keep-alive :exclude="['abc']">
            <router-view class="router-view"></router-view>
          </keep-alive>
        </transition>

        <tabbar class="vux-demo-tabbar" icon-class="vux-center" v-show="!isGame" slot="bottom">
          <tabbar-item :link="{path:'/'}" :selected="route.path === '/'">
            <span class="demo-icon-22 vux-demo-tabbar-icon-home" slot="icon" style="position:relative;top: -2px;">
             <span class="icon-Home_btn_on" style="font-size: 30px;"></span> </span> <!-- &#xe637;&#xe633; -->
          </tabbar-item>
          <tabbar-item link="/game" :selected="isDemo" >
            <span class="demo-icon-22" slot="icon">
              <span style="font-size: 30px;" class="icon-Games_btn_off"></span></span>
            <!--<span slot="label"><span v-if="componentName" class="vux-demo-tabbar-component">
              {{componentName}}</span><span v-else>Game
            </span></span>-->
          </tabbar-item>
        </tabbar>

      </view-box>
    </drawer>
    <transition name="fade">
      <div v-show="false" class="landingpage">
        <div class="landingcontent">
          <div class="nav">{{'navigating' | translate}}</div>
          <div class="mel">{{'melbourne' | translate}}</div>
          <div class="btn" @click="hideLandingPage">{{'learningmore' | translate}}</div>
        </div>
      </div>
    </transition>
    <landing @showLoading="hideLandingPage" v-show="showLandingPage"></landing>
    <div v-transfer-dom>
      <x-dialog v-model="showLoginDlg" class="dialog-demo">

        <div class="img-box" style="height:90px;padding:15px 0;overflow:hidden;-webkit-overflow-scrolling:touch;">
          <div class="dialog-title">{{'LoginTitle' | translate}}</div>
          <group title="">
            <x-input :title="password" v-model="passwd" type="password" placeholder="password"></x-input>
          </group>
        </div>

        <div style="padding:10px;">
          <x-button @click.native.prevent="handleLogin" type="primary">{{'Login' | translate}}</x-button>
        </div>

      </x-dialog>
    </div>
    <toast class="toast" v-model="showToast" type="text" :time="1800" is-show-mask text="Incorrect password" :position="position">Incorrect password</toast>
    <toast class="toast" v-model="changelang" type="text" :time="1800" is-show-mask text="Cannot change language now!" :position="position">Cannot change language now!</toast>
  </div>
</template>

<script>
import { Toast, XButton, XInput, XDialog, Radio, Group, Cell, Badge, Divider, Drawer, Actionsheet, ButtonTab, ButtonTabItem, ViewBox, XHeader, Tabbar, TabbarItem, Loading, TransferDom } from 'vux'
import { mapState, mapActions } from 'vuex'
import Vue from 'vue'
import landing from './app/landing/landing'
import ab from './components/ab/ab'

export default {
  directives: {
    TransferDom
  },
  components: {
    Divider,
    Toast,
    XInput,
    XButton,
    XDialog,
    Radio,
    Group,
    Cell,
    Badge,
    Drawer,
    ButtonTab,
    ButtonTabItem,
    ViewBox,
    XHeader,
    Tabbar,
    TabbarItem,
    Loading,
    Actionsheet,
    landing,
    ab
  },
  methods: {
    drawClick () {
      this.drawerVisibility = false
      console.log('click drawer')
    },
    gameClick () {
      console.log('click game')
      this.$router.push('game')
      this.drawerVisibility = false
    },
    onShowModeChange (val) {
      /** hide drawer before changing showMode **/
      this.drawerVisibility = false
      setTimeout(one => {
        this.showModeValue = val
      }, 400)
    },
    onPlacementChange (val) {
      /** hide drawer before changing position **/
      this.drawerVisibility = false
      setTimeout(one => {
        this.showPlacementValue = val
      }, 400)
    },
    onClickMore () {
      this.showMenu = true
    },
    changeLocale (locale) {
      if (this.route.path === '/abc') {
        // this.changelang = true
       //  return
      }
      this.$i18n.set(locale)
      this.$locale.set(locale)
      this.$bus.emit('changeLang', locale )
    },
    ...mapActions([
      'updateDemoPosition'
    ]),
    hideLandingPage () {
      this.showLandingPage = false;
    },
    handleLogin () {
      // console.log('passwd: ' + this.passwd);
      if (this.passwd === 'TP29') {
        this.showLoginDlg = false;
      } else {
        this.showToast = true;
      }
    }
  },
  mounted () {
    console.log('local: ' + Vue.locale.get())
    this.handler = () => {
      if (this.path === '/demo') {
        this.box = document.querySelector('#demo_list_box')
        this.updateDemoPosition(this.box.scrollTop)
      }
    }
  },
  beforeDestroy () {
    this.box && this.box.removeEventListener('scroll', this.handler, false)
  },
  watch: {
    path (path) {
      if (path === '/component/demo') {
        this.$router.replace('/demo')
        return
      }
      if (path === '/demo') {
        setTimeout(() => {
          this.box = document.querySelector('#demo_list_box')
          if (this.box) {
            this.box.removeEventListener('scroll', this.handler, false)
            this.box.addEventListener('scroll', this.handler, false)
          }
        }, 1000)
      } else {
        this.box && this.box.removeEventListener('scroll', this.handler, false)
      }
    }
  },
  computed: {
    pass () {
      return Vue.i18n.translate('Password');
    },
    ...mapState({
      route: state => state.route,
      path: state => state.route.path,
      deviceready: state => state.app.deviceready,
      demoTop: state => state.vux.demoScrollTop,
      isLoading: state => state.vux.isLoading,
      direction: state => state.vux.direction
    }),
    isShowBar () {
      if (this.entryUrl.indexOf('hide-tab-bar') > -1) {
        return false
      }
      return true
    },
    isShowNav () {
      if (this.entryUrl.indexOf('hide-nav') > -1) {
        return false
      }
      return true
    },
    leftOptions () {
      return {
        showBack: this.route.path !== '/'
      }
    },
    rightOptions () {
      return {
        showMore: true
      }
    },
    headerTransition () {
      if (!this.direction) return ''
      return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
    },
    componentName () {
      if (this.route.path) {
        const parts = this.route.path.split('/')
        if (/component/.test(this.route.path) && parts[2]) return parts[2]
      }
    },
    isGame () {
      return /game/.test(this.route.path) || /ab/.test(this.route.path) || /showinfo/.test(this.route.path)
    },
    isDemo () {
      return /component|demo/.test(this.route.path)
    },
    isTabbarDemo () {
      return /tabbar/.test(this.route.path)
    },
    password () {
      return Vue.i18n.translate('Password')
    },
    title () {
      if (this.route.path === '/') return Vue.i18n.translate('hotmel')
      if (this.route.path === '/project/donate') return 'Donate'
      if (this.route.path === '/game') return Vue.i18n.translate('game')
      if (this.route.path === '/abc') return Vue.i18n.translate('Introduction')
      if (this.route.path === '/showinfo') return Vue.i18n.translate('Analysis')
      if (this.route.path === '/showdata') return Vue.i18n.translate('Statistic')
      return this.componentName ? `Demo/${this.componentName}` : Vue.i18n.translate('hotmel') +'/~'
    },
    viewTransition () {
      if (!this.direction) return ''
      return 'vux-pop-' + (this.direction === 'forward' ? 'in' : 'out')
    },
    game () {
      return Vue.i18n.translate('game') // 'Long'
    }
  },
  data () {
    return {
      passwd: '',
      position: 'middle',
      showToast: false,
      changelang: false,
      showTabBar: false,
      showLandingPage: true, // 真实环境 true
      entryUrl: document.location.href,
      showMenu: false,
      showLoginDlg: true, // 真实环境 true
      menus: {
        'language.noop': '<span class="menu-title">Language</span>',
        'zh-CN': '中文',
        'en': 'English'
      },
      drawerVisibility: false,
      showMode: 'push',
      showModeValue: 'push',
      showPlacement: 'left',
      showPlacementValue: 'left'
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/tap.less';
@import './common/stylus/icon.less';
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed|Lobster|Montserrat|Cabin|Herr+Von+Muellerhoff|Source+Sans+Pro:400,900&display=swap');

* {
  touch-action: pan-y;
}
body {
  background-color: #fbf9fe;
}
html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
.drawer-main {
  text-align: center;
  .draw-title {
    width: 100%;
    padding-top: 40px;
    padding-bottom: 20px;
    background-color: #fff;
    font-family: "Muellerhoff", sans-serif;
    line-height: 40px;
    font-size: 30px;
    margin-bottom: 0px;
    color: rgba(240, 20, 20, 0.9);
    img {
        width: 120px;
        height: 40px;
      }
  }
  .draw-content {
    font-family: "Lobster", sans-serif;
    font-weight: 300;
    letter-spacing: 1px;
    width: 95%;
    margin: 30px auto;
    background-color: #fff;
    line-height: 30px;
    padding: 10px 0;
    font-size: 25px;
    border: 2px solid #000;
    border-radius: 10px;
  }
}
.vux-header {
  background-color: #fff;
}
.weui-cells__title {
  text-align: center;
  color: #000;
  font-size: 30px;
}
.demo-icon-22 {
  font-family: 'vux-demo';
  font-size: 30px;
  color: #333;
}
.weui-tabbar.vux-demo-tabbar {
  /** backdrop-filter: blur(10px);
  background-color: none;
  background: rgba(247, 247, 250, 0.5);**/
}
.vux-demo-tabbar .weui-bar__item_on .demo-icon-22 {
  color: #F70968;
}
.vux-demo-tabbar .weui-tabbar_item.weui-bar__item_on .vux-demo-tabbar-icon-home {
  color: rgb(53, 73, 94);
}
.demo-icon-22:before {
  content: attr(icon);
}
.vux-demo-tabbar-component {
  background-color: #F70968;
  color: #fff;
  border-radius: 7px;
  padding: 0 4px;
  line-height: 14px;
}
.weui-tabbar__icon + .weui-tabbar__label {
  margin-top: 0!important;
}
.vux-demo-header-box {
  z-index: 100;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
}
.landingpage {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  color: rgba(240,240,20,1);
  background: rgba(7, 17, 27, 0.8);
  transition: all 2.7s;
  backdrop-filter: blur(15px);
  text-align: center;
  &.fade-transition {
    opacity: 1;
    background: rgba(7, 17, 27, 0.8);
  }
  &.fade-enter, &.fade-leave {
    opacity: 0;
    background: rgba(7, 17, 27, 0);
  }
  .landingcontent {
    //margin-top: calc(50vh - 15px);
    //margin-left: calc(50vw - 25px);
    margin: 65% auto;
    width: 200px;
    height: 100px;
    font:italic 1em Georgia, serif;
    //font-famil: 'Arial', sans-serif;
    font-size: 30px;
    line-height: 40px;
    .btn {
    font-size: 20px;
    margin-top: 30px;
    border: 1px solid rgba(240,240,20, 1);
    border-radius: 10px;
    }
  }
}
@font-face {
  font-family: 'vux-demo';  /* project id 70323 */
  src: url('//at.alicdn.com/t/font_70323_wlronpvr565yiudi.eot');
  src: url('//at.alicdn.com/t/font_70323_wlronpvr565yiudi.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_70323_wlronpvr565yiudi.woff') format('woff'),
  url('//at.alicdn.com/t/font_70323_wlronpvr565yiudi.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_70323_wlronpvr565yiudi.svg#iconfont') format('svg');
}

.demo-icon {
  font-family: 'vux-demo';
  font-size: 20px;
  color: #04BE02;
}

.demo-icon-big {
  font-size: 28px;
}

.demo-icon:before {
  content: attr(icon);
}

.router-view {
  width: 100%;
  top: 46px;
}
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 500ms;
  height: 100%;
  top: 46px;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}
.vux-pop-out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.vux-pop-out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.menu-title {
  color: #000;
}
.showcase {
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  position: fixed;
}
.dialog-demo {
  .weui-btn_primary {
    background: rgba(246, 213, 74, 1);
  }
  .weui-btn {
    color: #000;
  }
  .weui-cell__bd {
    background: rgba(250, 250, 250, 1);
    border-radius: 2px;
  }
  .weui-cell__hd {
    color: #000
  }
  .weui-cell {
    background-color: rgba(109,158,235,1);
  }
  .weui-dialog{
    border-radius: 8px;
    padding-bottom: 8px;
    background-color: rgba(109,158,235,1);
  }
  .dialog-title {
    margin: 0 auto;
    width: 270px;
    //background: rgba(13, 13, 13, 0.8);
    background: rgba(246, 213, 74, 1);
    font-weight: 500;
    line-height: 40px;
    color: #000;
    border-radius: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .img-box {
    height: 350px;
    overflow: hidden;
  }
  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
  toast {
    color: #f00
  }
  @media (max-width: 320px) {
    .dialog-title {
      width: 230px;
    }
  }
  .vux-demo-tabbar {
    .tab {
      color: #f00;
      display: flex;
      .home {
        flex: 1;
      }
      .game {
        flex: 1;
      }
    }
  }
}
</style>
