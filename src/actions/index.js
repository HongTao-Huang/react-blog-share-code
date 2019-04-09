import auth from 'api/auth'

const typeCreator = (type) => {
  return [`GET_AUTH_${type}_REQUEST`, `GET_AUTH_${type}_SUCCESS`, `GET_AUTH_${type}_FAILURE`]
};

export default {
  getAuthInfo() {
    return {
      types: typeCreator('INFO'),
      promise: () => {
        return new Promise(async (resolve) => {
          let res = await auth.loginfo();
          resolve({
            isLogin: res.isLogin,
            user: res.data
          })
        })
      }
    }
  },
  logout() {
    return {
      types: typeCreator('INFO'),
      promise: () => {
        return new Promise((resolve) => {
          auth.logout();
          resolve({
            isLogin: false,
            user: {}
          })
        })
      }
    }
  }
}