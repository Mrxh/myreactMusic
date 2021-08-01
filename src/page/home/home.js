import React, { Component } from 'react'
import { BrowserRouter as Router, NavLink, Route, Redirect, Switch } from 'react-router-dom'
import Recommend from '@/page/recommend/recommend'
import Singer from '@/page/singer/singer'
import Rank from '@/page/rank/rank'
import './home.scss'

class Home extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { url } = this.props.match
        return (
            <div className="home">
                <nav className="tabbar">
                    <NavLink to={url + "/recommend"} activeClassName="tabActive">
                        <span>推荐</span>
                    </NavLink>
                    <NavLink to={url + "/singer"} activeClassName="tabActive">
                        <span>歌手</span>
                    </NavLink>
                    <NavLink to={url + "/rank"} activeClassName="tabActive">
                        <span>排行榜</span>
                    </NavLink>
                </nav>
                <Switch>
                    <Route path={url + "/recommend"} component={Recommend} />
                    <Route path={url + "/singer"} component={Singer} />
                    <Route path={url + "/rank"} component={Rank} />
                    <Redirect to={url + "/recommend"} />
                </Switch>
            </div>
        )
    }
}

export default Home