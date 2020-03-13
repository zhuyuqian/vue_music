<template>
    <div class="play-warp" v-show="playList.length">
        <transition enter-active-class="animated fadeInUp"
                    leave-active-class="animated fadeOutDown">
            <div class="full-play-warp" style="animation-duration: 0.5s" v-show="playFullScreen">
                <div class="model" :style='{"background-image":"url("+songImgUrl+")" }'></div>
                <van-icon class="close-btn" name="arrow-down" @click="upadtePlayFullScreen(false)"></van-icon>
                <div class="container-warp full-play-box">
                    <img class="album-img" :src="songImgUrl" ref="albumImg">
                    <div class="info-box">
                        <p class="song-name">{{currPlaySong.name}}</p>
                        <p class="song-user"><span v-for="singer of singerArr" @click="toSingerDetail(singer)">{{singer.name}}</span>
                        </p>
                        <p class="song-album">{{albumName}} - {{currPlaySong.singers_text}}</p>
                    </div>
                </div>
                <div class="bottom-box">
                    <!--播放进度条-->
                    <div class="progress-box">
                        <span class="time time-l">{{showTime(currentTime)}}</span>
                        <div class="progress-bar-wrapper">
                            <progress-bar ref="progressBar" :percent="percent"
                                          @percentChange="progressBarChange"
                                          @percentChanging="progressBarChanging"></progress-bar>
                        </div>
                        <span class="time time-r">{{showTime(currPlaySong.second)}}</span>
                    </div>
                    <!--控制按钮-->
                    <div class="control-box">
                        <span class="mode">
                        <i class="iconfont" :class="iconMode" @click="changePlayMode"></i>
                    </span>
                        <span class="pre">
                         <i class="iconfont icon-pre" @click="songPrev"></i>
                    </span>
                        <span class="play">
                        <van-loading class="play-loading" v-show="!songReady"></van-loading>
                        <i class="iconfont" :class="iconPlay" @click="playBtnClick" v-show="songReady"></i>
                    </span>
                        <span class="next">
                         <i class="iconfont icon-next" @click="songNext"></i>
                    </span>
                        <span class="list">
                           <i class="iconfont icon-song-list" @click="playListShow=true"></i>
                    </span>
                    </div>
                </div>
            </div>
        </transition>
        <transition enter-active-class="animated fadeInUp"
                    leave-active-class="animated fadeOutDown">
            <div class="mini-play-warp" style="animation-duration: 0.5s" v-show="!playFullScreen"
                 @click="upadtePlayFullScreen(true)">
                <div class="container-warp flex-box">
                    <van-image class="img-box" width="40" height="40" round
                               :src="songImgUrl"></van-image>
                    <div class="name-box"><p class="van-ellipsis">{{currPlaySong.name}}</p></div>
                    <div class="control-box">
                        <i class="iconfont" :class="`icon-${playIng?'paused':'play'}`" @click.stop="playBtnClick"></i>
                        <i class="iconfont icon-song-list" @click.stop="playListShow=true"></i>
                    </div>
                </div>
            </div>
        </transition>
        <transition enter-active-class="animated fadeInUp"
                    leave-active-class="animated fadeOutDown">
            <div class="play-list-warp" style="animation-duration: 0.3s" v-show="playListShow">
                <scroll class="scroll-warp" :data="playList">
                    <div class="play-list">
                        <div class="play-item" v-for="(song,index) of playList" @click="playListClick(song,index)">
                            <div class="song-box">
                                <span class="song-name">{{song.name}}</span><span
                                    class="singer-name"> - {{song.singers_text}}</span>
                            </div>
                            <div class="icon-box" v-show="currPlaySong.id == song.id">
                                <icon-rhythm></icon-rhythm>
                            </div>
                        </div>
                    </div>
                </scroll>
                <div class="close-btn" @click="playListShow=false">关闭</div>
            </div>
        </transition>
        <transition name="fade">
            <div class="play-list-model" style="animation-duration: 0.3s" v-show="playListShow"
                 @click="playListShow=false"></div>
        </transition>
        <audio ref="audio" @playing="audioPlayIng" @error="audioError" @pause="audioPaused" @ended="audioEnd"
               @timeupdate="audioUpdateTime"></audio>
    </div>
</template>

<script>
    import IconRhythm from '../../components/icon-rhythm/icon-rhythm';
    import {mapGetters, mapMutations} from 'vuex';
    import {playMode} from "../../assets/js/config";
    import ProgressBar from '../../components/progress-bar/progress-bar';

    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    export default {
        components: {ProgressBar, IconRhythm},
        data() {
            return {
                songReady: false, // 歌曲准备好了
                currentTime: 0, // 当前播放时间
                songImgUrl: '', // 当前歌曲封面
                singerArr: [], // 当前歌手
                albumName: '', // 当前专辑
                playListShow: false, // 播放列表是否显示
            }
        },
        computed: {
            // 播放按钮样式
            iconPlay() {
                let that = this;
                if (that.playIng) return 'icon-suspend';
                return 'icon-full-play';
            },
            // 模式按钮样式
            iconMode() {
                let that = this;
                if (that.playMode === playMode.sequence) return 'icon-sequence';
                if (that.playMode === playMode.loop) return 'icon-loop';
                if (that.playMode === playMode.random) return 'icon-random';
            },
            // 播放进度
            percent() {
                let that = this;
                return that.currentTime / that.currPlaySong.second;
            },
            ...mapGetters(['playMode', 'playIndex', 'playIng', 'playList', 'playFullScreen', 'currPlaySong'])
        },
        watch: {
            // 监听路由
            $route(to, old) {
                let that = this;
                if (old.query.fullScreen) {
                    that.upadtePlayFullScreen(true);
                }
            },
            // 监控当前歌曲改变
            async currPlaySong(newSong, oldSong) {
                let that = this;
                if (!newSong.id || !newSong.hash || newSong.id === oldSong.id) return;
                let {cover_img_url, play_url, singer_arr, album_name} = await that.$ajax.getSongInfo(newSong.hash, newSong.album_id);
                that.songReady = false;
                that.singerArr = singer_arr;
                that.songImgUrl = cover_img_url;
                that.albumName = album_name;
                that.$refs['audio'].src = play_url;
                that.$refs.audio.play();
                // 若歌曲 5s 未播放，则认为超时，修改状态确保可以切换歌曲。
                clearTimeout(that.timer);
                that.timer = setTimeout(() => {
                    that.songReady = true;
                }, 5000);
            },
            // 监控歌曲播放状态
            playIng(newPlaying) {
                let that = this;
                if (!that.songReady) return;
                let audio = that.$refs['audio'];
                that.$nextTick(() => {
                    newPlaying ? audio.play() : audio.pause()
                })
            }
        },
        methods: {
            playListClick(song, index) {
                let that = this;
                if (song.id != that.currPlaySong.id) {
                    that.updatePlayIndex(index);
                    if (!that.playIndex) that.playBtnClick();
                }
                that.playListShow = false;
            },
            // 去歌手页面
            toSingerDetail(singer) {
                let that = this;
                if (that.singerArr.length == 0 || !singer) return;
                that.upadtePlayFullScreen(false);
                that.$router.push({name: 'singer-detail', params: {id: singer.id}, query: {fullScreen: true}})
            },
            // 修改播放模式
            changePlayMode() {
                let that = this;
                let newPlayModel = (that.playMode + 1) % 3;
                that.updatePlayMode(newPlayModel);
            },
            // 播放按钮被点击
            playBtnClick() {
                let that = this;
                if (!that.songReady) return;
                that.updatePlayIng(!that.playIng)
            },
            // 播放
            audioPlayIng() {
                let that = this;
                clearTimeout(that.timer);
                that.songReady = true;
            },
            // 错误
            audioError() {
                let that = this;
                clearTimeout(that.timer);
                that.songReady = true;
            },
            // 暂停
            audioPaused() {
                let that = this;
                that.updatePlayIng(false);
            },
            // 播放完毕
            audioEnd() {
                let that = this;
                that.currentTime = 0;
                // 如果单曲循环，就单曲播放
                if (that.playMode === playMode.loop) { // 单曲播放
                    that.songLoop()
                } else {
                    that.songNext()
                }
            },
            // 播放时间改变
            audioUpdateTime(e) {
                let that = this;
                that.currentTime = e.target.currentTime;
            },
            // 单曲循环
            songLoop() {
                let that = this;
                that.$refs['audio'].currentTime = 0;
                that.$refs['audio'].play();
                that.updatePlayIng(true);
            },
            // 随机播放
            songRandom() {
                let that = this;
                let index = getRandomInt(0, (that.playList.length - 1));
                that.updatePlayIndex(index);
                if (!that.playIndex) that.playBtnClick();
            },
            // 下一曲
            songNext() {
                let that = this;
                if (!that.songReady) return;
                if (that.playList.length === 1) return that.songLoop();
                if (that.playMode == playMode.random) return that.songRandom();
                let index = that.playIndex + 1;
                if (index === that.playList.length) index = 0;
                that.updatePlayIndex(index);
                if (!that.playIng) that.playBtnClick();
            },
            // 上一曲
            songPrev() {
                let that = this;
                if (!that.songReady) return;
                if (that.playList.length === 1) return that.songLoop();
                if (that.playMode == playMode.random) return that.songRandom();
                let index = that.playIndex - 1;
                if (index === -1) index = that.playList.length - 1;
                that.updatePlayIndex(index)
                if (!that.playIng) that.playBtnClick();
            },
            // 显示分钟
            showTime(interval) {
                let that = this;
                interval = interval | 0
                const minute = interval / 60 | 0
                const second = that._pad(interval % 60)
                return `${minute}:${second}`
            },
            _pad(num, n = 2) {
                let len = num.toString().length
                while (len < n) {
                    num = '0' + num
                    len++
                }
                return num
            },
            // 进度条改变
            progressBarChange(percent) {
                let that = this;
                let currentTime = that.currPlaySong.second * percent;
                that.currentTime = that.$refs['audio'].currentTime = currentTime;
                if (!that.playIng) that.playBtnClick()
            },
            progressBarChanging(percent) {
                let that = this;
                that.currentTime = that.currPlaySong.second * percent;
            },
            ...mapMutations(['upadtePlayFullScreen', 'updatePlayMode', 'updatePlayIndex', 'updatePlayList', 'updatePlayIng']),
        },
        created() {
        }
    }
</script>

<style lang="less" scoped>
    @import '../../assets/less/color';

    .play-warp {
        .full-play-warp {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: @cl-page-bg;
            z-index: 100;
            .model {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                z-index: -1;
                opacity: 0.9;
                filter: blur(20px);
            }
            .close-btn {
                position: absolute;
                top: 20px;
                left: 20px;
                font-size: 30px;
                font-weight: bold;
                color: @cl-text;
                z-index: 3;
            }
            .full-play-box {
                width: 80%;
                .album-img {
                    display: block;
                    width: 180px;
                    border-radius: 10px;
                    margin: 70px auto 0;
                }
                .info-box {
                    margin-top: 20px;
                    .song-name {
                        color: @cl-title;
                        font-size: 20px;
                        margin-top: 10px;
                    }
                    .song-user {
                        color: @cl-text;
                        font-size: 12px;
                        margin-top: 6px;
                        span {
                            display: inline-block;
                            margin-right: 10px;
                        }
                    }
                    .song-album {
                        color: @cl-text;
                        font-size: 12px;
                        margin-top: 15px;
                    }
                }
            }
            .bottom-box {
                position: absolute;
                bottom: 40px;
                left: 20px;
                right: 20px;
                .progress-box {
                    display: flex;
                    align-items: center;
                    width: 90%;
                    margin: 0px auto;
                    padding: 10px 0;
                    .time {
                        color: @cl-title;
                        font-size: 12px;
                        line-height: 30px;
                        width: 40px;
                        &.time-l {
                            text-align: left;
                        }
                        &.time-r {
                            text-align: right;
                        }
                    }

                    .progress-bar-wrapper {
                        flex: 1;
                    }
                }
                .control-box {
                    display: flex;
                    text-align: center;
                    .mode, .pre, .next, .list {
                        flex: 1;
                        .iconfont {
                            font-size: 20px;
                            color: @cl-text;
                            line-height: 44px;
                        }
                    }
                    .play {
                        width: 80px;
                        .play-loading {
                            color: @cl-text;
                            position: relative;
                            top: 5px;
                        }
                        .iconfont {
                            font-size: 40px;
                            color: @cl-text;
                            line-height: 44px;
                        }
                    }
                }
            }
        }
        .mini-play-warp {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background: @cl-page-bg;
            z-index: 2;
            padding: 5px 0;
            transition: all 0.5s;
            .flex-box {
                display: flex;
                .img-box {
                    width: 40px;
                    height: 40px;
                    font-size: 0;
                    img {
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                    }
                }
                .name-box {
                    flex: 1;
                    overflow: hidden;
                    color: @cl-title;
                    font-size: 14px;
                    line-height: 40px;
                    margin-left: 10px;
                }
                .control-box {
                    color: @cl-active-bg;
                    .iconfont {
                        width: 40px;
                        height: 40px;
                        line-height: 40px;
                        text-align: center;
                        font-size: 28px;
                        margin-left: 6px;
                    }
                }
            }
        }
        .play-list-warp {
            position: fixed;
            bottom: 0;
            width: 100%;
            left: 0;
            background: rgba(11, 12, 17, 0.9);
            padding-top: 10px;
            z-index: 101;
            border-radius: 10px 10px 0 0 ;
            .scroll-warp {
                height: 350px;
                overflow: hidden;
                .play-list {
                    padding-left: 15px;
                    .play-item {
                        padding: 0 15px 0 0;
                        line-height: 40px;
                        display: flex;
                        border-top: 1px solid @cl-line;
                        .song-box {
                            flex: 1;
                            .song-name {
                                font-size: 13px;
                                color: @cl-title;
                                font-weight: bold;
                            }
                            .singer-name {
                                font-size: 12px;
                                color: @cl-text;
                            }
                        }
                        .icon-box {
                            width: 37px;
                            height: 37px;
                        }
                        &:first-child {
                            border-top: none;
                        }
                    }
                }
            }
            .close-btn {
                padding: 15px;
                font-size: 16px;
                text-align: center;
                color: @cl-title;
                border-top: 1px solid @cl-line;
            }
        }
        .play-list-model {
            position: fixed;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            background: rgba(11, 12, 17, 0.7);
            z-index: 100;
        }
    }
</style>