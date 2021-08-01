import React, { Component } from 'react'
import { Carousel } from 'antd-mobile'
import { getBanner, getRecommend } from '@/api'
import ReList from '@/components/re-list/re-list'
import './recommend.scss'

class Recommend extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            recommend: [],
            imgHeight: 176
        }
    }
    async componentDidMount() {
        const bannerList = await getBanner()
        if (bannerList.code === 200) {
            this.setState({ data: bannerList.banners })
        }

        const recommend = await getRecommend()
        if (recommend.code === 200) {
            this.setState({ recommend: recommend.result })
        }
    }
    render() {
        const { recommend } = this.state
        return (
            <div className="recommend">
                <Carousel
                    autoplay={true}
                    infinite
                    slideWidth={1}
                >
                    {this.state.data.map(val => (
                        <a
                            key={val}
                            href={val.url}
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                        >
                            <img
                                src={val.imageUrl}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top' }}
                                onLoad={() => {
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({ imgHeight: 'auto' });
                                }}
                            />
                        </a>
                    ))}
                </Carousel>

                <div className="re-context">
                    <h3 className="re-title">推荐歌单</h3>
                    <ReList list={recommend} />
                </div>
            </div>
        )
    }
}

export default Recommend