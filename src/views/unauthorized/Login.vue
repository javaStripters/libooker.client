<template>
  <div class="login">
    <div class="login__title">Авторизация</div>
    <div class="login__form"> 

      <div class="login__lable">Логин</div>
      <input class="login__input" type="text" v-model="username">
      <div class="login__lable">Пароль</div>
      <input class="login__input" type="password" v-model="password">
      <div></div>
      <Button 
        class="login__submit-btn"
        theme='primary'
        :onClick="() => {login()}"
      >Войти</Button>
      <div class="login__hint login__hint--sm">
        Данные для входа: логин и пароль от сети WiFi. <br /> Найти можно в 
        <a href="https://oas.timacad.ru/stud/default/stud">личном кабинете</a>.
      </div>
      <div></div>
    </div>
    <div class="login__hint login__hint--md">
      Нажимая кнопку “Авторизироваться” Вы соглашаетесь с политикой 
      конфеденциальности и принимаете пользовательское соглашение
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue'
import Card from '@/components/Card.vue'
export default {
  data: () => ({
    username: '',
    password: '' 
  }),
  methods: {
    login() {
      fetch(`${this.$store.state.server}/auth/sign-in`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password
        })
      })
      .then( res => res.json())
      .then( res => {
        const loginTime = new Date()
        const tokenExpiresTime = new Date()
        tokenExpiresTime.setHours(loginTime.getHours() + 24)
        if (res.token && res.tokenHeader) {
          localStorage.accessToken = res.token
          localStorage.tokenHeader = res.tokenHeader
          localStorage.username = this.username
          localStorage.userRole = res.role
          localStorage.tokenExpiresTime = Date.parse(tokenExpiresTime)
          if (localStorage.userRole === 'STUDENT') {
            this.$router.push('/booking/reserving')
          }
          else if (localStorage.userRole === 'ADMIN') {
            this.$router.push('/admin/booking/reserving')
          }
        }
        else {
          window.alert('Не удалось выполнить вход. Проверьте данные и попробуйте еще раз.')
        }
      })
    }
  },
  components: {
    Card,
    Button,
  }
}
</script>

<style scoped>
  .login {
    background: #E6DFC9;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 15px;
  }
  .login__title {
    color: #013b2b;
    font-size: 48px;
    margin-bottom: 100px;
  }
  .login__form {
    background: #FFFFFF;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    padding: 24px 32px 20px 32px;
    width: 100%;
    max-width: 550px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .login__lable {
    font-size: 20px;
  }
  .login__input {
    background: #FFFFFF;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    height: 46px;
    width: 100%;
    border: none;
    padding: 8px;
  }
  .login__submit-btn {
    align-self: center;
    height: 46px;
    width: 100%;
    max-width: 300px;
    font-size: 24px;
  }
  .login__hint {
    align-self: center;
    text-align: center;
    width: 90%;
    max-width: 450px;
  }
  .login__hint--sm {
  }
  .login__hint--md {
    line-height: 25px;
    margin-top: 10px;
  }
</style>