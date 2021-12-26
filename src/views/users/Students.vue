<template>
  <div class="students">
    <SearchBox 
      class="students__search-box"
    />
    <div class="students__body">
      <div 
        class="students__student student"
        v-for="student in 30"
        :key="student"
      >
        <div class="student__avatar">
          <img src="" alt="">
        </div>
        <div class="student__username">{{}}</div>
        <div class="student__info-items">
          <div class="student__info-item">
            <div>Номер студ. билета:</div>
            <div>{{}}</div>
          </div>
          <div class="student__info-item">
            <div>Логин:</div>
            <div>{{}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBox from '@/components/SearchBox.vue'
export default {
  

  components: {
    SearchBox,
  }
}
</script>

<style scoped>
.students {
  padding: 16px;
  background: #FBFBFB;
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.students__search-box {
  max-width: 300px;
  align-self: flex-end;
}
.students__body {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, auto));
  gap: 10px;
  justify-items: center;
}
.student {
  max-width: 350px;
  width: 100%;
  background: #FEFEFE;
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  padding: 12px;
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: 1fr min-content;
  gap: 8px;
  align-items: center;
}
.student__avatar {
  height: 80px;
  width: 80px;
  border-radius: 50%;
  background: #bbbbbb;
  grid-area: 1 / 1 / 3 / 2;
}
.student__username {
  text-decoration: underline;
}
.student__info-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.student__info-item {
  display: flex;
  justify-content: space-between;
}
</style>