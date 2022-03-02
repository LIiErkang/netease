import getActionParams from '@utils/getActionParams'

export const setPlay = value => ({ type: 'setPlayState', data: getActionParams(value) })
