<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-aegis-tasklist_fill"></i> 爬虫管理</el-breadcrumb-item>
        <el-breadcrumb-item>爬虫日志</el-breadcrumb-item>
        <el-breadcrumb-item>{{ spider_task_id }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="spider_log">
      <h3 style="color: #20a0ff;">日志详情</h3>

      <div class="spider-log-detail">
        <el-input v-model="logText" type="hidden"></el-input>
        <el-input v-model="log_text" type="textarea" :rows="25" resize="none"></el-input>
      </div>

    </div>
  </div>
</template>

<script>
  const url = require('url');
  const querystring = require('querystring');

  export default {
    data: function () {
      let local_url = window.location.href;
      let urlPath = url.parse(local_url).hash.substring(1);
      let spider_task_id = querystring.parse(url.parse(urlPath).query).task_uid;

//      let ID = setInterval(() => {}, 2000);

      return {
        spider_task_id: spider_task_id,
        log_text: '暂无日志数据'
      }
    },

    computed: {
      logText(){
        const self = this;
        let offset = 1;
//        let log_text = '暂无日志数据';
        let logApi = self.$dispatch.logSpider + '?spider_task_id=' + self.spider_task_id + '&offset=1';

        logApi = logApi.replace(/offset=\d+/g, 'offset=' + offset);
        console.log(logApi);
        let ID = setInterval(() => {
          self.$ajax.get(logApi, {}, false, resp => {
            console.log(333333333333333333333333333333);
            console.log(resp);
            console.log(4444444444444444444444444444444);

            if (resp) {
              self.log_text = offset === 1 ? '' : self.log_text;
              offset = resp.offset;
              self.log_text += resp.log_text;
            }

            if (resp.finished){
              clearInterval(ID);
            }

          });
        }, 3000);

        setTimeout(function () {
          if (self.log_text === '暂无日志数据'){
            clearInterval(ID);
          }
        }, 5500);


      },

    }
  }
</script>

<style scoped>
  .spider_log {
    width:100%;
    max-width: 980px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  }

  .spider_log h3 {
    padding: 9px 10px 10px;
    margin: 0;
    font-size: 18px;
    font-weight: bold;
    line-height: 16px;
    background-color: #f5f5f5;
    border: 1px solid #d8d8d8;
    border-bottom: 0;
    border-radius: 3px 3px 0 0;
    text-align: center;
  }

  .spider-log-detail {
    padding: 20px;
    word-wrap: break-word;
    background-color: #fff;
    border: 1px solid #ddd;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  span.el-breadcrumb__item:not(:first-child) {
    margin-top: 10px;
  }

  /* 全局样式有效 */
  /*.el-textarea__inner {*/
    /*background-color: #CCFFFF;*/
  /*}*/

</style>
