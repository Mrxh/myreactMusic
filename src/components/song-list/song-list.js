import React, { Component } from 'react'
import { formatName } from '@/utils/utils'
import { connect } from 'react-redux'
import { setAllPlay } from '@/store/actions'
import './song-list.scss'

class SongList extends Component {
    constructor(props) {
        super(props)
    }
    play(index) {
        const { list } = this.props
        this.props.setAllPlay({ playList: list, currentIndex: index })
    }
    render() {
        const { list } = this.props
        const id = this.props.currentMusic.id
        return (
            <div className="playlist-song-list">
                {list.length > 0 &&
                    list.map((item, index) => {
                        return (
                            <div className={`playlist-song-item ${id === item.id ? 'playlist-song-item-active' : ''}`} key={item.id} onClick={() => { this.play(index) }}>
                                <div className="playlist-song-num">{index + 1}</div>
                                <div className="playlist-song-info">
                                    <h3>{item.name}</h3>
                                    <p>
                                        <span>{formatName(item.ar)}</span>
                                        &nbsp;-&nbsp;
                                        <span>{item.name}</span>
                                    </p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

//映射Redux全局的state到组件的props上
const mapStateToProps = state => ({
    currentMusic: state.currentMusic
})

//映射dispatch到props上
const mapDispatchToProps = dispatch => ({
    setAllPlay: status => {
        dispatch(setAllPlay(status))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SongList)