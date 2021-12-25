<template>
  <div id="app">
    <router-view
      @openNotification="openNotification"
    />
    <Notification 
      v-if="isNotification"
      :type="notificationType"
      @closeNotification="isNotification = false"
    />
  </div>
</template>

<script>
import Notification from '@/components/Notification.vue'
export default {
  data: () => ({
    notificationType: 'confirmExitFromAccount',
    isNotification: false
  }),
  methods: {
    openNotification(type) {
      console.log(type)
      this.notificationType = type 
      this.isNotification = true
    }
  },



  components: {
    Notification,
  },
  
}
</script>
<style>
</style>
