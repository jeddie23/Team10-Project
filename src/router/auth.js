import router from './index'
import { getToken } from '../utils/cookie'
import {asyncRoutes} from './routes'

// 白名单列表
const whiteList = ['/login']

// router.beforeEach((to, from, next) => {
//   let role = JSON.parse(sessionStorage.getItem('userinfo'))
//   console.log(asyncRoutes);
//   if (role.userRole === 'administrator') {
//     // 已登录且要跳转的是登录页
//     if (to.path === '/login') {
//       next({ path: '/' })
//     } else {
//         if(to.name == null){
//             for(let i=0;i<asyncRoutes.length;i++){
//                 router.addRoute(asyncRoutes[i])
//             }
//             next({...to,replace:true})
//         }else{
//             next();
//         }
//     }
//   }else{
//     next();
//   }
// })
