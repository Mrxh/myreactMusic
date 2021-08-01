import React, { Component } from 'react'
import { getTopList } from '@/api'
import './rank.scss'

class Rank extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rankList1: [],
            rankList2: []
        }
    }
    async componentDidMount() {
        const res = await getTopList()
        if (res.code === 200) {
            this.setState({ rankList1: res.list.slice(0, 4), rankList2: res.list.slice(4) })
        }
    }
    gotoDetail(id) {
        this.props.history.push('/playlist/' + id)
    }
    render() {
        const { rankList1, rankList2 } = this.state
        return (
            <div className="rank">
                <div className="rank-header">
                    <h3 className="rank-header-title">官方榜</h3>
                    <div className="rank-header-gf">
                        {rankList1.length > 0 && rankList1.map((item, index) => {
                            return (
                                <div className="rank-list" key={index} onClick={() => { this.gotoDetail(item.id) }}>
                                    <div className="rank-list-img">
                                        <img src={item.coverImgUrl} alt="" />
                                        <div className="rank-update-time">{item.updateFrequency}</div>
                                    </div>
                                    <div className="rank-list-list">
                                        {
                                            item.tracks.length > 0 && item.tracks.map((citem, cindex) => {
                                                return (<p className="rank-list-item" key={cindex}>{citem.first}-{citem.second}</p>)
                                            })
                                        }

                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
                <div className="rank-section">
                    <h3 className="rank-section-title">全球榜</h3>
                    <div className="rank-section-container">
                        {rankList2.length > 0 && rankList2.map((item, index) => {
                            return (

                                <div className="rank-section-item" key={index} onClick={() => { this.gotoDetail(item.id) }}>
                                    <img src={item.coverImgUrl} alt="" />
                                    <div className="rank-section-update">{item.updateFrequency}</div>
                                </div>

                            )
                        })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Rank