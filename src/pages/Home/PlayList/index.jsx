import React, { Component } from 'react'

import { withRouter } from 'react-router-dom'

import PlayListItem from './PlayListItem'

import { stringify } from '@utils/query'

class PlayList extends Component {
	getDetail = async ({ id }) => {
		this.props.history.push(`/detail${stringify({ id, type: 'playlist' })}`)
	}

	render() {
		const { className, playlists } = this.props

		return <div className={className}>
			{playlists.map(item =>
				<PlayListItem {...item} key={item.id} getDetail={this.getDetail} />
			)}
		</div>
	}
}

export default withRouter(PlayList)
