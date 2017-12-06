<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-aegis-tasklist_fill"></i> 爬虫管理</el-breadcrumb-item>
        <el-breadcrumb-item>爬虫列表与操作</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="handle-box">
      <!--<el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>-->

      <el-select v-model="spider_select_field" size="small" class="handle-select mr10">
        <el-option key="1" label="爬虫名称" value="spider_name"></el-option>
        <el-option key="2" label="爬虫 ID" value="spider_task_id"></el-option>
      </el-select>
      <el-input v-model="spider_select_value" size="small" placeholder="模糊筛选" class="handle-input mr10"></el-input>
      <el-button type="primary" icon="search" size="small" @click="search">搜索</el-button>
    </div>

    <div class="ms-table">
      <el-table :data="table_data" border stripe ref="multipleTable">
        <el-table-column type="expand">
          <template scope="props">
            <!--<div>{{ props.row}}</div>-->
            <el-table :data="[props.row]" class="inner-table" width="1000"
                      :row-style="{'background-color': 'lightgreen', 'color': 'orangered'}">
              <el-table-column label="任务uid" prop="spider_task_id" width="140">
              </el-table-column>

              <el-table-column label="方式" prop="request_method" width="65">
              </el-table-column>

              <el-table-column label="登录" width="60">
                <template scope="scope">
                  <span>{{ scope.row.login_username ? '是': '否' }}</span>
                </template>
              </el-table-column>

              <el-table-column label="任务描述" prop="spider_description">
              </el-table-column>
            </el-table>

            <!--<el-form label-position="right" inline class="demo-table-expand" style="color: orangered">-->
              <!--<el-form-item label="请求方式：">-->
                <!--<span>{{ props.row.request_method }}</span>-->
              <!--</el-form-item>-->

              <!--<el-form-item label="Cookies：" style="margin-left: 5%">-->
                <!--<span>&nbsp;&nbsp;{{ props.row.request_cookies ? '是': '否' }}</span>-->
              <!--</el-form-item>-->

              <!--<el-form-item label="是否登录：" style="margin-left: 5%">-->
                <!--<span>{{ props.row.login_username ? '是': '否' }}</span>-->
              <!--</el-form-item><br>-->

              <!--<el-form-item label="爬虫uuid：">-->
                <!--<span>{{ props.row.spider_task_id }}</span>-->
              <!--</el-form-item>-->

              <!--<el-form-item label="爬虫描述：" style="margin-left: 1%">-->
                <!--<span>{{ props.row.spider_description }}</span>-->
              <!--</el-form-item>-->
            <!--</el-form>-->
          </template>
        </el-table-column>

        <el-table-column label="创建时间" sortable width="185">
          <!--<el-table-column label="创建时间" sortable prop="crt" width="162">-->
          <template scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 5px">{{ scope.row.crt }}</span>
          </template>
        </el-table-column>

        <!--<el-table-column label="爬虫UID" sortable prop="spider_task_id">-->
        <!--</el-table-column>-->

        <el-table-column label="爬虫名称" sortable prop="spider_name">
        </el-table-column>

        <el-table-column label="状态" prop="spider_status">
          <template scope="scope">
            <el-tag
              :type="
                    scope.row.spider_status === 'Running' ? 'success':
                      (scope.row.spider_status === 'Finished' ? 'danger':
                        (scope.row.spider_status === 'Delete' ? 'danger':
                          (scope.row.spider_status === 'Cancel' ? 'gray':
                            (scope.row.spider_status === 'Pending' ? 'warning': 'warning')
                          )
                        )
                      )
              "
              :close-transition="true" :hit="true">
              <span v-if="scope.row.spider_status === 'Running'">{{scope.row.spider_status}}</span>
              <span v-else-if="scope.row.spider_status === 'Finished'">&nbsp;&nbsp;&nbsp;{{scope.row.spider_status}}&nbsp;&nbsp;&nbsp;</span>
              <span v-else-if="scope.row.spider_status === 'Cancel'">&nbsp;{{scope.row.spider_status}}&nbsp;&nbsp;</span>
              <span v-else-if="scope.row.spider_status === 'Delete'" style="color: red">&nbsp;{{scope.row.spider_status}}</span>
              <span v-else-if="scope.row.spider_status === 'Pending'">&nbsp;{{scope.row.spider_status}}</span>
              <span v-else style="color: #eb9e05">{{ scope.row.spider_status }}</span>
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="210">
          <template scope="scope">
            <el-button
              size="small"
              type="text"
              @click="configDetailSpider(scope.$index, scope.row)">
              <span v-if="scope.row.spider_status !== 'delete'">配置</span>
            </el-button>

            <el-button
              size="small"
              type="text"
              @click="logSpider(scope.$index, scope.row)">
              <span v-if="scope.row.spider_status !== 'delete'">日志</span>
            </el-button>

            <el-button
              size="small"
              type="text"
              @click="dataSpider(scope.$index, scope.row)">
              <span v-if="scope.row.spider_status !== 'delete'">数据</span>
            </el-button>

            <el-button
            size="small"
            type="text"
            style="color: #67c23a"
            @click="configureSpider(scope.$index, scope.row)">
            <span v-if="scope.row.spider_status !== 'delete'">启动</span>
            </el-button>

            <el-button
              size="small"
              type="text"
              style="color: red"
              @click="deleteSpider(scope.$index, scope.row)">
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
  import $ from 'jquery'
  import Cookies from 'js-cookie'

  export default {
    data: function () {
      const self = this;
      let tasksApi = self.$dispatch.listSpider;

      let obj = self.parseTableData(tasksApi);
      console.log('kkkkkkkkkkkkkkkkkkk');

      return {
        table_data: obj.tableData,
        total_count: obj.totalCount,
        spider_select_field: '',
        spider_select_value: '',
        current_page: null
      }
    },

    methods: {
      configDetailSpider(index, row){
        localStorage.setItem(row.spider_task_id, JSON.stringify(row));
        this.$router.push('/spider-configure?task_uid=' + row.spider_task_id)
      },

//      configureSpider(index, row){
//        this.$router.push('/spider-configure');
//      },

      logSpider(index, row){
        localStorage.setItem(row.spider_task_id, JSON.stringify(row));
        this.$router.push('/spider-log?task_uid=' + row.spider_task_id);
      },

      dataSpider(index, row){
        this.$router.push('/spider-data?task_uid=' + row.spider_task_id);
      },

      deleteSpider(index, row){

      },

      handleCurrentChange(val){
        const self = this;
        self.current_page = val;
        let tasksApi = self.$dispatch.listSpider;

        if (self.spider_select_field && self.spider_select_value){
          tasksApi += '?' + self.spider_select_field + '=' + self.spider_select_value;
        }

        if (self.current_page){
          tasksApi +=  tasksApi.indexOf('?') === -1 ? '?page=' + self.current_page : '&page=' + self.current_page;
        }

        let obj = self.parseTableData(tasksApi);

        self.table_data = obj.tableData;
        self.total_count = obj.totalCount;
      },

      search(){
        const self = this;
        let tasksApi = self.$dispatch.listSpider;

        if (self.spider_select_field && self.spider_select_value){
          tasksApi += '?' + self.spider_select_field + '=' + self.spider_select_value;
        }

        let obj = self.parseTableData(tasksApi);

        self.table_data = obj.tableData;
        self.total_count = obj.totalCount;
      },

      parseTableData(requestUrl){
        const self = this;
        let totalCount= 0;
        let tableDataList= [];

        self.$ajax.get(requestUrl, {}, false, resp => {
          if (resp.results) {
            tableDataList = resp.results;
            totalCount = resp.count;

            for (let index in tableDataList){
              let crt = tableDataList[index].crt;
              let regex = /\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\./g;
              if (regex.test(crt)) {
                tableDataList[index].crt = crt.substring(0, 10) + ' ' + crt.substring(11, 19);
              }

              tableDataList[index].spider_task_id = tableDataList[index].spider_task_id.replace(/-/g, '');
            }
          }
        });

        return {tableData: tableDataList, totalCount: totalCount};
      },

    },

    computed: {
    }

  }
</script>

<style>
  .ms-table {
    width:100%;
    max-width: 2000px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  }

  .handle-box{
    margin-bottom: 20px;
  }

  .handle-select{
    width: 120px;
  }

  .handle-input{
    width: 300px;
    display: inline-block;
  }

  span.el-breadcrumb__item:not(:first-child) {
    margin-top: 10px;
  }

  .demo-table-expand .el-form-item__label {
    color: #2a88bd;
  }

  .demo-table-expand * {
    font-size: 10px;
    margin-top: -5px;
    margin-bottom: -10px;
  }

  .el-tag {
    font-weight: bold;
  }

  .pagination li.btn-quicknext, .pagination .btn-quickprev {
    border: 0px;
  }

  .pagination .btn-next {
    width: 40px;
    border-left: 1px solid #d1dbe5;
  }

  .pagination .btn-prev {
    width: 40px;
    border-right: 1px solid #d1dbe5;
  }

  .inner-table {
    margin-top: -1%;
    font-size: 12px;

  }

  .inner-table table tr {
    height: 5px;
  }

  .el-table__expanded-cell th, .el-table__expanded-cell th .cell {
    /*background-color: orange;*/
    background-color: lightgreen;
  }

</style>
