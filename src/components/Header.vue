<template>
  <div class="header">
    <Container class="header__container">
      <div class="header__logo">
        <!-- <img :src="require('@/assets/three-books.svg')" alt="">
        <img :src="require('@/assets/site-name.svg')" alt=""> -->
        <img :src="require('@/assets/library-logo.svg')" alt="">
      </div>
      <div class="header__user-section">
        
        <MiniProfile 
          class="header__user-profile" 
        />
        <div class="header__vertical-divider"></div>
        <!-- <button 
          class="header__see-notification-btn"
          @click="false"
        >
          <img :src="require('@/assets/icons/bell-icon.svg')" alt="">
        </button> -->
        <button
          class="header__log-out-btn"
          @click="$emit('openNotification', 'confirmExitFromAccount')"
        >
          <img :src="require('@/assets/icons/on-off-icon.svg')" alt="">
        </button>
      </div>
    </Container>
  </div>
</template>

<script>
import Container from '@/components/Container.vue'
import MiniProfile from '@/components/MiniProfile.vue'
export default {
  
  methods: {
  },
  components: {
    Container,
    MiniProfile,
  }
}
</script>

<style scoped>
  .header {
    height: 64px;
    width: 100%;
    background: #013B2B;
  }
  .header__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }
  .header__logo {
    display: flex;
    column-gap: 32px;
  }
  .header__logo {
    max-height: 100%;
  }
  .header__user-section {
    display: flex;
    align-items: center;
    column-gap: 16px;
  }
  .header__vertical-divider {
    width: 2px;
    height: 30px;
    background: #ffffff;
    border-radius: 1px;
  }
</style>