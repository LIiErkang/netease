import React, { Component } from 'react'

import { Avatar, Slider, Tooltip } from 'antd'
import {
	CaretLeftFilled,
	CaretRightFilled,
	PauseOutlined,
	PlayCircleFilled,
	HeartOutlined,
	HeartFilled,
	UnorderedListOutlined,
	SoundOutlined,
	RetweetOutlined,
	SoundFilled
} from '@ant-design/icons'

export default class ControlBar extends Component {
	render() {
		const {
			currentTime,
			duration,
			jump,
			songTitle,
			singer,
			volume,
			isPlaying,
			image,
			setShow,
			liked,
			setSound,
			pause,
			play,
			lyric
		} = this.props

		const currentLyric = lyric.find(([time], index) =>
			index >= lyric.length - 1
				? true
				: currentTime >= time & currentTime < lyric[index + 1][0]
		)

		return <div className='control-bar'>
			<div className="timer">
				<span className='timer-number'>{parseInt(currentTime)}</span>

				<Slider
					tipFormatter={() => isPlaying && currentLyric ? currentLyric[1] : '暂无歌词'}
					value={parseInt(currentTime)}
					max={parseInt(duration)}
					className='slider'
					onChange={jump}
				/>

				<span className='timer-number'>{parseInt(duration)}</span>
			</div>

			<div className='song-info flex-center'>
				<div className='song-info-left'>
					<Avatar
						shape='square'
						size='large'
						src={image}
						style={{ cursor: 'pointer' }}
						onClick={() => setShow({ controlBar: false })}
					/>

					<div
						className='song-text text'
						style={{ cursor: 'pointer' }}
						onClick={() => setShow({ controlBar: false })}
					>
						<Tooltip title={songTitle}>
							<span className="song-title">{songTitle}</span>
						</Tooltip>

						<Tooltip title={singer.map(item => item[0]).join('/')}>
							<span className="singer">{singer.map(item => item[0]).join('/')}</span>
						</Tooltip>
					</div>

					<div className='control-bar-icon small text'>
						<Tooltip title={liked ? '取消收藏' : '收藏'}>
							{liked ? <HeartFilled /> : <HeartOutlined />}
						</Tooltip>
					</div>
				</div>

				<div
					className='lyric text flex-center'
					onClick={() => setShow({ controlBar: false })}
				>
					<Tooltip title={isPlaying && currentLyric ? currentLyric[1] : '暂无歌词'}>
						<span className='current-lyric'>{isPlaying && currentLyric ? currentLyric[1] : '暂无歌词'}</span>
					</Tooltip>
				</div>
			</div>

			<div className='control-bar-controller flex-center'>
				<Tooltip title='上一首'>
					<CaretLeftFilled className='control-bar-icon' />
				</Tooltip>

				<Tooltip title={isPlaying ? '暂停' : '播放'}>
					{isPlaying ?
						<PauseOutlined className='control-bar-icon big' onClick={pause} /> :

						<PlayCircleFilled className='control-bar-icon big' onClick={play} />}
				</Tooltip>

				<Tooltip title='下一首'>
					<CaretRightFilled className='control-bar-icon' />
				</Tooltip>
			</div>

			<div className='control-bar-others flex-center'>
				<Tooltip title='播放列表'>
					<UnorderedListOutlined className='control-bar-icon small' />
				</Tooltip>

				<Tooltip title={'循环播放'}>
					<RetweetOutlined className='control-bar-icon small' />
				</Tooltip>

				<div
					className='control-bar-icon small'
					onClick={() => setSound(volume !== 0 ? 0 : 10)}
				>
					<Tooltip title={volume}>
						{volume ?
							<SoundFilled /> :
							<SoundOutlined />}
					</Tooltip>
				</div>

				<Slider
					max={10}
					className='volume-control'
					value={volume}
					onChange={setSound}
				/>
			</div>
		</div>
	}
}
