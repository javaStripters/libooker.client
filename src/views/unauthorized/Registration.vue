<template>
  <div>
    <Card :title="'Registration'"> 
      <div>Имя пользователя</div>
      <input type="text" v-model="username">
      <div>Придумайте пароль</div>
      <input type="password" v-model="password">
      <div>Повторите пароль</div>
      <input type="password" v-model="checkPassword">
      <div></div>
      <button 
        style="border: 1px solid black; border-radius: 3px; width: 100%; padding: 3px; margin-top: 10px;"
        @click="register()"
      >
        Зарегистрироваться
      </button>
      <div v-html="validationMessage"></div>
      <router-link to="login">Войти</router-link>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
export default {
  data: () => ({
    username: '',
    password: '',
    checkPassword: '',
    validationMessage: '', 
  }),
  methods: {
    register() {
      if (this.password.length < 8) {
        this.validationMessage += 'Слишком короткий пароль. <br/>'
      }
      else if (this.password !== this.checkPassword) {
        this.validationMessage += 'Пароли не совпадают <br />'
      }
      else {
        fetch(`${this.$store.state.server}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-type' : 'application/json',
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
            role: 'STUDENT'
          })
        })
        .then(res => {
          if (res.status === 200) {
            this.$router.push('/unauthorized/login')
          }
        })
      }
    }
  },
  components: {
    Card,
  }
}
</script>