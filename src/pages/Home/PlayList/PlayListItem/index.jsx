import React, { Component } from 'react'

import { Card } from 'antd'

export default class PlayListItem extends Component {
	render() {
		const { coverImgUrl, name, getDetail } = this.props

		return <Card
			className='playlist-item text'
			style={{ width: 160 }}
			cover={< img src={coverImgUrl} />}
			onClick={() => getDetail(this.props)}
		>
			{name}
		</Card>
	}
}
