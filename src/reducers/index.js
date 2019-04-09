
export function userReducer(state = {}, action) {
  switch (action.type) {
    case 'GET_AUTH_INFO_REQUEST':
      return {
          ...state
      };
    case 'GET_AUTH_INFO_SUCCESS':
      return {
          ...state,
        isLogin: action.result.isLogin,
        user: action.result.user
      };
    case 'GET_AUTH_INFO_FAILURE':
      return {
          ...state
      };
    default:
      return state;
  }
}