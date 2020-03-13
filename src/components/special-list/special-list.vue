<template>
    <div class="special-list-warp">
        <div class="container-warp list-warp">
            <div class="list-box" v-for="special of list"
                 @click="$router.push({name: 'special-list', params: {id: special.id}})">
                <div class="img-box">
                    <van-image class='img' :width="itemWidth" :height="itemWidth" :src="special.img_url" lazy-load/>
                    <div class="play"><span class="iconfont icon-headset"></span><span>{{special.play_count}}</span>
                    </div>
                </div>
                <p class="van-ellipsis title" v-html="special.name"></p>
            </div>
        </div>
        <loading v-show="list.length==0"></loading>
    </div>
</template>

<script>
    export default {
        props: {
            list: {type: Array, default: []}
        },
        data() {
            return {
                itemWidth: window.innerWidth * 0.94 / 3 - 7
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/less/color";

    .special-list-warp {
        .list-warp {
            margin-top: 10px;
            .list-box {
                display: inline-block;
                width: calc(100% / 3 - 7px);
                margin-bottom: 15px;
                margin-right: 10px;
                &:nth-child(3n+0) {
                    margin-right: 0;
                }
                .img-box {
                    position: relative;
                    font-size: 0;
                    .img {
                        border-radius: 4px;
                        overflow: hidden;
                    }
                    .time {
                        position: absolute;
                        font-size: 12px;
                        color: @cl-title;
                        left: 4px;
                        bottom: 4px;
                    }
                    .play {
                        position: absolute;
                        font-size: 12px;
                        color: @cl-title;
                        right: 4px;
                        bottom: 4px;
                        span {
                            display: inline-block;
                            vertical-align: middle;
                            &.iconfont {
                                position: relative;
                                top: 1px;
                                margin-right: 2px;
                            }
                        }
                    }
                }
                .title {
                    font-size: 13px;
                    color: @cl-title;
                    margin-top: 6px;
                }
            }
        }
    }
</style>