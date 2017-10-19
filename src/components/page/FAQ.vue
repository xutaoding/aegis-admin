<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-aegis-feedback_fill"></i> 教程 & FAQ</el-breadcrumb-item>
        <el-breadcrumb-item> FAQ</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="ms-faq">
      <h3 style="color: #20a0ff;">常见问题FQA</h3>

      <div class="ms-faq-body">
        <el-collapse accordion v-for="item in items" key="item">
          <el-collapse-item v-if="item.icon">
            <template slot="title">
              {{ item.title }} &nbsp;<i :class="item.icon.class_" :style="item.icon.style_"></i>
            </template>
            <div v-for="t in item.texts">
              <span v-for="_ in t.indexOf(t.trim())">&nbsp;&nbsp;</span> {{ t }}
            </div>
          </el-collapse-item>

          <el-collapse-item v-else :title="item.title">
            <div v-for="t in item.texts">
              <span v-for="_ in t.indexOf(t.trim())">&nbsp;&nbsp;</span> {{ t }}
            </div>
          </el-collapse-item>
        </el-collapse>
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
            title: '本平台适用人群',
            texts: [
              '本平台属于作者的个人经验项目，适用对互联网有数据需求的小白用户，或有爬虫经验但不深入的个人用户，但不针对企业用户。',
            ]
          },

          {
            title: '充值与开具发票',
            icon: {
              class_: 'header-icon el-icon-warning',
              style_: 'color: red'
            },

            texts: [
              '由于是个人项目和只针对对网络有需求的个人用户，充值后并不提供发票。',
            ]
          },

          {
            title: '价格与资费',
            icon: {
              class_: 'header-icon el-icon-circle-check',
              style_: 'color: red'
            },

            texts: [
              '  注意：价格中的几种套餐均需要用户在登录后才能使用。',
              '免费版：充值=0.0元，仅抓取200次网页；基础版与优惠版：充值=4.9元 或 充值=9.9元，抓取网页次数按套餐均价收取。',
            ]
          },

          {
            title: '抓取的链接URL多样性',
            icon: {
              class_: 'header-icon el-icon-star-on',
              style_: 'color: red'
            },

            texts: [
              '(1)：所需要抓取的链接，类如:  http://www.example.com/item/{variable}?param1={aaa}&param2={bbb}。',
              '(2)：参数 variable、aaa、bbb 是多个值，可以存放在文本或是web文本框；',
              '    variable：12345、12456、34566、......',
              '    aaa：111、222、333、......',
              '    bbb：111、222、333、......',
              '(3)：实际是要对类似如下页面的爬虫：',
              '    http://www.example.com/item/12345?param1=111&param2=111',
              '    http://www.example.com/item/12345?param1=222&param2=111',
              '    http://www.example.com/item/12345?param1=333&param2=111',
              '    ......',
            ]
          },

          {
            title: '需要登录的网站， 如何获取 Cookie？',
            texts: [
              '提示： 建议使用Chrome浏览器，若对其他浏览器熟悉均可。',
              '(1)：用户在原网站登录后，找到某一个需要获取数据的网页。',
              '(2)：在该网页上任意处，点击鼠标右键，弹出菜单：-> 检查(点击) -> Network(点击) -> 清空Network下所有的请求 -> 重新加载或刷新该网页。',
              '(3)：查找到有该网页数据的请求，Headers -> Request Headers -> Cookie。',
            ]
          },
        ]
      }
    }
  }
</script>

<style>
  .ms-faq {
    width:100%;
    max-width: 980px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  }

  .ms-faq h3{
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

  .ms-faq .ms-faq-body{
    padding: 25px;
    word-wrap: break-word;
    background-color: #fff;
    border: 1px solid #ddd;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    text-align: left;
  }

  .el-collapse-item__header {
    font-size: 15px;
  }

  .el-collapse-item__wrap {
    font-size: 14px;
    background-color: #CCFFFF;
  }

  span.el-breadcrumb__item:not(:first-child) {
    margin-top: 10px;
  }
</style>
