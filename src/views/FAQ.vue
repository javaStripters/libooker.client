<template>
  <div class="faq">
    <Container class="faq__container">
      <div class="faq__title">Часто задаваемые вопросы</div>
      <div class="faq__expansion-panels">
        <ExpansionPanel
          class="faq__expansion-panel"
          v-for="question in 5"  
          :key="question"
          :title="'Test title ' + question"
          :body="`Test body ${question}. HTML tags are supported here.`"
        />
      </div>

      <!-- <div class="faq__title">Обратная связь</div>
      <div class="faq__feedback-form">
        <textarea 
          class="faq__textarea"
          placeholder="Подробно опишите Вашу проблему"
        >
        </textarea>
        <Button
          class="faq__submit-btn"
          theme="primary"
          :onClick="() => {}"
        >
          Отправить
        </Button>
      </div> -->
    </Container>
  </div>
</template>

<script>
import Container from '@/components/Container.vue'
import Button from '@/components/Button.vue'
import ExpansionPanel from '@/components/ExpansionPanel.vue'
export default {
  
  components: {
    Container,
    Button,
    ExpansionPanel,
  }
}
</script>

<style scoped>
  .faq {
    width: 100%;
  }
  .faq__container {
    padding-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
  }
  .faq__title {
    font-weight: 700;
  }
  .faq__expansion-panels {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
  .faq__feedback-form {
    width: 100%;
    display: grid;
    grid-template-columns: minmax(auto, 1200px);
    justify-content: center;
    gap: 16px;
  }
  .faq__textarea {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    height: 100px;
    min-height: 100px;
    background: #FFFFFF;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.18);
    border-radius: 10px;
    padding: 8px 12px;
    border: none;
    resize: vertical;
  }
  .faq__submit-btn {
    justify-self: right;
    width: 150px;
  }
</style>