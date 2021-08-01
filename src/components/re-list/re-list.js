import React, { Component } from 'react'
import { formatCount } from '@/utils/utils'
import { withRouter } from 'react-router-dom'
import zf from '@/assets/images/discover/zf.png'
import './re-list.scss'

class ReList extends Component {
    constructor(props) {
        super(props)
    }
    gotoDetail(id) {
        this.props.history.push('/playlist/' + id)
    }
    render() {
        const { list } = this.props
        return (
            <div className="re-container">
                {list.length > 0 &&
                    list.map(item => {
                        return (
                            <div className="re-song" key={item.id} onClick={() => { this.gotoDetail(item.id) }}>
                                <div className="re-song-img">
                                    <img src={`${item.picUrl}?param=200y200`} alt="" className="re-song-image" />
                                    <div className="re-song-tips">
                                        <img src={zf} alt="" />
                                        <span>{formatCount(item.playCount)}</span>
                                    </div>
                                </div>
                                <p className="re-song-title">{item.name}</p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default withRouter(ReList)