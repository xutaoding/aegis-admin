<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-aegis-tasklist_fill"></i> 爬虫管理</el-breadcrumb-item>
        <el-breadcrumb-item>爬虫数据</el-breadcrumb-item>
        <el-breadcrumb-item>数据编辑</el-breadcrumb-item>
        <el-breadcrumb-item>{{ task_uid }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ document_id }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="editor_detail">
      <div class="editor-form">
        <el-form :model="editor_data" ref="editor_data" label-width="100px" class="demo-editor_data">
          <el-form-item v-for="field in Object.keys(editor_data)" :key="field" :label="field" :prop="field" >
            <el-input
              v-model="editor_data[field]"
              :type="editor_data[field].length >= 60 ? 'textarea' : 'text'"
              :autosize="{ minRows: 2, maxRows: 4}"
              resize="none"
              :readonly="(field === 'id' || field === 'crt') ? true : false"
            >
            </el-input>
          </el-form-item>

          <el-form-item>
            <div style="margin: 0 0 0 25%">
              <el-button type="primary" class="editor-data" @click="editSpiderData()">提交</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>

    </div>

  </div>
</template>

<script>
  import encrypt from '../../utils/crypto'

  export default {
    data: function () {
      const self = this;

      let mongo_id = self.$route.params.id;
      let task_uid = self.$route.params.task_uid;
      let taskAPI = self.$dispatch.listData + task_uid + '/?id=' + mongo_id;
      let editor_data = self.getSpiderData(taskAPI);
      console.log(' edit data taskAPI:' + taskAPI);

      return {
        task_uid: task_uid,
        document_id: mongo_id,
        editor_data: editor_data,
      }
    },

    methods: {
      getSpiderData(requestUrl){
        const self = this;
        let target_data = {};

        self.$ajax.get(requestUrl, {}, false, resp => {
          console.log('data data');
          console.log(resp);
          if (resp.results) {
            let tmp_data = resp.results[0];
            let target = {id: tmp_data.id, crt: tmp_data.crt};



              Object.assign(target_data, target);
              Object.assign(target_data, tmp_data.result);
          }
        });

        return target_data;
      },

      editSpiderData(){
        const self = this;

        let taskApi = self.$dispatch.listData + self.task_uid;
        let encrypted = encrypt(JSON.stringify(self.editor_data));

        self.$axios.post(taskApi, {en_token: encrypted}).then(resp => {
          console.log(resp);
          if (resp.data.isSuccess) {
            self.$router.push('/edit-spider-data?task_uid=' + self.task_uid);
          }
        }).catch(err => {
          self.$notify({
            message: err.message,
            type: 'error'
          });
        })
      },

    },

    computed: {
    }
  }
</script>

<style scoped>
  .editor_detail {
    width:100%;
    max-width: 980px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  }

  .editor_detail h3 {
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

  .editor-form {
    padding: 20px;
    word-wrap: break-word;
    background-color: #fff;
    border: 1px solid #ddd;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  .editor-data {
    width: 260px;
    height: 40px;
    border-radius: 8px;
  }


  span.el-breadcrumb__item:not(:first-child) {
    margin-top: 10px;
  }
</style>
