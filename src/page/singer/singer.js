import React, { Component } from 'react'
import { List } from "antd-mobile"
import { singerKind } from "@/model/singerKind";

const Item = List.Item

class Singer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            singerKind
        }
    }

    gotoDetail(type, area, name) {
        this.props.history.push('/singerDetail/' + type + '/' + area + '/' + name)
    }
    render() {
        const { singerKind } = this.state
        return (
            <div className="singer">
                {singerKind.length > 0 && singerKind.map((item, index) => {
                    return (
                        index === 0 ? (
                            <List key={index}>
                                {item.length > 0 && item.map((cItem, cIndex) => {
                                    return (
                                        <Item
                                            arrow="horizontal"
                                            key={cIndex}
                                            onClick={() => { this.gotoDetail(cItem.type, cItem.area, cItem.name) }}
                                        >{cItem.name}</Item>
                                    )
                                })}
                            </List>
                        ) : (
                                <List renderHeader={() => ''} key={index}>
                                    {item.length > 0 && item.map((cItem, cIndex) => {
                                        return (
                                            <Item
                                                arrow="horizontal"
                                                key={cIndex}
                                                onClick={() => { this.gotoDetail(cItem.type, cItem.area, cItem.name) }}
                                            >{cItem.name}</Item>
                                        )
                                    })}
                                </List>
                            )
                    )
                })}
            </div>
        )
    }
}

export default Singer