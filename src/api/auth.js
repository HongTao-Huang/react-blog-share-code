import request from 'utils/request'

const URLLIST = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  LOGOUT:'/auth/logout',
  LOGINFO:'/auth'
};

export default {
  register({username , password}){
    return request(URLLIST.REGISTER , 'POST' , {username , password});
  },
  login({username , password}){
    return request(URLLIST.LOGIN , 'POST' , {username , password});
  },
  logout(){
    return request(URLLIST.LOGOUT);
  },
  loginfo(){
    return request(URLLIST.LOGINFO);
  }
}