<template>
    <swiper class="search-box" :options="{loop: true, direction: 'vertical',autoplay: {disableOnInteraction: false}}">
        <swiper-slide class="swiper-box" v-for="item of list" :key="item.text">
            <div class="search-li"><i class="iconfont icon-search"></i>{{item.text}}</div>
        </swiper-slide>
    </swiper>
</template>

<script>
    export default {
        props: {
            list: {
                type: Array,
                default: []
            }
        }
    }
</script>

<style lang="less" scoped>

    .search-box {
        background: @cl-card-bg;
        width: 90%;
        height: 30px;
        border-radius: 30px;
        margin: 0 auto;
        color: @cl-desc;
        text-align: center;
        .search-li {
            line-height: 30px;
            font-size: 14px;
            text-align: center;
            .iconfont {
                font-size: 14px;
                display: inline-block;
                margin-right: 2px;
            }
        }
    }
</style>