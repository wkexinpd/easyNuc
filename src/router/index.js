import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 所有权限都能访问的路由
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('../views/login/index')
  },
  {
    path: '/404',
    component: () => import('../views/error-page/404')
  },
  {
    path: '/'
    // component:
  }
]

var easyModule = new Array()
// 实验
easyModule.indexExp = [
  {
    path: '/indexExp',
    component: () => import('../views/experiment/indexExp'),
    meta: {
      title: '实验管理'
    },
    children: [
      {
        path: '/expManage',
        component: () => import('../views/experiment/admin/expManage'),
        meta: {
          title: '实验室管理',
          icon: '',
          roles: [2]
        }
      },
      {
        path: '/admin/order',
        component: () => import('../views/experiment/admin/order'),
        meta: {
          title: '预约管理',
          icon: '',
          roles: [2]
        }
      },
      {
        path: '/stuOrder',
        component: () => import('../views/experiment/student/stuOrder'),
        meta: {
          title: '我的实验',
          icon: '',
          roles: [0]
        }
      },
      {
        path: '/exp/monitor',
        component: () => import('../views/experiment/student/monitor'),
        meta: {
          title: '班级管理',
          icon: '',
          roles: [0]
        }
      },
      {
        path: '/teaCourse',
        component: () => import('../views/experiment/teacher/course'),
        meta: {
          title: '我的课程',
          icon: '',
          roles: [1]
        }
      },
      {
        path: '/teaOrder',
        component: () => import('../views/experiment/teacher/teaOrder'),
        meta: {
          title: '预约课程',
          icon: '',
          roles: [1]
        }
      },
      {
        path: '/teaDetail',
        component: () => import('../views/experiment/teacher/teaDetail'),
        meta: {
          title: '预约详情',
          icon: '',
          roles: [1]
        }
      }
    ]
  }
]
// 请假
easyModule.indexLeave = [
  {
    path: '/indexLeave',
    name: 'indexLeave',
    component: () => import('../views/leave/indexLeave.vue'),
    redirect: '/home/home',
    meta: {
      title: '请假管理'
    },
    children: [
      {
        path: '/home/home',
        component: () => import('../views/leave/home/home.vue'),
        meta: {
          title: '首页',
          icon: '',
          roles: [2, 3]
        }
      },
      {
        path: '/management',
        redirect: '/management/permission',
        children: [
          {
            path: '/management/permission',
            component: () => import('../views/leave/management/permission'),
            meta: {
              title: '权限管理',
              icon: '',
              roles: [2, 3]
            }
          },
          {
            path: '/management/personnel',
            component: () => import('../views/leave/management/personnel'),
            meta: {
              title: '人员管理',
              icon: '',
              roles: [2, 3]
            }
          },
          {
            path: '/management/studentManagement',
            component: () => import('../views/leave/management/studentManagement'),
            meta: {
              title: '学生管理',
              icon: '',
              roles: [2, 3]
            }
          },
          {
            path: '/management/teacherManagement',
            component: () => import('../views/leave/management/teacherManegement'),
            meta: {
              title: '班主任管理',
              icon: '',
              roles: [2, 3]
            }
          }
        ],
        meta: {
          title: '请假管理',
          roles: [2, 3]
        }
      },
      {
        path: '/person/person',
        component: () => import('../views/leave/person/person'),
        meta: {
          title: '个人中心',
          icon: '',
          roles: [0, 1, 2, 3]
        }
      },
      {
        path: '/leaveManage',
        redirect: '/leaveManage/submitLeave',
        children: [
          {
            path: '/leaveManage/submitLeave',
            component: () => import('../views/leave/leaveManage/submitLeave'),
            meta: {
              title: '假条提交',
              icon: '',
              roles: [0]
            }
          },
          {
            path: '/leaveManage/historyRecord',
            component: () => import('../views/leave/leaveManage/historyRecord'),
            meta: {
              title: '历史消息',
              icon: '',
              roles: [0]
            }
          },
          {
            path: '/leaveManage/leaveMessage',
            component: () => import('../views/leave/leaveManage/leaveMessage'),
            meta: {
              title: '请假信息',
              icon: '',
              roles: [0]
            }
          },
          {
            path: '/leaveManage/leavePrint',
            component: () => import('../views/leave/leaveManage/leavePrint'),
            meta: {
              title: '假条打印',
              icon: '',
              roles: [0]
            }
          }
        ],
        meta: {
          title: '请假管理',
          icon: '',
          roles: [0]
        }
      }

    ]
  }
]
// 签到
easyModule.indexRegister = []
export const asyncRoutes = easyModule

const createRouter = () => new VueRouter({
  mode: 'history',
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
