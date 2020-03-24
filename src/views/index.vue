<template>
    <div class="index-page" ref="page">
        <scroll ref="scroll" class="scroll-warp" :data="newSongList">
            <div class="container-warp">
                <!--banner轮播图-->
                <swiper class='banner-box' v-if="bannerList.length"
                        :options="{loop: true, autoplay: {disableOnInteraction: false,}, autoHeight: true, pagination: {el: '.swiper-pagination'}}">
                    <swiper-slide v-for="banner of bannerList" :key="banner.id" class="banner-img-box">
                        <a :href="banner.jump_link">
                            <img class="banner-img" :src="banner.img_url">
                        </a>
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
                <!--按钮区域-->
                <nav class="nav-box">
                    <div class="nav-item" @click="$router.push({name:'singer-list'})">
                        <i class="iconfont icon-singer"></i>
                        <span>歌手</span>
                    </div>
                    <div class="nav-item" @click="$router.push({name:'rank-list'})">
                        <i class="iconfont icon-rank"></i>
                        <span>排行</span>
                    </div>
                    <div class="nav-item" @click="$router.push({name:'tag-list'})">
                        <i class="iconfont icon-classification"></i>
                        <span>分类歌单</span>
                    </div>
                </nav>
                <!--精选歌单-->
                <div class="container-box">
                    <div class="title-box">
                        <span class="text">精选歌单</span>
                    </div>
                    <swiper class="swiper-warp"
                            :options="{slidesPerView: 'auto',slidesPerColumn : 2,slidesPerColumnFill : 'row'}">
                        <swiper-slide class="swiper-box" v-for="item of hotSongSheetList" :key="item.content_id">
                            <card-square :title="item.name"
                                         :imgUrl="item.img_url"
                                         :listenNum="item.play_count"
                                         @click.native="sheetClick(item.id)"></card-square>
                        </swiper-slide>
                    </swiper>
                </div>
                <!--新歌首发-->
                <div class="container-box">
                    <div class="title-box">
                        <span class="text">新歌首发</span>
                    </div>
                    <music-list :songList="newSongList" hidePlayAllBtn></music-list>
                </div>
            </div>
        </scroll>
    </div>
</template>

<script>
    import {playListMixin} from "@/mixin/playList";

    export default {
        mixins: [playListMixin],
        components: {},
        computed: {},
        data() {
            return {
                bannerList: [],
                hotSongSheetList: [],
                newSongList: [],
                transitionName: ''
            }
        },
        methods: {
            handlePlaylist(playList) {
                let that = this;
                let bottom = playList.length > 0 ? '50px' : '';
                that.$refs['page'].style.bottom = bottom;
                that.$refs['scroll'].refresh()
            },
            // 搜索被点击
            searchBoxClick() {
            },
            // 控制按钮被点击
            controlClick() {
            },
            // 歌单被点击
            sheetClick(id) {
                let that = this;
                that.$router.push({name: 'special-list', params: {id: id}})
            }
        },
        async created() {
            let that = this;
            let {banner_list, song_list} = await that.$ajax.getNewSongRank();
            that.bannerList = banner_list;
            that.newSongList = song_list.slice(0, 5);
            that.hotSongSheetList = (await that.$ajax.getPlist()).slice(0, 10);
            that.$nextTick(function () {
                that.$refs['scroll'] && that.$refs['scroll'].refresh()
            })
        }
    }
</script>

<style lang="less" scoped>
    .index-page {
        position: fixed;
        top: 50px;
        width: 100%;
        bottom: 0;
        .scroll-warp {
            height: 100%;
            overflow: hidden;
            .container-warp {
                .banner-box {
                    font-size: 0;
                    .banner-img-box {
                        .banner-img {
                            display: block;
                            border-radius: 4px;
                            width: 100%;
                        }
                    }
                    /deep/ .swiper-pagination {
                        .swiper-pagination-bullet {
                            background: rgba(255, 255, 255, 0.8);
                            &.swiper-pagination-bullet-active {
                                background: @cl-active-bg;
                            }
                        }
                    }
                }
                .nav-box {
                    display: flex;
                    padding: 20px 0 10px;
                    .nav-item {
                        flex: 1;
                        text-align: center;
                        .iconfont {
                            display: block;
                            font-size: 26px;
                            color: @cl-active-bg;
                        }
                        span {
                            display: block;
                            color: @cl-title;
                            font-size: 12px;
                            margin-top: 4px;
                        }
                    }
                }
                .container-box {
                    .title-box {
                        display: flex;
                        line-height: 40px;
                        .text {
                            flex: 1;
                            color: @cl-title;
                            font-size: 16px;
                            font-weight: bold;
                        }
                        .more {
                            color: @cl-title;
                            font-size: 13px;
                        }
                    }
                    .swiper-warp {
                        .swiper-box {
                            width: auto;
                            margin-right: 10px;
                            margin-bottom: 10px;
                        }
                    }
                }
            }
        }
    }
</style>