import React, { Component } from 'react'
import { Tabs, Badge } from 'antd-mobile';
import { formatName, formatCount } from '@/utils/utils'
import { connect } from 'react-redux'
import { setAllPlay } from '@/store/actions'
import { getMusicDetail } from '@/api'
import { withRouter } from 'react-router-dom'
import './s-list.scss'

const tabs = [
    { title: <Badge>单曲</Badge> },
    { title: <Badge>歌单</Badge> }
]

class SList extends Component {
    constructor(props) {
        super(props)
    }
    async play(index) {
        const { list } = this.props
        let ids = ''
        list.forEach((item, idx) => {
            ids += idx < list.length - 1 ? item.id + ',' : item.id
        })
        const playList = await getMusicDetail(ids)
        this.props.setAllPlay({ playList: playList.songs, currentIndex: index })
    }

    gotoDetail(id) {
        this.props.history.push('/playlist/' + id)
    }

    render() {
        const { list, songList } = this.props
        const id = this.props.currentMusic.id
        return (
            <div className="s-list">
                <Tabs tabs={tabs}
                    initialPage={0}
                    onChange={(tab, index) => { console.log('onChange', index, tab); }}
                    onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                    tabBarUnderlineStyle={{ borderColor: '#C20C0C' }}
                    tabBarActiveTextColor="#C20C0C"
                >
                    <div className="s-list-content1">
                        {list.length > 0 && list.map((item, index) => {
                            return (
                                <div className={`s-list-item ${id === item.id ? 's-list-item-active' : ''}`} key={item.id} onClick={() => { this.play(index) }}>
                                    <h3>{item.name}</h3>
                                    <p>{formatName(item.artists)}-{item.album.name}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div className="s-list-content2">
                        {
                            songList.length > 0 && songList.map((item, index) => {
                                return (
                                    <div className="s-list-item" key={index} onClick={() => { this.gotoDetail(item.id) }}>
                                        <div className="s-list-item-img">
                                            <img src={item.coverImgUrl + '?param=70y70'} alt="" />
                                        </div>
                                        <div className="s-list-item-box">
                                            <h3>{item.name}</h3>
                                            <p>{item.trackCount}by{item.creator.nickname} 播放{formatCount(item.playCount)}次</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Tabs>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SList))