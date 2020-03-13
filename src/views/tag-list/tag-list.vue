<template>
    <div class="tags-page">
        <van-nav-bar class='header-warp' :class="{success:showHeader}"
                     ref="headerWarp" :z-index="2" title="分类歌单" left-arrow
                     @click-left="$router.back()">
            <van-icon v-show='tagList.length' name="apps-o" slot="right" @click="showTagList=true"/>
        </van-nav-bar>
        <van-tabs class="tags-warp" v-model="showTabName" @change="tagsChange">
            <van-tab v-for="tag of tagRecommendList" :title="tag.name" :key="tag.special_tag_id"
                     :name="tag.special_tag_id">
                <div class="special-warp" v-if="specialObj[tag.special_tag_id]">
                    <scroll class="scroll-warp" :data="specialObj[tag.special_tag_id].specialList">
                        <special-list :list="specialObj[tag.special_tag_id].specialList"
                                      style="padding-bottom: 60px;padding-top: 10px"></special-list>
                    </scroll>
                </div>
            </van-tab>
        </van-tabs>
        <transition enter-active-class="animated fadeInUp"
                    leave-active-class="animated fadeOutDown">
            <tag-list style="animation-duration: 0.5s"
                      :list="tagList" v-show='showTagList' @close="showTagList=false"></tag-list>
        </transition>
    </div>
</template>

<script>
    import SpecialList from '../../components/special-list/special-list';
    import TagList from '../../components/tag-list/tag-list';

    export default {
        components: {SpecialList, TagList},
        data() {
            return {
                showHeader: false,
                showTagList: false,
                showTabName: '',
                tagRecommendList: [],
                tagList: [],
                specialObj: {}
            }
        },
        methods: {
            async tagsChange(name, title) {
                let that = this;
                if (!that.specialObj[name]) { // 对象里没有数据
                    that.specialObj[name] = {scroll: 0, specialList: []};
                    let specialList = await that.$ajax.getTagSpecialList(name);
                    that.specialObj[name] = {scroll: 0, specialList: specialList};
                    that.$forceUpdate();
                }
            },
        },
        async mounted() {
            let that = this;
            that.tagRecommendList = await that.$ajax.getTagRecommendList();
            that.tagList = await that.$ajax.getTagList();
            that.showHeader = true;
            that.tagsChange(that.tagRecommendList[0].special_tag_id, that.tagRecommendList[0].name);
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/less/color";
    @import "../../assets/less/minxin";

    .tags-page {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        bottom: 0;
        .header-warp {
            .mixins-header-warp();
        }
        .tags-warp {
            /deep/ .van-tabs__wrap {
                .van-tabs__nav {
                    background-color: @cl-page-bg;
                    .van-tab {
                        color: @cl-desc;
                        font-size: 13px;
                        &.van-tab--active {
                            color: @cl-active-bg;
                        }
                    }
                    .van-tabs__line {
                        background-color: @cl-active-bg;
                        border-radius: 10px;
                    }
                }
                &::after {
                    border: none;
                }
            }
        }
        .special-warp {
            position: fixed;
            top: 90px;
            left: 0;
            width: 100%;
            bottom: 0;
            .scroll-warp {
                height: 100%;
                overflow: hidden;
            }
        }
    }
</style>