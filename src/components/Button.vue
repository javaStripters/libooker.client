<template>
  <button
    class="button"
    :class="[
      theme ? `button--${theme}` : 'button--secondary'
    ]"
    @click="onClick"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: [
    'theme' /* String: 'primary', 'secondary' */,
    'onClick' /* Function */,
  ],
}
</script>

<style scoped>
  .button {
    border-radius: 8px;
    padding: 8px;
  }
  .button--primary {
    background: #013B2B;
    color: white;
  }
  .button--secondary {
    border: 1px solid #013B2B;
    color: #013B2B;
    background: #FFFFFF;
  }
</style>
