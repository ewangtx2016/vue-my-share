<template>
 <div class="my_share" v-show="show">
    <div class="my_header lv_white">
      <span></span> 创建分享
    </div>
    

    <div class="mylv_box" v-if="obj">
        <div class="yugu">
          奖金收益预估：￥{{obj.info.yugu}}
        </div>
        <div class="copy lv_white">
          <div class="title">
            {{obj.info.title}}
          </div>
          <div class="info tag-copy">
            【原价】{{obj.info.yuanjia}}元<br />
            【券后价】{{obj.info.xianjia}}元<br />
            <span v-if="checked">【用芒果大V再省】{{obj.info.yugu}}元<br /></span>
            ----------------------------------------------<br />
            复制这条（{{obj.info.yaoqingma}}），<br />
            进入【Tao宝】即可抢购
          </div>
          <div class="check">
            <van-checkbox checked-color="#ff2415" v-model="checked">显示芒果大V收益</van-checkbox>
          </div>
        </div>
        <van-radio-group v-model="radio">
          <div class="picslist lv_white">
              <div class="big">
                <van-radio :name="radioIndex" checked-color="#ff2415">
                  <img :src="obj.images[0]" alt="" srcset="">
                </van-radio>
              </div>
              <div class="smll">
                <div class="item"  v-for="(item, index) of obj.images" :key="index" v-if="index > 0">
                  <van-radio  :name="index" checked-color="#ff2415">
                    <img :src="item" alt="" srcset="">
                  </van-radio>
                </div>
              </div>
            </div>
          </van-radio-group>
    </div>

    
     <!-- 操作 -->
     <div class="btn">
       <button v-clipboard="mystring" @success="copyInvation" class="copy">复制淘口令</button>
       <button class="share" @click="shareImg">分享图片</button>
     </div>
 </div>
</template>

<script>
import Vue from 'vue'
import VueClipboards from 'vue-clipboards'
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(VueClipboards)
Vue.use(Vant)


export default {
  name: 'myShare',
  props: {
    obj: {
      type: Object,
      default: null
    },
    show: Boolean,
    text: {
      type: String,
      default: '正在加载中...'
    }
  },
  data () {
    return {
       checked: true,
       radio: 0,
       radioIndex: 0,
       mystring: ''
    }
  },
  mounted(){
    this.getString()
  },
  watch:{
    obj(next, prev){
      this.getString()
    }
  },
  methods:{
            // 分享图片
            shareImg(){
              let downImg = this.obj.images[this.radio]
              console.log('获取到了图片了呦', downImg)
              this.plusShare(downImg)
            },
            getString(){
              if(!this.obj){
                return
              }
              let ismg = this.checked ? `【用芒果大V再省】${this.obj.info.yugu}元\n` : '';
              let str = `【原价】${this.obj.info.yuanjia}元\n【券后价】${this.obj.info.xianjia}元\n${ismg}---------------------------------------------\n复制这条（${this.obj.info.yaoqingma}），\n进入【Tao宝】即可抢购`;
              this.mystring = str
            },
            //复制邀请码
            copyInvation() {
               this.$toast('复制成功，可以打开微信粘贴转发了！')
               setTimeout(()=>{
                 this.openwx()
               }, 1000)
            },
            // 调用plus的share分享
            plusShare(downurl){
                let _this = this
                return new Promise((resolve, reject)=>{
                        if(plus.downloader){
                                plus.downloader.createDownload(downurl, {}, function ( d, status ) {
                                    // 下载完成
                                    if ( status == 200 ) { 
                                            plus.share.sendWithSystem({
                                                type: "image",
                                                pictures: [d.filename]
                                            }, function(){
                                                // Toast.success('分享成功！');
                                                console.log('分享成功！')
                                            }, function(e){
                                                // Toast.fail('分享失败！');
                                                console.log('分享失败！')
                                            });
                                            resolve()
                                    } else {
                                        alert( "Download failed: " + status ); 
                                        reject()
                                    }  
                                }).start();
                        }else{
                                
                        }
                })

          },
          // 打开微信
          openwx(){
               let weixinUrl = "weixin://";
               if(/ipad|iphone|mac/i.test(navigator.userAgent)) {
                  var ifr = document.createElement("iframe");
                  ifr.src = weixinUrl;
                  ifr.style.display = "none";
                  document.body.appendChild(ifr);
               }else{
                  window.location.href = weixinUrl;
               }
          }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.my_share{
  position: fixed;
  z-index: 1000;
  background: #eeeeee;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}



.my_share .my_header{
  position: relative;
  font-size: 18px;
  text-align: center;
  padding: 20px;
  padding-top: 50px;
  
}


.my_share .my_header span{
  position: absolute;
  left: 25px;
  bottom: 25px;
  width: 12px;
  height: 12px;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  transform: rotate(-45deg);
}

.my_share img{
  max-width: 100%;
  max-height: 100%;
}

.lv_white{
  background: white;
}

.my_share .yugu{
  background: #f83726;
  color: #fff;
  font-size: 14px;
  padding: 4px 10px;
}

.my_share .copy{
  font-size: 14px;
  padding: 10px;
}

.my_share .copy .title{
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}

.my_share .copy .info{
  color: #6c6c6c;
  font-size: 14px;
}


.my_share .copy .check{
  color: #f72e14;
  border-top: 1px solid #ededed;
  margin-top: 10px;
  padding-top: 10px;
}

.my_share .picslist{
  display: flex;
  margin-top: 10px;
}

.my_share .picslist .big, .my_share .picslist .smll{
  flex: 1;
  overflow: hidden;
  padding: 5px;
}

.my_share .picslist .smll{
  display: flex;
  flex-wrap: wrap;
}

.my_share .picslist .smll .item{
  width: 50%;
  padding:0 5px;
  box-sizing: border-box;
}

.my_share .picslist .van-radio{
  position: relative;
}

.my_share .picslist .van-radio__icon{
  position: absolute;
  left: 10px;
  top: 10px;
}

.my_share .picslist .van-radio__label{
  margin-left: 0;
}

.my_share .btn{
  display: flex;
  margin: 30px 0;
}

.my_share .btn button{
  flex: 1;
  background: #fff;
  border-radius: 4px;
  border: none;
  margin: 10px;
}

.my_share .btn .copy{
  border: 1px solid #d69a54;
  color: #d69a54;
}

.my_share .btn .share{
  border: 1px solid #ae433b;
  color: #ae433b;
}
</style>
