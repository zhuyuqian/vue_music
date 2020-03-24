<template>
    <div class="singers-page" ref="page">
        <van-nav-bar class='header-warp' :class="{success:indexList.length?true:false}" fixed :z-index="2"
                     title="歌手" left-arrow @click-left="$router.back()"></van-nav-bar>
        <van-index-bar class="singers-warp" :index-list="indexList" :sticky-offset-top="45">
            <div v-for="(singers,_index) of singerList" :key="_index">
                <van-index-anchor :index="_index">{{_index}}</van-index-anchor>
                <van-cell v-for="singer of singers" :key="singer.id">
                    <div class="singer-box" @click="$router.push({name:'singer-detail',params:{id:singer.id}})">
                        <van-image class="singer-img" width="50" height="50" lazy-load round
                                   :src="singer.img_url"></van-image>
                        <span class="singer-name">{{singer.name}}</span>
                    </div>
                </van-cell>
            </div>
        </van-index-bar>
        <loading v-show="indexList.length==0"></loading>
    </div>
</template>

<script>
    import {playListMixin} from "@/mixin/playList";

    export default {
        mixins: [playListMixin],
        data() {
            return {
                indexList: [],
                singerList: {}
            }
        },
        methods: {
            handlePlaylist(playList) {
                let that = this;
                let bottom = playList.length > 0 ? '60px' : '';
                that.$refs['page'].style['padding-bottom'] = bottom;
            },
        },
        async mounted() {
            let that = this;
            setTimeout(async () => {
                let singerList = await that.$ajax.getSingerList();
                let singerObj = {};
                let indexList = [];
                for (let item of singerList) {
                    if (singerObj[item._index]) {
                        singerObj[item._index].push(item)
                    } else {
                        indexList.push(item._index);
                        singerObj[item._index] = [item]
                    }
                }
                that.indexList = indexList;
                that.singerList = singerObj;
            }, 500)
        }
    }
</script>

<style lang="less" scoped>
    @import "../assets/less/minxin";

    .singers-page {
        position: relative;
        z-index: 1;
        width: 100%;
        .header-warp {
            width: 100%;
            .mixins-header-warp(@cl-page-bg);
        }
        .singers-warp {
            padding-top: 50px;
            /deep/ .van-index-bar__sidebar {
                background: @cl-card-bg;
                right: 10px;
                padding: 10px 0;
                border-radius: 10px;
                .van-index-bar__index {
                    padding: 4px;
                    color: @cl-desc;
                    &.van-index-bar__index--active {
                        color: @cl-active-bg;
                    }
                }
            }
            /deep/ .van-index-anchor {
                &.van-index-anchor--sticky {
                    line-height: 38px;
                    background: @cl-page-bg;
                    color: @cl-text;
                    &::after {
                        border-bottom: none;
                        box-shadow: 2px 2px 2px @cl-line;
                    }
                }
            }
            /deep/ .van-index-anchor {
                color: @cl-desc;
            }
            .van-cell {
                background: @cl-page-bg;
                &::after {
                    border-bottom: none;
                }
            }
            .singer-box {
                display: flex;
                .singer-name {
                    flex: 1;
                    margin-left: 10px;
                    font-size: 14px;
                    color: @cl-title;
                    line-height: 50px;
                }
            }
        }
    }
</style>