import { combineReducers } from 'redux'
import * as ActionTypes from './actionTypes'

// 初始化数据
const initialState = {
    showPlayer: false,
    playList: [],
    currentMusic: '',
    currentMusicUrl: '',
    currentIndex: -1,
    isLyric: true
}

// 是否显示音乐播放组件
function showPlayer(showPlayer = initialState.showPlayer, action) {
    switch (action.type) {
        case ActionTypes.SET_SHOW_PLAYER:
            return action.showPlayer
        default:
            return showPlayer
    }
}

// 设置当前音乐列表
function playList(playList = initialState.playList, action) {
    switch (action.type) {
        case ActionTypes.SET_PLAYLIST:
            return action.playList
        default:
            return playList
    }
}

// 设置当前音乐
function currentMusic(currentMusic = initialState.currentMusic, action) {
    switch (action.type) {
        case ActionTypes.SET_CURRENT_MUSIC:
            return action.currentMusic
        default:
            return currentMusic
    }
}

// 设置当前音乐url
function currentMusicUrl(currentMusicUrl = initialState.currentMusicUrl, action) {
    switch (action.type) {
        case ActionTypes.SET_CURRENT_MUSIC_URL:
            return action.currentMusicUrl
        default:
            return currentMusicUrl
    }
}

// 设置当前音乐是否有歌词
function isLyric(isLyric = initialState.isLyric, action) {
    switch (action.type) {
        case ActionTypes.SET_LYRIC:
            return action.isLyric
        default:
            return isLyric
    }
}

// 设置当前音乐索引
function currentIndex(currentIndex = initialState.currentIndex, action) {
    switch (action.type) {
        case ActionTypes.SET_CURRENT_INDEX:
            return action.currentIndex
        default:
            return currentIndex
    }
}

const reducer = combineReducers({
    showPlayer,
    playList,
    currentMusic,
    currentMusicUrl,
    currentIndex,
    isLyric
})

export default reducer