import React, { Component } from 'react'
import './album.scss'

class Album extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isPlay: false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ isPlay: nextProps.isPlays })
    }

    render() {
        const { albumImg } = this.props
        const { isPlay } = this.state
        return (
            <div className="song-album">
                <div className={`song-album-cd ${isPlay ? '' : 'song-album-cd-pause'}`}>
                    <div className="song-album-img">
                        <img src={albumImg} alt="" />
                    </div>
                </div>
            </div>
        )
    }
}

export default Album