<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-aegis-document_fill"></i> 爬虫管理</el-breadcrumb-item>
        <el-breadcrumb-item> 爬虫采集</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!--<ul class="menu" id="menu">-->
      <!--<li>删除</li>-->
      <!--<li class="sep"></li>-->
      <!--<li>修改</li>-->
      <!--<li class="sep"></li>-->
      <!--<li>查看详细信息</li>-->
    <!--</ul>-->

    <div class="ifr">
      <el-form v-loading="loading" :model="jmodel" class="demo-ruleForm">
          <iframe id="ifr"  frameborder="no" scrolling="no" width="1050px" style="margin-left:-4%; border-style: none; border-width:0; border-color:#CCC;"></iframe>
      </el-form>

    </div>
  </div>
</template>

<script>
  import Contextmenu from 'v-contextmenu'
  import 'v-contextmenu/dist/index.css'
  import $ from 'jquery'

  export default {
    components: {Contextmenu},
    data: function () {
      return {
        loading: true,
        ruleForm: {}

      }
    },

    methods: {},

    computed: {

      jmodel() {
        const self = this;
        console.log('hhhh loading');
      let spider_task_id = localStorage.getItem('spider_task_id');
      localStorage.removeItem('spider_task_id');
      let htmlApi = this.$dispatch.obtainHtml + '?spider_task_id=' + spider_task_id;

        let ID = setInterval(function () {
          self.$axios.get(htmlApi).then(resp => {
            console.log(resp.data);

            if (resp.data.html){
              $('#ifr').attr('srcdoc', resp.data.html);
              clearInterval(ID);
              self.loading = false;

              let iframe = document.getElementById('ifr');
              iframe.onload = function () {
                let iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
                console.log(iframeWin);
                let bHeight = iframeWin.document.body.scrollHeight;
                let dHeight = iframeWin.document.documentElement.scrollHeight;
                let height = Math.max(bHeight, dHeight);

                // $('#ifr').attr('height', height);
                iframe.style.height = height + 'px';

                // 设置menu
//                console.log('000000');
//                console.log(window);
//                iframeWin.document.oncontextmenu = function(e){
//                  e.preventDefault(); //去掉默认的contextmenu事件，否则会和右键事件同时出现。
//                };
//
//                var menu = document.getElementById("menu");
//                var elements = iframeWin.document.querySelectorAll('body *');
//                for(var i=0;i< elements.length; i++){
//                  elements[i].onmousedown = function(e){
//                    e = e ? e: iframeWin.window.event;
//                    console.log(e);
//                    if(e.button ==2){ //右键点击
//                      menu.style.display = "block";
//                      menu.style.top = e.pageY + "px";
//                      menu.style.left = e.pageX + "px";
//                    }else if(e.button ==0){//左键点击隐藏菜单
//                      menu.style.display="";
//                    }
//                  }
//                }
              };

            }
          }).catch(err => {
            console.log(err)

          });
        }, 1500);
      }

    }
  }
</script>

<style scoped>

  .ifr {
    padding: 20px;
    word-wrap: break-word;
    background-color: #fff;
    border: 0 solid #ddd;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  div.el-loading-spinner {
    margin-top: 500px;
  }

  span.el-breadcrumb__item:not(:first-child) {
    margin-top: 10px;
  }


  /*!* menu *!*/
  /*ul{*/
    /*list-style:none;*/
    /*font-weight:bold;*/
    /*color:#fff;*/
    /*position:absolute;*/
    /*display:none;*/
    /*z-index:1;*/
    /*!*一定要确保弹出菜单所在标签padding和margin为0，不然弹出菜单出现的位置和点击位置有默认padding或margin的*/
    /*偏差*!*/
    /*!*margin:0;*!*/
    /*padding:0;*/
    /*background:green;*/
    /*border: 1px solid red;*/
  /*}*/

  /*ul li{*/
    /*background-color: lightskyblue;*/
    /*line-height:20px;*/
    /*height:20px;*/
    /*width:100px;*/
    /*padding-left:10px;*/
  /*}*/

  /*ul li.sep{*/
    /*height:0.5px;*/
    /*width:100px;*/
    /*padding:0;*/
    /*background-color:orangered;*/
  /*}*/
</style>
