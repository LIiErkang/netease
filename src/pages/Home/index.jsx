import React, { Component } from 'react'

import { connect } from 'react-redux'

import LoadMore from '@components/LoadMore'

import PalyList from './PlayList'

import { setHome } from '@redux/actions/home'

import { getPlayList } from '@api/home'

class Home extends Component {
	state = {
		loading: false,
		offset: 0
	}

	getPlayList = async () => {
		this.setState({ loading: true })

		let { offset } = this.state

		const { playlists } = await getPlayList({ offset })

		this.setState({ loading: false, offset: offset + 10 })

		this.props.setHome({ playlists })
	}

	render() {
		const { playlists } = this.props.home

		return <div className='home'>
			<PalyList
				playlists={playlists}
				className='home-playlist'
			/>

			<LoadMore
				text='刷新'
				onClick={this.getPlayList}
				loading={this.state.loading}
			/>
		</div>
	}
}

export default connect(
	state => ({ home: state.home }),
	{ setHome }
)(Home)
