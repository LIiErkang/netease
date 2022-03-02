import React, { Component } from 'react'

import { Image } from 'antd'

import { withRouter } from 'react-router-dom'

import { stringify } from '@utils/query'

class ControlPanel extends Component {
	state = {
		className: '',
		scroll: false
	}

	close = () => {
		this.setState({ className: 'leave' }, () => {
			setTimeout(() => {
				this.setState({ className: '' })

				document.documentElement.style.overflowY = ''

				this.props.setShow({ controlBar: true })
			}, 200)
		})
	}

	getSinger = async singerID => {
		this.close()
		this.props.history.push(`/search${stringify({ id: singerID, type: 'singer' })}`)
	}

	getAlbum = async albumID => {
		this.close()
		this.props.history.push(`/detail${stringify({ id: albumID, type: 'album' })}`)
	}

	componentDidMount() {
		document.documentElement.style.overflowY = 'hidden'

		this.setState({ className: 'show' }, () => {
			setTimeout(() => {
				this.setState({ className: '' })
			}, 300)
		})
	}

	componentDidUpdate() {
		if (this.text && this.container) {
			if (this.state.scroll) {
				this.timer = setTimeout(() => {
					this.setState({ scroll: false })
				}, 5000)
			} else this.container.scrollTop = this.text.offsetTop - this.container.offsetTop - 100
		}
	}

	render() {
		const { className, scroll } = this.state
		const {
			image,
			lyric,
			currentTime,
			singer,
			songTitle,
			album,
			jump,
			albumId
		} = this.props

		return <div className={`control-panel-container ${className}`} onClick={this.close}>
			<div className="control-panel">
				<div className='control-panel-image-container flex-center'>
					<div className='control-panel-image flex-center'>
						<Image
							preview={false}
							src={image}
							width={'100%'}
							onClick={event => event.stopPropagation()}
						/>
					</div>
				</div>

				<div className='control-panel-main-container flex-center'>
					<div
						className='control-panel-main'
						onClick={event => event.stopPropagation()}
					>
						<div className='control-panel-song-info flex-center'>
							<div className='control-panel-song_title'>{songTitle}</div>

							<div
								className='control-panel-album'
								onClick={() => this.getAlbum(albumId)}
							>
								{album}
							</div>

							<div className='control-panel-singer'>
								{singer.map((item, index) => <span
									className='control-panel-singer-item'
									key={item}
									onClick={() => this.getSinger(item[1])}
								>
									{item[0]}
									{index < singer.length - 1 && '/'}
								</span>
								)}
							</div>
						</div>

						<div
							className="control-panel-lyric-container"
							onClick={event => event.stopPropagation()}
							ref={node => this.container = node}
							onScroll={() => {
								if (!scroll) this.setState({ scroll: !scroll })
							}}
						>
							<div className='control-panel-lyric flex-center'>
								{lyric.map((item, index) => {
									let currentClassName = `control-panel-lyric-text flex-center `
									let flag = false

									if (index >= lyric.length - 1 && currentTime >= lyric[lyric.length - 1][0])
										flag = true
									else if (currentTime >= item[0] && currentTime < lyric[index + 1][0])
										flag = true

									return <p
										ref={node => { if (flag) this.text = node }}
										onClick={() => jump(item[0])}
										key={item[0]}
										className={currentClassName + ` ${flag && 'control-panel-current-lyric'}`}>
										{item[1]}
									</p>
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div >
	}
}

export default withRouter(ControlPanel)
