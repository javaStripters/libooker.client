<template>
  <div class="archive">
    <Container class="archive__container">
      <div class="archive__title">Архив</div>
      <div class="archive__tickets">
        <Ticket 
          v-for="(booking, index) in archivedBookings"
          :key="index"
          :info="booking"
          type="archived"
        />
      </div>
      <div 
        v-if="archivedBookings.length === 0"
        style="font-size: 16px; text-align: center"
      >
         Пока тут пусто
      </div>
    </Container>
  </div>
</template>

<script>
import Container from '@/components/Container.vue'
import Ticket from '@/components/Ticket.vue'
export default {
  data: () => ({
    archivedBookings: [],
  }),
  methods: {
    getArchiveTickets() {
      this.archivedBookings = []
      fetch(`${this.$store.state.server}/bookings/user/archive?page=0&size=20&sort=date,startTime,endTime,desc`, {
        headers: {
          "Authorization": `${localStorage.tokenHeader} ${localStorage.accessToken}`
        },
      })
      .then( res => res.json())
      .then( res => {
        console.log(res.content)
        this.archivedBookings = res.content
      })
    }
  },
  mounted() {
    this.getArchiveTickets()
  },
  components: {
    Container,
    Ticket
  }
}
</script>

<style scoped>
.archive__container {
  padding-top: 24px;
}
.archive__title {
  font-weight: 700;
  margin-bottom: 16px;
}
.archive__tickets {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, auto));
  gap: 32px 44px;
  justify-items: center;
}
</style>