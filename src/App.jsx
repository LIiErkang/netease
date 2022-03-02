import React, { Component } from 'react'

import Control from '@components/Control'
import Header from '@components/Header'

import RoutesRender from '@routes'

export default class App extends Component {
	render() {
		return <>
			<Header className='header' />

			<div className="content">
				<RoutesRender />
			</div>

			<Control className='control' />
		</>
	}
}
