<template>
  <div class="today-reservings">
    <div class="today-reservings__actions">
      <div class="today-reservings__filters">
        <div 
          class="today-reservings__filter"
          :class="[filter.name === choosedFilter && 'today-reservings__filter--choosed']"
          v-for="filter in filters"
          :key="filter.value"
          v-html="filter.text"
          @click="choosedFilter = filter.name"
        >
        </div>
      </div>
      <SearchBox 
        class="today-reservings__search-box"
      />
    </div>
    <div class="today-reservings__reservings">
      <div 
        class="today-reservings__reserving reserving"
        v-for="(booking, index) in todayBookings"
        :key="index"
      >
        <div class="reserving__avatar">
          <img src="" alt="">
        </div>
        <div class="reserving__username">{{`${booking.user.lastname} ${booking.user.firstname}` }}</div>
        <div class="reserving__computer-number">Компьютер: {{booking.workplace.name}}</div>
        <div class="reserving__date">Дата: {{booking.date.split('-').reverse().join('.')}}г.</div>
        <div class="reserving__week-day">День недели: {{}}</div>
        <div class="reserving__time">Начало/конец брони: {{`${booking.startTime.slice(0, 5)}-${booking.endTime.slice(0, 5)}`}}</div>
        <div class="reserving__actions"> 
          <Button
            theme="danger"
            :onClick="() => {}"
          >
            Cancel

          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBox from '@/components/SearchBox.vue'
import Button from '@/components/Button.vue'
export default {
  data: () => ({
    todayBookings: [],
    choosedFilter: 'Active',
    filters: [
      {
        name: 'Active',
        value: 'active',
        text: 'Активные'
      },
      {
        name: 'Nearest',
        value: 'nearest',
        text: 'Ближайшие'
      },
      {
        name: 'Closed',
        value: 'closed',
        text: 'Закрытые'
      },
    ]
  }),
  methods: {
    getTodayBookings() {
      fetch(`${this.$store.state.server}/bookings?today=true`, {
        headers: {
          "Authorization": `${localStorage.tokenHeader} ${localStorage.accessToken}`
        }
      })
      .then( res => res.json())
      .then( res => {
        console.log(res)
        this.todayBookings = res.content
      })
    }
  },

  mounted() {
    this.getTodayBookings()
  },

  components: {
    SearchBox,
    Button,
  }
}
</script>

<style scoped>
.today-reservings {
  background: #FBFBFB;
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  padding: 16px 32px;
}
.today-reservings__actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.today-reservings__filters {
  display: flex;
  gap: 20px;
  font-size: 14px;
}
.today-reservings__filter {
  background: #FFFFFF;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  height: 24px;
  min-width: 120px;
  padding: 0px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #868686;
  transition: .3s all;
  cursor: pointer;
}
.today-reservings__filter--choosed {
  color: #013B2B;
  transition: .3s all;
}
.today-reservings__search-box {
  min-width: 300px;
}
.today-reservings__reservings {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}

/* Reserving's styles */ 
.reserving {
  width: 100%;
  max-width: 1200px;
  background: #FFFFFF;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.18);
  border-radius: 10px;
  padding: 4px 16px;

  display: grid;
  grid-template-columns: 40px 1fr 140px 120px 200px 250px 1fr;
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