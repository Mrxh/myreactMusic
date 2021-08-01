import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import './m-header.scss'
import { Icon } from 'antd-mobile'

class MHeader extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const showHeader = /recommend|singer|rank|singerDetail/.test(this.props.location.pathname)
        return (
            showHeader && (
                <div className="mHeader">
                    <div className="mHeader-item txt-left"><Icon type="ellipsis" /></div>
                    <div className="mHeader-item">音悦台</div>
                    <div className="mHeader-item txt-right">
                        <NavLink to='/search'>
                            <Icon type="search" />
                        </NavLink>
                    </div>
                </div>
            )
        )
    }
}

export default withRouter(MHeader)