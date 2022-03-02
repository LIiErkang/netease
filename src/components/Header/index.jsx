import React, { Component } from 'react'

import { connect } from 'react-redux'

import { Menu, Input, Button, message, Avatar } from 'antd'
import {
	LoginOutlined,
	HomeOutlined,
	VerticalAlignTopOutlined,
	ProfileOutlined
} from '@ant-design/icons'

import { withRouter } from 'react-router-dom'

import { setSearch } from '@redux/actions/search'
import { setUser } from '@redux/actions/user'

import { search } from '@api/search'

import { stringify } from '@utils/query'

class Header extends Component {
	search = async keywords => {
		const { setSearch, history } = this.props

		if (!keywords.length) return message.error('请输入内容')

		const { result } = await search({ keywords })

		setSearch({ songs: result.songs, currentSearch: '歌曲: ' })

		history.push(`/search${stringify({ keywords, type: 'songs' })}`)
	}

	render() {
		const { history, location, user } = this.props

		const menus = [
			{ text: '首页', path: '/', icon: <HomeOutlined /> },
			{ text: '排行榜', path: '/toplist', icon: <VerticalAlignTopOutlined /> },
			{ text: '个人中心', path: '/profile', icon: <ProfileOutlined /> }
		]

		return <div className='header'>
			<div className='header-menu flex-center'>
				<Menu mode="horizontal" selectedKeys={[location.pathname]}>
					{menus.map(item =>
						<Menu.Item
							key={item.path}
							icon={item.icon}
							onClick={() => history.push(item.path)}
						>
							{item.text}
						</Menu.Item>
					)}
				</Menu>
			</div>

			<div className='header-search flex-center'>
				<Input.Search onSearch={this.search} allowClear />
				{user.login ?
					<Avatar /> :

					<Button
						type='link'
						icon={<LoginOutlined />}
						onClick={() => history.push('/login')}
					>
						登录
					</Button>
				}
			</div>
		</div>
	}
}

export default connect(
	state => ({ user: state.user }),
	{ setUser, setSearch }
)(withRouter(Header))
