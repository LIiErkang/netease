import React, { Component } from 'react'

import { LoadingOutlined } from '@ant-design/icons'

import './index.css'

export default class Loading extends Component {
	render() {
		return <div className="loading">
			<LoadingOutlined className='loading-icon'/>
		</div>
	}
}
