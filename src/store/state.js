// 数据
import {playMode} from "@/config/index";

const state = {
    playIng: false, // 是否正在播放
    playList: [], // 播放列表
    playMode: playMode.sequence, // 播放模式
    playIndex: -1, // 当前播放
    playFullScreen: false, // 播放器是否全屏

    mvFullScreen: false, // mv播放是否全屏
    mvHash: '', // mvHash值
}
export default state;