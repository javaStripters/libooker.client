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
      <ReservingInline 
        class="today-reservings__reserving"
        v-for="(booking, index) in todayBookings"
        :key="index"
        :booking="booking"
      />
    </div>
  </div>
</template>

<script>
import SearchBox from '@/components/SearchBox.vue'
import Button from '@/components/Button.vue'
import ReservingInline from '@/components/ReservingInline.vue'
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
    ReservingInline,
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

</style>