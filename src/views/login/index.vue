<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form"  autocomplete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">中北大学综合服务系统</h3>
      </div>
      <el-form-item prop="userNum">
        <el-input
          ref="userNum"
          v-model="loginForm.userNum"
          placeholder="用户名"
          name="userNum"
          type="text"
          tabindex="1"
          autocomplete="on"
          prefix-icon="el-icon-user-solid"
        />
      </el-form-item>
      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip=false"
            @keyup.enter.native="handleLogin"
            prefix-icon="el-icon-lock"
            showPassword
          >
          </el-input>
        </el-form-item>
      </el-tooltip>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>
      <div style="position:relative">
        <social-sign></social-sign>
<!--        <el-button class="thirdparty-button" type="primary" @click="showDialog=true">-->
<!--          其他方式登录-->
<!--        </el-button>-->
      </div>
    </el-form>
  </div>
</template>
<script>
  import SocialSign from './components/SocialSignin'
  export default {
    name: "Login",
    components: { SocialSign },
    data() {
      const validatePassword = (rule, value, callback) => {
        if(value.length < 6){
          callback(new Error('密码长度最少6位'))
        }else{
          callback()
        }
      }
      return {
        loginForm: {
          userNum: '',
          password: ''
        },
        loginRules: {
          userNum: [{ required: true, trigger: 'blur' }],
          password: [{ required: true, trigger: 'blur', validator: validatePassword }]
        },
        capsTooltip: false,
        passwordType: 'password',
        showDialog: false,
        loading: false,
        redirect: undefined,
        otherQuery: {}
      }
    },
    watch: {
      $route: {
        handler: function (route) {
          console.log(route)
          const query = route.query
          if (query) {
            this.redirect = query.redirect
            this.otherQuery = this.getOtherQuery(query)
          }
        },
        immediate: true
      }
    },
    mounted() {
      if(this.loginForm.userNum===''){
        this.$refs.userNum.focus()
      }else if (this.loginForm.password===''){
        this.$refs.password.focus()
      }
    },
    methods: {
      checkCapslock(e){
        const { key } = e
        this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
      },
      handleLogin(){
        this.$refs.loginForm.validate(valid => {
          if(valid) {
            this.loading = true
            this.$store.dispatch('user/login',this.loginForm)
              .then(() => {
                this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
                this.loading = false
              })
            .catch(() => {
              this.loading = false
            })
          }else{
            console.log('error submit!!')
            return false
          }
        })
      },
      getOtherQuery(query){
        return Object.keys(query).reduce((acc, cur) => {
          if (cur !== 'redirect') {
            acc[cur] = query[cur]
          }
          return acc
        }, {})
      }
    }
  }
</script>

<style lang="scss">
  $bg:#283443;
  $light_gray:#fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      /*width: 85%;*/

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        /*padding: 12px 5px 12px 15px;*/
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      /*overflow: hidden;*/
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .thirdparty-button {
      position: absolute;
      right: 0;
      bottom: -30px;
    }

    @media only screen and (max-width: 470px) {
      .thirdparty-button {
        display: none;
      }
    }
  }
</style>
