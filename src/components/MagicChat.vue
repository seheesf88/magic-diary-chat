<template>
  <div class="diary">
    <div>
      <div v-if="isLoading">
        <p>{{ response }}</p>
      </div>
      <div v-else-if="!isLoading && !isAsking">
        <p>{{ response }}</p>
      </div>
      <div v-else-if="!isLoading && isAsking">
        <input v-model="userMessage" class="diary__input" placeholder="Ask a question..." />
        <button class="diary__button" @click="sendMessage">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userMessage: "",
      response: "",
      isLoading: false,
      isAsking: true
    };
  },
  methods: {
    async sendMessage() {
      try {
        this.isLoading = true
        const response = await fetch("http://localhost:3000/ask-openai", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userMessage: this.userMessage,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          this.response = data.openaiResponse;
          this.isLoading = false
        } else {
          console.error("Error from backend:", response.statusText);
        }
      } catch (error) {
        console.error("Error sending message to backend:", error);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.diary {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  &__input  {
    border: none;
    background-color: inherit;
    font-size: 40px;
  }

  &__button {
    border: none;
    background-color: inherit;
    font-size: 40px;
  }
}
</style>
