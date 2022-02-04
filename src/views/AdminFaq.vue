<template>
  <div class="faq">
    <Container class="faq__container"> 
      <div class="faq__header">
        <div class="faq__title">Часто задаваемые вопросы</div>
      </div>      
      <div class="faq__body">
        <!-- <div class="faq__adding-question-form form">
          <img 
            class="form__icon"
            :src="require('@/assets/icons/question-mark-in-circle.svg')"
          >
          <input 
            class="form__question"
            placeholder="Введите заголовок вопроса"
          >
          <div class="form__divider"></div>
          <textarea 
            class="form__answer"
            placeholder="Введите ответ на вопрос"
          ></textarea>
        </div>  -->
        <div class="faq__expansion-panels">
          <ExpansionPanel
            class="faq__expansion-panel"
            v-for="point in $store.state.faqPoints"  
            :key="point.question"
            :title="point.question"
            :body="point.answer"
          />
        </div>
      </div>
    </Container>
  </div>
</template>

<script>
import Container from '@/components/Container.vue'
import ExpansionPanel from '@/components/ExpansionPanel.vue'
export default {


  components: {
    Container,
    ExpansionPanel,
  }
}
</script>

<style scoped>
.faq__container {
  padding-top: 24px;
  padding-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.faq__title {
  font-size: 18px;
  font-weight: 700;
}
.faq__body {
  display: flex;
  flex-direction: column;
  gap: 50px;
  align-items: center;
}
.faq__expansion-panels {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.faq__adding-question-form, .faq__expansion-panels {
  width: 100%;
  max-width: 1200px;
}


.form {
  background: #FFFFFF;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.18);
  border-radius: 10px;
  padding: 8px 24px;
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 8px 20px;
  justify-items: center;
  align-items: center;
  width: 100%;
}
.form__divider, .form__answer {
  grid-column: 1 / -1;
}

.form__question, .form__answer {
  width: 100%;
  background: #FFFFFF;
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.07);
  border-radius: 10px;
  padding: 8px;
  border: none;
  resize: vertical;

}
.form__question {
  height: 40px;
}
.form__divider {
  height: 1px;
  width: 100%;
  background: #675B53;
  border-radius: 0.5px;
}
.form__answer {
  min-width: 100%;
  max-width: 100%;
  min-height: 150px;
}
</style>