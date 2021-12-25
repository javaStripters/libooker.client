<template>
  <div>
    <Header />
    <Navigation 
      class="navigation"
      :buttons="navigationButtons"
      :theme="'primary'"
    />
    <router-view />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Navigation from '@/components/Navigation.vue'
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
  }),

  components: {
    Header,
    Navigation
  }
}
</script>

<style scoped>
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