<template>
    <div class="mv-warp">
        <div class="container-warp list-warp">
            <div class="list-box" v-for="mv of list">
                <div class="img-box">
                    <img class="img" :src="mv.img_url">
                    <span class="time">{{mv.add_time.split(' ')[0]}}</span>
                    <div class="play"><span class="iconfont icon-mv"></span><span>{{mv.play_count}}</span></div>
                </div>
                <p class="van-ellipsis title" v-html="mv.name"></p>
            </div>
        </div>
        <loading v-show="list.length==0"></loading>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        props: {
            list: {type: Array, default: []}
        },
        methods: {
            mvClick(mv) {
                let that = this;
                that.selectMv({hash: mv.hash})
            },
            ...mapActions(['selectMv'])
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/less/color";

    .mv-warp {
        .list-warp {
            margin-top: 10px;
            .list-box {
                display: inline-block;
                width: calc(50% - 5px);
                margin-bottom: 15px;
                &:nth-child(odd) {
                    margin-right: 10px;
                }
                .img-box {
                    position: relative;
                    font-size: 0;
                    .img {
                        display: block;
                        border-radius: 4px;
                        width: 100%;
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