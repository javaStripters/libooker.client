<template>
  <div 
    class="navigation"
    :class="theme ? `navigation--${theme}` : 'navigation--secondary'"
  >
    <Container class="navigation__container">
      <div class="navigation__items">
        <router-link
          class="navigation__item"
          v-for="button in buttons"
          :key="button.name"
          :class="$route.path.indexOf(button.name) !== -1 ? 'navigation__item--choosed' : 'navigation__item--unchoosed'"
          :to="button.goTo"
        >
          {{button.text}}
        </router-link>
      </div>
    </Container>
  </div>
</template>

<script>
import Container from '@/components/Container.vue'
export default {
  props: [
    'theme' /* String: 'primary', 'secondary' */,
    'buttons' /* Array */,
  ],
  components: {
    Container,
  },
}
</script>

<style scoped>
  .navigation {
    font-size: 16px;
  }
  .navigation__container {
    display: flex;
  }
  .navigation--primary .navigation__container {
    justify-content: center;
  }
  .navigation__items {
    display: flex;
    column-gap: 46px;
  }
  .navigation__item {
    font-weight: 700;
    text-transform: uppercase;
    text-decoration: none;
  }
  .navigation--primary .navigation__item {
    padding: 5px 9px;
    border-radius: 8px;
  }
  .navigation--primary .navigation__item--choosed {
    background: #013B2B;
    color: white;
    transition: .5s all;
  }
  .navigation--primary .navigation__item--unchoosed {
    background: none;
    color: black;
    transition: .5s all;
  }
  .navigation--secondary .navigation__item--choosed {
    color: black;
    transition: .5s all;
  }
  .navigation--secondary .navigation__item--unchoosed {
    color: #868686;
    transition: .5s all;
  }
</style>