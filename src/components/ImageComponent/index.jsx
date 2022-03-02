import React, { Component } from 'react'

export default class ImageComponent extends Component {
	render() {
		return <img
			onClick={this.props.onClick}
			src={this.props.src}
			alt=""
			loading='lazy'
			style={{
				width: 40,
				height: 40,
				borderRadius: 4,
				cursor: 'pointer'
			}}
		/>
	}
}
