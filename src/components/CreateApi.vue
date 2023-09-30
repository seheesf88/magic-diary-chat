<template>
  <div class="create-api row">
    <h1>create your own chatbot tone api</h1>
    <form class="col-6" @submit.prevent="submitForm">
      <BaseInput label="Chatbot Name" v-model="formData.chatbotName" />
      <BaseInput label="prompt" v-model="formData.prompt" />
      <button type="submit">Generate</button>
    </form>
    <div> 
      <p>Your api</p>
      <div> 
        {{  }}
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseInput from '../ui-components/BaseInput';
import { reactive } from 'vue'

const formData = reactive({
  chatbotName: "",
  prompt: ""
});

const submitForm = async () => {
  console.log('success', formData)

};

</script>

<style>
.create-api {
  color: white;
}
</style>
