<template>
  <div class="unauthorized">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>
  .unauthorized {
    width: 100vw;
    min-height: 100vh;
    background-color: bisque;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>