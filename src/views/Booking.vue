<template>
    <div class="booking">
      <Navigation 
        :buttons="navigationButtons"
      />
      <Container>
        <router-view />
      </Container>
    </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import Container from '@/components/Container.vue'
export default {
  data: () => ({
    navigationButtons: [
      {
        name: 'Reserving',
        goTo: '/booking/reserving',
        text: 'Резервация'
      },
      {
        name: 'User Reservations',
        goTo: '/booking/user-reservations',
        text: 'Мои записи'
      },
    ]
  }),

  components: {
    Navigation,
    Container,
  }
}
</script>

<style scoped>
.booking {
  padding-top: 32px;
  display: grid;
  gap: 10px;
}
</style>