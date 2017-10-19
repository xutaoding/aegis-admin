<template>
  <div class="login-wrap">
    <div class="ms-title">宙斯盾平台系统</div>
    <div class="ms-login">

      <p style="text-align: center;font-size: 20px;font-weight: bold;margin: -5% 0 5% 0">用户注册</p>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="17%" class="demo-ruleForm">

        <el-form-item prop="username" label="用户名">
          <el-input v-model="ruleForm.username" placeholder="username"></el-input>
        </el-form-item>

        <el-form-item prop="email" label="邮箱">
          <el-input v-model="ruleForm.email" placeholder="eg: example@163.com"></el-input>
        </el-form-item>

        <el-form-item prop="verify_code" label="验证码">
          <el-input v-model="ruleForm.verify_code" placeholder="mail verify code">
            <template slot="append">
              <!--<el-button @click="obtainValidationCode()" type="primary">获取验证码</el-button>-->
              <el-switch v-model="ruleForm.codeValue" off-color="#13ce66" on-color="#ff4949"
                         :disabled="ruleForm.switchDisabled"
                         off-text="ON" on-text="OFF" @change="changeSwitch()"></el-switch>
            </template>
          </el-input>

          <div style="margin: 0 0 -5% 55%;color: red" id="add-code-text">
            <label>提示：打开开关发送确认码</label>
          </div>
        </el-form-item>


        <el-form-item prop="password" label="密码">
          <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>

        <el-form-item prop="confirmPassword" label="确认密码">
          <el-input type="password" placeholder=" confirm password" v-model="ruleForm.confirmPassword" @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>

        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
        </div>


      </el-form>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import axios from 'axios'

  import encrypt from '../../utils/crypto'

  export default {
    data: function(){
      var checkUsername = (rule, value, callback) => {

        if (!value.trim()) {
          return callback(new Error('用户名不能为空'));
        } else if (!/^[a-zA-Z]/.test(value)){
          return callback(new Error('必须以大小写字母开头'));
        } else if (value.length < 5 || value.length > 20) {
          return callback(new Error('长度在4~20个字符'))
        } else if (!/[a-zA-Z]+/g.test(value)) {
          return callback(new Error('用户名至少包含字母'))
        }

        for (let s of value) {
          if (!/[a-zA-Z0-9\-_]/g.test(s)){
            return callback(new Error('不能包含中文或!@#￥&*等特殊字符'))
          }
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

      var confirmPassword = (rule, value, callback) => {

        if (!value.trim()) {
          return callback(new Error('确认密码不能为空'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      return {
        ruleForm: {
          username: '',
          password: '',
          confirmPassword: '',
          email: '',
          verify_code: '',
          switchDisabled: false,
          codeValue: false,
        },

        rules: {
          username: [
            { required: true, message: '5~20个字符，包含大小写字母开头、数字或_或-字符', trigger: 'blur' },
            {validator: checkUsername, trigger: 'blur'}
          ],

          password: [
            { required: true, message: '6~20个字符，包括大小写字母、数字和至少一个特殊字符', trigger: 'blur' },
            {validator: checkPassword, trigger: 'blur'}
          ],

          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
          ],

          confirmPassword: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            {validator: confirmPassword, trigger: 'blur'}
          ],

          verify_code: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ],

        }
      }
    },

    methods: {
      changeSwitch(){
        var self = this;

        if (!self.ruleForm.username.trim() || !self.ruleForm.email) {
          setTimeout(function () {
            self.ruleForm.codeValue = false;
          }, 800);

          self.$message({
            showClose: false,
            message: '请输入用户名和邮箱',
            type: 'warning'
          });
          return false;
        }

        setTimeout(function () {
          self.ruleForm.codeValue = false;
        }, 800);

        let eaEncrypt = encrypt(JSON.stringify({username: self.ruleForm.username, 'email': self.ruleForm.email}));
        self.$axios.post(self.$dispatch.sendMail, {en_token: eaEncrypt}).then(function (resp) {
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

      },

      submitForm(formName) {
        const self = this;

        self.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {
              'username': self.ruleForm.username,
              'password': self.ruleForm.password,
              'verify_code': self.ruleForm.verify_code,
              'email': self.ruleForm.email,
            };
            let registerEncrypt = encrypt(JSON.stringify(data));

            self.$axios.post(self.$dispatch.registerUser, {en_token: registerEncrypt}).then((resp) => {
                console.log(resp.data);
                if (!resp.data.isSuccess) {
                  self.$message({
                    showClose: false,
                    message: resp.data.message,
                    type: 'error'
                  });
                } else {
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
    height:420px;
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
    margin-left: 14%;
  }

</style>
