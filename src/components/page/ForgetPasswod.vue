<template>
  <div class="login-wrap">
    <div class="ms-title">宙斯盾平台系统</div>
    <div class="ms-login">

      <p style="text-align: center;font-size: 20px;font-weight: bold;margin: -5% 0 5% 0">修改密码</p>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="15%" class="demo-ruleForm">

        <el-form-item prop="username" label="用户名">
          <el-input v-model="ruleForm.username" placeholder="username"></el-input>
        </el-form-item>

        <el-form-item prop="verify_code" label="验证码">
          <el-input v-model="ruleForm.verify_code" placeholder="mail verify code">
            <template slot="append">
              <!--<el-button @click="obtainValidationCode()" type="primary">获取验证码</el-button>-->
              <el-switch v-model="codeValue" off-color="#13ce66" on-color="#ff4949"
                         off-text="ON" on-text="OFF" @change="changeSwitch()"></el-switch>
            </template>
          </el-input>

          <div style="margin: 0 0 -5% 55%;color: orangered">提示：打开开关发送确认码</div>
        </el-form-item>

        <el-form-item prop="password" label="新密码">
          <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>

        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">修改密码</el-button>
        </div>


      </el-form>
    </div>
  </div>
</template>

<script>
  import encrypt from '../../utils/crypto'

  export default {
    data: function(){
      var checkUsername = (rule, value, callback) => {

        if (!value.trim()) {
          return callback(new Error('用户名不能为空'));
        }

        callback();
      };

      var checkPassword = (rule, value, callback) => {

        if (!value.trim()) {
          return callback(new Error('密码不能为空'));
        } else if (value.length < 6 || value.length > 20) {
          return callback(new Error('密码长度在6~20个字符'))
        } else if (/[\u4E00-\u9FFF]/g.test(value) || /[{}.,;:'"()+=|\\\[\]?<>~`]/g.test(value)) {
          return callback(new Error('密码不能包含中文和特殊字符'))
        }

        callback();
      };

      return {
        ruleForm: {
          username: '',
          password: '',
          verify_code: ''
        },

        codeValue: false,

        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            {validator: checkUsername, trigger: 'blur'}
          ],

          password: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
            {validator: checkPassword, trigger: 'blur'}
          ],

          verify_code: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ],
        }
      }
    },

    methods: {
      submitForm(formName) {
        const self = this;

        self.$refs[formName].validate((valid) => {
          if (valid) {
            let encryptData = encrypt(JSON.stringify({
              verify_code: self.ruleForm.verify_code,
              username: self.ruleForm.username, password: self.ruleForm.password
            }));

            self.$axios.post(self.$dispatch.forgetPassword, {'en_token': encryptData}).then((resp) => {
              if (!resp.data.isSuccess) {
                self.$message({
                  showClose: false,
                  message: resp.data.message,
                  type: 'error'
                });
              } else {
                localStorage.setItem('ms_username',self.ruleForm.username);
                self.$router.push('/login');
              }
            }).catch((err) => {
                self.$notify({
                  message: err.toString(),
                  type: 'error',
                });
            });

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      changeSwitch(){
        const self = this;
        setTimeout(function () {
          self.codeValue = false;
        }, 800);

        if (!self.ruleForm.username) {
          self.$message({
            showClose: false,
            message: '请输入用户名',
            type: 'warning'
          });
          return false;
        }

        let encryptData = encrypt(JSON.stringify({username: self.ruleForm.username, forgetter: true}));
        self.$axios.post(self.$dispatch.sendMail, {'en_token': encryptData}).then((resp) => {
            if (!resp.data.isSuccess) {
                self.$message({
                  showClose: false,
                  message: resp.data.message,
                  type: 'error'
                });
            } else {
                self.$message({
                  showClose: false,
                  message: resp.data.message,
                  type: 'success'
                });
            }

        }).catch((err) => {
            self.$notify({
              message: err.toString(),
              type: 'error',
            });
        });

      }
    }
  }
</script>

<style scoped>
  .login-wrap{
    position: relative;
    width:100%;
    height:100%;
  }
  .ms-title{
    position: absolute;
    top:48%;
    width:100%;
    margin-top: -230px;
    text-align: center;
    font-size:30px;
    color: #fff;

  }
  .ms-login{
    position: absolute;
    left:40%;
    top:45%;
    width:550px;
    height:320px;
    margin:-150px 0 0 -150px;
    padding:40px;
    border-radius: 5px;
    background: #fff;
  }
  .login-btn{
    text-align: center;
  }
  .login-btn button{
    width:80%;
    height:36px;
    margin-left: 10%;
  }

</style>
