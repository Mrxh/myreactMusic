import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { getSingerSongs } from "@/api"
import THeader from '@/components/t-header/t-header'
import SongList from '@/components/song-list/song-list'
import './singerSongs.scss'

class SingerSongs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            artist: {},
            songsList: []
        }
    }

    async componentDidMount() {
        const { id } = this.props.match.params
        const res = await getSingerSongs(id)
        if (res.code === 200) {
            this.setState({ artist: res.artist, songsList: res.hotSongs })
        }
    }
    gotoDetail(id) {

    }
    render() {
        const { artist, songsList } = this.state
        return (
            <div className="singerSongs">
                <THeader title={artist.name} />
                <div className="singerSongs-box">
                    <div className="singerSongs-header-content">
                        <img src={artist.picUrl} alt="" />
                        <div className="singerSongs-header-dialog">
                            <div className="singerSongs-header-desc">{artist.briefDesc}</div>
                        </div>
                    </div>
                    <div className="singerSongs-list">
                        <SongList list={songsList} />
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(SingerSongs)