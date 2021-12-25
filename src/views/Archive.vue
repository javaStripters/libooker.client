<template>
  <div class="archive">
    <Container class="archive__container">
      <div class="archive__title">Архив</div>
      <div class="archive__tickets">
        <Ticket 
          :info="archivedBookings[0]"
          type="archived"
        />
      </div>

    </Container>
  </div>
</template>

<script>
import Container from '@/components/Container.vue'
import Ticket from '@/components/Ticket.vue'
export default {
  data: () => ({
    archivedBookings: [
      {
        "id": 4,
        "workplace": {
          "id": 3,
          "name": "ЭТО НЕНАСТОЯЩИЕ ДАННЫЕ"
        },
        "user": {
          "id": 1,
          "username": "Vasya",
          "password": "$2a$10$kWWOnNOiToOxcIQ7UJ.cB.XFAflYvMS5BPASR1eqqojc6H9ELWUfC",
          "role": "ADMIN"
        },
        "date": "2021-12-22",
        "startTime": "12:00:00",
        "endTime": "13:30:00",
        "timeRange": {
          "from": "12:00:00",
          "toInclusive": "13:30:00"
        },
        "canceled": true
      },
    ],
  }),


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