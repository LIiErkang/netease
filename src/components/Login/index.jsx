import React, { Component } from 'react'

import { connect } from 'react-redux'

import { Form, Button, Input, message, Card } from 'antd'
import {
	LoginOutlined,
	AlignRightOutlined,
	UserOutlined,
	SendOutlined
} from '@ant-design/icons'

import { setUser } from '@redux/actions/user'

import { cellphoneLogin, sendCaptcha } from '@api/loginState'

class Login extends Component {
	state = {
		sendCaptchaTime: 0,

		isSendCaptcha: false
	}

	sendCaptcha = async () => {
		try {
			await this.form.validateFields(['phone'])
		} catch {
			this.phone.focus()

			return message.error('请输入手机号')
		}

		this.setState({ sendCaptchaTime: 60, isSendCaptcha: true }, async () => {
			await sendCaptcha(this.phone.input.value)

			message.success('发送验证码成功')

			let timer = setInterval(() => {
				const { sendCaptchaTime } = this.state

				if (sendCaptchaTime === 0) {
					clearInterval(timer)

					return this.setState({ sendCaptchaTime: 0 })
				}

				this.setState({ sendCaptchaTime: sendCaptchaTime - 1 })
			}, 1000)
		})
	}

	login = async data => {
		if (!this.state.isSendCaptcha) {
			message.error('请发送验证码')
			return this.form.setFields([{ name: 'captcha', errors: ['请发送验证码'] }])
		}

		const result = await cellphoneLogin(data)

		document.cookie = result.cookie

		console.log(result)
		//
	}

	render() {
		const { login, sendCaptcha } = this
		const { sendCaptchaTime } = this.state

		const phoneFields = {
			label: '手机号',
			name: 'phone',
			rules: [{ required: true, max: 11, min: 11 }],
		}

		const phoneInputFields = {
			maxLength: 11,
			prefix: <UserOutlined />,
			enterButton: <>
				<SendOutlined />&nbsp;&nbsp;
				{sendCaptchaTime || '获取验证码'}
			</>,
			loading: sendCaptchaTime,
			onSearch: sendCaptcha,
			ref: node => this.phone = node
		}

		const captchaFields = {
			label: '验证码',
			name: 'captcha',
			rules: [{ required: true, max: 4, min: 4 }],
		}

		const captchaInputFields = {
			prefix: <AlignRightOutlined />,
			maxLength: 4,
			ref: node => this.captcha = node
		}

		const buttons = [
			{
				type: 'default',
				children: '取消',
				key: 'cancel',
				onClick: () => this.props.setDialog({ key: 'login', value: false })
			},

			{
				type: 'primary',
				children: '登录',
				htmlType: 'submit',
				icon: <LoginOutlined />,
				key: 'login'
			}
		]

		return <Card visible={this.props.showLogin} title='登录' >
			<Form
				labelCol={{ span: 4 }}
				ref={node => this.form = node}
				onFinish={login}
				initialValues={{ phone: '', captcha: '' }}
			>
				<Form.Item {...phoneFields}>
					<Input.Search {...phoneInputFields} allowClear />
				</Form.Item>

				<Form.Item {...captchaFields}>
					<Input {...captchaInputFields} allowClear />
				</Form.Item>

				<Form.Item>
					<div className='form-footer-buttons'>
						{buttons.map(button => <Button {...button} />)}
					</div>
				</Form.Item>
			</Form>
		</Card >
	}
}

export default connect('', { setUser })(Login)
