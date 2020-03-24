<template>
    <div class="search-page">
        <div class="search-warp">
            <div class="search-box">
                <i class="iconfont icon-search"></i>
                <input placeholder="请输入要搜索的歌曲名" class="search-input" type="text" @change="inputChange"
                       v-model="keyword">
                <i class="iconfont icon-listen"></i>
            </div>
            <div class="back-btn" @click="$router.back()">返回</div>
        </div>
        <div class="song-warp" ref="page">
            <scroll ref="songScroll" class="scroll-warp" :data="songList">
                <music-list :songList="songList" :hidePlayAllBtn="true" :clickPushList="false"></music-list>
            </scroll>
        </div>
    </div>
</template>

<script>
    import {playListMixin} from "@/mixin/playList";

    export default {
        mixins: [playListMixin],
        data() {
            return {
                keyword: '',
                songList: []
            }
        },
        methods: {
            handlePlaylist(playList) {
                let that = this;
                let bottom = playList.length > 0 ? '50px' : '';
                that.$refs['page'].style.bottom = bottom;
                that.$refs['songScroll'].refresh()
            },
            async inputChange() {
                let that = this;
                that.songList = await that.$ajax.searchSongList(that.keyword);
            }
        }
    }
</script>

<style lang="less" scoped>

    @top-height: 46px;
    .search-page {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        .search-warp {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: @top-height;
            display: flex;
            overflow: hidden;
            padding: 0 10px;
            .search-box {
                flex: 1;
                display: flex;
                margin-top: 6px;
                background: @cl-card-bg;
                border-radius: @top-height;
                height: 34px;
                line-height: 34px;
                .search-input {
                    flex: 1;
                    height: 34px;
                    border: none;
                    background: none;
                    color: @cl-desc;
                    font-size: 13px;
                    &::placeholder {
                        color: @cl-desc;
                    }
                }
                .iconfont {
                    width: @top-height;
                    text-align: center;
                    font-size: 19px;
                    color: @cl-desc;
                }
            }
            .back-btn {
                width: @top-height;
                line-height: @top-height;
                font-size: 14px;
                color: @cl-title;
                text-align: center;
            }
        }
        .song-warp {
            position: fixed;
            top: @top-height;
            left: 0;
            right: 0;
            bottom: 0;
            .scroll-warp {
                height: 100%;
                overflow: hidden;
            }
        }
    }
</style>