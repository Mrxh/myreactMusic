import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from '@/store'
import './lyric.scss'

class Lyric extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lyricData: [],
            curTime: 0,
            mid: '',
            curLineIndex: 0,
            speed: 32,
            midLine: 9
        }
    }
    componentDidMount() {
        this.getCurLyric()
        store.subscribe(() => {
            this.getCurLyric()
        })
    }

    async getCurLyric() {
        document.getElementById('song-lyric').scrollTop = 0
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.currentTime <= 100) {
            document.getElementById('song-lyric').scrollTop = 0
        }
        const { lyricData } = this.state
        if (nextProps.isShowSong) {
            let speed = parseInt(document.getElementById('song-lyric-box').clientHeight / lyricData.length)
            let midLine = Math.floor((document.getElementById('song-lyric').clientHeight / speed) / 2)
            this.setState({ speed, midLine })
        }
        if (nextProps.isShowLyric != this.props.isShowLyric) {
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                let speed = parseInt(document.getElementById('song-lyric-box').clientHeight / lyricData.length)
                let midLine = Math.floor((document.getElementById('song-lyric').clientHeight / speed) / 2)
                this.setState({ speed, midLine })
            }, 100)
        }

        if (nextProps.currentTime) {
            this.setState({ curTime: (nextProps.currentTime / 1000).toFixed(3) })
        }
        if (nextProps.lyricData) {
            this.setState({ lyricData: nextProps.lyricData })
        }

    }
    isCurLine = (prev, next, index) => {
        const { curTime, lyricData, speed, midLine } = this.state
        if (curTime < lyricData[0].t) {
            document.getElementById('song-lyric').scrollTop = 0
        }
        if (curTime >= prev && curTime < next) {
            let scrollTop = document.getElementById('song-lyric').scrollTop
            if (index - midLine > 0 || scrollTop > index * speed) {
                document.getElementById('song-lyric').scrollTop = speed * (index - midLine)
            }
            return 'lyric-line-active'
        } else {
            return ''
        }
    }

    render() {
        const { lyricData } = this.state
        const { duration, isShowLyric } = this.props
        return (
            <div className={`song-lyric ${isShowLyric ? '' : 'song-lyric-hide'}`} id="song-lyric">
                <div className="song-lyric-box" id="song-lyric-box">
                    {lyricData.length > 0 &&
                        lyricData.map((item, index) => {
                            let nextObj = lyricData[index + 1]
                            return (<p className={`lyric-line ${this.isCurLine(item.t, nextObj ? nextObj.t : duration, index)}`} key={index}>{item.c}</p>)
                        })

                    }
                </div>
            </div>
        )
    }
}

//映射Redux全局的state到组件的props上
const mapStateToProps = state => ({
    currentMusic: state.currentMusic
})

export default connect(mapStateToProps)(Lyric)