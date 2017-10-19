<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-aegis-homepage_fill"></i> 首页</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="ms-doc">
      <h3 class="home-index">宙斯盾爬虫平台(Aegis Spider Platform)</h3>
      <article>
        <h2 class="spider-des">Aegis 简述</h2>
        <el-alert
          title="该平台主要适用个人用户对网页数据的爬虫需求，并不针对企业用户"
          type="warning" :closable="false">
        </el-alert>

        <div style="margin-top: 5%">
          <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in items" :key="item.key">
              <h2>{{ item.des }}</h2>
              <h3>{{ item.text }}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>

      </article>
    </div>
  </div>
</template>


<script>
  export default {
    data: function(){
      return {
        items: [
          {
            key: 'description',
            des: '快捷方便',
            text: '互联网数据 - 触手可及，简单、便捷、高效'
          },

          {
            key: 'market-price',
            des: '实用优惠',
            text: '免费、白菜价格，超级实惠，值得你拥有'
          },

          {
            key: 'web-spider',
            des: '多样轻松',
            text: '静态页面、Ajax 数据，想抓就抓，让数据无处可逃'
          }
        ]
      }
    }
  }
</script>

<style scoped>
  .ms-doc{
    width:100%;
    max-width: 980px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  }
  .ms-doc h3.home-index {
    padding: 9px 10px 10px;
    margin: 0;
    font-size: 16px;
    font-weight: bold;
    line-height: 16px;
    background-color: #f5f5f5;
    border: 1px solid #d8d8d8;
    border-bottom: 0;
    border-radius: 3px 3px 0 0;
    color: #20a0ff;
  }
  .ms-doc article{
    padding: 25px;
    word-wrap: break-word;
    background-color: #fff;
    border: 1px solid #ddd;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
  }
  .ms-doc article h1{
    font-size:22px;
    font-weight: bold;
    text-align: left;
    padding-bottom: 10px;
    margin-bottom: 15px;
    border-bottom: 1px solid #ddd;
  }
  .ms-doc article h2.spider-des {
    margin: 24px 0 16px;
    font-weight: 600;
    line-height: 1.25;
    padding-bottom: 7px;
    font-size: 20px;
    border-bottom: 1px solid #eee;
  }

  .ms-doc .ms-description {
    font-size: 14px;
    color: #FF8C00;
  }

  .ms-doc article p{
    margin-bottom: 15px;
    line-height: 1.5;
  }
  .ms-doc article .el-checkbox{
    margin-bottom: 5px;
  }

  .el-carousel__item h2 {
    text-align: center;
  }

  .el-carousel__item h3 {
    font-size: 18px;
    /*opacity: 0.5;*/
    /*line-height: 180px;*/
    text-align: center;
  }

  .el-carousel__item:not(.is-active) {
    background-color: #99FF00;
  }

  .el-carousel__item.is-active {
    background-color: #00FF60;
    /*background-color: #FF6600;*/
    /*background-color: #FF8C00;*/
  }
</style>
