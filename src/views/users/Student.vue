<template>
  <div class="user">
    <div class="user__header">
      <router-link 
        class="user__back-btn"
        :to="'/admin/users/students'"
      >
        <img :src="require('@/assets/icons/arrow-left-icon.svg')" alt="">
      </router-link>
    </div>
    <div class="user__body">
      <ProfileMainInfo 
        :info="userInfo"
      />
      <div class="profile__activity-and-statistics">

        <ActivityGrid />
        <div class="profile__divider"></div>
        <div class="profile__statistics">
          <div class="profile__statistics-item">
            <div>{{userStatistics.hours}}</div>
            <div>часов брони</div>
          </div>
          <div class="profile__statistics-item">
            <div>{{userStatistics.activeBookings}}</div>
            <div>активных броней</div>
          </div>
          <div class="profile__statistics-item">
            <div>{{userStatistics.closedSessions}}</div>
            <div>закрытых броней</div>
          </div>
          <!-- <div class="profile__statistics-item">
            <div>{{}}</div>
            <div>замечаний</div>
          </div> -->
        </div>
      </div>
      <div class="profile__user-reservings">
        <ReservingInline 
          v-for="(booking, index) in bookings"
          :key="index"
          :booking="booking"
        />
      </div>
    </div>

  </div>
</template>

<script>
import ProfileMainInfo from '@/components/ProfileMainInfo.vue'
import ActivityGrid from '@/components/ActivityGrid.vue'
import ReservingInline from '@/components/ReservingInline.vue'
export default {
  data: () => ({
    userInfo: {
      id: null,
      username: null,
      role: null,
      lastname: null,
      firstname: null,
      patronymic: null,
      testbook: null
    },
    bookings: [],
    userStatistics: {
      activeBookings: 0,
      closedSessions: 0,
      hours: 0,
    }
  }),
  methods: {
    getUserData(userId) {
      fetch(`${this.$store.state.server}/users/${userId}`, {
        headers: {
          "Authorization": `${localStorage.tokenHeader} ${localStorage.accessToken}`
        }
      })
      .then(res => res.json())
      .then(res => {
        this.userInfo = res
      })
    },
    getUserBookings(userId) {
      fetch(`${this.$store.state.server}/bookings/user/${userId}`, {
        headers: {
          "Authorization": `${localStorage.tokenHeader} ${localStorage.accessToken}`,
        },
      })
      .then( res => res.json())
      .then( res => {
        this.bookings = res.content
      })
    },
    getUserStatistics(userId) {
      fetch(`${this.$store.state.server}/users/${userId}/statistic`, {
        headers: {
          "Authorization": `${localStorage.tokenHeader} ${localStorage.accessToken}`,
        },
      })
      .then( res => res.json())
      .then( res => {
        console.log(res)
        this.userStatistics = res
      })
    }
  },
  mounted() {
    this.getUserData(this.$route.params.id)
    this.getUserBookings(this.$route.params.id)
    this.getUserStatistics(this.$route.params.id)
  },
  components: {
    ProfileMainInfo,
    ActivityGrid,
    ReservingInline
  }
}
</script>

<style scoped>
.user {
  background: #FBFBFB;
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  padding: 16px;
}
.user__body {
  padding: 15px 36px 36px 36px;
  display: grid;
  grid-template-columns: 270px auto;
  gap: 16px;
  align-items: start;
  overflow-x: auto;
}
.profile__activity-and-statistics {
  background: #FEFEFE;
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
}
.profile__divider {
  width: 100%;
  height: 1px;
  background: #C4C4C4;
}
.profile__statistics {
  color: #013B2B;
  display: flex;
  justify-content: center;
  gap: 64px;
  padding: 16px;
}
.profile__statistics-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  text-align: center;
}
.profile__statistics-item div:nth-child(1) {
  font-size: 24px;
  font-weight: 700;
}
.profile__statistics-item div:nth-child(2) {
  font-size: 14px;
}
.profile__user-reservings {
  background: #FEFEFE;
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  padding: 16px 20px;
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
</style>