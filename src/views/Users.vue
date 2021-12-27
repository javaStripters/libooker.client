<template>
  <div class="users">
    <!-- <Navigation 
      class="users__navigation"
      :buttons="navigationButtons"
    /> -->
    <Container class="users__container">
      
      <router-view />

    </Container>
  </div>
</template>

<script>
import Container from '@/components/Container.vue'
import Navigation from '@/components/Navigation.vue'
export default {
  data: () => ({
    navigationButtons: [
      {
        name: 'Students',
        goTo: '/admin/users/students',
        text: 'Студенты'
      },
      {
        name: 'Tutors',
        goTo: '/admin/users/tutors',
        text: 'Преподаватели'
      },
    ]

  }),  

  components: {
    Container,
    Navigation,
  }
}
</script>

<style scoped>
  .users__navigation {
    padding-top: 24px;
  }
  .users__container {
    padding-top: 24px;
  }
</style>