<template>
  <div class="time-picker">
    <div class="time-picker__header">
      <div class="time-picker__header-watch-icon">
        <img :src="require('@/assets/watch.svg')" alt="">
      </div>
      <div 
        class="time-picker__date"
        v-for="day in days"
        :key="day.date.toISOString()"
      >
        {{day.date.toISOString().slice(0, 10)}}
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
        v-for="(day, index) in days"
        :key="index"
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
            v-if="interval.state === 'FREE'"
            @click="$emit('bookSlot', day.date, interval.range)"
          >
            {{
              isSelected(day.date, interval.range, selectedSlots) ? 'Выбрано' : 'Забронировать'
            }}
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'days',
    'selectedSlots',
    'isSelected'
  ],
  methods: {
    
  },
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
  .time-picker__body {
  }
  .time-picker__intervals-col, .time-picker__events-col {
    display: grid;
    grid-auto-rows: 44px;
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
  }
  .time-picker__slot--self-reserved {
    border: 2px solid ;
    border: 2px solid #43A047;
    color: #43A047;
  }
</style>