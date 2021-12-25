<template>
  <div class="user-reservations">
    <Ticket 
      v-for="(booking, index) in userBookings"
      :key="index"
      :info="booking"
      type="actual"
      @getUserBookings="$emit('getUserBookings')"
    />
  </div>
</template>

<script>
import Ticket from '@/components/Ticket.vue'
export default {
  props: [
    'userBookings'
  ],


  components: {
    Ticket,
  }
}
</script>

<style scoped>
.user-reservations {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, auto));
  gap: 32px 44px;
  justify-items: center;
}
</style>