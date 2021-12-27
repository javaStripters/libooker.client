<template>
  <div class="time-picker">
    <div class="time-picker__header">
      <div class="time-picker__header-watch-icon">
        <img :src="require('@/assets/watch.svg')" alt="">
      </div>
      <div 
        class="time-picker__date"
        :id="`date-${day.date.toISOString().slice(0, 10)}`"
        v-for="day in days"
        :key="day.date.toISOString()"
        @mouseover="hoveredDate = day.date"
        @mouseleave="hoveredDate = null"
      >
        <Button
          class="time-picker__button--admin"
          v-if="$store.state.userInfo.role === 'ADMIN' && day.date === hoveredDate && day.intervals[0].state !== 'CLOSED'"
          :onClick="() => $emit('closeDay', day.date)"
          theme="primary"
        >
          Закрыть
        </Button>
        <Button
          class="time-picker__button--admin"
          v-else-if="$store.state.userInfo.role === 'ADMIN' && day.date === hoveredDate && day.intervals[0].state === 'CLOSED'"
          :onClick="() => $emit('openDay', day.date)"
          theme="primary"
        >
          Открыть
        </Button>
        <div v-else>
          {{day.date.toISOString().slice(0, 10)}}
        </div>
      </div>
    </div>  
    <div class="time-picker__horizontal-divider"></div>
    <div class="time-picker__body">
      <div class="time-picker__intervals-col">
        <div 
          class="time-picker__interval"
          v-for="(interval, index) in days[1].intervals"
          :key="index"
        >
          {{`${interval.range.from.slice(0,5)} - ${interval.range.toInclusive.slice(0,5)}`}}
        </div>
      </div>
      <div 
        class="time-picker__events-col"
        :class="[
          day.date == hoveredDate && $store.state.userInfo.role === 'ADMIN' && 'time-picker__events-col--hover'
        ]"
        v-for="(day, index) in days"
        :key="index"
        @mouseover="hoveredDate = day.date"
        @mouseleave="hoveredDate = null"
      >
        <div
          class="time-picker__slot-wrapper"
          v-for="(interval, index) in day.intervals"
          :key="index"
        >
          <div 
            class="time-picker__slot time-picker__slot--free"
            :class="[
              isSelected(day.date, interval.range, selectedSlots) && 'time-picker__slot time-picker__slot--selected'
            ]"
            v-if="userRole === 'STUDENT' && interval.state === 'FREE'"
            @click="$emit('bookSlot', day.date, interval.range)"
          >
            {{
              isSelected(day.date, interval.range, selectedSlots) ? 'Выбрано' : 'Забронировать'
            }}
          </div>
          <div
            class="time-picker__slot time-picker__slot--free"
            v-else-if="userRole === 'ADMIN' && interval.state === 'FREE'"
          >
            Свободно
          </div>
          <div 
            class="time-picker__slot time-picker__slot--reserved"
            v-else-if="interval.state === 'OCCUPIED'"
          >
            Занято
          </div>
          <div 
            class="time-picker__slot time-picker__slot--self-reserved"
            v-else-if="interval.state === 'SELF'"
          >
            Ваша бронь
          </div>
          <div 
            class="time-picker__slot time-picker__slot--closed"
            v-else-if="interval.state === 'CLOSED'"
          >
            Закрыто
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue'
export default {
  props: [
    'days',
    'selectedSlots',
    'isSelected'
  ],
  data: () => ({
    hoveredDate: null,
  }), 
  methods: {
    
  },
  computed: {
    userRole() {
      return localStorage.userRole
    }
  },
  components: {
    Button,
  }
}
</script>

<style scoped>
  .time-picker {
    border: 1px solid #675B53;
    box-sizing: border-box;
    filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.25));
    border-radius: 5px;
    overflow: hidden;
  }
  .time-picker__header, .time-picker__body {
    display: grid;
    grid-template-columns: 1fr repeat(5, 1fr);
    padding: 5px;
  }
  .time-picker__header {
    background: #675B53;
    height: 45px;
  }
  .time-picker__header-watch-icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .time-picker__date {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 18px;
    font-weight: 700;
  }
  .time-picker__button--admin {
    height: 100%;
    width: 100%;
    font-size: 16px;
    font-weight: 700;
  }
  .time-picker__body {
  }
  .time-picker__intervals-col, .time-picker__events-col {
    display: grid;
    grid-auto-rows: 44px;
    transition: all .3s;
  }
  .time-picker__events-col--hover {
    background: #dddddd;
    border-radius: 5px;
    transition: all .3s;
  }
  .time-picker__interval {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 700;
  }
  .time-picker__slot-wrapper {
    padding: 6px 12px;
    max-width: 100%;
    overflow: hidden;
  }
  .time-picker__slot {
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
  }
  .time-picker__slot--free {
    background: #43A047;
    border: 2px solid #43A047;
    color: white;
    transition: 0.3s all;
  }
  .time-picker__slot--free:hover {
    background: #226825;
    border: 2px solid #226825;
    transition: 0.3s all;
  }
  .time-picker__slot--selected {
    background: #226825;
    border: 2px solid #226825;
  }
  .time-picker__slot--reserved {
    border: 2px solid #E53935;
    color: #E53935;
    background: #ffffff;
  }
  .time-picker__slot--self-reserved {
    border: 2px solid ;
    border: 2px solid #43A047;
    color: #43A047;
  }
  .time-picker__slot--closed {
    background: rgba(255, 255, 255, 0.85);
    border: 2px solid #BDBDBD;
    box-sizing: border-box;
    border-radius: 8px;
    color: #BDBDBD;
  }
</style>