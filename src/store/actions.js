import * as ActionTypes from './actionTypes'
import { findIndex } from '@/utils/utils'
import { getMusicUrl } from '@/api'

// 显示音乐播放组件
export function setShowPlayer(showPlayer) {
    return { type: ActionTypes.SET_SHOW_PLAYER, showPlayer }
}

// 设置当前音乐
export function setCurrentMusic(currentMusic) {
    return { type: ActionTypes.SET_CURRENT_MUSIC, currentMusic }
}

// 设置当前音乐url
export function setCurrentMusicUrl(currentMusicUrl) {
    return { type: ActionTypes.SET_CURRENT_MUSIC_URL, currentMusicUrl }
}

// 设置当前音乐索引
export function setCurrentIndex(currentIndex) {
    return { type: ActionTypes.SET_CURRENT_INDEX, currentIndex }
}

// 设置当前音乐是否有歌词
export function setIsLyric(isLyric) {
    return { type: ActionTypes.SET_LYRIC, isLyric }
}

// 设置当前音乐列表
export function setPlayList(playList) {
    return { type: ActionTypes.SET_PLAYLIST, playList }
}

// 播放音乐
export const setAllPlay = ({ playList, currentIndex }) => async dispatch => {
    dispatch(setShowPlayer(true))
    dispatch(setPlayList(playList))
    dispatch(setCurrentIndex(currentIndex))
    dispatch(setCurrentMusic(playList[currentIndex]))
    const musicUrl = await getMusicUrl(playList[currentIndex].id)
    dispatch(setCurrentMusicUrl(musicUrl.data[0].url))
}

// 播放音乐(插入一条到播放列表)
export const addPlay = (music) => async (dispatch, getState) => {
    const playList = [...getState().playList]
    let index = findIndex(playList, music)
    if (index > -1) {
        dispatch(setCurrentIndex(index))
        dispatch(setCurrentMusic(playList[index]))
        const musicUrl = await getMusicUrl(playList[index].id)
        dispatch(setCurrentMusicUrl(musicUrl.data[0].url))
    } else {
        index = playList.push(music) - 1
        dispatch(setPlayList(playList))
        dispatch(setCurrentIndex(index))
        dispatch(setCurrentMusic(playList[index]))
        const musicUrl = await getMusicUrl(playList[index].id)
        dispatch(setCurrentMusicUrl(musicUrl.data[0].url))
    }
}