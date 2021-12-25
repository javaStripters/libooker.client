<template>
  <div class="profile">
    <Container class="profile__container">
      <div class="profile__title">Ваш профиль</div>
      <div class="profile__body">
        
        <div class="profile__main-info">
          <img src="" alt="" class="profile__avatar">
          <div class="profile__username">{{this.username}}</div>
          <div class="profile__stud-number-and-login">
            <div class="profile__stud-number">
              <div>Номер студ. билета:</div>
              <div>{{}}</div>
            </div>
            <div class="profile__login">
              <div>Логин:</div>
              <div>{{this.username}}</div>
            </div>
          </div>
          <div class="profile__actions">
            <Button
              theme="secondary"
            >
              Редактировать
            </Button>
          </div>
        </div>

        <div class="profile__activity-and-statistics">
          <div class="profile__activity">
            <div class="profile__activity-title">Активность пользователя</div>
            <div class="profile__activity-grid activity-grid">
              <div 
                class="activity-grid__cell"
                v-for="index in 365"
                :key="index"
              >
              </div>
            </div>
          </div>
          <div class="profile__divider"></div>
          <div class="profile__statistics">
            <div class="profile__statistics-item">
              <div>{{}}</div>
              <div>часов брони</div>
            </div>
            <div class="profile__statistics-item">
              <div>{{}}</div>
              <div>активных броней</div>
            </div>
            <div class="profile__statistics-item">
              <div>{{}}</div>
              <div>закрытых броней</div>
            </div>
            <div class="profile__statistics-item">
              <div>{{}}</div>
              <div>замечаний</div>
            </div>
          </div>
        </div>

      </div>
    </Container>
  </div>
</template>

<script>
import Container from '@/components/Container.vue'
import Button from '@/components/Button.vue'
export default {
  
  computed: {
    username() {
      return localStorage.username
    }
  },
  components: {
    Container,
    Button,
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
}
.profile__main-info {
  background: #FEFEFE;
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 12px 8px 12px;
  align-items: center;
}
.profile__avatar {
  height: 100px;
  width: 100px;
  border-radius: 50%;
  background-color: lightgray;
  overflow: hidden;
}
.profile__username {
  text-decoration: underline;
}
.profile__stud-number-and-login {
  padding: 4px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.profile__stud-number, .profile__login {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.profile__activity-and-statistics {
  background: #FEFEFE;
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
}
.profile__activity {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
}
.profile__activity-title {
  font-size: 18px;
  font-weight: 700;
}
.profile__activity-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, 16px);
  grid-auto-rows: 16px;
  gap: 4px;
  align-items: center;
  justify-items: center;
}
.activity-grid__cell {
  border-radius: 1px;
  background: #c4c4c4;
  transition: 0.3s all;
  height: 16px;
  width: 16px;
}
.activity-grid__cell:hover {
  background: #dddddd;
  transition: 0.3s all;
  height: 18px;
  width: 18px;
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
