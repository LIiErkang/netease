import getActionParams from '@utils/getActionParams'

export const setSearch = value => ({ type: 'setSearchState', data: getActionParams(value) })
