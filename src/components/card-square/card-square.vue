<template>
    <div class="card-box">
        <div class="img-box">
            <van-image class="img" width="110" height="110" lazy-load :src="imgUrl"></van-image>
            <div class="listen-box" v-if="listenNum">
                <i class="iconfont icon-headset"></i><span>{{listenNum}}</span>
            </div>
        </div>
        <p class="title" v-if="title">{{title}}</p>
    </div>
</template>

<script>
    export default {
        props: {
            imgUrl: {type: String, default: ''},
            listenNum: {type: Number, default: 0},
            title: {type: String, default: ''}
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/less/color";

    .card-box {
        width: 110px;
        .img-box {
            position: relative;
            font-size: 0;
            .img {
                border-radius: 4px;
                overflow: hidden;
            }
            .listen-box {
                position: absolute;
                left: 4px;
                bottom: 4px;
                color: @cl-title;
                .iconfont {
                    font-size: 14px;
                }
                span {
                    font-size: 12px;
                    display: inline-block;
                    margin-left: 2px;
                }
            }
        }
        .title {
            font-size: 12px;
            color: @cl-title;
            margin-top: 4px;
        }
    }
</style>