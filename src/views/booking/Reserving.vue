<template>
  <div class="reserving">
    <TimePicker 
      class="reserving__time-picker"
      v-if="daysForBooking.length !== 0"
      :days="daysForBooking"
      :selectedSlots="selectedSlots"
      :isSelected="isSelected"
      @bookSlot="bookSlot"
      @openDay="(date) => {openDay(date)}"
      @closeDay="(date) => {closeDay(date)}"
    />
    <div v-else>
      
    </div>
    <div 
      class="booking-confirmation"
      v-if="$store.state.userInfo.role === 'STUDENT' && selectedSlots.length !== 0"
    >
      
      <div class="booking-confirmation__content">
        <div class="booking-confirmation__title">
          Подтверждение брони
        </div>
        <div style="display: flex; column-gap: 8px">
          <Button 
            class="booking-confirmation__button" 
            theme="secondary"
            :onClick="() => selectedSlots = []"
          > Отменить все </Button>
          <Button 
            class="booking-confirmation__button" 
            theme="primary"
            :onClick="() => concantenateSeveralBookingsToOne()"
          > Подтвердить все </Button>
        </div>
        <div class="booking-confirmation__items">
          <div 
            class="booking-confirmation__item"
            v-for="(slot, index) in selectedSlots"
            :key="index"
          >
            <div class="booking-confirmation__aside">
              <div class="booking-confirmation__date">{{slot.date.toISOString().slice(8, 10)}}</div>
            </div>
            <div class="booking-confirmation__main">
              <div class="booking-confirmation__time">
                <div>Выбранное время:</div>
                <div style="font-weight: 700">{{slot.range.from.slice(0, 5) + '-' + slot.range.toInclusive.slice(0, 5)}}</div>
              </div>
              <Button 
                class="booking-confirmation__button" 
                theme="secondary"
                :onClick="() => {bookSlot(slot.date, slot.range)}"
              > Отменить </Button>
              <Button 
                class="booking-confirmation__button" 
                theme="primary"
                :onClick="() => {confirmCertainBooking(slot.date, slot.range)}"
              > Подтвердить </Button>
            </div>
          </div>
        </div>
        
      </div>
      <div class="booking-confirmation__popup">

      </div>
    </div>

    <div 
      class="reserving__sessions sessions"
      v-if="$store.state.userInfo.role === 'STUDENT'"
    >
      <div 
        class="sessions__active"
        v-if="Object.entries(userBookings.active).length !== 0"
      >
        <div class="sessions__title">Активная сессия</div>
        <div class="sessions__items">
          <div class="sessions__item">
            <div class="sessions__item-booking-time">
              <div>Время бронирования: </div> 
              <div>{{userBookings.active.startTime.slice(0, 5)}}-{{userBookings.active.endTime.slice(0, 5)}}</div>
            </div>
            <div class="sessions__item-timer-section">
              <img 
                class="sessions__item-timer-image"
                :src="require('@/assets/sand-watch.svg')"
              >
              <div class="sessions__item-timer">
                {{countdownTimer}}
              </div> 
            </div>
            <div class="sessions__item-actions">
              <Button
                theme="secondary"
                :onClick="() => {}"
              > Продлить </Button>  
              <Button
                theme="danger"
                :onClick="() => {}"
              > Завершить </Button>  
            </div>  
          </div>
        </div>
      </div>
      <div class="sessions__nearest">
        <div class="sessions__title">Ближайшие сессии</div>
        <div 
          class="sessions__items"
          v-if="userBookings.future.length !== 0"
        >
          <div 
            class="sessions__item"
            v-for="(booking, index) in userBookings.future"
            :key="index"
          >
            <div class="sessions__item-booking-date">
              <div>Дата Вашего брони:</div>
              <div>{{booking.date}}</div>
            </div>
            <div class="sessions__item-booking-time">
              <div>Время Вашей брони:</div>
              <div>{{`${booking.startTime.slice(0, 5)}-${booking.endTime.slice(0, 5)}`}}</div>
            </div>
            <div 
              class="sessions__item-actions"
              v-if="!booking.canceled"
            >
              <div></div>
              <Button
                class="sessions__item-button"
                :onClick="() => {removeBooking(booking.id)}"
              > Отменить </Button>
            </div>
            <div v-else>
              Вы отменили эту бронь
            </div>
          </div>
        </div>
        <div 
          class=""
          v-else
        >
          Кажется, у Вас нет запланированных броней
        </div>
      </div>
    </div>
    
    <div
      class="reserving__users-search users-search"
      v-if="$store.state.userInfo.role === 'ADMIN'"
    > 
      <div class="users-search__title">Пользователи</div>
      <SearchBox />
    </div>

  </div>
</template>

<script>
import TimePicker from '@/components/TimePicker.vue'
import Button from '@/components/Button.vue'
import SearchBox from '@/components/SearchBox.vue'
export default {
  props: [
    'userBookings'
  ],
  data: () => ({
    daysForBooking: [],
    selectedSlots: [],
    usersSearchInput: null,
    countdownTimer: null
  }),
  methods: {
    getAvailableTimeForBooking() {
      let data = []
      for (let i = 0; i < 5; i++) {
        let date = new Date()
        date.setDate(date.getDate() + i)
        fetch(`${this.$store.state.server}/bookings/available?date=${date.toISOString().slice(0, 10)}`, {
          headers: {
            "Authorization": `${localStorage.tokenHeader} ${localStorage.accessToken}`
          }
        })
        .then(res => res.json())
        .then( res => {
          data[i] = {
            date,
            intervals: res
          }
          if (data.length === 5 && !data.includes(undefined) ) {
            this.daysForBooking = data
          }
        })
      }
    },
    bookSlot(date, range) {
      if (this.isSelected(date, range)) {
        this.selectedSlots = this.selectedSlots.filter((slot) => {
          if (
            slot.date !== date || 
            slot.range.from !== range.from || 
            slot.range.toInclusive !== slot.range.toInclusive
          ) {
            return slot
          }
        })
      }
      else {
        this.selectedSlots.push({
          date, 
          range
        })
      }
    },
    async removeBooking(id) {
      await fetch(`${this.$store.state.server}/bookings/${id}`, {
        method: 'DELETE',
        headers: {
          "Authorization": `${localStorage.tokenHeader} ${localStorage.accessToken}`
        }
      })
      this.$emit('getUserBookings')
    },
    isSelected(date, interval) {
      for (let i = 0; i < this.selectedSlots.length; i++) {
        let slot = this.selectedSlots[i]
        if (
          slot.date === date && 
          slot.range.from === interval.from &&
          slot.range.toInclusive === interval.toInclusive
        ) {
          return true
        }
      }
      return false 
    },
    concantenateSeveralBookingsToOne() {
      let slots = [...this.selectedSlots]
      slots.sort( (a, b) => {
        if (a.date !== b.date) {
          return a.date - b.date
        }
        else if (a.range.from !== b.range.from) {
          return +a.range.from.split(':').slice(0, 1).join('') - +b.range.from.split(':').slice(0, 1).join('')
        }
      })
      let i = 0
      while (i < slots.length - 1) {
        if (slots[i].date === slots[i + 1].date && slots[i].range.toInclusive === slots[i + 1].range.from) {
          slots[i] = {
            date: slots[i].date,
            range: {
              from: slots[i].range.from,
              toInclusive: slots[i + 1].range.toInclusive
            }
          }
          slots.splice([i + 1], 1)
        }
        else {
          i++
        }
      }
      this.selectedSlots = slots
      this.confirmAllBookings()
    },
    confirmAllBookings() {
      this.selectedSlots.forEach( slot => {
        fetch(`${this.$store.state.server}/bookings?from=${slot.date.toISOString().slice(0, 10)}T${slot.range.from}Z&to=${slot.date.toISOString().slice(0, 10)}T${slot.range.toInclusive}Z`, {
          method: 'POST',
          headers: {
            'Content-type' : 'application/json',
            "Authorization": `${localStorage.tokenHeader} ${localStorage.accessToken}`
          },
        })
        .then(res => res.json())
        .then(res => {
          this.bookSlot(slot.date, slot.range)
          this.getAvailableTimeForBooking()
        })
      })
    },
    confirmCertainBooking(date, range) {
      fetch(`${this.$store.state.server}/bookings?from=${date.toISOString().slice(0, 10)}T${range.from}Z&to=${date.toISOString().slice(0, 10)}T${range.toInclusive}Z`, {
        method: 'POST',
        headers: {
          'Content-type' : 'application/json',
          "Authorization": `${localStorage.tokenHeader} ${localStorage.accessToken}`
        },
      })
      .then(res => res.json())
      .then(res => {
        this.bookSlot(date, range)
        this.getAvailableTimeForBooking()
      })
    },
    async openDay(date) {
      await fetch(`${this.$store.state.server}/admin/day-off?date=${date.toISOString().slice(0, 10)}`, {
        method: 'DELETE',
        headers: {
          "Authorization": `${localStorage.tokenHeader} ${localStorage.accessToken}`
        },
      })
      .then( res => {
        if (res.status === 204) {
          this.getAvailableTimeForBooking()
        }
        else if (res.status === 404) {
          this.$emit('openNotification', 'cantOpenOfficialWeekendDays')
        }
      })
    },
    closeDay(date) {
      fetch(`${this.$store.state.server}/admin/day-off?date=${date.toISOString().slice(0, 10)}`, {
        method: 'POST',
        headers: {
          "Authorization": `${localStorage.tokenHeader} ${localStorage.accessToken}`
        }
      })
      .then( res => res.json())
      .then( res => {
        this.getAvailableTimeForBooking()
      })
    },
    timer() {
      let endTime = new Date(this.userBookings.active.date + 'T' + this.userBookings.active.endTime)
      let now = new Date()
      let hours = Math.floor(((endTime.getTime() - now.getTime()) / 1000) / 60 / 60)
      let minutes = (Math.floor(((endTime.getTime() - now.getTime()) / 1000) / 60 % 60))
      let seconds = (Math.round(((endTime.getTime() - now.getTime()) / 1000) % 60))
      this.countdownTimer = `
        ${hours.toString().length === 1 ? '0' + hours : hours}:${minutes.toString().length === 1 ? '0' + minutes : minutes}:${seconds.toString().length === 1 ? '0' + seconds : seconds}
        `
    }
  },
  watch: {
    daysForBooking() {
      this.$emit('getUserBookings')
    }
  },
  mounted() {
    this.getAvailableTimeForBooking()
    window.setInterval( () => {
      if (Object.entries(this.userBookings.active).length !== 0) {
        this.timer()
      }
    }, 1000)
    
  },
  components: {
    TimePicker,
    Button,
    SearchBox,
  }
}
</script>

<style scoped>
  .reserving {
    display: grid;
    gap: 24px;
    grid-template-columns: auto 330px;
    grid-template-rows: auto 1fr;
    align-items: start;
  }
  .reserving__time-picker {
    grid-row: 1 / -1;
  }
  .reserving__sessions {
    display: none;
    max-height: 100%;
    overflow-y: auto;
  }
  /* SESSIONS WIDGET */
  .sessions {
    background: #FFFFFF;
    box-shadow: 0px 0px 5px #675B53;
    border-radius: 5px;
    padding: 8px;
    display: flex;
    flex-direction: column;
    row-gap: 12px;
  }
  .sessions__active, .sessions__nearest {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    font-size: 14px;
  }
  .sessions__title,
  .booking-confirmation__title,
  .users-search__title {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
  }
  .sessions__items {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }
  .sessions__item {
    background: #FBFBFB;
    box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    padding: 8px 12px;
    display: grid;
    grid-template-rows: repeat(3, auto);
    gap: 10px;
  }
  .sessions__item-actions {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  .sessions__item-button {
  }
  .sessions__item-booking-date, .sessions__item-booking-time {
    display: flex;
    justify-content: space-between;
  }
  
  .sessions__item-timer-section {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
    align-items: center;
  }
  .sessions__item-timer {
    font-size: 30px;
    font-weight: 700;
    color: #013B2B;
  }
  /* BOOKING CONFIRMATION */
  .booking-confirmation {
    background: #FFFFFF;
    box-shadow: 0px 0px 5px rgba(103, 91, 83, 0.5);
    border-radius: 5px;
  }
  .booking-confirmation__content {
    height: 100%;
    padding: 8px;
    display: flex;
    flex-direction: column;
    row-gap: 16px;
  }
  .booking-confirmation__items {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }
  .booking-confirmation__item {
    display: grid;
    grid-template-columns: 55px auto;
    border: 1px solid #013B2B;
    border-radius: 8px;
    overflow: hidden;
  }
  .booking-confirmation__date {
    border-right: 1px solid #013B2B;
    color: #013B2B;
    background: #F4F4D7;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 5px;
    font-size: 24px;
    height: 100%;
  }
  .booking-confirmation__main {
    padding: 16px 12px 8px 12px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
  }
  .booking-confirmation__time {
    grid-column: 1 / -1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .booking-confirmation__time div:nth-child(2) {
    color: #013B2B;
  }
  .booking-confirmation__button {
    width: 100%;
  }
  .users-search {
    background: #FFFFFB;
    box-shadow: 0px 0px 5px rgba(103, 91, 83, 0.5);
    border-radius: 5px;
    padding: 8px;
  }

</style>