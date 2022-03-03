<template>
  <div class="views-layout">
    <el-container>
      <el-header>
        <div>仅用于代码展示</div>
        <el-dropdown>
          <div class="el-dropdown-link">
            <div class="user-info">
              <el-avatar :size="30" :src="userInfo.avatar" />
              <span>{{userInfo.username}}</span>
            </div>
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click.stop.prevent="handleOutLogin">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="auto">
          <el-scrollbar>
            <div v-if="menu.length">
              <div class="expand-fold-box"
                   @click="isFold = !isFold">
                <el-icon>
                  <component :is="isFold ? Expand : Fold" />
                </el-icon>
              </div>
              <el-menu
                router
                unique-opened
                :collapse="isFold"
                :default-openeds="[menuActiveItem.parentId]"
                :default-active="`${menuActiveItem.parentId}-${menuActiveItem.id}`"
              >
                <el-sub-menu
                  v-for="subMenu in menu"
                  :index="`${subMenu.id}`"
                  :key="subMenu.id"
                >
                  <template #title>
                    <i :class="subMenu.icon" />
                    <span :class="{'el-menu--expand': !isFold}">{{ subMenu.label }}</span>
                  </template>
                  <template v-if="subMenu.children && subMenu.children.length">
                    <el-menu-item
                      v-for="item in subMenu.children"
                      :key="item.id"
                      :route="{path: item.path}"
                      :index="`${subMenu.id}-${item.id}`">
                      <i :class="item.icon" /><span>{{ item.label }}</span>
                    </el-menu-item>
                  </template>
                </el-sub-menu>
              </el-menu>
            </div>
            <el-empty v-if="!menu.length" description="真遗憾，没有发现菜单" />
          </el-scrollbar>
        </el-aside>
        <el-main>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item><a href="/">首页</a></el-breadcrumb-item>
            <template v-if="breadcrumb.label">
              <el-breadcrumb-item>{{ breadcrumb.parentLabel }}</el-breadcrumb-item>
              <el-breadcrumb-item>{{ breadcrumb.label }}</el-breadcrumb-item>
            </template>
          </el-breadcrumb>
          <div class="views-layout-content">
            <el-main>
              <router-view />
            </el-main>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Expand, Fold, ArrowDown } from '@element-plus/icons-vue'

const store = useStore()
const router = useRouter()
// 菜单数据
const menu = store.getters.menu || []
// store 通过computed成为响应式
const breadcrumb = computed(() => store.getters.breadcrumb)
const menuActiveItem = computed(() => store.getters.menuActiveItem)
// 菜单折叠展开
const isFold = ref<boolean>(false)

// 用户信息
const userInfo = store.getters.userInfo

// 退出登录
function handleOutLogin () {
  store.dispatch('userLoginOut')
  router.push('/login')
}
</script>

<style lang="less">
  .views-layout {
    --layout-height: 100vh;
    --layout-bg-color: #f0f2f5;
    --layout-padding-base: 10px;
    --el-header-height: 60px;
    --el-breadcrumb-height: 40px;

    min-height: var(--layout-height);
    background-color: var(--layout-bg-color);

    .el-container {
      > .el-main {
        padding: 0;

        .el-breadcrumb {
          padding-left: var(--layout-padding-base);
          padding-right: var(--layout-padding-base);
          height: var(--el-breadcrumb-height);
          line-height: var(--el-breadcrumb-height);
          box-shadow: var(--el-box-shadow-light);
          background-color: var(--el-color-white);
        }
      }
    }

    .views-layout-content {
      padding: var(--layout-padding-base);

      > .el-main {
        background-color: var(--el-color-white);
      }
    }

    .el-header {
      display: flex;
      justify-content: space-between;
      color: var(--el-color-white);
      background-color: var(--el-color-primary);
      border-bottom: 1px solid #EBEEF5;
      box-shadow: var(--el-box-shadow-light);
      line-height: var(--el-header-height);
      z-index: var(--el-index-top);

      .el-dropdown--default {
        display: flex;
        align-items: center;

        .el-dropdown-link {
          display: flex;
          align-items: center;
          color: var(--el-color-white);

          .user-info {
            display: flex;
            align-items: center;

            span {
              margin-left: 5px;
            }
          }
        }
      }
    }

    .el-aside {
      z-index: var(--el-index-normal);
      box-shadow: var(--el-box-shadow-light);
      background-color: var(--el-color-white);
      min-height: calc(100vh - var(--el-header-height));
    }

    .expand-fold-box {
      height: 50px;
      font-size: 30px;
      text-align: center;
      background: #F2F6FC;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .el-menu--expand {
      width: 139px;
    }
  }
</style>
