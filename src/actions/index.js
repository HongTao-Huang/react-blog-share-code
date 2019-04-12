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
    return createObj('INFO',(resolve) => {
      auth.loginfo().then((res) => {
        resolve({
          isLogin: res.isLogin,
          user: res.data
        })
      });
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
  login({username , password}) {
    return createObj('INFO',(resolve) => {
      auth.login({username , password}).then((res) => {
        resolve({
          isLogin: true,
          user: res.data
        });
      })
    })
  },
  register({username , password}){
    return createObj('INFO',(resolve) => {
      auth.register({username , password}).then((res) => {
        resolve({
          isLogin: true,
          user: res.data
        });
      })
    })
  }
}