<template>
    <div class="booking">
      <Navigation 
        :buttons="navigationButtons"
      />
      <Container>
        <router-view 
          :userBookings="userBookings"
        />
      </Container>
    </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import Container from '@/components/Container.vue'
export default {
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
    userBookings: [],

  }),
  methods: {
    getUserBookings() {
      fetch(`${this.$store.state.server}/bookings/user/${localStorage.username}`, {
        headers: {
          "Authorization": `${localStorage.tokenHeader} ${localStorage.accessToken}`
        }
      })
      .then(res => res.json())
      .then(res => {
        this.userBookings = res
        console.log(this.userBookings)
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