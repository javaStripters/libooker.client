<template>
  <div class="notification">
    <div 
      class="notification__wrap"
      @click="$emit('closeNotification')"
    ></div>
    <div class="notification__body">
      <div
        class="confirmExitFromAccount"
        v-if="type === 'confirmExitFromAccount'"
      >
        <div>
          Вы действительно хотите выйти из системы?
        </div>
        <div class="confirmExitFromAccount__actions">
          <Button
            theme='secondary'
            :onClick="() => {}"
          >
            Отмена
          </Button>
          <Button
            theme='danger'
            :onClick="logOut"
          >
            Выйти
          </Button>
        </div>
      </div>
      <div
        class="cantOpenOfficialWeekendDays"
        v-else-if="type === 'cantOpenOfficialWeekendDays'"
      >
        <div>
          К сожалению, пока нельзя открывать запись на дни, совпадающие с официальными выходными или государственными празниками
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue'
export default {
  props: [
    'type'
  ],

  methods: {
    logOut() {
      console.log('logOuting from Notification component')
      this.$store.getters.logOut
      this.$emit('closeNotification')
    }
  },



  components: {
    Button,
  }
}
</script>

<style scoped>

  .notification {
    position: absolute;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .notification__wrap {
    position: absolute;
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.25);
    height: 100%;
    width: 100%;
  }
  .notification__body {
    background: #FFFFFF;
    border-radius: 8px;
    padding: 8px 24px;
    z-index: 10;
  }
  .confirmExitFromAccount, .cantOpenOfficialWeekendDays {
    max-width: 250px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .confirmExitFromAccount__actions {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }

</style>