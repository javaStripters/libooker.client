<template>
  <div class="unauthorized">
    <div class="unauthorized__banner banner">
      <div class="banner__header">
        <div class="banner__logo">
          <img :src="require('@/assets/library-logo.svg')" alt="">
        </div>
      </div>
      <div class="banner__main">
        <div class="banner__slogan">
          Избавься от очереди и нехватки мест: 
          бронируй место в новом компьютерном классе 
          ЦНБ имени Н.И. Железнова из любого места и в любое время! 
        </div>
      </div>
      <div class="banner__footer footer">
        <div class="footer__copyright-and-communities">
          <div class="footer__communities">
            <a href="">
              <img :src="require('@/assets/icons/vkontakte.svg')" alt="">
            </a>
            <a href="">
              <img :src="require('@/assets/icons/twitter.svg')" alt="">
            </a>
            <a href="">
              <img :src="require('@/assets/icons/instagram.svg')" alt="">
            </a>
            <a href="">
              <img :src="require('@/assets/icons/chrome.svg')" alt="">
            </a>
            
          </div>
          <div class="footer__copyright">© ЦНБ имени Н. И. Железнова, 2021</div>
        </div>
        <div class="footer__contacts">
          <div class="footer__contacts-item">+7 (499) 976-14-85</div>
          <div class="footer__contacts-item">library@timacad.ru</div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
  .unauthorized {
    width: 100vw;
    min-height: 100vh;
    display: grid;
    grid-template-columns: minmax(auto, 800px) minmax(500px, 1fr);
  }

  .banner {
    padding: 60px 60px 20px 60px;
    background: url('../assets/banner__background.png') no-repeat center / cover;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: white;
  }
  .banner__logo img {
    max-width: 100%;
  }
  .banner__main {
    align-self: center;

  }
  .banner__slogan {
    text-align: center;
    font-size: 20px;
    line-height: 40px;
    font-weight: 500;
    max-width: 520px;
  }
  .footer {
    display: grid;
    grid-template-columns: auto minmax(auto, 300px);
  }
  .footer__copyright-and-communities {
    display: flex;
    flex-direction: column;
    align-self: center;
    justify-self: start;

    gap: 10px;
    font-size: 14px;
  }
  .footer__communities {
    display: flex;
    gap: 16px;
  }
  .footer__contacts {
    display: flex;
    flex-flow: row-reverse wrap;
    gap: 10px 20px;
    align-items: flex-end;
    justify-items: end;
  }
  .footer__contacts div:nth-child(2) {
  }
</style>