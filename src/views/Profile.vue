<template>
  <div class="profile">
    <Container class="profile__container">
      <div class="profile__title">Ваш профиль</div>
      <div class="profile__body">
        
        <ProfileMainInfo 
          class="profile__main-info" 
          :info="userInfo"
        />
          

        <div class="profile__activity-and-statistics">
          <!-- <ActivityGrid /> -->
          <!-- <div class="profile__divider"></div> -->
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

      </div>
    </Container>
  </div>
</template>

<script>
import Container from '@/components/Container.vue'
import Button from '@/components/Button.vue'
import ProfileMainInfo from '@/components/ProfileMainInfo.vue'
import ActivityGrid from '@/components/ActivityGrid.vue'
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
    userStatistics: {
      activeBookings: 0,
      closedSessions: 0,
      hours: 0,
    }
  }),
  methods: {
    getUserStatistics() {
      fetch(`${this.$store.state.server}/users/statistic`, {
        headers: {
          "Authorization": `${localStorage.tokenHeader} ${localStorage.accessToken}`,
        },
      })
      .then( res => res.json())
      .then( res => {
        console.log(res)
        this.userStatistics = res
      })
    },
    updateUserInfo() {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    }
  },
  computed: {
    username() {
      return localStorage.username
    },
    userRole() {
      return localStorage.userRole
    }
  },
  mounted() {
    this.getUserStatistics()
    this.updateUserInfo()

  },
  components: {
    Container,
    Button,
    ProfileMainInfo,
    ActivityGrid,
  },
}
</script>

<style scoped>
.profile {

}
.profile__title {
  text-transform: uppercase;
  font-weight: 700;
  font-size: 18px;
  padding: 24px 0 16px 0;
}
.profile__body {
  display: grid;
  grid-template-columns: 270px auto;
  gap: 16px;
  align-items: start;
  overflow-x: auto;
}
.profile__body::-webkit-scrollbar {
  display: none;
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
</style>
