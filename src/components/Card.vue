<template>
  <div class="card">
    <div class="card__header">
      <div class="card__title">{{title}}</div>
    </div>
    <div class="card__body">
      <slot></slot>
    </div>
    <div class="card__footer"></div>
  </div>
</template>

<script>
export default {
  props: [
    'title'
  ]
}
</script>

<style scoped>
  .card {
    border: 1px solid black;
    padding: 10px;
    border-radius: 10px;
    background: white;
  }
  .card__title {
    font-size: 24px;
  }
</style>