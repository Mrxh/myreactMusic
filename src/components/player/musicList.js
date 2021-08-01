import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatName } from '@/utils/utils'
import { addPlay } from '@/store/actions'
import './musicList.scss'

class MusicList extends Component {
    constructor(props) {
        super(props)
    }

    play(music) {
        this.props.addPlay(music)
    }

    render() {
        const { playList, isShowPlayList } = this.props
        const id = this.props.currentMusic.id
        return (
            <div className={`music-list-box ${isShowPlayList ? 'music-list-box-show' : ''}`}>
                <div className="music-list-title">歌单列表</div>
                <div className="music-list-list">
                    {
                        playList.length > 0 && playList.map((item, index) => {
                            return (
                                <div className={`music-list-item ${id === item.id ? 'music-list-item-active' : ''}`} key={index} onClick={() => { this.play(item) }}>
                                    <div className="music-list-num">{index + 1}</div>
                                    <div className="music-list-content">{item.name}-{formatName(item.ar)}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentMusic: state.currentMusic
})

const mapDispatchProps = dispatch => ({
    addPlay: status => {
        dispatch(addPlay(status))
    }
})


export default connect(mapStateToProps, mapDispatchProps)(MusicList)