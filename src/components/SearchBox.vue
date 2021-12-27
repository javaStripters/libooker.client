<template>
  <div class="search-box">
    <img :src="require('@/assets/icons/magnifier-in-circle--brown.svg')" alt="" class="users-search__icon">
    <div>Поиск</div>
    <input 
      class="search-box__input"
      type="text" 
      placeholder="введите данные"
      v-model="usersSearchInput"
    >
  </div>
</template>

<script>
export default {
  data: () => ({
    usersSearchInput: ''
  }),
}
</script>

<style scoped>
  .search-box {
    display: flex;
    gap: 5px;
    align-items: center;
    color: #685C54;
    font-size: 14px;
  }
  .search-box__input {
    width: 100%;
    background: #FFFFFF;
    box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.12);
    border-radius: 10px;
    padding: 6px 8px;
    border: none;
    margin-left: 5px;
  }
</style>