import auth from 'api/auth'

const typeCreator = (type) => {
  return [`GET_AUTH_${type}_REQUEST`, `GET_AUTH_${type}_SUCCESS`, `GET_AUTH_${type}_FAILURE`]
};

const createObj = (type, callback) => {
  return {
    types: typeCreator(type),
    promise: () => {
      return new Promise((resolve) => {
        callback(resolve);
      })
    }
  }
};

export default {
  getAuthInfo() {
    return createObj('INFO',async (resolve) => {
      let res = await auth.loginfo();
      resolve({
        isLogin: res.isLogin,
        user: res.data
      })
    });
  },
  logout() {
    return createObj('INFO',(resolve) => {
      auth.logout();
      resolve({
        isLogin: false,
        user: {}
      });
    })
  },

  login(){
    return createObj('INFO',(resolve) => {
      auth.login().then((res) => {
        resolve({
          isLogin: true,
          user: res.data
        });
      })
    })
  }
}