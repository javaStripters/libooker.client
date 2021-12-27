<template>
  <div class="main-info">
    <img src="" alt="" class="main-info__avatar">
    <div 
      class="main-info__username"
    >
      {{`
        ${info.lastname}
        ${info.firstname}
        ${info.patronymic}
      `}}
    </div>
    <div class="main-info__stud-number-and-login">
      <div class="main-info__stud-number">
        <div>Номер студ. билета:</div>
        <div>{{info.testbook}}</div>
      </div>
      <div class="main-info__login">
        <div>Логин:</div>
        <div>{{info.username}}</div>
      </div>
    </div>
    <div 
      class="main-info__actions"
      v-if="userRole === 'ADMIN'"
    >
      <Button
        theme="secondary"
        :onClick="() => {}"
      >
        Редактировать
      </Button>
      <Button
        theme="danger"
        :onClick="() => {}"
      >
        Пожаловаться
      </Button>
    </div> 
  </div>
</template>

<script>
import Button from '@/components/Button.vue'

export default {
  props: [
    'info'
  ],

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
.main-info {
  background: #FEFEFE;
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 12px 8px 12px;
  align-items: center;
}
.main-info__avatar {
  height: 100px;
  width: 100px;
  border-radius: 50%;
  background-color: lightgray;
  overflow: hidden;
}
.main-info__username {
  text-decoration: underline;
}
.main-info__stud-number-and-login {
  width: 100%;
  padding: 4px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.main-info__stud-number, .main-info__login {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}
.main-info__actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
</style>