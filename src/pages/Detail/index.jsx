import React, { Component } from 'react'

import { connect } from 'react-redux'

import SongItem from '@components/SongItem'

import { setDetail } from '@redux/actions/detail'

import { getAlbum } from '@api/song'
import { getDetail } from '@api/detail'

import { parser } from '@utils/query'

class Detail extends Component {
	getDetail = async () => {
		const { id, type } = parser(this.props.location.search)

		let songs = [], currentDisplay = ''

		if (type === 'playlist') {
			songs = await getDetail(id)

			currentDisplay = '歌单: '
		} else if (type === 'album') {
			songs = await getAlbum(id)

			currentDisplay = '专辑: '
		} else return this.props.history.push('/')

		this.props.setDetail({ songlists: songs.songs, currentDisplay })
	}

	componentDidMount() {
		this.getDetail()
	}

	componentDidUpdate(props) {
		if (props.location.search !== this.props.location.search)
			this.getDetail()
	}

	render() {
		const { currentDisplay, songlists } = this.props.detail

		return <div className="detail">
			<span className='current-display'>{currentDisplay}</span>
			{songlists.map(item => <SongItem {...item} key={item.id} />)}
		</div>
	}
}

export default connect(state => ({ detail: state.detail }), { setDetail })(Detail)
