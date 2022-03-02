import { lazy } from 'react'

const Home = lazy(() => import('@pages/Home'))
const Profile = lazy(() => import('@pages/Profile'))
const Search = lazy(() => import('@pages/Search'))
const TopList = lazy(() => import('@pages/TopList'))
const Detail = lazy(() => import('@pages/Detail'))

const routes = [
	{ path: '/', exact: true, componentName: Home, title: '网易云音乐' },
	{ path: '/profile', componentName: Profile, title: '个人中心' },
	{ path: '/search', componentName: Search, title: '搜索' },
	{ path: '/toplist', componentName: TopList, title: '排行榜' },
	{ path: '/detail', componentName: Detail, title: '详情' }
]

export default routes
