<template>
    <div class="cover-warp" :style='{"background-image":"url("+imgUrl+")"}'>
        <div class="cover-model"></div>
        <div class="flex-box">
            <card-square class="img-box" :imgUrl="imgUrl" :listenNum="playCount"></card-square>
            <div class="info-box">
                <p class="van-ellipsis title-box">{{name}}</p>
                <p class="user-box"><img
                        :src="userHeadImgUrl"><span>{{userName}}</span>
                </p>
                <p class="van-ellipsis desc-box" @click="$emit('descClick')">{{desc}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            imgUrl: {type: String, default: ''},
            playCount: {type: Number, default: 0},
            name: {type: String, default: ''},
            desc: {type: String, default: ''},
            userHeadImgUrl: {type: String, default: ''},
            userName: {type: String, default: ''},
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/less/color";

    .cover-warp {
        background-repeat: no-repeat;
        background-size: 100% auto;
        padding: 70px 0 60px;
        position: relative;
        overflow: hidden;
        .cover-model {
            position: absolute;
            top: -20px;
            left: -20px;
            right: -20px;
            bottom: -20px;
            z-index: 1;
            background: inherit;
            filter: blur(5px);
        }
        .flex-box {
            position: relative;
            z-index: 2;
            width: 80%;
            margin: 0 auto;
            display: flex;
            .img-box {
                width: 100px;
                font-size: 0;
                img {
                    display: block;
                    width: 100%;
                    border-radius: 4px;
                }
            }
            .info-box {
                flex: 1;
                margin-left: 20px;
                color: @cl-title;
                overflow: hidden;
                .title-box {
                    font-size: 16px;
                    font-weight: bold;
                }
                .user-box {
                    font-size: 0;
                    margin-top: 10px;
                    img {
                        display: inline-block;
                        width: 23px;
                        height: 23px;
                        border-radius: 50%;
                        vertical-align: middle;
                    }
                    span {
                        display: inline-block;
                        margin-left: 4px;
                        line-height: 25px;
                        font-size: 12px;
                        vertical-align: middle;
                    }
                }
                .desc-box {
                    margin-top: 24px;
                    font-size: 12px;
                    position: relative;
                    &::after {
                        position: absolute;
                        content: '>';
                        right: -1px;
                        top: -2px;
                        font-size: 14px;
                    }
                }
            }
        }
    }

</style>