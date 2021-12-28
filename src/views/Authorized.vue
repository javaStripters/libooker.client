<template>
  <div class="authorized">
    <div>
      <Header 
        @openNotification="(type) =>{$emit('openNotification', type)}"
      />
      <Navigation 
        class="navigation"
        :buttons="userRole === 'ADMIN' ? adminNavigationButtons : navigationButtons"
        :theme="'primary'"
      />
      <router-view 
        :userRole="userRole"
        @openNotification="(type, text) =>{$emit('openNotification', type, text)}"
      />
    </div>

    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Navigation from '@/components/Navigation.vue'
import Footer from '@/components/Footer.vue'
export default {
  data: () => ({
    navigationButtons: [
      // {
      //   name: 'Home',
      //   goTo: '/home',
      //   text: 'Главная'
      // },
      {
        name: 'Booking',
        goTo: '/booking/reserving',
        text: 'Бронирование'
      },
      {
        name: 'Archive',
        goTo: '/archive',
        text: 'Архив'
      },
      {
        name: 'FAQ',
        goTo: '/faq',
        text: 'FAQ'
      },
    ],
    adminNavigationButtons: [
      {
        name: 'Booking',
        goTo: '/admin/booking/reserving',
        text: 'Бронирование'
      },
      {
        name: 'Statistics',
        goTo: '/admin/statistics',
        text: 'Статистика'
      },
      {
        name: 'Users',
        goTo: '/admin/users/students',
        text: 'Пользователи'
      },
      {
        name: 'FAQ',
        goTo: '/admin/faq',
        text: 'FAQ'
      },
    ]
  }),
  methods: {
    async getUserInfo() {
      fetch(`${this.$store.state.server}/users`, {
        headers: {
          "Authorization": `${localStorage.tokenHeader} ${localStorage.accessToken}`
        }
      })
      .then(res => res.json())
      .then(res => {
        this.$store.state.userInfo = res
        localStorage.userRole = res.role
        localStorage.setItem('userInfo', JSON.stringify(res))
      }) 
    }
  },
  computed: {
    userRole() {
      return localStorage.userRole
    },
  },
  mounted() {
    this.getUserInfo()
  },
  components: {
    Header,
    Navigation,
    Footer,
  }
}
</script>

<style scoped>
.authorized {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.navigation {
  height: 48px;
  width: 100%;
  background: #D8E8BF;
  display: flex;
  align-items: center;
  justify-content: center;
}
.navigation__container {
  justify-content: center !important;
}
</style>