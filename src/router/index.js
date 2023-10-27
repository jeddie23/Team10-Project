import Vue from "vue";
import Router from "vue-router";
import Layout from "../layout/index.vue";
import { asyncRoutes } from "./routes";

Vue.use(Router);

/**
 * hidden: true                  如果设置为 true，该项菜单将不会显示在菜单栏中(默认为 false)
 * meta : {
    title: 'title'               菜单名
    icon: 'icon-name'            图标名
    fixed: true                  如果设置为 true，该项 tag 将一直存在 tag 栏中(默认为 false)
  }
 * */
let obj = sessionStorage.getItem('userinfo')
let role = ''
if (obj) {
  obj = JSON.parse(obj);
  obj.userRole
}
export const constantRoutes = [
  {
    path: "/hospitalguide",
    name: "HospitalGuide",
    component: Layout,
    redirect: "hospitalguide/generalguide",
    meta: {
      title: "3D-Guide",
      icon: "vue-dsn-icon-picture",
      auth: false,
    },
    children: [
      {
        path: "generalguide",
        name: "generalGuide",
        component: () => import("../views/hospitalGuide/generalGuide.vue"),
        meta: {
          title: "综合导览",
        },
      },
      {
        path: "guideall",
        name: "guideAll",
        component: () => import("../views/hospitalGuide/GuideAll.vue"),
        meta: {
          title: "全景导览",
        },
      },
      {
        path: "guidemenzhen",
        name: "guideMenzhen",
        hidden: true,
        component: () => import("../views/hospitalGuide/GuideMenzhen.vue"),
        meta: {
          title: "门诊导览",
        },
      },
      {
        path: "guideyingxiang",
        name: "guideYingxiang",
        hidden: true,
        component: () => import("../views/hospitalGuide/GuideYingxiang.vue"),
        meta: {
          title: "影像室导览",
        }
      },
      {
        path: "guidezoulang",
        name: "guideZoulang",
        hidden: true,
        component: () => import("../views/hospitalGuide/GuideZoulang.vue"),
        meta: {
          title: "病房走廊导览",
        },
      },
      {
        path: "guidedetail/:name",
        name: "GuideDetail",
        hidden: true,
        component: () => import("../views/hospitalGuide/GuideDetail.vue"),
        meta: {
          title: "导览详情",
        },
      },
      {
        path: "guideshuye",
        name: "GuideShuye",
        hidden: true,
        component: () => import("../views/hospitalGuide/GuideShuye.vue"),
        meta: {
          title: "输液室详情",
        },
      },
    ],
  },
  {
    path: "/study",
    name: "Study",
    component: Layout,
    redirect: "/study/cosplaystudy",
    meta: {
      title: "Functional Study",
      icon: "vue-dsn-icon-bianjiqi",
      auth: false,
    },
    children: [
      {
        path: "cosplaystudy",
        name: "cosplayStudy",
        component: () => import("../views/functioalStudy/cosplayStudy.vue"),
        meta: {
          title: "角色扮演",
        },
      },
      {
        path: "casestudy",
        name: "caseStudy",
        component: () => import("../views/functioalStudy/caseStudy.vue"),
        meta: {
          title: "病例学习",
        },
      },
      {
        path: "standard-study",
        name: "standard-study",
        component: () => import("../views/functioalStudy/standardStudy.vue"),
        meta: {
          title: "检查项目学习",
        },
      },
      {
        path: "frontstage",
        name: "frontStage",
        hidden: true,
        component: () =>
          import("../views/functioalStudy/Details/FrontStage.vue"),
        meta: {
          title: "前台",
        },
      },
      {
        path: "docassistant",
        name: "docAssistant",
        hidden: true,
        component: () =>
          import("../views/functioalStudy/Details/DocAssistant.vue"),
        meta: {
          title: "医助",
        },
      },
      {
        path: "animaldoc",
        name: "animalDoc",
        hidden: true,
        component: () =>
          import("../views/functioalStudy/Details/AnimalDoc.vue"),
        meta: {
          title: "兽医",
        },
      },
    ],
  },
  {
    path: "/studenttest",
    name: "studentTest",
    component: Layout,
    hidden: role == 'student' ? false : true,
    redirect: "/student/paperlist",
    meta: {
      title: "学生测试",
      icon: "vue-dsn-icon-bianjiqi",
      auth: false,
    },
    children: [
      {
        path: "paperlist",
        name: "paperList",
        component: () => import("../views/studentTest/paperList.vue"),
        meta: {
          title: "测试列表",
        },
      },
      {
        path: "begintest",
        name: "beginTest",
        hidden: true,
        component: () => import("../views/studentTest/beginTest.vue"),
        meta: {
          title: "考试作答",
        },
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    hidden: true,
    meta: { title: "登录", auth: false },
  },
  {
    path: "401",
    name: "401",
    component: () => import("../views/error-page/401.vue"),
    hidden: true,
    meta: { title: "401", auth: false },
  },
  {
    path: "404",
    name: "404",
    component: () => import("../views/error-page/404.vue"),
    hidden: true,
    meta: { title: "404", auth: false },
  },
  // {
  //   path: "/",
  //   name: "Layout",
  //   component: Layout,
  //   redirect: "/home",
  //   children: [
  //     {
  //       path: "home",
  //       name: "Home",
  //       component: () => import("../views/Home"),
  //       meta: {
  //         title: "首页",
  //         icon: "vue-dsn-icon-index",
  //         fixed: true,
  //       },
  //     },
  //   ],
  // },
  {
    path: "/",
    name: "Layout",
    component: Layout,
    redirect: "/user-center",
    hidden: true,
    children: [
      {
        path: "user-center",
        name: "UserCenter",
        component: () => import("../views/UserCenter.vue"),
        meta: {
          title: "个人中心",
          auth: false,
        },
      },
    ],
  },
];

let routes = [...constantRoutes];
const router = new Router({
  routes,
});
router.beforeEach((to, from, next) => {
  let userRole = "unauth";
  if (sessionStorage.getItem("userinfo") !== null) {
    userRole = JSON.parse(sessionStorage.getItem("userinfo")).userRole;
  }
  if (userRole == "administrator") {
    // 已登录且要跳转的是登录页
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      if (to.name == null) {
        let allRoute = [];
        // routes = [...constantRoutes,...asyncRoutes]
        for (let i = 0; i < asyncRoutes.length; i++) {
          router.addRoute(asyncRoutes[i]);
          allRoute.push(asyncRoutes[i])
        }
        sessionStorage.setItem('routes', JSON.stringify(allRoute))
        next({ ...to });
      } else {
        next();
      }
    }
  } else {
    // routes = [...constantRoutes]
    next();
  }
});
export default router;
