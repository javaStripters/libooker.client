<template>
  <div 
    class="ticket"
    :class="[type ? `ticket--${type}` : 'ticket--actual']"
  >
    <div class="ticket__aside">
      {{info.date.slice(8, 10)}}
    </div>
    <div class="ticket__body">
      <div class="ticket__student-info-and-time">
        <div class="ticket__info">
          <div>Номер студ. билета:</div>
          <div>{{}}</div>
        </div>
        <div class="ticket__info">
          <div>Дата Вашей брони:</div>
          <div>{{info.date}}</div>
        </div>
        <div class="ticket__info">
          <div>Время Вашей брони:</div>
          <div>{{`${info.startTime.slice(0, 5)}-${info.endTime.slice(0, 5)}`}}</div>
        </div>
      </div>
      <div class="ticket__divider"></div>
      <div class="ticket__computer-number-and-address">
        <div>
          <div class="ticket__computer-number">Компьютер № {{info.workplace.name}}</div>
          <div style="line-height: 16px; font-size: 14px">2 этаж, компьютерный класс №2</div>
        </div>
        <img :src="require('@/assets/computer.svg')" alt="" class="ticket__image">
        <div class="ticket__address">
          <span>Адрес: </span>
          <span>Лиственичная аллея, 2, корп. 1</span>
        </div>
      </div>
      <div 
        class="ticket__actions"
        v-if="type === 'actual'"
      >
        <Button
        class="ticket__button"
        theme="secondary"
        :onClick="() => {}"
        > Отменить </Button>
        <Button
        class="ticket__button"
        theme="primary"
        :onClick="() => {}"
        > Подтвердить </Button>
      </div>
    </div> 
  </div>
</template>

<script>
import Button from '@/components/Button.vue'
export default {
  props: [
    'info',
    'type' /* String: 'actual', 'archived' */
  ],

  components: {
    Button,
  }
}
</script>

<style scoped>
  .ticket {
    width: 320px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    background: #ffffff;
    border-radius: 8px;
    display: grid;
    grid-template-columns: 50px auto;
    overflow: hidden;
  }
  .ticket--actual .ticket__aside {
    background: #D5DFF7;
  }
  .ticket--archived .ticket__aside {
    background: #B9AC9B;
  }
  .ticket__aside {
    border: 1px solid #013B2B;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 8px 0 0 8px;
    color: #013B2B;
    font-weight: bold;
    font-size: 24px;
  }
  .ticket__body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .ticket__student-info-and-time {
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .ticket__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }
  .ticket__info div:nth-child(2) {
    color: #013B2B;
    font-weight: 700;
  }
  .ticket__divider {
    width: 100%;
    height: 1px;
    background: #013B2B;
  }
  .ticket__computer-number-and-address, .ticket__actions {
    padding: 8px 16px;
  }
  .ticket__computer-number-and-address {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    text-align: center;
  }
  .ticket__computer-number {
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
  }
  .ticket__actions {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
</style>

