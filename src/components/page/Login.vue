<template>
  <div class="login-wrap">
    <div class="ms-title">宙斯盾平台系统</div>
    <div class="ms-login">

      <p style="text-align: center;font-size: 20px;font-weight: bold;margin: -5% 0 5% 0">登录</p>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="18%" class="demo-ruleForm">

        <el-form-item prop="username" label="用户名">
          <el-input v-model="ruleForm.username" placeholder="username"></el-input>
        </el-form-item>

        <el-form-item prop="password" label="密码">
          <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>

        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>

        <div class="btn-bottom">
          <el-button type="text" @click="forgetPassword()">忘记密码</el-button>
          <el-button type="text" @click="register()">立即注册</el-button>
        </div>

      </el-form>
    </div>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'
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
        }

        callback();
      };

      return {
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
//            { required: true, message: '请输入用户名', trigger: 'blur' },
            {required: true, validator: checkUsername, trigger: 'blur'}
          ],
          password: [
//            { required: true, message: '请输入密码', trigger: 'blur' },
            {required: true, validator: checkPassword, trigger: 'blur'}
          ]
        }
      }
    },

    methods: {
      submitForm(formName) {
        const self = this;

        self.$refs[formName].validate((valid) => {
          if (valid) {
            let encrypted = encrypt(JSON.stringify(self.ruleForm));

            self.$axios.post(self.$dispatch.login, {en_token: encrypted}).then((resp) => {
                  if (resp.data.token) {
                    localStorage.setItem('ms_username', encrypt(self.ruleForm.username));
                    Cookies.set('JWT-MSC', resp.data.token);
                    self.$router.push('/index');
                  }

            }).catch((err) => {
                let message = err.non_field_errors.join();

                self.$notify({message: message, type: 'error'});
            });

          } else {
            console.log('error submit!!');
            return false;
          }

        });
      },

      register(){
        const self = this;
        self.$router.push('/register');
      },

      forgetPassword(){
        const self = this;
        self.$router.push('/forget-password');
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
    top:50%;
    width:100%;
    margin-top: -230px;
    text-align: center;
    font-size:30px;
    color: #fff;

  }
  .ms-login{
    position: absolute;
    left:42%;
    top:50%;
    width:500px;
    height:280px;
    margin:-150px 0 0 -150px;
    padding:40px;
    border-radius: 5px;
    background: #fff;
  }
  .login-btn{
    text-align: center;
  }
  .login-btn button{
    width:85%;
    height:36px;
    margin-left: 15%;
  }

  .btn-bottom{
    font-size:14px;
    line-height:30px;
    color:#999;
    margin-top: 3%;
    text-align: center
  }

</style>
