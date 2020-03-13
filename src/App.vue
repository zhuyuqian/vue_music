<template>
    <div id="app">
        <!--顶部搜索-->
        <transition enter-active-class="animated fadeInDown"
                    leave-active-class="animated fadeOutUp">
            <top v-show="$route.meta.showTop" style="animation-duration: 0.3s" :title="$route.meta.TopTitle">
                <search slot="main" :list="hotSearchSongList" @click.native="searchBoxClick"></search>
            </top>
        </transition>
        <!--路由：缓存-->
        <transition name="fade">
            <keep-alive>
                <router-view style="animation-duration: 0.2s" class="router-view" v-if="$route.meta.keepAlive"
                             v-wechat-title="$route.meta.title"></router-view>
            </keep-alive>
        </transition>
        <!--路由：不缓存-->
        <transition name="fade">
            <router-view style="animation-duration: 0.2s" class="router-view" v-if="!$route.meta.keepAlive"
                         v-wechat-title="$route.meta.title"></router-view>
        </transition>
        <!--播放器-->
        <player></player>
    </div>
</template>

<script>
    import top from './components/index-top/top';
    import search from './components/search-box/search';
    import player from './components/player/player';

    export default {
        components: {top, search, player},
        data() {
            return {
                hotSearchSongList: []
            }
        },
        methods: {
            searchBoxClick() {
                let that = this;
                that.$router.push({name: 'search'})
            }
        },
        async created() {
            let that = this;
            that.hotSearchSongList = await that.$ajax.getSearchHot();
        }
    }
</script>
<style lang="less" scoped>
</style>
