import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './process.scss'

class Process extends Component {
    constructor(props) {
        super(props)
        this.state = {
            offsetWidth: 0,
            status: false,// 是否可拖动
            startX: 0,//最开始点击的X坐标
            left: 0//已经走过的距离
        }
    }

    componentDidMount() {
        this.mProcess = ReactDOM.findDOMNode(this.refs.mProcess)
        this.mProcessInner = ReactDOM.findDOMNode(this.refs.mProcessInner)
        this.bindEvents()
    }

    componentWillReceiveProps(nextProps) {
        if (!this.state.status && !nextProps.percent != this.props.percent) {
            this.setState({ offsetWidth: this.mProcess.clientWidth * nextProps.percent })
        }
    }

    componentWillUnmount() {
        this.unbindEvents()
    }
    barClick = e => {
        let rect = this.mProcess.getBoundingClientRect()
        let offsetWidth = Math.min(rect.width, Math.max(0, e.clientX - rect.left))
        this.setState({ offsetWidth })
        if (this.props.dragEnd) {
            this.props.dragEnd(offsetWidth / this.mProcess.clientWidth)
        }
    }

    bindEvents() {
        document.addEventListener('mousemove', this.barMove)
        document.addEventListener('mouseup', this.barUp)
        document.addEventListener('touchmove', this.barMove)
        document.addEventListener('touchend', this.barUp)
    }
    unbindEvents() {
        document.removeEventListener('mousemove', this.barMove)
        document.removeEventListener('mouseup', this.barUp)
        document.removeEventListener('touchmove', this.barMove)
        document.removeEventListener('touchend', this.barUp)
    }
    barDown = e => {
        this.setState({
            status: true,// 是否可拖动
            startX: e.clientX || e.touches[0].pageX,//最开始点击的X坐标
            left: this.mProcessInner.clientWidth//已经走过的距离
        })
    }
    barMove = e => {
        if (this.state.status) {
            let endX = e.clientX || e.touches[0].pageX,
                dist = endX - this.state.startX
            let offsetWidth = Math.min(
                this.mProcess.clientWidth,
                Math.max(0, this.state.left + dist)
            )
            this.setState({ offsetWidth })
        }
    }
    barUp = e => {
        if (this.state.status) {
            this.setState({ status: false })
            if (this.props.dragEnd) {
                this.props.dragEnd(this.state.offsetWidth / this.mProcess.clientWidth)
            }
        }
    }
    render() {
        let { offsetWidth } = this.state
        return (
            <div className="song-box-process" ref="mProcess" onClick={this.barClick}>
                <div className="song-box-value" ref="mProcessInner" style={{ width: `${offsetWidth}px` }}>
                    <div className="song-box-circle"
                        onMouseDown={this.barDown}
                        onTouchStart={this.barDown}></div>
                </div>
            </div>
        )
    }
}

export default Process