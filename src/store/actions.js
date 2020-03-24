// 选中播放
export const selectPlay = function ({commit, state}, {list, index}) {
    // 修改排序后的播放列表
    commit('updatePlayList', list);
    // 修改修改新的播放下标
    commit('updatePlayIndex', index);
    // 修改播放器为全屏
    commit('upadtePlayFullScreen', true);
    // 修改播放状态为开始
    commit('updatePlayIng', true);
}

// 选中mv
export const selectMv = function ({commit, state}, {hash}) {
    commit('updateMvHash', hash);
    commit('updateMvFullScreen', true)
}