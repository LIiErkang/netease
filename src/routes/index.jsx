import React, { Component, Suspense } from 'react'

import { Route, Switch, Redirect } from 'react-router-dom'

import Loading from './Loading'

import routes from '@routes/routes'

export default class RoutesRender extends Component {
	render() {
		return <Suspense fallback={<Loading />}>
			<Switch>
				{routes.map(item =>
					<Route
						{...item}
						key={item.path}
						render={props => {
							document.title = item.title
							return <item.componentName {...props} />
						}}
					/>
				)}

				<Redirect to='/' />
			</Switch>
		</Suspense>
	}
}
