<template>
    <div class="rank-list-warp">
        <div class="container-warp list-warp">
            <div class="list-box" v-for="rank of list"
                 @click="$router.push({name:'rank-detail',params:{id:rank.rank_info.rank_id}})">
                <div class="songs-box">
                    <p class="title">{{rank.rank_info.name}}</p>
                    <p class="song van-ellipsis" v-for="(song,index) of rank.song_list">
                        <span>{{index+1}}.{{song.name}}</span><span> - {{song.singer_text}}</span>
                    </p>
                </div>
                <div class="img-box">
                    <van-image class="img" width="120" height="120" lazy-load
                               :src="rank.rank_info.album_img_url"></van-image>
                </div>
            </div>
        </div>
        <loading v-show="list.length==0"></loading>
    </div>
</template>

<script>
    export default {
        props: {list: {type: Array, default: []}}
    }
</script>

<style lang="less" scoped>

    .rank-list-warp {
        .list-warp {
            overflow: hidden;
            .list-box {
                background: @cl-card-bg;
                display: flex;
                border-radius: 8px;
                overflow: hidden;
                margin-bottom: 15px;
                .songs-box {
                    flex: 1;
                    padding: 10px;
                    overflow: hidden;
                    .title {
                        color: @cl-title;
                        font-size: 14px;
                        margin-bottom: 10px;
                    }
                    .song {
                        font-size: 12px;
                        margin-top: 6px;
                        span:nth-child(1) {
                            color: @cl-title;
                        }
                        span:nth-child(2) {
                            color: @cl-desc;
                        }
                    }
                }
                .img-box {
                    width: 120px;
                    height: 120px;
                    font-size: 0;
                    .img {
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }
</style>