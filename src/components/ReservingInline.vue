<template>
  <div class="reserving">
    <div 
      class="reserving__avatar"
      v-if="booking.user"
    >
      <img src="" alt="">
    </div>
    <div 
      class="reserving__username"
      v-if="booking.user"
    >{{`${booking.user.lastname} ${booking.user.firstname}` }}</div>
    <div class="reserving__computer-number">Компьютер: {{booking.workplace.name}}</div>
    <div class="reserving__date">Дата: {{booking.date.split('-').reverse().join('.')}}г.</div>
    <!-- <div class="reserving__week-day">День недели: {{}}</div> -->
    <div class="reserving__time">Начало/конец брони: {{`${booking.startTime.slice(0, 5)}-${booking.endTime.slice(0, 5)}`}}</div>
    <!-- <div class="reserving__actions"> 
      <Button
        theme="danger"
        :onClick="() => {}"
      >
        Отменить
      </Button>
    </div> -->
  </div>
</template>

<script>
import Button from '@/components/Button.vue'
export default {
  props: [
    'booking'
  ],
  components: {
    Button,
  }

}
</script>

<style scoped>
.reserving {
  width: 100%;
  max-width: 1200px;
  background: #FFFFFF;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.18);
  border-radius: 10px;
  padding: 4px 16px;

  display: grid;
  /* grid-template-columns: 40px 1fr 140px 120px 200px 250px 1fr; */
  grid-template-columns: 40px 1fr 140px 120px 250px;
  gap: 24px;
  align-items: center;
  font-size: 14px;
}
.reserving__avatar {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background: #bbbbbb;
}
.reserving__actions {
  justify-self: center;
}
</style>