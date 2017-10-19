<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-aegis-coupons_fill"></i> 价格</el-breadcrumb-item>
        <el-breadcrumb-item>个人用户</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="ms-price">
      <h3 style="color: #20a0ff;">个人用户套餐资费</h3>
      <div class="ms-financial">
        <el-row>
          <el-col :span="7" v-for="(item, index) in items" key="item" :offset="1">
            <el-card :body-style="{padding: '2px'}">
              <div slot="header">
                <p class="card-title">{{ item.title }}</p>
                <p class="card-price">{{ item.price }}</p>
                <p class="card-times">{{ item.times }}</p>
              </div>

              <div v-for="o in item.body" style="height: 280px">
                <p style="font-weight: bold; font-size: 14px;">{{ o.title }}</p>
                <div v-for="t in o.texts">
                  <p v-if="t.startsWith('(')" style="margin-top: -3%;color: #FF8C00">{{ t }}</p>
                  <p v-else style="margin-bottom: -5%;">{{ t }}</p>

                  <br/>
                </div>
              </div>

              <div>
                <p style="font-weight: bold; font-size: 14px; margin-top: 5%">客服支持</p>
                <div><p>客服工单</p></div>
              </div>

              <div style="border: 1px solid #d1dbe5;margin-top: 4%"></div>

              <div style="line-height: 60px;">
                <el-button type="warning" :plain="true" class="btn-usage">{{ item.usage }}</el-button>
              </div>

            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        items: [
          {
            title: '免费套餐',
            price: '¥ 0元',
            times: '200次网页爬取',
            body: [
              {
                title: '功能',
                texts: [
                  '可视化采集',
                  '支持静态页面',
                  '30天免费存储',
                  '支持多种文件导出',
                  '(csv、json、xlsx)'
                ]
              }
            ],

            usage: '立即试用'
          },

          {
            title: '基础套餐',
            price: '¥ 4.9元',
            times: '每爬取1000次网页',
            body: [
              {
                title: '功能',
                texts: [
                  '可视化采集',
                  '支持静态、动态页面',
                  '支持URL多参数爬虫',
                  '支持登录爬取',
                  '无限容量存储',
                  '支持定时执行',
                  '支持多种文件导出',
                  '(csv、json、xlsx)'
                ]
              },

            ],
            usage: '立即购买'
          },

          {
            title: '优惠套餐',
            price: '¥ 9.9元',
            times: '每爬取2400次网页',
            body: [
              {
                title: '功能',
                texts: [
                  '可视化采集',
                  '支持静态、动态页面',
                  '支持URL多参数爬虫',
                  '支持登录爬取',
                  '无限容量存储',
                  '支持定时执行',
                  '支持多种文件导出',
                  '(csv、json、xlsx)'
                ]
              },

            ],
            usage: '立即购买'
          },

        ]
      }
    }
  }
</script>

<style scoped>
  .ms-price{
    width:100%;
    /*margin-top: 5%;*/
    max-width: 980px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  }

  .ms-price h3{
    padding: 9px 10px 10px;
    margin: 0;
    font-size: 18px;
    font-weight: bold;
    line-height: 16px;
    background-color: #f5f5f5;
    border: 1px solid #d8d8d8;
    border-bottom: 0;
    border-radius: 3px 3px 0 0;
  }

  .ms-price .ms-financial{
    padding: 25px;
    word-wrap: break-word;
    background-color: #fff;
    border: 1px solid #ddd;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    text-align: center;
  }

  .card-title {
    font-size: 16px;
    color: #FF6600;
  }

  .card-price {
    font-size: 14px;
    font-weight: bold;
    margin-top: -10px;
  }

  .card-times {
    font-size: 12px;
    color: #FF8C00;
    margin-top: -5px;
  }

  .btn-usage {
    border: 1px solid #FF8C00;
    color: #FF8C00;
  }

  /*.clearfix:before,*/
  /*.clearfix:after {*/
    /*display: table;*/
    /*content: "";*/
  /*}*/

  /*.clearfix:after {*/
    /*clear: both*/
  /*}*/

  span.el-breadcrumb__item:not(:first-child) {
    margin-top: 10px;
  }

</style>
