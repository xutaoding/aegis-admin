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
      <el-select v-model="select_cate" class="handle-select mr10">
        <el-option key="1" label="爬虫名称" value="spider_name"></el-option>
        <el-option key="2" label="爬虫 ID" value="spider_uuid"></el-option>
      </el-select>
      <el-input v-model="select_word" placeholder="模糊筛选" class="handle-input mr10"></el-input>
      <el-button type="primary" icon="search" @click="search">搜索</el-button>
    </div>

    <div class="ms-table">
      <el-table :data="tableData" border ref="multipleTable"  style="width: 100%">
        <el-table-column type="expand">
          <template scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称" >
                <span>Apple MOS</span>
              </el-form-item>

              <el-form-item label="商品说明">
                <span>美女专用</span>
              </el-form-item><br>

              <el-form-item label="商品说明">
                <span>美女专用</span>
              </el-form-item>

              <el-form-item label="商品说明">
                <span>美女专用</span>
              </el-form-item><br>

              <el-form-item label="爬虫描述：">
                若启用深度爬取，在爬虫的一级部后，会将用户指定的一个列表作为网址列表
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column label="爬虫名称" sortable prop="spider_name">
        </el-table-column>

        <el-table-column label="爬虫ID" sortable prop="spider_id">
        </el-table-column>

        <el-table-column label="状态" prop="spider_status" width="95">
          <template scope="scope">
            <el-tag
              :type="
                    scope.row.spider_status === 'running' ? 'success':
                    (scope.row.spider_status === 'stop' ? 'danger':
                    (scope.row.spider_status === 'delete' ? 'gray': '')
                    )
              "
              :close-transition="true" :hit="true">
              <span v-if="scope.row.spider_status === 'running'">{{scope.row.spider_status}}</span>
              <span v-else-if="scope.row.spider_status === 'stop'">&nbsp;&nbsp;&nbsp;{{scope.row.spider_status}}&nbsp;&nbsp;&nbsp;</span>
              <span v-else-if="scope.row.spider_status === 'cancel'">&nbsp;{{scope.row.spider_status}}&nbsp;&nbsp;</span>
              <span v-else-if="scope.row.spider_status === 'delete'" style="color: red">&nbsp;{{scope.row.spider_status}}&nbsp;&nbsp;</span>
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="创建时间" sortable prop="crt" width="162">
        </el-table-column>

        <el-table-column label="操作" width="210">
          <template scope="scope">
            <el-button
              size="small"
              type="text"
              @click="detailSpider(scope.$index, scope.row)">
              <span v-if="scope.row.spider_status !== 'delete'">详情</span>
            </el-button>

            <el-button
              size="small"
              type="text"
              @click="configureSpider(scope.$index, scope.row)">
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
              style="color: red"
              @click="deleteSpider(scope.$index, scope.row)">
              <span v-if="scope.row.spider_status !== 'delete'">删除</span>
              </el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>

      <el-pagination
        @current-change ="handleCurrentChange"
        class="pagination"
        layout="total, prev, pager, next, jumper"
        :total="500">
      </el-pagination>

  </div>


</template>

<script>
  export default {
    data: function () {
      return {
        tableData: [
          {
            crt: '2017-10-13 17:26:53',
            spider_id: 'ashggdjaskjyey',
            spider_name: '测试1',
            spider_status: 'stop'
          },

          {
            crt: '2017-10-13 17:26:53',
            spider_id: 'ashggdjaskjyey',
            spider_name: '测试2',
            spider_status: 'running'
          },

          {
            crt: '2017-10-13 17:26:53',
            spider_id: 'ashggdjaskjyey',
            spider_name: '测试3',
            spider_status: 'cancel'
          },

          {
            crt: '2017-10-13 17:26:53',
            spider_id: 'ashggdjaskjyey',
            spider_name: '测试4',
            spider_status: 'delete'
          },

        ]
      }
    },

    methods: {
      handleCurrentChange(val){
        this.cur_page = val;
        this.getData();
      },

      getData(){
        let self = this;
        if(process.env.NODE_ENV === 'development'){
          self.url = '/ms/table/list';
        }

        self.$axios.post(self.url, {page:self.cur_page}).then((res) => {
          self.tableData = res.data.list;
        })
      },

      detailSpider(index, row){
        this.$router.push('/spider-detail')
      },

      configureSpider(index, row){
        this.$router.push('/spider-configure');
      },

      logSpider(index, row){
        this.$router.push('/spider-log');
      },

      dataSpider(index, row){
        this.$router.push('/spider-data');
      },

      deleteSpider(index, row){

      },

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

</style>
