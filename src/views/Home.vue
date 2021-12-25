<template>
  <div class="page">
    page
    <div>
      Current Date: {{$store.state.currentDate.slice(0, 10)}}
    </div>
    <div>
      Available time for booking today:

    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    availableTime: null,
  }), 
  methods: {
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>