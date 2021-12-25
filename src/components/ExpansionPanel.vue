<template>
  <div 
    class="expansion-panel" 
    :id="id"
    :class="[isFocus ? 'expansion-panel--focus' : '']"
  >
    <div class="expansion-panel__header">
      <div class="expansion-panel__header-icon">
        <img :src="require('@/assets/icons/question-mark-in-circle.svg')" alt="">
      </div>
      <div class="expansion-panel__title">
        {{title}}
      </div>
      <div 
        class="expansion-panel__subtitle"
        v-if="subtitle"
      >
        {{subtitle}}
      </div>
      <div 
        class="expansion-panel__tags"
        v-if="tags"
      >
        <div 
          class="expansion-panel__tag"
          v-for="(tag, index) in tags"
          :key="index"
          :class="'expansion-panel__tag--' + tag.status"
        >
          {{tag.text}}
        </div>
        
      </div>
      <div 
        class="expansion-panel__toggle"
        v-if="body"
        :class="[isOpen ? 'expansion-panel__toggle--up' : 'expansion-panel__toggle--down']"
        @click="togglePanel()"
      >
        <img :src="require('@/assets/icons/chevron-down-gray.svg')" alt="">
      </div>
    </div>
    <Divider 
      :class="[isOpen ? 'expansion-panel__divider--true' : 'expansion-panel__divider--false']"
      :color="'gray'" 
      :type="'hor'"
    />
    <div 
      class="expansion-panel__body"
      v-if="body"
      :class="[isOpen ? 'expansion-panel__body--open' : 'expansion-panel__body--close']"
      v-html="body"
    >

    </div>
  </div>
</template>

<script>
import Divider from '../components/Divider.vue'
export default {
  props: [
    'title' /* String */,
    'tags' /* Array with 2 objects: {type: String, status: String, text: String} */,
    'body' /* String: supports html tags inside */,
    'id' /* Number */,
    'subtitle' /* String */,
  ],
  data: () => ({
    isOpen: false,
    isFocus: false,
  }),
  methods: {
    togglePanel() {
      this.isOpen = !this.isOpen

    }
  },
  mounted() {
    if (this.$route.fullPath.indexOf(this.id) !== -1) {
      this.isFocus = true
      setTimeout(() => {
        this.isFocus = false
      }, 1000)
    }
  },
  components: {
    Divider,
  }
}
</script>

<style scoped>
  .expansion-panel {
    background: #FFFFFF;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    padding: 16px 12px;
    transition: all .3s;
    max-width: 1200px;
    width: 100%;
  }
  .expansion-panel--focus {
    box-shadow: 0px 0px 15px 2px #605BBC;
    transition: all .3s;
  }
  .expansion-panel__header {
    display: grid;
    grid-template-columns: 30px 1fr auto 30px;
    column-gap: 20px;
    align-items: center;
  }
  .expansion-panel__title {
    font-weight: 700;
    grid-area: 1 / 2 / 4 / 3;
  }
  .expansion-panel__subtitle {
    margin-top: 2px;
    font-size: 11px;
    color: #202020;
    grid-area: 2 / 2 / 3 / 3;
  }
  .expansion-panel__header-icon {
    grid-area: 1 / 1 / 3 / 2;
  }
  .expansion-panel__toggle {
    cursor: pointer;
    grid-area: 1 / -2 / 3 / -1;
  }
  .expansion-panel__toggle img{
    height: 30px;
    width: 30px;
  }
  .expansion-panel__toggle--up img {
    transform: rotate(-180deg);
    transition: all 1s;
  }
  .expansion-panel__toggle--down img {
    transform: rotate(0deg);
    transition: all 1s;
  }
  .expansion-panel__tags {
    display: flex;
    justify-self: right;
    column-gap: 20px;
    align-items: center;
    grid-area: 1 / 3 / 3 / 4;
  }
  .expansion-panel__tag {
    padding: 5px 15px;
    border-radius: 10px;
    background: lightgray;
  }
  .expansion-panel__tag--technical {
    background: #B18CED;
  }
  .expansion-panel__tag--fixed {
    background: #C4F674;
  }
  .expansion-panel__tag--graphic {
    background: #8EA7ED;
  }
  .expansion-panel__tag--new {
    background: #F23DA0;
  }
  .expansion-panel__tag--in-progress {
    background: #FFE029;
  }
  .expansion-panel__divider--true {
    opacity: 1;
    margin-top: 10px;
    margin-bottom: 10px;
    transition: 1s all;
  }
  .expansion-panel__divider--false {
    opacity: 0;
    transition: 1s all;
    margin-top: 0px;
  }
  .expansion-panel__body {
    overflow: hidden;
  }
  .expansion-panel__body--close {
    height: 0% !important;
    max-height: 0px;
    transition: all 1s;
  }
  .expansion-panel__body--open {
    height: 100% !important;
    max-height: 500px;
    transition: all 1s;
    overflow-y: auto;
  }
  .expansion-panel__body--open::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 1024px) {
    .expansion-panel__header {
      grid-template-columns: 30px auto 30px;
    }
    .expansion-panel__header-icon {
      grid-area: 1 / 1 / 4 / 2;
    }
    .expansion-panel__header-icon img {
      max-height: 30px;
      max-width: 30px;
    }
    .expansion-panel__toggle {
      grid-area: 1 / 3 / 4 / 4;
    }
    .expansion-panel__tags {
      grid-area: 3 / 2 / 4 / 3;
      justify-self: start;
      column-gap: 5px;
      margin-top: 10px;
    }
    .expansion-panel__tag {
      padding: 2px 8px;
      border-radius: 5px;
      font-size: 13px;
    }
  }
</style>