import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { getSinger } from "@/api"
import THeader from '@/components/t-header/t-header'
import './singerDetail.scss'

class SingerDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            singerList: []
        }
    }

    async componentDidMount() {
        const { type, area } = this.props.match.params
        const res = await getSinger(type, area)
        if (res.code === 200) {
            this.setState({ singerList: res.artists })
        }
    }
    gotoDetail(id, name) {
        this.props.history.push('/singerSongs/' + id + '/' + name)
    }
    render() {
        const { singerList } = this.state
        const { name } = this.props.match.params
        return (
            <div className="singerDetail">
                <THeader title={name} toUrl="/discover/singer" />
                <div className="singerDetail-box">
                    {
                        singerList.length > 0 && singerList.map((item, index) => {
                            return (
                                <div className="s-list-item" key={index} onClick={() => { this.gotoDetail(item.id, item.name) }}>
                                    <div className="s-list-item-img">
                                        <img src={item.picUrl + '?param=70y70'} alt="" />
                                    </div>
                                    <div className="s-list-item-box">
                                        {item.name}
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        )
    }
}

export default withRouter(SingerDetail)