<template>
    <div class="tag-list-page">
        <van-nav-bar class='header-warp success' title="全部分类" @click-right="$emit('close')">
            <van-icon name="down" slot="right"/>
        </van-nav-bar>
        <scroll class="scroll-warp" :data="list">
            <div class="container-warp main-warp">
                <div class="tags-box" v-for="tags of list">
                    <p class="tags-name">{{tags.name}}</p>
                    <div>
                        <div class="tag-box" v-for="tag of tags.children"
                             @click="$router.push({name:'tag-detail',params:{id:tag.id}})">
                            {{tag.name.replace('专区','')}}
                        </div>
                    </div>
                </div>
            </div>
        </scroll>
    </div>
</template>

<script>
    export default {
        props: {
            list: {type: Array, default: []}
        }
    }
</script>

<style lang="less" scoped>
    @import "../assets/less/minxin";

    .tag-list-page {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        bottom: 0;
        background: @cl-page-bg;
        z-index: 2;
        .header-warp {
            .mixins-header-warp(@cl-page-bg)
        }
        .scroll-warp {
            height: 100%;
            overflow: hidden;
            .main-warp {
                padding-bottom: 60px;
                .tags-box {
                    margin-top: 15px;
                    .tags-name {
                        font-size: 16px;
                        color: @cl-title;
                        font-weight: bold;
                    }
                    .tag-box {
                        display: inline-block;
                        width: calc(98% / 4 - 5px);
                        background: @cl-card-bg;
                        font-size: 12px;
                        color: @cl-text;
                        text-align: center;
                        margin-right: 9px;
                        margin-top: 10px;
                        border-radius: 34px;
                        line-height: 34px;
                        &:nth-child(4n+0) {
                            margin-right: 0;
                        }
                    }
                }
            }
        }

    }
</style>