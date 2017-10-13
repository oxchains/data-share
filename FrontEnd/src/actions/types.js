

// export const ROOT_URL = 'http://xfja.local:11919';
export const ROOT_URL = 'http://192.168.1.170:8081';


export const AUTH_USER = 'auth_user';                               //登录
export const UNAUTH_USER = 'unauth_user';                           //退出登录
export const AUTH_ERROR = 'auth_error';                             //登录失败
export const REQUEST_SUCCESS = 'request_success';                   //http请求正确
export const REQUEST_ERROR = 'request_error';                       //http请求返回错误

export const FETCH_NEWS_LIST = 'fetch_news_list';                      //获取消息通知列表
export const FETCH_MDICALRECORD_LIST = 'fetch_mdicalrecord_list';         //获取所有病历列表
export const FETCH_SEARCH_LIST = 'fetch_search_list';               //搜索到的病历结果
export const FETCH_MDICALRECORDOFOURS_LIST = 'fetch_mdicalrecordofours_list';  // 查看本院病历
export const FETCH_MDICALRECORD_SHARE = 'fetch_mdicalrecord_share';         // 共享病历
export const FETCH_MDICALRECORD_DETIAL = 'fetch_mdicalrecord_detial';        // 查看个人病历详情
export const FETCH_DETIAL_OFOURS = 'fetch_detial_ofours';                   //查看本院病历详情
export const FETCH_REQUEST_LOOK = 'fetch_request_look';                    //申请查看病人的病历

export function getAuthorizedHeader() {
  return { authorization: 'Bearer '+localStorage.getItem('token') }
}

export function requestError(error) {
  return {
    type: REQUEST_ERROR,
    payload: error
  };
}
