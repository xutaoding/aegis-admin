<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-aegis-tasklist_fill"></i> 爬虫管理</el-breadcrumb-item>
        <el-breadcrumb-item>新建爬虫</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="ms-tabs">
      <el-tabs type="card" v-model="activeName" @tab-click="selectTabs()">
        <el-tab-pane label="试用版" name="free"></el-tab-pane>
        <el-tab-pane label="付费版" name="pay-fee"></el-tab-pane>
      </el-tabs>
    </div>

      <div v-if="activeName === 'free'" class="ms-task">
        <h3 style="color: #20a0ff;">创建爬虫(试用版)</h3>

        <div class="ms-detail">
          <div class="ms-form">
            <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="90px" class="demo-ruleForm">
              <el-form-item label="爬虫名称" prop="name">
                <el-input placeholder="aegis-spider" v-model="ruleForm.name"></el-input>
              </el-form-item>

              <el-form-item label="目标网址" prop="url">
                <el-input placeholder="请输入所要抓取网页数据的url" v-model="ruleForm.url"></el-input>
              </el-form-item>

              <el-form-item label="下载延迟" prop="download_delay">
                <el-input v-model="ruleForm.download_delay"></el-input>
              </el-form-item>

              <el-form-item label="并发数" prop="concurrency">
                <el-input v-model="ruleForm.concurrency"></el-input>
              </el-form-item>

              <el-form-item label="Robots协议" prop="robotstxt_obey">
                <el-switch on-text="是" off-text="否" v-model="ruleForm.robotstxt_obey"></el-switch>
              </el-form-item>

              <el-form-item label="爬虫描述" prop="description">
                <el-input v-model="ruleForm.description" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                          resize="none" placeholder="该爬虫任务的简要描述">
                </el-input>
              </el-form-item>

              <el-form-item>
                <div style="margin: 5% 0 0 30%">
                  <el-button type="primary" class="start-spider">开始爬取</el-button>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>

    <div v-if="activeName === 'pay-fee' && isPayed" class="ms-task">
      <h3 style="color: #FF8C00;">创建爬虫(付费版)</h3>

      <div class="ms-detail">
        <div class="ms-form">
          <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="90px" class="demo-ruleForm">
            <el-form-item label="爬虫名称" prop="name">
              <el-input placeholder="aegis-spider" v-model="ruleForm.name"></el-input>
            </el-form-item>

            <el-form-item label="目标网址" prop="url">
              <el-input type="textarea" v-model="ruleForm.url" :autosize="{ minRows: 4, maxRows: 8}" resize="none"
                        placeholder="可以是相同采集规则的URL（换行）">
              </el-input>
            </el-form-item>

            <el-form-item label="下载延迟" prop="download_delay">
              <el-input v-model="ruleForm.download_delay"></el-input>
            </el-form-item>

            <el-form-item label="并发数" prop="concurrency">
              <el-input v-model="ruleForm.concurrency"></el-input>
            </el-form-item>

            <el-form-item label="Robots协议" prop="robotstxt_obey">
              <el-switch on-text="是" off-text="否" v-model="ruleForm.robotstxt_obey"></el-switch>
            </el-form-item>

            <el-form-item label="爬虫描述" prop="description">
              <el-input v-model="ruleForm.description" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                        resize="none" placeholder="该爬虫任务的简要描述">
              </el-input>
            </el-form-item>

            <el-form-item>
              <div style="margin: 5% 0 0 30%">
                <el-button type="primary" class="start-spider">开始爬取</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
  export default {
    data: function () {
      return {
        activeName: 'free',
        fee_payed: false,

        ruleForm: {
          url: null,
          name: '',
          download_delay: '0.0',
          robotstxt_obey: true,
          concurrency: 8,
          description: ''
        },

        rules: {
          name: {required: true, message: '请输入爬虫名称', trigger: 'blur'},
          url: {required: true, message: '请输入目标网址', trigger: 'blur'},
          description: {required: true, message: '请对该爬虫作简要描述', trigger: 'blur'},
        }
      }
    },

    methods: {
      selectTabs() {
        console.log(this.activeName);

        if (this.activeName === 'pay-fee'){
        }

      }
    },

    computed: {
      isPayed(){
        return true
      }
    }
  }

</script>

<style scoped>
  .ms-task {
    width:100%;
    max-width: 980px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  }

  .ms-task h3{
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

  .ms-task .ms-detail{
    padding: 20px;
    word-wrap: break-word;
    background-color: #fff;
    border: 1px solid #ddd;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  .ms-form {
    width: 80%;
    margin-top: 15px;
    margin-left: 10%;
    /*border: 1px solid #ddd;*/
    /*text-align: left;*/
  }

  .ms-tabs {
    width: 96%
  }

  .start-spider {
    width: 200px;
    height: 40px;
    border-radius: 8px;
  }

  span.el-breadcrumb__item:not(:first-child) {
    margin-top: 10px;
  }

</style>
