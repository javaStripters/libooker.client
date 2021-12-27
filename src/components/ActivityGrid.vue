<template>
  <div class="activity">
    <div class="activity-title">Активность пользователя</div>
    <div class="activity-grid activity-grid">
      <div 
        class="activity-grid__cell"
        v-for="index in 365"
        :key="index"
      >
      </div>
    </div>
  </div>
</template>


<style scoped>
.activity {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
}
.activity-title {
  font-size: 18px;
  font-weight: 700;
}
.activity-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, 16px);
  grid-auto-rows: 16px;
  gap: 4px;
  align-items: center;
  justify-items: center;
}
.activity-grid__cell {
  border-radius: 1px;
  background: #c4c4c4;
  transition: 0.3s all;
  height: 16px;
  width: 16px;
}
.activity-grid__cell:hover {
  background: #dddddd;
  transition: 0.3s all;
  height: 18px;
  width: 18px;
}
</style>