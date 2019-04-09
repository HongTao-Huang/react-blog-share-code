import auth from 'api/auth'

export function getAuthInfo() {
  return {
    types: ['GET_AUTH_INFO_REQUEST', 'GET_AUTH_INFO_SUCCESS', 'GET_AUTH_INFO_FAILURE'],
    promise: () => {
      return new Promise(async (resolve) => {
        let res = await auth.loginfo();
        resolve({
          isLogin: res.isLogin
        })
      })
    }
  }
}