<template>
  <div class="students">
    <SearchBox 
      class="students__search-box"
      @editSearchfieldContent="(val) => {val.length >= 3 && getStudents(val)}"
    />
    <div class="students__body">
      <div
        v-if="students.length === 0"
      >
        Начните вводить данные студента.
      </div>
      <router-link 
        class="students__student student"
        v-for="(user, index) in students"
        :key="index"
        :to="`/admin/users/student/${user.username}`"
      >
        <div class="student__avatar">
          <img src="" alt="">
        </div>
        <div class="student__username">{{user.lastname + ' ' + user.firstname}}</div>
        <div class="student__info-items">
          <div class="student__info-item">
            <div>Номер студ. билета:</div>
            <div>{{user.testbook}}</div>
          </div>
          <div class="student__info-item">
            <div>Логин:</div>
            <div>{{user.username}}</div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import SearchBox from '@/components/SearchBox.vue'
export default {
  data: () => ({
    students: []
  }),
  methods: {
    getStudents(val) {
      fetch(`${this.$store.state.server}/admin/user-search?query=${val}`, {
        headers: {
          "Authorization": `${localStorage.tokenHeader} ${localStorage.accessToken}`,
          "Content-type" : 'application/json'
        },
        method: 'POST',
        
      })
      .then( res => res.json())
      .then( res => {
        console.log(res)
        this.students = res
      })
    }
    
  },
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
  color: black;
  text-decoration: none;
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