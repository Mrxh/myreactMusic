import axios from '@/utils/axios'
import { defaultLimit } from '@/config'

// 获取banner
export function getBanner() {
    return axios.get('/banner')
}

// 获取推荐歌单
export function getRecommend() {
    return axios.get('/personalized?limit=30')
}

// 获取歌单详情
export function getPlaylistDetail(id) {
    return axios.get('/playlist/detail?id=' + id)
}

// 获取歌曲详情
export function getMusicDetail(id) {
    return axios.get('/song/detail?ids=' + id)
}

// 获取歌曲url
export function getMusicUrl(id) {
    return axios.get('/song/url?id=' + id)
}

// 获取歌曲歌词
export function getMusicLyric(id) {
    return axios.get('/lyric?id=' + id)
}

// 获取热搜列表
export function getHotList() {
    return axios.get('/search/hot')
}

// 根据关键字搜索
export function search(keywords, type = 1, page = 0, limit = defaultLimit) {
    return axios.get('/search', {
        params: {
            offset: page * limit,
            type,
            limit,
            keywords
        }
    })
}

// 获取歌手详情
export function getSinger(type, area) {
    return axios.get('/artist/list?type=' + type + '&area=' + area)
}

// 获取歌手歌曲详情
export function getSingerSongs(id) {
    return axios.get('/artists?id=' + id)
}

// 排行榜
export function getTopList(id) {
    return axios.get('/toplist/detail')
}
