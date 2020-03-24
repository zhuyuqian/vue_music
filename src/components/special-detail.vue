<template>
    <div class="special-detail-popup"
         :style='{"background-image":"url("+imgUrl+")" }'>
        <van-icon class="popup-close-btn" @click="$emit('close')" name="arrow-down"/>
        <div class="desc-model"></div>
        <scroll class="special-detail-scroll" :data="songList">
            <div class="desc-box">
                <img class="cover-img" :src="imgUrl">
                <p class="title-box">{{name}}</p>
                <p class="user-box"><img
                        :src="userHeadImgUrl"><span>{{userName}}</span>
                </p>
                <p class="tag-box"><span v-for="tag of tagList">{{tag.name}}</span></p>
                <p class="desc-text-box" v-html="desc"></p>
            </div>
        </scroll>
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
            tagList: {type: Array, default: []},
            songList: {type: Array, default: []}
        }
    }
</script>

<style lang="less" scoped>

    .special-detail-popup {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: @cl-page-bg;
        background-repeat: no-repeat;
        background-size: auto 100%;
        z-index: 2;
        overflow: hidden;
        .popup-close-btn {
            position: absolute;
            top: 20px;
            left: 20px;
            font-size: 30px;
            font-weight: bold;
            color: @cl-text;
            z-index: 3;
        }
        .special-detail-scroll {
            height: 100%;
            overflow: hidden;
            .desc-box {
                position: relative;
                z-index: 2;
                text-align: center;
                padding: 100px 20px 80px;
                .cover-img {
                    width: 100px;
                    border-radius: 4px;
                }
                .title-box {
                    font-size: 16px;
                    color: @cl-title;
                    margin-top: 10px;
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
                        color: @cl-title;
                    }
                }
                .tag-box {
                    margin-top: 20px;
                    span {
                        display: inline-block;
                        font-size: 12px;
                        margin: 0 6px;
                        color: @cl-title;
                        border: 1px solid @cl-title;
                        padding: 2px 12px;
                        border-radius: 20px;
                    }
                }
                .desc-text-box {
                    margin-top: 20px;
                    font-size: 13px;
                    color: @cl-text;
                    line-height: 20px;
                }
            }
        }
        .desc-model {
            position: absolute;
            top: 0px;
            left: 0px;
            right: 0px;
            bottom: 0px;
            z-index: 2;
            background: inherit;
            filter: blur(10px);
        }
    }
</style>