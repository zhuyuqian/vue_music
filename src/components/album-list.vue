<template>
    <div class="album-warp">
        <div class="container-warp list-warp">
            <div class="list-box" v-for="album of list" @click="albumClick(album)">
                <div class="img-box">
                    <img :src="album.img_url" class="img">
                </div>
                <div class="info-box">
                    <p class="van-ellipsis name">{{album.name}}</p>
                    <p class="time"><span>{{new Date(album.add_time).format('yyyy-MM-dd')}}</span><span>{{album.song_count}}首</span>
                    </p>
                </div>
                <van-icon class="icon-box" name="arrow"></van-icon>
            </div>
        </div>
        <loading v-show="list.length==0"></loading>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        props: {list: {type: Array, default: []}},
        methods: {
            async albumClick({id}) {
                let that = this;
                let songList = await that.$ajax.getAlbumSongList(id);
                that.selectPlay({list: songList, index: 0});
            },
            ...mapActions(['selectPlay'])
        }
    }
</script>

<style lang="less" scoped>

    .album-warp {
        .list-warp {
            margin-top: 10px;
            .list-box {
                display: flex;
                margin-bottom: 15px;
                .img-box {
                    font-size: 0;
                    width: 60px;
                    height: 60px;
                    .img {
                        display: block;
                        width: 100%;
                        height: 100%;
                        border-radius: 6px;
                    }
                }
                .info-box {
                    flex: 1;
                    margin-left: 10px;
                    overflow: hidden;
                    .name {
                        color: @cl-text;
                        font-size: 14px;
                        margin-top: 10px;
                    }
                    .time {
                        font-size: 12px;
                        color: @cl-desc;
                        margin-top: 5px;
                        span {
                            display: inline-block;
                            margin-right: 10px;
                        }
                    }
                }
                .icon-box {
                    color: @cl-desc;
                    line-height: 60px;
                }
            }
        }
    }
</style>