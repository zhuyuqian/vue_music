<template>
    <div class="top-warp">
        <div class="container-warp top-box">
            <div class="title-box" v-if="title">{{title}}</div>
            <div class="main-box">
                <slot name="main"></slot>
            </div>
            <div class="control-box" v-if="controlIcon">
                <i class="iconfont" :class="`icon-${controlIcon}`" @click="$emit('controlClick')"></i>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            title: {type: String, default: ''},
            controlIcon: {type: String, default: ''}
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/less/color";

    .top-warp {
        padding: 8px 0;
        position: fixed;
        top: 0;
        left: 0;
        height: 47px;
        width: 100%;
        background: @cl-page-bg;
        z-index: 2;
        transition: 0.5s all;
        overflow: hidden;
        .top-box {
            display: flex;
            .title-box {
                flex: none;
                font-size: 18px;
                font-weight: bold;
                color: @cl-title;
                line-height: 34px;
            }
            .main-box {
                flex: 1;
                overflow: hidden;
            }
            .control-box {
                .iconfont {
                    color: @cl-text;
                    font-size: 24px;
                }
            }
        }
    }
</style>