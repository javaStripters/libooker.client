<template>
    <div class="booking">
      <Navigation 
        :buttons="userRole === 'ADMIN' ? adminNavigationButtons : navigationButtons"
      />
      <Container>
        <router-view 
          :userBookings="userBookings"
          @getUserBookings="getUserBookings"
          @openNotification="(type, text) => $emit('openNotification', type, text)"
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
        text: 'Бронирование'
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
        text: 'Бронирование'
      },
      {
        name: 'User Reservations',
        goTo: '/admin/booking/today-reservings',
        text: 'Записи на сегодня'
      },
    ],
    userBookings: {
      active: {

      },
      future: [

      ]
    },

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
        const now = new Date()
        const today = now.toISOString().slice(0, 10)
        const currentTime = now.toLocaleString('ru-RU').split(',')[1]
        this.userBookings.future = []
        res.content.forEach(booking => {
          if (booking.date.slice(0, 10) === today && (+booking.timeRange.from.replaceAll(':', '') < +currentTime.replaceAll(':', '') && +booking.timeRange.toInclusive.replaceAll(':', '') > +currentTime.replaceAll(':','') )) {
            if (!booking.finishedManually) {this.userBookings.active = booking}
            console.log(booking)
          }
          else if (booking.date.slice(0, 10) === today && +currentTime.replaceAll(':', '') > +booking.timeRange.toInclusive.replaceAll(':', '')) {
            console.log('.')
          }
          else {
            this.userBookings.future.push(booking)
          }
        })
        this.userBookings.future.sort( (a, b) => {
          if (a.canceled !== b.canceled) {
            return a.canceled - b.canceled

          }
          else if ((new Date(a.date)).getTime() !== (new Date(b.date)).getTime()){
            return (new Date(a.date)).getTime() - (new Date(b.date)).getTime()
          }
          else {
            return +a.startTime.replaceAll(':', '') - +b.startTime.replaceAll(':', '')
          }
        })
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