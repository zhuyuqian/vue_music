// getter

// 播放器是否全屏
export const playFullScreen = state => state.playFullScreen;

// 当前是否正在播放
export const playIng = state => state.playIng;

// 播放模式
export const playMode = state => state.playMode;

// 播放列表
export const playList = state => state.playList;

// 播放索引
export const playIndex = state => state.playIndex;

// 获取当前播放歌曲
export const currPlaySong = (state) => {
    return state.playList[state.playIndex] || {}
}

// mvHash
export const mvHash = state => state.mvHash;

// mv是否全屏
export const mvFullScreen = state => state.mvFullScreen;