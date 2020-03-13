// 修改动作

const mutations = {
    // 修改播放器全屏
    upadtePlayFullScreen(state, flag) {
        state.playFullScreen = flag;
    },
    // 修改播放状态
    updatePlayIng(state, flag) {
        state.playIng = flag;
    },
    // 修改播放模式
    updatePlayMode(state, model) {
        state.playMode = model;
    },
    // 修改播放列表
    updatePlayList(state, list) {
        state.playList = list;
    },
    // 修改播放下标
    updatePlayIndex(state, index) {
        state.playIndex = index;
    },
    // 修改播放hash
    updateMvHash(state, hash) {
        state.mvHash = hash;
    },
    // 修改mv播放全屏
    updateMvFullScreen(state, flag) {
        state.mvFullScreen = flag;
    }
}

export default mutations;