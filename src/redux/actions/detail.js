import getActionParams from '@utils/getActionParams'

export const setDetail = value => ({ type: 'setDetailState', data: getActionParams(value) })
