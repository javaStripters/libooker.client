<template>
  <div class="footer">
    <Container class="footer__container">
      <div class="footer__column footer__contacts">
        <div class="footer__title">Контакты </div>
        <div class="footer__item">+7 (499) 976-14-85</div>
        <div class="footer__item">library@timacad.ru</div>
      </div>
      <div class="footer__column footer__documents">
        <div class="footer__title">Документы</div>
        <div class="footer__item">Политика конфиденциальности</div>
        <div class="footer__item">Пользовательское соглашение</div>
      </div>
      <div class="footer__column footer__address">
        <div class="footer__title">Адрес библиотеки</div>
        <div class="footer__item">ул. Лиственничная аллея, <br/> д.2 корп. 1, Москва</div>
      </div>
      <div class="footer__column footer__copyright-and-communities">
        <div class="footer__communities">
          <a href="">
            <img :src="require('@/assets/icons/vkontakte.svg')" alt="">
          </a>
          <a href="">
            <img :src="require('@/assets/icons/twitter.svg')" alt="">
          </a>
          <a href="">
            <img :src="require('@/assets/icons/chrome.svg')" alt="">
          </a>
        </div>
        <div class="footer__copyright">© ЦНБ имени Н. И. Железнова, 2021</div>
      </div>
    </Container>

  </div>
</template>

<script>
import Container from '@/components/Container.vue'
export default {
  

  components: {
    Container,
  }
}
</script>

<style scoped>
.footer {
  background: #013B2B;
  color: white;
  margin-top: 50px;
}
.footer__container {
  padding-top: 16px;
  padding-bottom: 16px;
  display: grid;
  grid-template-columns: repeat(3, auto) 1fr;
  gap: 100px;
}
.footer__column {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.footer__title {
  font-weight: 700;
}
.footer__item {
  font-size: 14px;
}
.footer__copyright-and-communities {
  align-self: center;
  justify-self: end;
  font-size: 14px;
}
.footer__communities {
  display: flex;
  gap: 16px;
}
</style>