<template>
    <div class="rank-detail-page" ref="page">
        <van-nav-bar class='header-warp' :class="{success:showHeader}" fixed
                     ref="headerWarp" :z-index="2" :title="rankInfo.name" left-arrow
                     @click-left="$router.back()"></van-nav-bar>
        <scroll ref="scroll" :probeType="3" listenScroll @scroll="scroll" class="scroll-warp" :data="songList">
            <div>
                <div class="img-box" :style='{"background-image":"url("+rankInfo.img_url+")"}' ref="imgWarp"></div>
                <music-list :songList="songList"></music-list>
            </div>
        </scroll>
    </div>
</template>

<script>
    import {playListMixin} from "../../mixin/playList";

    export default {
        mixins: [playListMixin],
        data() {
            return {
                showHeader: false,
                rankInfo: {},
                songList: []
            }
        },
        methods: {
            handlePlaylist(playList) {
                let that = this;
                let bottom = playList.length > 0 ? '51px' : '';
                that.$refs['page'].style.bottom = bottom;
                that.$refs['scroll'].refresh()
            },
            scroll({x, y}) {
                let that = this;
                let Y = -y;
                if (!that.Y || that.Y < Y) {
                    that.showHeader = false;
                } else {
                    that.showHeader = true;
                }
                if (Y <= that.$refs['imgWarp'].offsetHeight) {
                    that.showHeader = true;
                    that.$refs['headerWarp'].style = '';
                } else {
                    that.$refs['headerWarp'].style = 'background-color:#161823';
                }
                that.Y = Y;
            }
        },
        async mounted() {
            let that = this;
            let {rank_info, song_list} = await that.$ajax.getRankInfo(that.$route.params.id);
            that.rankInfo = rank_info;
            that.songList = song_list;
            that.showHeader = true;
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/less/color";
    @import "../../assets/less/minxin";

    .rank-detail-page {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        bottom: 0;
        .header-warp {
            .mixins-header-warp()
        }
        .scroll-warp {
            height: 100%;
            overflow: hidden;
            position: relative;
            .img-box {
                width: 100%;
                height: 200px;
                background-color: @cl-page-bg;
                background-repeat: no-repeat;
                background-size: 100% auto;
                background-position: center center;
            }
            .music-list {
                padding-top: 200px;
            }
        }
    }
</style>