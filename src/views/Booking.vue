<template>
    <div class="booking">
      <Navigation 
        :buttons="userRole === 'ADMIN' ? adminNavigationButtons : navigationButtons"
      />
      <Container>
        <router-view 
          :userBookings="userBookings"
          @getUserBookings="getUserBookings"
          @openNotification="(type) => $emit('openNotification', type)"
        />
      </Container>
    </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import Container from '@/components/Container.vue'
export default {
  props: [
    'userRole',
  ],
  data: () => ({
    navigationButtons: [
      {
        name: 'Reserving',
        goTo: '/booking/reserving',
        text: 'Резервация'
      },
      {
        name: 'User Reservations',
        goTo: '/booking/user-reservations',
        text: 'Мои записи'
      },
    ],
    adminNavigationButtons: [
      {
        name: 'Reserving',
        goTo: '/admin/booking/reserving',
        text: 'Резервация'
      },
      {
        name: 'User Reservations',
        goTo: '/admin/booking/today-reservings',
        text: 'Записи на сегодня'
      },
    ],
    userBookings: [],

  }),
  methods: {
    getUserBookings() {
      fetch(`${this.$store.state.server}/bookings/user`, {
        headers: {
          "Authorization": `${localStorage.tokenHeader} ${localStorage.accessToken}`
        }
      })
      .then(res => res.json())
      .then(res => {
        this.userBookings = res
      })
    },
  },
  mounted() {
    this.getUserBookings()
  },
  components: {
    Navigation,
    Container,
  }
}
</script>

<style scoped>
.booking {
  padding-top: 32px;
  display: grid;
  gap: 10px;
}
</style>