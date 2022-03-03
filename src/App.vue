<template>
  <!-- 提供Layout和Login、500等页面 -->
  <template v-if="route.meta.full">
    <router-view />
  </template>
  <template v-else>
    <layout />
  </template>
</template>

<script setup lang="ts">
import Layout from '@views/Layout.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style lang="less">
  html, body, p, div, ul, li, header, section, aside, h1, h2, h3, h4, h5, h6, form {
    margin: 0;
    padding: 0;
  }

  body {
    min-width: 1200px;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  .el-table__row, thead {
    .cell {
      text-align: center;
    }
  }

  [class^='hzzn-'] {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    /* 约定，字体跟span，默认添加5px的间隙 */

    & + span {
      margin-left: 5px;
    }
  }

  .el-form {
    .el-select {
      width: 100% !important;
    }
  }
</style>
