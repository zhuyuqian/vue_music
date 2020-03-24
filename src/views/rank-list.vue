<template>
    <div class="rank-page" ref="page">
        <van-nav-bar class='header-warp' :class="{success:rankList.length!=0}" fixed :z-index="2" title="排行榜" left-arrow
                     @click-left="$router.back()"></van-nav-bar>
        <scroll ref="scroll" class="scroll-warp" :data="rankList">
            <rank-list :list="rankList"></rank-list>
        </scroll>
    </div>
</template>

<script>
    import {playListMixin} from "@/mixin/playList";
    import RankList from '@/components/rank-list'

    export default {
        mixins: [playListMixin],
        components: {RankList},
        data() {
            return {
                rankList: []
            }
        },
        methods: {
            handlePlaylist(playList) {
                let that = this;
                let bottom = playList.length > 0 ? '51px' : '';
                that.$refs['page'].style.bottom = bottom;
                that.$refs['scroll'].refresh()
            },
        },
        async mounted() {
            let that = this;
            that.rankList = await that.$ajax.getRankList();
            that.$nextTick(function () {
                that.$refs['scroll'] && that.$refs['scroll'].refresh()
            })
        }
    }
</script>

<style lang="less" scoped>
    @import "../assets/less/minxin";

    .rank-page {
        position: fixed;
        top: 50px;
        width: 100%;
        bottom: 0;
        .header-warp {
            .mixins-header-warp()
        }
        .scroll-warp {
            height: 100%;
            overflow: hidden;
        }
    }
</style>