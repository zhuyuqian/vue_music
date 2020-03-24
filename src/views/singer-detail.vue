<template>
    <div class="singer-detail-page" ref="page">
        <van-nav-bar class='header-warp' :class="{success:showHeader}" fixed
                     ref="headerWarp" :z-index="2" :title="singerInfo.name" left-arrow
                     @click-left="$router.back()"></van-nav-bar>
        <div class="top-warp" ref="coverWarp">
            <img class="singer-img" :src="singerInfo.img_url" alt="">
            <div class="singer-info">
                <p class="singer-name">{{singerInfo.name}}</p>
            </div>
        </div>
        <!--内容区域-->
        <van-tabs class="main-warp" v-model="showTabName" swipeable animated sticky :offset-top="46" @scroll="scroll">
            <van-tab title="歌曲" name="song">
                <music-list :songList="songList"></music-list>
            </van-tab>
            <van-tab title="专辑" name="album">
                <album-list :list="albumList"></album-list>
            </van-tab>
            <van-tab title="MV" name="mv">
                <mv-list :list="mvList"></mv-list>
            </van-tab>
            <van-tab title="关于Ta" name="about">
                <div class="about-warp container-warp">
                    <div class="title">歌手资料</div>
                    <div class="desc" v-html="singerInfo.desc"></div>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import {playListMixin} from "@/mixin/playList";
    import MvList from '@/components/mv-list';
    import AlbumList from '@/components/album-list';

    export default {
        mixins: [playListMixin],
        components: {MvList, AlbumList},
        data() {
            return {
                showHeader: false,
                singerInfo: {
                    img_url: '',
                    name: '',
                    song_count: 0,
                    mv_count: 0,
                    album_count: 0
                },
                songList: [],
                mvList: [],
                albumList: [],
                showTabName: 'song'
            }
        },
        watch: {
            showTabName(curr) {
                let that = this;
                if (curr == 'mv') {
                    that.getSingerMvList();
                }
                if (curr == 'album') {
                    that.getSingerAlbumList();
                }
            }
        },
        methods: {
            scroll({scrollTop, isFixed}) {
                let that = this;
                if (that.$refs['coverWarp']) {
                    that.$refs['headerWarp'].style = scrollTop > that.$refs['coverWarp'].offsetHeight ? 'background-color:#161823' : ''
                }
            },
            handlePlaylist(playList) {
                let that = this;
                let bottom = playList.length > 0 ? '60px' : '';
                that.$refs['page'].style['padding-bottom'] = bottom;
            },
            // 获取专辑列表
            async getSingerAlbumList() {
                let that = this;
                if (that.albumList.length == 0) {
                    let arr = await that.$ajax.getSingerAlbumList(that.singerInfo.id)
                    that.albumList = arr;
                }
            },
            // 获取mv列表
            async getSingerMvList() {
                let that = this;
                if (that.mvList.length == 0) {
                    let arr = await that.$ajax.getSingerMvList(that.singerInfo.name);
                    that.mvList = arr;
                }
            },
        },
        async mounted() {
            let that = this;
            let {singer_info, song_list} = await that.$ajax.getSingerInfo(that.$route.params.id);
            that.singerInfo = singer_info;
            that.songList = song_list;
            that.showHeader = true;
        }
    }
</script>

<style lang="less" scoped>
    @import "../assets/less/minxin";

    .singer-detail-page {
        .header-warp {
            .mixins-header-warp()
        }
        .top-warp {
            position: relative;
            width: 100%;
            height: 250px;
            font-size: 0;
            overflow: hidden;
            border-radius: 0 0 10px 10px;
            .singer-img {
                display: block;
                width: 100%;
            }
            .singer-info {
                position: absolute;
                left: 20px;
                bottom: 20px;
                z-index: 1;
                .singer-name {
                    font-size: 18px;
                    color: @cl-title;
                }
            }
        }
        .main-warp {
            /deep/ .van-sticky {
                .van-tabs__wrap {
                    .van-tabs__nav {
                        background-color: @cl-page-bg;
                        .van-tab {
                            color: @cl-desc;
                            font-size: 13px;
                            &.van-tab--active {
                                color: @cl-active-bg;
                            }
                        }
                        .van-tabs__line {
                            background-color: @cl-active-bg;
                            border-radius: 10px;
                        }
                    }
                    &::after {
                        border: none;
                    }
                }
            }
            .about-warp {
                padding: 10px 0 40px;
                .title {
                    font-size: 16px;
                    color: @cl-title;
                    font-weight: bold;
                }
                .desc {
                    margin-top: 6px;
                    font-size: 12px;
                    line-height: 22px;
                    color: @cl-text;
                }
            }
        }
    }
</style>