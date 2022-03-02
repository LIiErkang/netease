import React, { Component } from 'react'

import { connect } from 'react-redux'

import { message } from 'antd'

import { setSearch } from '@redux/actions/search'
import { setPlay } from '@redux/actions/play'

import LoadMore from '@components/LoadMore'
import SongItem from '@components/SongItem'

import { getSinger } from '@api/song'
import { search } from '@api/search'

import { parser } from '@utils/query'

class Search extends Component {
	state = {
		loading: false,
		offset: 0
	}

	search = async (flag = true) => {
		const { offset } = this.state
		const { id, type, keywords } = parser(this.props.location.search)

		let songs = [],
			currentSearch = '',
			hasMore = true

		this.setState({ loading: true })

		if (type === '') {
			message.error('参数错误')

			this.props.history.push('/')
		}

		[songs, hasMore, currentSearch] = type === 'songs'
			? await this.searchSongs(keywords, offset)
			: await this.getSinger(id, offset)

		this.setState({ loading: false, offset: offset + 30 })

		if (!hasMore) { message.error('没有更多了') }
		else this.setState({ offset: offset + 30 })

		this.setState({ loading: false })

		if (flag) songs = [...this.props.search.songs, ...songs]

		this.props.setSearch({ songs, currentSearch })
	}

	searchSongs = async (keywords, offset) => {
		const { result: { songs, songCount } } = await search({ keywords, offset })

		return [songs, songs?.length < songCount, '歌曲: ']
	}

	getSinger = async (id, offset) => {
		const { songs, more } = await getSinger({ id, offset })

		return [songs, more, '歌手: ']
	}

	componentDidUpdate(props) {
		if (props.location.search !== this.props.location.search) {
			this.search(false)
			this.setState({ offset: 0 })
		}
	}

	componentDidMount() {
		this.search(false)
	}

	render() {
		const { songs, currentSearch } = this.props.search

		return <div className='search'>
			<div className="current-search">{currentSearch}</div>

			{songs.map(item => <SongItem {...item} key={item.id} />)}

			<LoadMore
				onClick={this.search}
				loading={this.state.loading}
			/>
		</div>
	}
}

export default connect(
	state => ({ search: state.search }),
	{
		setPlay,
		setSearch
	}
)(Search)
