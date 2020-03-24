<!--歌曲列表-->
<template>
    <div class="song-list-warp">
        <!--全部播放-->
        <div class="container-warp play-warp" v-show="!hidePlayAllBtn">
            <van-icon name="play-circle"/>
            <span @click="songClick(songList[0],0)">全部播放({{songList.length}})</span>
        </div>
        <!--歌曲列表区域-->
        <div class="container-warp songs-warp">
            <div class="songs-box" v-for="(song,index) of songList" @click="songClick(song,index)">
                <span class="index-box">{{index+1}}</span>
                <div class="info-box">
                    <p class="van-ellipsis name-box">{{song.name}}</p>
                    <p class="van-ellipsis singers-box">{{song.singers_text}} · {{song.album_name}}</p>
                </div>
                <div class="icon-box" v-show="currPlaySong.id == song.id">
                    <icon-rhythm></icon-rhythm>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import IconRhythm from '@/components/icon-rhythm';

    export default {
        components: {IconRhythm},
        props: {
            songList: {type: Array, default: []}, //  歌曲列表
            hidePlayAllBtn: {type: Boolean, default: false}, // 播放全部按钮是否显示
            clickPushList: {type: Boolean, default: true} // 点击后是否播放整个列表
        },
        computed: {
            ...mapGetters(['currPlaySong'])
        },
        methods: {
            songClick(song, index) {
                let that = this;
                if (that.clickPushList) {
                    that.selectPlay({list: that.songList, index: index})
                } else {
                    that.selectPlay({list: [that.songList[index]], index: 0})
                }
            },
            ...mapActions(['selectPlay'])
        },
        created() {
        }
    }
</script>

<style lang="less" scoped>

    .song-list-warp {
        .play-warp {
            padding: 14px 0 6px;
            .van-icon {
                display: inline-block;
                color: @cl-active-bg;
                font-size: 24px;
                vertical-align: middle;
            }
            span {
                display: inline-block;
                margin-left: 4px;
                color: @cl-title;
                font-size: 16px;
                vertical-align: middle;
            }
        }
        .songs-warp {
            .songs-box {
                display: flex;
                color: @cl-title;
                padding: 10px 0;
                .index-box {
                    width: 25px;
                    font-size: 14px;
                    line-height: 37px;
                }
                .info-box {
                    flex: 1;
                    overflow: hidden;
                    .name-box {
                        font-size: 14px;
                    }
                    .singers-box {
                        font-size: 12px;
                        color: @cl-text;
                    }
                }
                .icon-box {
                    width: 37px;
                    height: 37px;
                }
            }
        }
    }
</style>