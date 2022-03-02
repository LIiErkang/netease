import React, { Component } from 'react'

import { LoadingOutlined } from '@ant-design/icons'

export default class LoadMore extends Component {
	onClick = () => {
		if (!this.props.loading) this.props.onClick()
	}

	render() {
		return <div
			className='load_more flex-center'
			onClick={this.onClick}
		>
			{this.props.text || '点击加载更多...'}&nbsp;&nbsp;&nbsp;
			{this.props.loading && <LoadingOutlined />}
		</div>
	}
}
