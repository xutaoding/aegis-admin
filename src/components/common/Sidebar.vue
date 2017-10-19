<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem, i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
  import {decrypt} from '../../utils/crypto'

    export default {
        data() {
            let _username = localStorage.getItem('ms_username');
            let topSiders = [
            {
              icon: 'el-icon-aegis-homepage',
              index: 'index',
              title: '首页'
            },
          ];

            let permissionSiders = [
            {
              icon: 'el-icon-aegis-tasklist',
              index: '2',
              title: '爬虫管理',
              subs: [
                {
                  index: 'spider-create',
                  title: '新建爬虫'
                },
                {
                  index: 'spider-list',
                  title: '爬虫列表'
                }
              ]
            },

            {
              icon: 'el-icon-aegis-order',
              index: 'order',
              title: '我的订单',
            },

//            {
//              icon: 'el-icon-aegis-activity',
//              index: 'log',
//              title: '我的日志',
//            },

            {
              icon: 'el-icon-aegis-browse',
              index: 'monitor',
              title: '监控',
            },
          ];

            let bottomSiders = [
            {
              icon: 'el-icon-aegis-coupons',
              index: 'price',
              title: '价格'
            },

            {
              icon: 'el-icon-aegis-shop_fill',
              index: 'data-market',
              title: '数据市场'
            },

            {
              icon: 'el-icon-aegis-document',
              index: 'blog',
              title: '博客'
            },

            {
              icon: 'el-icon-aegis-feedback',
              index: '8',
              title: '教程 & FAQ',
              subs: [
                {
                  index: 'tutorial',
                  title: '教程'
                },
                {
                  index: 'faq',
                  title: 'FAQ'
                },
              ]
            },
          ];

            if (!_username) {
              return {
                items: topSiders.concat(bottomSiders)
              }
            }

            return {
                items:topSiders.concat(permissionSiders, bottomSiders)
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 210px;
        left: 0;
        top: 55px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
