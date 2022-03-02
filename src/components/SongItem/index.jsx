import React, { Component } from 'react'

import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom'

import { Tooltip } from 'antd';
import {
	PlayCircleFilled,
	PlusCircleFilled
} from '@ant-design/icons'

import ImageComponent from '@components/ImageComponent'

import { setSearch } from '@redux/actions/search'
import { setPlay } from '@redux/actions/play'

import { getSong, getLyric } from '@api/song'

import { stringify } from '@utils/query'

class SongItem extends Component {
	getSong = async () => {
		const { setPlay, name, ar, id, al: { picUrl, id: albumId } } = this.props

		const result = await getSong(id)

		const { lrc: { lyric } } = await getLyric(result.data[0].id)

		setPlay({
			albumId,
			audio: result.data[0].url,
			singer: ar.map(item => [item.name, item.id]),
			songTitle: name,
			isPlaying: true,
			image: picUrl,
			album: this.props.al.name,
			id: result.data[0].id,
			lyric: lyric.split('\n').map(item => {
				item = item.replace('[', '')
				item = item.replace(']', ',')

				const [time, text] = item.split(',')

				const [minute, second] = time.split(':')

				let timer = 0

				timer += +minute * 60

				timer += +second

				return [timer, text]
			}).filter(([time, text]) => time && text)
		})

		return false
	}

	getSinger = async singerID => {
		this.props.history.push(`/search${stringify({ id: singerID, type: 'singer' })}`)
	}

	getAlbum = async albumID => {
		this.props.history.push(`/detail${stringify({ id: albumID, type: 'album' })}`)
	}

	render() {
		const { ar, name, al: { picUrl, name: album, id } } = this.props

		return <div className="song-item text" onDoubleClick={this.getSong}>
			<div className='song-item-header'>
				<ImageComponent
					src={picUrl}
					className='album'
					onClick={this.getSong}
				/>

				<div className='song-item-icons'>
					<Tooltip title='播放'>
						<PlayCircleFilled className='song-item-icon' onClick={this.getSong} />
					</Tooltip>

					<Tooltip title='添加到播放列表'>
						<PlusCircleFilled className='song-item-icon' />
					</Tooltip>
				</div>
			</div>

			<span className='song-item-title' onClick={this.getSong}>
				{name}
			</span>

			<div>
				{ar.map((item, index) =>
					<span
						className='song-item-title'
						onClick={() => this.getSinger(item.id)}
						key={item.id}
					>
						{item.name}
						{index < ar.length - 1 ? ' / ' : ''}
					</span>
				)}
			</div>

			<span
				className='song-item-title'
				onClick={() => this.getAlbum(id)}
			>
				{album}
			</span>
		</div>
	}
}

export default connect(state => ({}), { setPlay, setSearch })(withRouter(SongItem))
