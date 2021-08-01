import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './t-header.scss'
import { Icon } from 'antd-mobile'

class THeader extends Component {
    constructor(props) {
        super(props)
    }
    goBack(toUrl) {
        if (toUrl) {
            this.props.history.push(toUrl)
        } else {
            this.props.history.goBack()
        }
    }
    render() {
        const { title, toUrl, theme, bg } = this.props
        return (
            <div className={["tHeader " + theme]}>
                {bg && (
                    <div className="tHeader-mb-box">
                        <img src={bg} className="tHeader-img" />
                        <img src={bg} className="tHeader-mb" />
                    </div>
                )}
                <div className="tHeader-item txt-left"><Icon type="left" onClick={() => this.goBack(toUrl)} /></div>
                <div className="tHeader-item txt-mid">{title}</div>
                <div className="tHeader-item txt-right">
                </div>
            </div>
        )
    }
}

export default withRouter(THeader)