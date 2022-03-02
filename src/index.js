import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'

import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'

import { BrowserRouter } from 'react-router-dom'

import 'antd/dist/antd.css'

import store from '@redux/store'

import App from '@/App'

import '@styles'

ReactDOM.render(
	<Provider store={store}>
		<ConfigProvider locale={zhCN}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ConfigProvider>
	</Provider>,

	document.getElementById('app')
)
