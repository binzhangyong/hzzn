import { createApp } from 'vue'
import axios from '@http/index'
import VueAxios from 'vue-axios'
import 'animate.css'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(VueAxios, axios)
app.use(ElementPlus, { locale: zhCn })
// 提供全局Axios
app.provide('requestGlobal', app.config.globalProperties.axios)
app.mount('#app')
