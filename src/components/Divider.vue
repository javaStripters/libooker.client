<template>
  <div :class="{
    vertical: (type === 'ver'),
    horizontal: (type === 'hor' || type === undefined),
    'divider--gray': (color === 'gray')
  }"></div>
</template>

<script>
export default {
  props: [
    'type',
    'color' /* String: 'gray', 'white' */
  ]
}
</script>

<style scoped>
  .vertical {
    height: 100%;
    width: 1px;
    background-color: white;
  }
  .horizontal {
    min-height: 1px;
    max-height: 1px;
    width: 100%;
    background-color: white;
  }
  .divider--gray {
    background: gray;
  }
</style>