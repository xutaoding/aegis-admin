<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-aegis-tasklist_fill"></i> 爬虫管理</el-breadcrumb-item>
        <el-breadcrumb-item>新建爬虫</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="ms-spider">
      <h3 style="color: #20a0ff;">新建爬虫</h3>

      <div class="ms-detail">
        <div class="ms-form">
          <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="90px" class="demo-ruleForm">
            <el-form-item label="爬虫名称" prop="spider_name">
              <el-input placeholder="请输入爬虫名称" v-model="ruleForm.spider_name"></el-input>
            </el-form-item>

            <el-form-item label="目标网址" prop="url">
              <el-input placeholder="请输入抓取网页的URL" v-model="ruleForm.url"></el-input>
            </el-form-item>

            <el-form-item v-if="fee_payed" label="请求方式" prop="request_method">
              <el-select v-model="ruleForm.request_method" style="width: 100%">
                <el-option v-for="meth in options" :key="meth" :label="meth" :value="meth">
                </el-option>
              </el-select>
            </el-form-item>

            <!--<el-form-item label="并发数" prop="concurrency">-->
              <!--<el-input v-model="ruleForm.concurrency"></el-input>-->
            <!--</el-form-item>-->

            <!--<el-form-item label="Robots协议" prop="robotstxt_obey">-->
              <!--<el-switch on-text="是" off-text="否" v-model="ruleForm.robotstxt_obey"></el-switch>-->
            <!--</el-form-item>-->

            <!--<el-form-item label="Cookie" prop="cookie">-->
              <!--<el-input v-model="ruleForm.cookie" type="textarea" :autosize="{ minRows: 3, maxRows: 5}"-->
                        <!--resize="none" placeholder="请输入爬虫中遇到的Cookie">-->
              <!--</el-input>-->
            <!--</el-form-item>-->

            <el-form-item label="爬虫描述" prop="spider_description">
              <el-input v-model="ruleForm.spider_description" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                        resize="none" placeholder="该爬虫任务的简要描述（最多30字）">
              </el-input>
            </el-form-item>

            <el-form-item>
              <div style="margin: 5% 0 0 30%">
                <el-button type="primary" class="start-spider" @click="startSpider('ruleForm')">开始爬取</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
  import $ from 'jquery'
  import Cookies from 'js-cookie'
  import encrypt, {decrypt} from '../../utils/crypto'

  export default {
    data: function () {
      var checkName = (rule, value, callback) => {
        if (!value.trim()) {
          return callback(new Error('爬虫名称不能为空'));
        }

        callback();
      };

      return {
        activeName: 'free',
        options: ['GET', 'POST'],

        ruleForm: {
          url: null,
          spider_name: '',
          request_method: 'GET',
          spider_description: '',
        },

        rules: {
          spider_name: [
            {required: true, message: '请输入爬虫名称', trigger: 'blur'},
            {validator: checkName, trigger: 'blur'}
          ],

          request_method: [
            {required: true, message: '请选择请求方式', trigger: 'blur'},
          ],

          url: [
            {required: true, message: '请输入目标网址', trigger: 'blur'},
            {type: 'url', trigger: 'blur'},
          ],

          spider_description: [
            {required: true, message: '请对该爬虫作简要描述', trigger: 'blur'},
            {max: 30, message: '最多30字的简述文字', trigger: 'blur'},
          ]
        }
      }
    },

    methods: {
      startSpider(formName){
        const self = this;

        self.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {'en_token': encrypt(JSON.stringify(self.ruleForm))};
            console.log(self.ruleForm);

            self.$axios.post(self.$dispatch.createSpider, data).then((resp) => {
              console.log(resp.data)
            }).catch((err) => {
              console.log(err);
              self.$notify({
                message: err.message,
                type: 'error'
              });
            });

            self.$router.push('/spider-rules');
          } else {
            console.log('字段错误!');
            return false;
          }
        });

      }
    },

    computed: {
      fee_payed(){
        let self = this;
        let is_payment = false;

        let encrypt_user = localStorage.getItem('ms_username');
        let decrypt_user = decrypt(encrypt_user);
        let isPaymentApi = self.$dispatch.aegisIsPayment.replace('{username}', decrypt_user);

        $.ajax({
            url: isPaymentApi,
            async:false,
            beforeSend: function(request) {
              request.setRequestHeader("Authorization", 'JWT-MSC ' + Cookies.get('JWT-MSC'));
            },
            success: function (resp) {
              is_payment = true;
            },
            error: function (xhr, status, err) {
              if (xhr.status === 401 && xhr.statusText === "Unauthorized") {
                self.$notify({message: '登录已过期， 请重新登录', type: 'error'});

                localStorage.removeItem('ms_username');
                localStorage.removeItem('JWT-MSC');
                window.location.href = '/';
              }
            }
        });

        return is_payment;
      }
    }

  }

</script>

<style scoped>
  .ms-spider {
    width:100%;
    max-width: 980px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  }

  .ms-spider h3{
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

  .ms-spider .ms-detail{
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

  .start-spider {
    width: 200px;
    height: 40px;
    border-radius: 8px;
  }

  span.el-breadcrumb__item:not(:first-child) {
    margin-top: 10px;
  }

</style>
