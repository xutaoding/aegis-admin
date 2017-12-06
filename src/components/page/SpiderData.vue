<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-aegis-tasklist_fill"></i> 爬虫管理</el-breadcrumb-item>
        <el-breadcrumb-item>爬虫数据</el-breadcrumb-item>
        <el-breadcrumb-item>{{ task_uid }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="handle-box">
      <!--<el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>-->

      <el-row :gutter="10">
        <el-col :span="16">
          <div>
            <el-select v-model="select_field" size="small" placeholder="查询选择" class="handle-select mr10">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-input v-model="select_value" placeholder="模糊筛选" size="small" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" size="small" @click="search">搜索</el-button>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="downloader" style="text-align: right">
            <el-select v-model="select_export_format" size="small" placeholder="下载选择" class="handle-select mr10">
              <el-option v-for="item in export_formats" :key="item" :label="item" :value="item"></el-option>
            </el-select>
            <el-button type="primary" icon="caret-bottom" size="small" @click="downloadFile" style="width: 75px">下载</el-button>
          </div>
        </el-col>
      </el-row>

    </div>

    <div class="spider_data">
      <el-table :data="spider_list_data" border stripe ref="multipleTable" style="width: 100%">
        <el-table-column type="expand">
          <template scope="props">
            <div class="json-render">
              <div>&nbsp;&nbsp; { </div>
              <div v-for="key in Object.keys(props.row)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {{ key }}：{{ props.row[key] }}
              </div>
              <div>&nbsp;&nbsp; } </div>
            </div>

          </template>
        </el-table-column>

        <el-table-column label="创建时间" sortable width="190">
          <template scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 5px">{{ scope.row.crt }}</span>
          </template>
        </el-table-column>

        <el-table-column label="Document ID" sortable prop="id">
        </el-table-column>

        <el-table-column label="操作">
          <template scope="scope">
            <!--<el-button-->
              <!--size="small"-->
              <!--type="text"-->
              <!--@click="detail_data(scope.$index, scope.row)">-->
              <!--<span v-if="scope.row.spider_status !== 'delete'">详情</span>-->
            <!--</el-button>-->

            <el-button
              size="small"
              type="text"
              @click="edit_data(scope.$index, scope.row)">
              <span v-if="scope.row.spider_status !== 'delete'">编辑</span>
            </el-button>

            <el-button
              size="small"
              type="text"
              style="color: red"
              @click="delete_data(scope.$index, scope.row)">
              <span v-if="scope.row.spider_status !== 'delete'">删除</span>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <template>
      <div class="block">
        <el-pagination
          @current-change ="handleCurrentChange"
          class="pagination"
          layout="total, prev, pager, next, jumper"
          :total="total_count">
        </el-pagination>
      </div>
    </template>

  </div>
</template>

<script>
  const url = require('url');
  const querystring = require('querystring');

  export default {
    data: function () {
      const self = this;
      let local_url = window.location.href;
      let urlPath = url.parse(local_url).hash.substring(1);
      let task_uid = querystring.parse(url.parse(urlPath).query).task_uid;
      let taskAPI = self.$dispatch.listData + task_uid + '/';
      console.log('data task_uid:' + task_uid);
      console.log('data taskAPI:' + taskAPI);

      let options = [];
      let obj = self.parseTableData(taskAPI);
      let oneObj = obj.tableData[0];

      for (let k in oneObj){
        if (k !== 'crt'){
          options.push({label: k, value: k})
        }
      }


      return {
        task_uid: task_uid,

        total_count: obj.totalCount,
        spider_list_data: obj.tableData,
        current_page: null,

        options: options,
        select_field: '',
        select_value: '',

        select_export_format: '',
        export_formats: [
          'CSV',
          'JSON',
          'XLSX'
        ],
      }
    },

    methods: {
      parseTableData(requestUrl){
        const self = this;
        let totalCount= 0;
        let tableDataList= [];

        self.$ajax.get(requestUrl, {}, false, resp => {
          console.log('data data');
          console.log(resp);
          if (resp.results) {
            totalCount = resp.count;
            let list_data = resp.results;

            for (let index in list_data){
              let target = {
                id: list_data[index].id,
                crt: list_data[index].crt
              };

              Object.assign(target, list_data[index].result);
              tableDataList.push(target);
            }
          }
        });

        return {tableData: tableDataList, totalCount: totalCount};
      },

      search(){
        const self = this;
        let tasksApi = self.$dispatch.listData + self.task_uid + '/';

        if (self.select_field && self.select_value){
          tasksApi += '?' + self.select_field + '=' + self.select_value;
        }

        let obj = self.parseTableData(tasksApi);

        self.total_count = obj.totalCount;
        self.spider_list_data = obj.tableData;
      },

      downloadFile(){

      },

      detail_data(index, row){

      },

      edit_data(index, row){
        const self = this;
        console.log(index);
        console.log(row);
        // let url = '/#/edit-spider-data/' + self.task_uid + '/' + row.id;
        // window.open(url);
         self.$router.push('/edit-spider-data/' + self.task_uid  + '/' + row.id);
      },

      delete_data(index, row){
        const self = this;
        console.log(row)

        let taskApi = self.$dispatch.listData + self.task_uid + '/' + row.id;

        self.$axios.delete(taskApi).then(resp => {
          console.log(resp);
          window.location.reload(true);
        }).catch(err => {
          self.$notify({
            message: err.message,
            type: 'error'
          });
        })

      },

      handleCurrentChange(val){
        const self = this;
        self.current_page = val;
        let tasksApi = self.$dispatch.listData + self.task_uid + '/';

        if (self.select_field && self.select_value){
          tasksApi += '?' + self.select_field + '=' + self.select_value;
        }

        if (self.current_page){
          tasksApi +=  tasksApi.indexOf('?') === -1 ? '?page=' + self.current_page : '&page=' + self.current_page;
        }

        let obj = self.parseTableData(tasksApi);

        self.total_count = obj.totalCount;
        self.spider_list_data = obj.tableData;
      },

    },

    computed: {
      spiderData(){
        return [];
      }
    }
  }
</script>

<style scoped>
  .spider_data {
    width:100%;
    max-width: 980px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  }

  .spider_data h3 {
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

  .spider-data-detail {
    padding: 20px;
    word-wrap: break-word;
    background-color: #fff;
    border: 1px solid #ddd;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  .handle-box{
    margin-bottom: 15px;
  }

  .handle-select{
    width: 120px;
  }

  .handle-input{
    width: 350px;
    display: inline-block;
  }

  .downloader{
    margin-right: -7%;
  }

  .json-render{
    background-color: papayawhip;
    display: block;
    margin: -2% -5.5% -2.1%;
  }

  span.el-breadcrumb__item:not(:first-child) {
    margin-top: 10px;
  }
</style>
