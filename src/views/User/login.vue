<template>
  <div class="views-user-login">
    <div class="form-container animate__animated animate__bounceInDown"
    >
      <h2>汇智互娱智能<span> V1.0</span></h2>
      <el-form
        ref="formRef"
        :rules="rules"
        size="large"
        :model="loginForm"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            clearable
            :prefix-icon="UserFilled"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            autocomplete="off"
            placeholder="请输入密码"
            :prefix-icon="WalletFilled"
            clearable
            show-password
          />
        </el-form-item>
      </el-form>
      <el-button
        size="large"
        type="primary"
        @click="submitForm(formRef)"
      >登 录
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import qs from 'qs'
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'
import type { ElForm } from 'element-plus'
import { UserFilled, WalletFilled } from '@element-plus/icons-vue'
// import { userLoginGetCode, userLoginCheck, userLoginToken } from '@/api'
import { userLoginToken, userMenuGetMenu } from '@/api'
import { encryptionPassword } from '@ts/util'
import store from '@/store'

type FormInstance = InstanceType<typeof ElForm>

const router = useRouter()

const formRef = ref<FormInstance>()

const loginForm = reactive({
  username: '',
  password: ''
})

const rules = reactive({
  username: {
    required: true,
    message: '请输入用户名',
    trigger: 'blur'
  },
  password: {
    required: true,
    message: '请输入密码',
    trigger: 'blur'
  }
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (!valid) return false
    // 一、查询校验接口的code字段
    // const codeRes = await userLoginGetCode()
    // if (!codeRes) return
    // const { repCode, repData } = codeRes
    // if (repCode === '0000') {
    //   // 二、对code和token进行校验
    //   const checkRes = await userLoginCheck({
    //     captchaType: 'blockPuzzle',
    //     pointJson: 'iafvaH94Ong6GaW+DzradrW3TKt6D6Mj9hfXt1AdAyA=',
    //     token: repData.token
    //   })
    //   if (!checkRes) return
    //   console.log(checkRes)
    // 三、token校验，登录
    const loginData = await userLoginToken(
      {
        randomStr: 'blockPuzzle',
        code: 'custom-code',
        grant_type: 'password'
      },
      qs.stringify({
        username: loginForm.username,
        password: encryptionPassword('huizhihuyu201707', loginForm.password)
      })
    )
    if (!loginData) return
    // 更新本地缓存用户信息
    await store.dispatch('updateUserStorage', loginData)
    // 查询用户菜单
    const menu = await userMenuGetMenu()
    if (menu) {
      await store.dispatch('updateMenu', menu)
    }
    // 跳转到首页
    await router.push('/')
    // }
  })
}
</script>

<style lang="less" scoped>
  .views-user-login {
    height: 100vh;
    display: flex;
    align-items: center;

    .form-container {
      width: 380px;
      margin: 0 auto;
      padding: 40px;
      position: relative;
      box-shadow: var(--el-box-shadow-light);
      border-radius: 3px;

      h2 {
        margin-bottom: 30px;

        span {
          font-size: var(--el-font-size-base);
        }
      }

      .el-select--large {
        width: 100%;
      }

      .el-button--large {
        width: 100%;
        font-weight: bold;
        font-size: var(--el-font-size-large);
      }
    }
  }
</style>
