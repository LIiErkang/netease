import React, { Component } from 'react'

import { connect } from 'react-redux'

import ControlBar from './ControlBar'
import ControlPanel from './ControlPanel'

import { setShow } from '@redux/actions/show'
import { setPlay } from '@redux/actions/play'

class Control extends Component {
	state = {
		duration: 0,
		currentTime: 0,
		volume: 10
	}

	play = () => {
		if (!this.props.play.audio) return

		this.props.setPlay({ isPlaying: true })

		this.audio.play()
		this.playing()
	}

	pause = () => {
		this.props.setPlay({ isPlaying: false })

		this.audio.pause()
		clearInterval(this.timer)
	}

	jump = value => {
		this.audio.currentTime = value

		this.play()

		this.setState({ currentTime: value })
	}

	setSound = volume => {
		this.audio.volume = volume / 10
		this.setState({ volume })
	}

	playing = () => {
		clearInterval(this.timer)

		this.timer = setInterval(() => {
			this.setState(({ currentTime, duration }) => {
				if (duration <= currentTime) {
					clearInterval(this.timer)

					this.props.setPlay({ isPlaying: false })

					return { currentTime: 0 }
				} else return { currentTime: currentTime + 1 }
			})
		}, 1000)
	}

	componentDidMount() {
		this.audio.addEventListener('canplay', () => {
			this.setState({ duration: this.audio.duration, currentTime: this.audio.currentTime })
		})
	}

	componentDidUpdate() {
		this.props.play.isPlaying && this.playing()
	}

	render() {
		const { className, play, setShow, show: { controlBar } } = this.props

		const {
			singer,
			songTitle,
			liked,
			image,
			audio,
			isPlaying,
			id,
			lyric,
			album,
			albumId
		} = play

		const { currentTime, duration, volume } = this.state
		const { play: playMethod, setSound, pause, jump } = this

		return <>{controlBar ?
			<div className={className}>

				<ControlBar
					jump={jump}
					pause={pause}
					play={playMethod}
					setShow={setShow}
					currentTime={currentTime}
					duration={duration}
					volume={volume}
					image={image}
					liked={liked}
					isPlaying={isPlaying}
					songTitle={songTitle}
					singer={singer}
					setSound={setSound}
					lyric={lyric}
				/>
			</div> :

			<ControlPanel
				play={playMethod}
				currentTime={currentTime}
				jump={jump}
				setShow={setShow}
				image={image}
				id={id}
				lyric={lyric}
				singer={singer}
				songTitle={songTitle}
				album={album}
				albumId={albumId}
			/>
		}

			<audio
				ref={node => this.audio = node}
				src={audio}
				loop
				autoPlay={isPlaying}
			></audio>
		</>
	}
}

export default connect(
	state => ({
		play: state.play,
		show: state.show
	}),
	{ setPlay, setShow }
)(Control)
