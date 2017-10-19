<template>
    <div class="header">
        <div class="logo">宙斯盾平台系统</div>
        <div class="user-info" v-if="username !== 'Anonymous'">
            <el-dropdown trigger="hover" @command="handleCommand">
                <span class="el-dropdown-link">
                  <img class="user-logo" src="../../../static/image/avatar_default_160x160.png">
                  {{username}}
                </span>

                <el-dropdown-menu slot="dropdown" >
                    <el-dropdown-item command="userinfo">用户信息</el-dropdown-item>
                    <el-dropdown-item command="loginout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>

      <div class="user-info" v-else>
        <span class="el-dropdown-link">
        <img class="user-logo" src="../../../static/image/avatar_default_160x160.png">
        <el-button type="text" @click="Login()">登录</el-button>
        </span>
      </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                name: 'Anonymous'
            }
        },
        computed:{
            username(){
                let _username = localStorage.getItem('ms_username');
                return _username ? _username : this.name;
            }
        },
        methods:{
            handleCommand(command) {
                if(command === 'loginout'){
                    localStorage.removeItem('ms_username');
                    this.$router.go(0);
                }
            },

          Login(){
            localStorage.removeItem('ms_username');
            this.$router.push('/login');
          }

        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 55px;
        font-size: 22px;
        line-height: 55px;
        color: #fff;
    }
    .header .logo{
        float: left;
        width:250px;
        text-align: center;
        margin-left: -15px;
        color: #20a0ff;
    }
    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
        margin-top: -7px;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 45px;
        padding-top: 7px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;

    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width:35px;
        height:35px;
        border-radius: 50%;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>
