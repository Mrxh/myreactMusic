import React, { Component } from 'react'
import { formatCount } from '@/utils/utils'
import { getPlaylistDetail, getMusicDetail } from '@/api'
import THeader from '@/components/t-header/t-header'
import SongList from '@/components/song-list/song-list'
import zf from '@/assets/images/discover/zf.png'
import './playlist.scss'

class Playlist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            playlistData: {},
            avatarUrl: '',
            nickname: '',
            songList: []
        }
    }
    async componentDidMount() {
        const id = this.props.match.params.id
        const playlist = await getPlaylistDetail(id)
        this.setState({
            playlistData: playlist.playlist,
            avatarUrl: playlist.playlist.creator.avatarUrl,
            nickname: playlist.playlist.creator.nickname
        })
        let ids = ''
        const trackIds = playlist.playlist.trackIds
        trackIds.forEach((item, idx) => {
            if (idx < 100) {
                ids += (idx === 99 || idx === trackIds.length - 1) ? item.id : item.id + ','
            }
        })
        const songList = await getMusicDetail(ids)
        this.setState({ songList: songList.songs })
    }
    render() {
        const { coverImgUrl, playCount, name } = this.state.playlistData
        const { avatarUrl, nickname, songList } = this.state
        return (
            <div className="playlist">
                <THeader title={name} theme="theme1" bg={coverImgUrl} />
                <div className="playlist-box">
                    <img src={coverImgUrl} alt="" className="playlist-header-img" />
                    <div className="playlist-header-content">
                        <div className="playlist-con">
                            <img src={coverImgUrl} alt="" className="playlist-con-img" />
                            <div className="playlist-song-tips">
                                <img src={zf} alt="" />
                                <span>{formatCount(playCount)}</span>
                            </div>
                        </div>
                        <div className="playlist-con playlist-cont">
                            <h3 className="playlist-con-name">{name}</h3>
                            <p className="playlist-con-creator">
                                <img src={avatarUrl} alt="" />
                                <span>{nickname}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <SongList list={songList} />
            </div>
        )
    }
}

export default Playlist