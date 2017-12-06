<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-aegis-tasklist_fill"></i> 爬虫管理</el-breadcrumb-item>
        <el-breadcrumb-item>爬虫配置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="spider_detail">
      <h3 style="color: #20a0ff;">爬虫配置详情</h3>

      <div class="spider-table">
        <el-form :model="spiderData" ref="spiderData" :rules="rules" label-width="100px" class="demo-spiderData">
          <el-form-item label="创建时间" prop="crt">
            <el-input v-model="spiderData.crt" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="爬虫UUID" prop="spider_task_id">
            <el-input v-model="spiderData.spider_task_id" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="爬虫名称" prop="spider_name">
            <el-input v-model="spiderData.spider_name"></el-input>
          </el-form-item>

          <el-form-item label="爬虫描述" prop="spider_description">
            <el-input v-model="spiderData.spider_description"></el-input>
          </el-form-item>

          <el-form-item label="请求方式" prop="request_method">
            <el-select v-model="spiderData.request_method" style="width: 100%">
              <el-option label="GET" value="GET"></el-option>
              <el-option label="POST" value="POST"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="请求Cookie" prop="request_cookies">
            <el-input v-model="spiderData.request_cookies"></el-input>
          </el-form-item>

          <el-form-item label="请求Headers" prop="headers_items">
            <div v-for="item in spiderData.headers_items" style="margin-bottom: 5px;">
              <el-input v-model="item.key" placeholder="Header Key" style="width: 25%"></el-input>
              <el-input v-model="item.value" placeholder="Header Value" style="width: 70%"></el-input>
              <el-button v-if="item.last" type="success" size="small" class="plus-btn" @click="addHeader()">+</el-button>
              <el-button v-else type="danger" size="small" class="minus" @click="deleteHeader(item.index)">&nbsp;- </el-button>
            </div>
          </el-form-item>

          <el-form-item label="Robotstxt协议" prop="robotstxt_obey">
            <el-select v-model="spiderData.robotstxt_obey" style="width: 100%">
              <el-option label="是" value="1" v-if="spiderData.robotstxt_obey" checked></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="禁用Cookies" prop="cookies_enabled">
            <el-select v-model="spiderData.cookies_enabled" style="width: 100%">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="使用代理IP" prop="proxy_ip_enabled">
            <el-select v-model="spiderData.proxy_ip_enabled" style="width: 100%">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="下载延迟(s)" prop="download_delay">
            <el-input v-model=spiderData.download_delay></el-input>
          </el-form-item>

          <el-form-item label="请求并发数" prop="concurrent_requests">
            <el-input v-model=spiderData.concurrent_requests></el-input>
          </el-form-item>

          <el-form-item>
            <div style="margin: 0 0 0 25%">
              <el-button type="primary" class="modify-config" @click="modifyConfigSpider()">更改配置 </el-button>
            </div>
          </el-form-item>

        </el-form>
      </div>

    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import encrypt from '../../utils/crypto'

  const url = require('url');
  const querystring = require('querystring');

  export default {
    data: function () {
      let local_url = window.location.href;
      let urlPath = url.parse(local_url).hash.substring(1);
      let task_uid = querystring.parse(url.parse(urlPath).query).task_uid;
      let spiderData = JSON.parse(localStorage.getItem(task_uid));

      let hkArray = [];
      let request_headers = JSON.parse(spiderData.request_headers);
      spiderData.robotstxt_obey = String(Number(spiderData.robotstxt_obey));
      spiderData.cookies_enabled = String(Number(spiderData.cookies_enabled));
      spiderData.proxy_ip_enabled = String(Number(spiderData.proxy_ip_enabled));

      let headers_keys = Object.keys(request_headers);
      for (let i = 0; i < headers_keys.length; i++){
        let hk = headers_keys[i];
        hkArray.push({
          key: hk, value: request_headers[headers_keys[i]],
          last: i === headers_keys.length - 1, index: i
        });
      }

      if (hkArray.length === 0){
        hkArray.push({key: '', value: '', index: 0, last: true});
      }
      hkArray.sort();
      spiderData.headers_items = hkArray;

      return {
        spiderData: spiderData,
        rules: {}
      }
    },

    methods: {
      deleteHeader(index){
        const self = this;
        const headers_items = self.spiderData.headers_items;
        headers_items.splice(index, 1);

        if (headers_items.length === 0){
          headers_items.push({key: '', value: '', index: 0, last: true});
          return;
        }

        for(let i = 0; i < headers_items.length; i++){
          headers_items[i].index = i;
          headers_items[i].last = i === headers_items.length - 1;
        }
      },

      addHeader(){
        const self = this;
        const headers_items = self.spiderData.headers_items;

        for(let i = 0; i < headers_items.length; i++){
          headers_items[i].index = i;
          headers_items[i].last = false;
        }

        self.spiderData.headers_items.push({key: '', value: '', index: headers_items.length + 1, last: true})
      },

      modifyConfigSpider(){
        const self = this;
        let spiderData = $.extend(true, {}, self.spiderData);

        spiderData.spider_status = spiderData.spider_status.substring(0, 1);
        spiderData.robotstxt_obey = Boolean(Number(spiderData.robotstxt_obey));
        spiderData.cookies_enabled = Boolean(Number(spiderData.cookies_enabled));
        spiderData.proxy_ip_enabled = Boolean(Number(spiderData.proxy_ip_enabled));

        let headers_items = spiderData.headers_items;

        let request_headers = JSON.parse(spiderData.request_headers);

        for(let i = 0; i < headers_items.length; i++){
          let obj = headers_items[i];
          console.log(obj);

          if (obj.key){
            request_headers[obj.key] = obj.value;
          }
        }

        spiderData.request_headers = JSON.stringify(request_headers);
        delete spiderData.headers_items;

        console.log(11111111111111111);
        console.log(spiderData);
        console.log(self.$dispatch.modifySpider);

        let configEncrypt = encrypt(JSON.stringify(spiderData));
        console.log(configEncrypt);
        self.$axios.put(self.$dispatch.modifySpider, {en_token: configEncrypt}).then(resp => {
          console.log(666666);
        }).catch(err => {
          self.$notify({
            message: err.toString(),
            type: 'error',
          });
        });
      },
    },

    computed: {
      form_data(){
      }
    }
  }
</script>

<style scoped>
  div.spider_detail {
    width:100%;
    max-width: 980px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  }

  .spider_detail h3 {
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

  .spider-table {
    padding: 20px;
    word-wrap: break-word;
    background-color: #fff;
    border: 1px solid #ddd;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  .modify-config {
    width: 260px;
    height: 40px;
    border-radius: 8px;
  }

  span.el-breadcrumb__item:not(:first-child) {
    margin-top: 10px;
  }

</style>
