import { combineReducers, createStore } from 'redux'

import user from '@redux/reducers/user'
import home from '@redux/reducers/home'
import play from '@redux/reducers/play'
import detail from '@redux/reducers/detail'
import search from '@redux/reducers/search'
import show from '@redux/reducers/show'

export default createStore(combineReducers({ user, home, play, detail, search, show }))
