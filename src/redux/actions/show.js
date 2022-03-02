import getActionParams from '@utils/getActionParams'

export const setShow = value => ({ type: 'setShowState', data: getActionParams(value) })
