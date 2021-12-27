<template>
  <div id="app">
    <router-view
      @openNotification="openNotification"
    />
    <Notification 
      v-if="isNotification"
      :type="notificationType"
      :text="notificationContent"
      @closeNotification="isNotification = false"
    />
  </div>
</template>

<script>
import Notification from '@/components/Notification.vue'
export default {
  data: () => ({
    notificationType: 'confirmExitFromAccount',
    isNotification: false,
    notificationContent: ''
  }),
  methods: {
    openNotification(type, text = 'рур') {
      console.log(type, text)
      this.notificationType = type
      this.notificationContent = text
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
