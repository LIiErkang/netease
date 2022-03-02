import getActionParams from '@utils/getActionParams'

export const setHome = value => ({ type: 'setHomeState', data: getActionParams(value) })
