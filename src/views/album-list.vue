<template>
    <!--专辑-->
    <div class="special-list-page" ref="page">
        <van-nav-bar class='header-warp' :class="{success:showHeader}" fixed
                     ref="headerWarp" :z-index="2" :title="specialInfo.name" left-arrow
                     @click-left="$router.back()"></van-nav-bar>
        <scroll ref="scroll" class="scroll-warp" listenScroll :probeType="2" @scroll="scroll" :data="songList">
            <div>
                <div v-if="songList.length!=0">
                    <!--顶部简介区域-->
                    <special-top
                            ref="coverWarp" @descClick="detailShow=true"
                            :imgUrl="specialInfo.img_url"
                            :playCount="specialInfo.play_count"
                            :name="specialInfo.name"
                            :desc="specialInfo.desc"
                            :userHeadImgUrl="specialInfo.user_headimgurl"
                            :userName="specialInfo.user_name"></special-top>
                    <!--歌曲播放列表-->
                    <music-list :songList="songList"></music-list>
                </div>
                <loading v-show="songList.length==0"></loading>
            </div>
        </scroll>
        <transition name="full">
            <special-detail v-show="detailShow" @close="detailShow=false"
                            :imgUrl="specialInfo.img_url"
                            :playCount="specialInfo.play_count"
                            :name="specialInfo.name"
                            :desc="specialInfo.desc"
                            :userHeadImgUrl="specialInfo.user_headimgurl"
                            :userName="specialInfo.user_name"
                            :tagList="specialInfo.tag_list"
                            :songList="songList"></special-detail>
        </transition>
    </div>
</template>

<script>
    import {playListMixin} from "@/mixin/playList";
    import SpecialTop from '@/components/special-top';
    import SpecialDetail from '@/components/special-detail';

    export default {
        mixins: [playListMixin],
        components: {SpecialTop, SpecialDetail},
        data() {
            return {
                showHeader: false,
                detailShow: false,
                specialInfo: {
                    tag_list: []
                },
                songList: [],
            }
        },
        methods: {
            handlePlaylist(playList) {
                let that = this;
                let bottom = playList.length > 0 ? '51px' : '';
                that.$refs['page'].style.bottom = bottom;
                that.$refs['scroll'].refresh()
            },
            scroll(pos) {
                let that = this;
                let Y = -pos.y;
                if (!that.Y) {
                    that.showHeader = false;
                } else {
                    that.showHeader = that.Y >= Y;
                }
                that.Y = Y;
                that.$refs['headerWarp'].style = Y > that.$refs['coverWarp'].$el.offsetHeight ? 'background-color:#161823' : ''
            },
        },
        async mounted() {
            let that = this;
            that.$ajax.getAlbumSongList(that.$route.params.id);
            // let {special_info, song_list} = await that.$ajax.getPlistList(that.$route.params.id);
            // that.specialInfo = special_info;
            // that.songList = song_list;
            // that.showHeader = true;
            // that.$nextTick(function () {
            //     that.$refs['slider'] && that.$refs['slider'].refresh()
            // })
        }
    }
</script>

<style lang="less" scoped>

    .special-list-page {
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        .scroll-warp {
            height: 100%;
            overflow: hidden;
        }

    }
</style>