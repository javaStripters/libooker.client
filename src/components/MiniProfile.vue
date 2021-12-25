<template>
  <div class="mini-profile">
    <div class="mini-profile__avatar">
      
    </div>
    <div class="mini-profile__username">
      {{username}}
    </div>
    <img 
      class="mini-profile__dropdown-icon"
      :src="require('@/assets/icons/chevron-down.svg')" 
    />
  </div>
</template>

<script>
export default {
  computed: {
    username() {
      return localStorage.username
    }
  }
}
</script>

<style scoped>
  .mini-profile {
    display: flex;
    column-gap: 8px;
    color: white;
  }
  .mini-profile__avatar {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background: lightblue;
  }
  .mini-profile__username {
    display: flex;
    align-items: center;
  }
</style>