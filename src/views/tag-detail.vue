<template>
    <div class="tag-detail">
        <van-nav-bar class='header-warp' :class="{success:showHeader}"
                     ref="headerWarp" :z-index="2" :title="tagInfo.name" left-arrow
                     @click-left="$router.back()"></van-nav-bar>
        <van-tabs v-if="tagInfo.has_child&&tagList.length" class="tags-warp" v-model="showTabName" @change="tagsChange">
            <van-tab v-for="tag of tagList" v-if="tag.special_tag_id"
                     :title="tag.name" :key="tag.special_tag_id" :name="tag.special_tag_id">
                <div class="special-warp" v-if="specialObj[tag.special_tag_id]">
                    <scroll class="scroll-warp" :data="specialObj[tag.special_tag_id].specialList">
                        <special-list :list="specialObj[tag.special_tag_id].specialList"
                                      style="padding-bottom: 60px;padding-top: 10px"></special-list>
                    </scroll>
                </div>
            </van-tab>
        </van-tabs>
        <div v-if="!tagInfo.has_child&&!tagList.length&&specialObj[tagInfo.id]" class="special-warp no-tab">
            <scroll class="scroll-warp" :data="specialObj[tagInfo.id].specialList">
                <special-list :list="specialObj[tagInfo.id].specialList"
                              style="padding-bottom: 60px;padding-top: 10px"></special-list>
            </scroll>
        </div>
    </div>
</template>

<script>
    import SpecialList from '@/components/special-list';
    import TagList from '@/components/tag-list';

    export default {
        components: {SpecialList, TagList},
        data() {
            return {
                showHeader: false,
                showTabName: '',
                tagInfo: {},

                tagList: [],

                specialObj: {}
            }
        },
        methods: {
            // 有tag的处理方式
            async tagsChange(name, title) {
                let that = this;
                if (!that.specialObj[name]) { // 对象里没有数据
                    that.specialObj[name] = {scroll: 0, specialList: []};
                    let specialList = await that.$ajax.getTagSpecialList(name);
                    that.specialObj[name].specialList = specialList;
                    that.$forceUpdate();
                }
            }
        },
        async mounted() {
            let that = this;
            that.tagInfo = await that.$ajax.getTagInfo(that.$route.params.id);
            if (that.tagInfo.has_child) {// 有子节点
                let tagList = (await that.$ajax.getTagList(that.tagInfo.id))[0].children.filter(tag => {
                    return tag.special_tag_id != 0
                });
                if (tagList.length > 1) {
                    that.tagList = tagList;
                    that.tagsChange(that.tagList[0].special_tag_id, that.tagList[0].name);
                } else {
                    that.tagInfo.has_child = 0;
                    that.specialObj[that.tagInfo.id] = {specialList: []};
                    let specialList = await that.$ajax.getTagSpecialList(tagList[0].special_tag_id);
                    that.specialObj[that.tagInfo.id] = {specialList: specialList}
                }
            } else { // 没有子节点
                that.specialObj[that.tagInfo.id] = {specialList: []};
                let specialList = await that.$ajax.getTagSpecialList(that.tagInfo.special_tag_id);
                that.specialObj[that.tagInfo.id] = {specialList: specialList}
            }
            that.showHeader = true;
        }
    }
</script>

<style lang="less" scoped>
    @import "../assets/less/minxin";

    .tag-detail {
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
            &.no-tab {
                top: 46px;
            }
        }
    }
</style>