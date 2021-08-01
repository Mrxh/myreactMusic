import React, { Component } from 'react'
import { connect } from 'react-redux'
import Home from '@/page/home/home'
import Search from '@/page/search/search'
import Playlist from '@/page/playlist/playlist'
import singerDetail from '@/page/singer/singerDetail'
import singerSongs from '@/page/singer/singerSongs'
import MHeader from '@/components/m-header/m-header'
import Player from '@/components/player/player'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './layout.scss'

class Layout extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="layout">
                <div className={`layout-box ${this.props.showPlayer ? 'layout-main' : ''}`}>
                    <Router>
                        <MHeader />
                        <Switch>
                            <Route path="/discover" component={Home} />
                            <Route path="/search" component={Search} />
                            <Route path="/playlist/:id" component={Playlist} />
                            <Route path="/singerDetail/:type/:area/:name" component={singerDetail} />
                            <Route path="/singerSongs/:id" component={singerSongs} />
                            <Redirect to="/discover" />
                        </Switch>
                    </Router>
                </div>
                {this.props.showPlayer && <Player />}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    showPlayer: state.showPlayer
})
export default connect(mapStateToProps)(Layout)