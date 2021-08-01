import React, { Component } from 'react'
import THeader from '@/components/t-header/t-header'
import SList from '@/components/s-list/s-list'
import { SearchBar } from 'antd-mobile';
import { getHotList, search } from '@/api'
import './search.scss'

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            hotList: [],
            searchList: [],
            songList: []
        }
    }
    async componentDidMount() {
        const hotList = await getHotList()
        if (hotList.code === 200) {
            this.setState({ hotList: hotList.result.hots })
        }
    }
    onChange = (value) => {
        this.setState({ value });
    }
    async searchFn(keywords) {
        this.setState({ value: keywords })
        const searchList = await search(keywords, 1)
        const songList = await search(keywords, 1000)
        if (searchList.code === 200) {
            this.setState({ searchList: searchList.result.songs })
        }
        if (songList.code === 200) {
            this.setState({ songList: songList.result.playlists })
        }
    }
    render() {
        const { hotList, searchList, songList } = this.state
        return (
            <div className="search">
                <THeader title="搜索" />
                <div className="search-box">
                    <SearchBar
                        value={this.state.value}
                        placeholder="请输入歌曲、歌手、专辑"
                        onSubmit={value => { this.searchFn(value) }}
                        onClear={value => console.log(value, 'onClear')}
                        onFocus={() => console.log('onFocus')}
                        onBlur={() => console.log('onBlur')}
                        onCancel={() => console.log('onCancel')}
                        onChange={this.onChange}
                    />
                    <div className="search-content">
                        <div className="search-hot">
                            <h3 className="search-hot-title">热门搜索</h3>
                            <div className="search-hot-box">
                                {
                                    hotList.length > 0 && hotList.map(item => {
                                        return <div className="search-hot-item" key={item.first} onClick={() => { this.searchFn(item.first) }}>{item.first}</div>
                                    })
                                }
                            </div>
                        </div>
                        {this.state.value && searchList.length > 0 && <SList list={searchList} songList={songList} />}
                    </div>
                </div>
            </div>
        )
    }
}

export default Search