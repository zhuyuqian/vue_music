import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {path: '/', redirect: '/index'},
    {
        meta: {title: '首页', showTabs: true, showTop: true, TopTitle: '音乐馆', keepAlive: true},
        path: '/index', name: 'index',
        component: () => import('../views/index/index.vue'),
    },
    {
        meta: {title: '排行榜', keepAlive: true},
        path: '/rank-list', name: 'rank-list',
        component: () => import('../views/rank-list/rank-list.vue')
    },
    {
        meta: {title: '排行榜', keepAlive: false},
        path: '/rank-detail/:id', name: 'rank-detail',
        component: () => import('../views/rank-detail/rank-detail.vue')
    },
    {
        meta: {title: '分类歌单', keepAlive: true},
        path: '/tag-list', name: 'tag-list',
        component: () => import('../views/tag-list/tag-list.vue')
    },
    {
        meta: {title: '歌单', keepAlive: false},
        path: '/tag-detail/:id', name: 'tag-detail',
        component: () => import('../views/tag-detail/tag-detail.vue')
    },
    {
        meta: {title: '歌单', keepAlive: false},
        path: '/special-list/:id', name: 'special-list',
        component: () => import('../views/special-list/special-list')
    },
    {
        meta: {title: '专辑', keepAlive: false},
        path: '/album-list/:id', name: 'album-list',
        component: () => import('../views/album-list/album-list.vue')
    },
    {
        meta: {title: '歌手', TopTitle: '音乐馆', keepAlive: true},
        path: '/singer-list', name: 'singer-list',
        component: () => import('../views/singer-list/singer-list.vue')
    },
    {
        meta: {title: '歌手详情', keepAlive: false},
        path: '/singer-detail/:id', name: 'singer-detail',
        component: () => import('../views/singer-detail/singer-detail.vue')
    },
    {
        meta: {title: '搜索', keepAlive: true},
        path: '/search', name: 'search',
        component: () => import('../views/search/search.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router