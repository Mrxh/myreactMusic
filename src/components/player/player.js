import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import { Icon } from 'antd-mobile'
import store from '@/store'
import { setShowPlayer, setCurrentMusic, setCurrentMusicUrl, setCurrentIndex, setPlayList, addPlay } from '@/store/actions'
import { formatName, formatTime } from '@/utils/utils'
import { getMusicLyric } from '@/api'
import Process from './process'
import Lyric from './lyric'
import Album from './album'
import MusicList from './musicList'
import pause from '@/assets/images/player/min-pause.png'
import play from '@/assets/images/player/min-play.png'
import mList from '@/assets/images/player/min-list.png'
import adi from '@/assets/images/player/adi.png'
import prev from '@/assets/images/player/prev.png'
import maxPlay from '@/assets/images/player/play.png'
import maxPause from '@/assets/images/player/pause.png'
import next from '@/assets/images/player/next.png'
import list from '@/assets/images/player/list.png'
import random from '@/assets/images/player/mode-random.png'
import single from '@/assets/images/player/mode-single.png'
import del from '@/assets/images/player/list-all-del.png'
import './player.scss'

class Player extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mUrl: '',
            isPlay: false,
            isShowSong: false,
            currentTime: 0,
            isShowLyric: true,
            lyricData: [],
            isShowPlayList: false,
            playMode: [adi, single, random],
            curModeIndex: 0
        }
    }
    componentDidMount() {
        this.playAudio = ReactDOM.findDOMNode(this.refs.playAudio)
        this.bindEvents()
        this.playAudio.load()
        store.subscribe(() => {
            this.readyPlay()
            clearTimeout(this.timer1)
            this.timer1 = setTimeout(() => {
                this.getCurLyric()
            }, 1)
        })
    }
    componentWillUnmount() {
        this.unbindEvents()
    }

    bindEvents() {
        this.playAudio.addEventListener('timeupdate', this.getCurrentTime)
        this.playAudio.addEventListener('ended', this.endMusic)
    }

    unbindEvents() {
        this.playAudio.removeEventListener('timeupdate', this.getCurrentTime)
        this.playAudio.removeEventListener('ended', this.endMusic)
    }

    getCurrentTime = () => {
        let currentTime = this.playAudio.currentTime
        this.setState({ currentTime: Math.floor(currentTime * 1000) })
    }

    endMusic = () => {
        this.setState({ isPlay: false })
        const { curModeIndex } = this.state
        if (curModeIndex === 0) {
            this.next()
        }
        if (curModeIndex === 1) {
            this.playAudio.play()
            this.setState({ isPlay: true })
        }
        if (curModeIndex === 2) {
            let index = Math.floor(Math.random() * this.props.playList.length)
            this.props.addPlay(this.props.playList[index])
        }
    }

    // 播放歌曲
    readyPlay = () => {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
            this.playAudio.play()
            this.setState({ isPlay: true })
        }, 0)
    }
    // 切换歌曲播放状态
    toggle(e) {
        e.stopPropagation()
        if (this.playAudio.paused) {
            this.playAudio.play()
            this.setState({ isPlay: true })
        } else {
            this.playAudio.pause()
            this.setState({ isPlay: false })
        }
    }
    showSong() {
        this.setState({ isShowSong: !this.state.isShowSong })
    }

    dragEnd = value => {
        this.playAudio.currentTime = value * this.props.currentMusic.dt / 1000
        if (!this.state.isPlay) {
            this.playAudio.play()
            this.setState({ isPlay: true })
        }
    }

    ShowPlayList(e) {
        e.stopPropagation()
        this.setState({ isShowPlayList: !this.state.isShowPlayList })
    }

    showLyric() {
        if (this.state.lyricData.length > 0) {
            this.setState({ isShowLyric: !this.state.isShowLyric })
        } else {
            this.setState({ isShowLyric: false })
        }
    }

    async getCurLyric() {
        const { id } = this.props.currentMusic
        const res = await getMusicLyric(id)
        if (res.code === 200 && res.lrc && res.lrc.lyric) {
            let lyric = res.lrc.lyric
            let lyricArr = []
            let lyricArrObj = lyric.split('\n')
            lyricArrObj.forEach(item => {
                let t = item.substring(item.indexOf('[') + 1, item.indexOf(']'))
                let c = item.substring(item.indexOf(']') + 1, item.length)
                c && lyricArr.push(
                    {
                        t: Number((t.split(':')[0] * 60 + parseFloat(t.split(':')[1])).toFixed(3)),
                        c
                    }
                )
            })
            this.setState({ lyricData: lyricArr, isShowLyric: true })
        } else {
            this.setState({ lyricData: [], isShowLyric: false })
        }
    }

    // 上一曲
    prev() {
        let index = this.props.currentIndex - 1
        if (index < 0) {
            index = this.props.playList.length - 1
        }
        this.props.addPlay(this.props.playList[index])
    }

    // 下一曲
    next() {
        let index = this.props.currentIndex + 1
        if (index === this.props.playList.length) {
            index = 0
        }
        this.props.addPlay(this.props.playList[index])
    }

    // 改变播放模式
    changeMode() {
        const { curModeIndex } = this.state
        if (curModeIndex === 0) {
            this.setState({ curModeIndex: 1 })
        }
        if (curModeIndex === 1) {
            this.setState({ curModeIndex: 2 })
        }
        if (curModeIndex === 2) {
            this.setState({ curModeIndex: 0 })
        }
    }

    render() {
        const currentMusic = this.props.currentMusic
        const currentMusicUrl = this.props.currentMusicUrl
        const playList = this.props.playList
        const { isPlay, isShowSong, playMode, curModeIndex, currentTime, isShowLyric, lyricData, isShowPlayList } = this.state
        return (
            <div className={`player ${isShowSong ? 'player-full-screen' : ''}`}>
                <audio src={currentMusicUrl} ref="playAudio">
                    Your browser does not support the audio element.
                </audio>
                {
                    currentMusic && <div className="player-control" style={{ display: isShowSong ? 'none' : 'flex' }} onClick={() => { this.showSong() }}>
                        <div className="player-img">
                            <img src={currentMusic.al.picUrl} alt="" className={isPlay ? '' : 'pause'} />
                        </div>
                        <div className="player-info">
                            <p className="player-info-name">{currentMusic.name}</p>
                            <p className="player-info-singer">{formatName(currentMusic.ar)}</p>
                        </div>
                        <div className="player-play-pause" onClick={(e) => { this.toggle(e) }}>
                            <img src={isPlay ? play : pause} alt="" />
                        </div>
                        <div className="player-play-list" onClick={(e) => { this.ShowPlayList(e) }}>
                            <img src={mList} alt="" />
                        </div>
                    </div>
                }
                {
                    currentMusic && <div className={`song-container ${isShowSong ? 'song-container-show' : 'song-container-hide'}`}>
                        <div className="song-bg" style={{ backgroundImage: `url(${currentMusic.al.picUrl + '?param=300y300'})` }}>
                        </div>
                        <div className="song-box">
                            <div className="song-box-title">
                                <div className="song-box-icon" onClick={() => { this.showSong() }}>
                                    <Icon type="down" size="lg" color="#fff" />
                                </div>
                                <div className="song-title-info">
                                    <h3>{currentMusic.name}</h3>
                                    <p>{formatName(currentMusic.ar)}</p>
                                </div>
                            </div>
                            <div className="song-lyric-container" onClick={() => { this.showLyric() }}>
                                {!isShowLyric && <Album albumImg={currentMusic.al.picUrl} isPlays={isPlay} />}
                                <Lyric currentTime={currentTime}
                                    duration={currentMusic.dt}
                                    mid={currentMusic.id}
                                    isShowSong={isShowSong}
                                    isShowLyric={isShowLyric}
                                    lyricData={lyricData} />
                            </div>
                            <div className="song-box-control">
                                <div className="song-box-time">
                                    <div className="song-playing-time">
                                        {formatTime(currentTime)}
                                    </div>
                                    <Process percent={currentTime / currentMusic.dt}
                                        dragEnd={this.dragEnd}
                                    />
                                    <div className="song-all-time">
                                        {formatTime(currentMusic.dt)}
                                    </div>
                                </div>
                                <div className="song-box-footer">
                                    <div className="song-control-item" onClick={() => { this.changeMode() }}>
                                        <img src={playMode[curModeIndex]} alt="" />
                                    </div>
                                    <div className="song-control-item" onClick={() => { this.prev() }}>
                                        <img src={prev} alt="" />
                                    </div>
                                    <div className="song-control-item" onClick={(e) => { this.toggle(e) }}>
                                        <img src={isPlay ? maxPlay : maxPause} alt="" />
                                    </div>
                                    <div className="song-control-item" onClick={() => { this.next() }}>
                                        <img src={next} alt="" />
                                    </div>
                                    <div className="song-control-item" onClick={(e) => { this.ShowPlayList(e) }}>
                                        <img src={list} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <div className={`music-list ${(playList.length > 0 && isShowPlayList) ? 'music-list-show' : ''}`}>
                    <div className="music-list-bg" onClick={(e) => { this.ShowPlayList(e) }}></div>
                    <MusicList playList={playList} isShowPlayList={isShowPlayList} />
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentMusic: state.currentMusic,
    currentMusicUrl: state.currentMusicUrl,
    currentIndex: state.currentIndex,
    playList: state.playList
})

const mapDispatchProps = dispatch => ({
    setShowPlayer: status => {
        dispatch(setShowPlayer(status))
    },
    setCurrentMusic: status => {
        dispatch(setCurrentMusic(status))
    },
    setCurrentMusicUrl: status => {
        dispatch(setCurrentMusicUrl(status))
    },
    setCurrentIndex: status => {
        dispatch(setCurrentIndex(status))
    },
    setPlayList: status => {
        dispatch(setPlayList(status))
    },
    addPlay: status => {
        dispatch(addPlay(status))
    }
})

export default connect(mapStateToProps, mapDispatchProps)(Player)