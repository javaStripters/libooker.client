<template>
  <div>
    <Card :title="'Login'"> 
      <div>Логин</div>
      <input type="text" v-model="username">
      <div>Пароль</div>
      <input type="password" v-model="password">
      <div></div>
      <button 
        style="
          border: 1px solid black; 
          border-radius: 3px; 
          width: 100%; 
          padding: 3px; 
          margin-top: 10px;
        "
        @click="login()"
      >Войти</button>
      <div></div>
      <router-link to="registration">Зарегистрироваться</router-link>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
export default {
  data: () => ({
    username: '',
    password: '' 
  }),
  methods: {
    login() {
      console.log(this.username, this.password)
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
        console.log(res)
        if (res.token && res.tokenHeader) {
          localStorage.accessToken = res.token
          localStorage.tokenHeader = res.tokenHeader
          localStorage.username = this.username
          this.$router.push('/booking/reserving')
        }
        else {
          window.alert('Some problems are occurred')
        }
      })
    }
  },
  components: {
    Card,
  }
}
</script>

<style scoped>
  .login {

  }
</style>