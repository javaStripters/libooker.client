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
      <div v-if="archivedBookings.length === 0">
        It's empty yet
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
      fetch(`${this.$store.state.server}/bookings/user?archive=false`, {
        headers: {
          "Authorization": `${localStorage.tokenHeader} ${localStorage.accessToken}`
        },
      })
      .then( res => res.json())
      .then( res => {
        this.archivedBookings = res
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
</style>