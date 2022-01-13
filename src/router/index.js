import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    component: () => import('../views/Unauthorized.vue'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('../views/unauthorized/Login.vue'),
      },
      {
        path: 'registration',
        name: 'Registration',
        component: () => import('../views/unauthorized/Registration.vue'),
      },
    ]
  },

  {
    path: '/',
    name: 'Authorized',
    component: () => import('../views/Authorized.vue'),
    // beforeEnter: store.state.isAuthorized,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('../views/Home.vue'),
      },
      {
        path: 'booking',
        name: 'Booking',
        component: () => import('../views/Booking.vue'),
        children: [
          {
            path: 'reserving',
            name: 'Reserving',
            component: () => import('../views/booking/Reserving.vue'),
          },
          {
            path: 'user-reservations',
            name: 'User Reservations',
            component: () => import('../views/booking/UserReservations.vue'),
          },
        ]
      },
      {
        path: 'archive',
        name: 'Archive',
        component: () => import('../views/Archive.vue'),
      },
      {
        path: 'faq',
        name: 'FAQ',
        component: () => import('../views/FAQ.vue'),
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('../views/Profile.vue'),
      } 
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Authorized.vue'),
    children: [
      {
        path: 'booking',
        // name: 'Booking',
        component: () => import('../views/Booking.vue'),
        children: [
          {
            path: 'reserving',
            // name: 'Reserving',
            component: () => import('../views/booking/Reserving.vue'),
          },
          {
            path: 'today-reservings',
            name: 'Today Reservings',
            component: () => import('../views/booking/TodayReservings.vue'),
          },
        ]
      },
      {
        path: 'statistics',
        name: 'Statistics',
        component: () => import('../views/Statistics.vue'),
      },
      {
        path: 'users',
        name: 'Users',
        component: () => import('../views/Users.vue'),
        children: [
          {
            path: 'students',
            name: 'Students',
            component: () => import('../views/users/Students.vue'),
          },
          {
            path: 'student/:id',
            name: 'Student',
            component: () => import('../views/users/Student.vue'),
          },
          {
            path: 'tutors',
            name: 'Tutors',
            component: () => import('../views/users/Tutors.vue'),
          },

        ]
      },
      {
        path: 'faq',
        // name: 'FAQ',
        component: () => import('../views/AdminFaq.vue'),
      }
    ]
  },
  // {
  //   path: '*',
  //   redirect: '/booking'
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.fullPath.indexOf('unauthorized') === -1) {
    if (!localStorage.accessToken || localStorage.tokenExpiresTime <= Date.parse(new Date)) {
      next('/unauthorized/login') 
    }
  }
  if (localStorage.userRole === 'ADMIN' && to.fullPath.indexOf('admin') === -1) {
    next('/admin/booking/reserving')
  }
  if (localStorage.userRole === 'STUDENT' && to.fullPath.indexOf('admin') !== -1) {
    next('/booking/reserving')
  }
  //  if (to.fullPath === '/') {
  //    if (!store.state.accessToken) {
  //      next('/unauthorized/login');
  //    }
  //  }
  //  if (to.fullPath === '/unauthorized/login') {
  //    if (store.state.accessToken) {
  //      next('/');
  //    }
  //  }
   next();
});

/*
Пироги "штоле": малина, малина и со сливочным сыром и творог;
Кулебяка с мясом.
2 сытнымх по пол кило, один сладкий (малинад)
заказать на завтра часов на пять
*/
export default router
